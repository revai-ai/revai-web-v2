// Contact form backend — receives the submission from src/pages/Contact.tsx and
// delivers it as an email via Resend. The Resend API key stays server-side only;
// it is never exposed to the client bundle (no VITE_* usage here).

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  _honeypot?: string;
}

// Human-readable labels for the service <select> values used in the contact form.
const SERVICE_LABELS: Record<string, string> = {
  'voice-agents': 'Hlasoví asistenti',
  'internal-agents': 'Automatizace procesů',
  'web-development': 'Tvorba moderních webů',
  'ai-app-dev': 'AI App Development',
  'consultation': 'Konzultace',
  'other': 'Jiné',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  let data: ContactPayload;
  try {
    data = await req.json();
  } catch {
    return json(400, { success: false, error: 'Invalid request body' });
  }

  // Honeypot — if a bot filled the hidden field, pretend success and send nothing.
  if (data._honeypot && data._honeypot.trim() !== '') {
    return json(200, { success: true });
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const service = (data.service || '').trim();
  const message = (data.message || '').trim();
  const phone = (data.phone || '').trim();
  const company = (data.company || '').trim();

  // Validate required fields.
  if (!name || !email || !service || !message) {
    return json(400, { success: false, error: 'Missing required fields' });
  }

  // Basic email validation.
  if (!EMAIL_RE.test(email)) {
    return json(400, { success: false, error: 'Invalid email address' });
  }

  // Server-side env vars only.
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@automatizace-ai.cz';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'kontakt@automatizace-ai.cz';

  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not configured');
    return json(500, { success: false, error: 'Email service not configured' });
  }

  const serviceLabel = SERVICE_LABELS[service] || service;

  const text = `Nová zpráva z kontaktního formuláře
========================================

Jméno: ${name}
Email: ${email}
Telefon: ${phone || 'Neuvedeno'}
Firma: ${company || 'Neuvedeno'}
Zájem o službu: ${serviceLabel}

Zpráva:
${message}
`;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Kontaktní formulář <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `Nový kontakt z webu — ${name} (${serviceLabel})`,
        text,
      }),
    });

    if (!resendResponse.ok) {
      // Log status only server-side; do not surface Resend details to the client.
      console.error(`contact: Resend API responded ${resendResponse.status}`);
      return json(502, { success: false, error: 'Failed to send message' });
    }

    return json(200, { success: true });
  } catch (error) {
    console.error('contact: unexpected error sending email', error instanceof Error ? error.message : error);
    return json(500, { success: false, error: 'Failed to send message' });
  }
};
