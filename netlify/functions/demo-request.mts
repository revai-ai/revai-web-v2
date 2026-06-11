// Demo-request backend (Phase 3E, plan §6) — receives the website-demo
// submission from src/pages/DemoRequest.tsx and delivers it as an email via
// Resend. Email-only fulfillment (B9 default): no lead store, no Supabase.
// Built on the contact.mts pattern; that file stays untouched as the
// reference. The Resend API key stays server-side only; it is never exposed
// to the client bundle (no VITE_* usage here).
//
// The submitted URL is validated and normalized as a STRING only — it is
// never fetched server-side (SSRF/abuse risk; fulfillment is manual anyway).

import { FIELD_LIMITS, isValidEmail, normalizeWebsiteUrl } from '../../src/components/forms/validation';

interface DemoRequestPayload {
  website?: string;
  name?: string;
  email?: string;
  company?: string;
  notes?: string;
  consent?: boolean;
  locale?: string;
  _honeypot?: string;
}

// Best-effort per-IP/email rate limit, in-memory per warm function instance
// (a cold start resets it — acceptable for basic abuse damping; honeypot and
// the consent gate do the rest, plan §6).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string, now: number): boolean {
  const timestamps = (recentSubmissions.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  const limited = timestamps.length >= RATE_MAX;
  if (!limited) timestamps.push(now);
  recentSubmissions.set(key, timestamps);
  return limited;
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async (req: Request) => {
  // Accept only POST.
  if (req.method !== 'POST') {
    return json(405, { success: false, error: 'Method not allowed' });
  }

  // Parse JSON safely.
  let data: DemoRequestPayload;
  try {
    data = await req.json();
  } catch {
    return json(400, { success: false, error: 'Invalid request body' });
  }

  // Honeypot — if a bot filled the hidden field, pretend success and send nothing.
  if (data._honeypot && data._honeypot.trim() !== '') {
    return json(200, { success: true });
  }

  const websiteInput = (data.website || '').trim();
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const company = (data.company || '').trim();
  const notes = (data.notes || '').trim();
  const locale = data.locale === 'en' ? 'en' : 'cs';

  // Validate required fields.
  if (!websiteInput || !name || !email) {
    return json(400, { success: false, error: 'Missing required fields' });
  }

  // Consent is required and must be explicit.
  if (data.consent !== true) {
    return json(400, { success: false, error: 'Consent is required' });
  }

  // Length ceilings (shared with the client).
  if (
    name.length > FIELD_LIMITS.name ||
    email.length > FIELD_LIMITS.email ||
    company.length > FIELD_LIMITS.company ||
    notes.length > FIELD_LIMITS.notes
  ) {
    return json(400, { success: false, error: 'Field too long' });
  }

  if (!isValidEmail(email)) {
    return json(400, { success: false, error: 'Invalid email address' });
  }

  // Normalize + validate the website URL (string-level only; never fetched).
  const website = normalizeWebsiteUrl(websiteInput);
  if (!website) {
    return json(400, { success: false, error: 'Invalid website URL' });
  }

  // Rate limit per client IP and per email.
  const now = Date.now();
  const ip =
    req.headers.get('x-nf-client-connection-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown';
  if (isRateLimited(`ip:${ip}`, now) || isRateLimited(`email:${email.toLowerCase()}`, now)) {
    return json(429, { success: false, error: 'Too many requests, please try again later' });
  }

  // Server-side env vars only. DEMO_TO_EMAIL is the demo inbox; it falls back
  // to the contact inbox per plan §6.
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.DEMO_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'info@automatizace-ai.cz';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'kontakt@automatizace-ai.cz';

  if (!apiKey) {
    console.error('demo-request: RESEND_API_KEY is not configured');
    return json(500, { success: false, error: 'Email service not configured' });
  }

  // Seam for later phases: a lead-store write and a Meta CAPI event would
  // share this id with the notification email (plan §6 — no rework needed).
  const submissionId = crypto.randomUUID();

  const text = `Nová žádost o demo webu
========================================

Web: ${website}
Jméno: ${name}
Email: ${email}
Firma: ${company || 'Neuvedeno'}
Jazyk formuláře: ${locale}

Poznámka:
${notes || '—'}

ID žádosti: ${submissionId}
`;

  // Dry-run path (plan §6/§8 3E): until the Resend sending domain is verified
  // (R17), set DEMO_DRY_RUN=true in the Netlify env to exercise the full
  // validation pipeline without calling Resend.
  if (process.env.DEMO_DRY_RUN === 'true') {
    console.log(`demo-request: dry run ${submissionId} — would notify ${toEmail} about ${website}`);
    return json(200, { success: true });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Demo formulář <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `DEMO REQUEST — ${website}`,
        text,
      }),
    });

    if (!resendResponse.ok) {
      // Log status only server-side; do not surface Resend details to the client.
      console.error(`demo-request: Resend API responded ${resendResponse.status}`);
      return json(502, { success: false, error: 'Failed to send request' });
    }

    return json(200, { success: true });
  } catch (error) {
    console.error('demo-request: unexpected error sending email', error instanceof Error ? error.message : error);
    return json(500, { success: false, error: 'Failed to send request' });
  }
};
