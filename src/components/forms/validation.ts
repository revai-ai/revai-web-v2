/**
 * Phase 3E — shared form validation primitives (plan §6): consumed by the
 * client forms and by netlify/functions/demo-request.mts (Netlify bundles the
 * function with esbuild, which resolves this relative TS import), so client
 * and server validation cannot drift. Pure functions only — no React, no DOM,
 * no Node APIs.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Field length ceilings enforced on both client and server. */
export const FIELD_LIMITS = {
  name: 200,
  email: 320,
  company: 200,
  website: 2048,
  notes: 5000,
} as const;

/**
 * Normalize a user-entered website address: trims, prepends https:// when no
 * scheme is given, and validates with the URL parser. Returns the normalized
 * absolute URL, or null when the input is not a usable http(s) website
 * address. Format validation only — the URL is never fetched anywhere
 * (plan §6: no server-side auto-fetch of submitted URLs).
 */
export function normalizeWebsiteUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > FIELD_LIMITS.website || /\s/.test(trimmed)) {
    return null;
  }
  const withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  // Require a dotted hostname (firma.cz) — rejects bare words, localhost
  // and trailing-dot forms; embedded credentials are not a website address.
  if (!url.hostname.includes('.') || url.hostname.endsWith('.')) return null;
  if (url.username || url.password) return null;
  return url.href;
}
