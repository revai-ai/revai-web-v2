# Deploy Checklist — AMAI / REVAI website

Production deployment checklist for the AMAI (automatizace-ai.cz) website on Netlify.

## Build & hosting

- **Branch:** `polish/premium-brand-accent-lift`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node:** use the repo's lockfile (`package-lock.json`); install with `npm ci`
- **Config:** `netlify.toml` (build/publish) + `public/_redirects` (redirects)

## Required environment variables (names only — set in Netlify UI)

Server-side (used only by the `netlify/functions/contact` function — never exposed
in the client bundle, so **no `VITE_` prefix**):

- `RESEND_API_KEY` — **required.** Resend API key. Server-side only.
- `CONTACT_TO_EMAIL` — optional. Recipient inbox. Falls back to `info@automatizace-ai.cz`.
- `CONTACT_FROM_EMAIL` — optional. Sender address; **must be a verified sender/domain
  in Resend.** Falls back to `kontakt@automatizace-ai.cz`.

> Do not place `RESEND_API_KEY` or any private key in `VITE_*` variables — those are
> embedded in the client bundle. Keep secrets in Netlify server-side env config only.
> The site no longer uses Supabase or Web3Forms; there are no client-side env vars.

## Netlify redirect behavior (`public/_redirects`)

```
/sluzby/emailova-automatizace   /sluzby/automatizace-procesu   301!
/*                              /index.html                     200
```

- The 301 (legacy email-automation route → process automation) must stay **above**
  the SPA fallback.
- The `/*` → `/index.html` (200) SPA fallback must stay **last**.

## Contact form architecture (verify after deploy)

- The contact form (`src/pages/Contact.tsx`) POSTs JSON to the Netlify Function at
  `/.netlify/functions/contact` (source: `netlify/functions/contact.mts`).
- The function validates the fields and sends the submission as an email via the
  **Resend** API (`api.resend.com/emails`) using the server-side `RESEND_API_KEY`.
- No Supabase database row is created anymore; there is **no Web3Forms** dependency.
- A hidden `_honeypot` field is checked server-side: filled → silent success, no email.
- `CONTACT_FROM_EMAIL` **must be a verified sender/domain in Resend** before production,
  or delivery will fail.

## Pre-deploy validation

- [ ] `npm run build` succeeds
- [ ] `npm run lint` (no new errors)
- [ ] `npm run typecheck` (no new errors)

## Manual smoke-test URLs (after deploy)

- [ ] `/`
- [ ] `/cenik`
- [ ] `/kontakt`
- [ ] `/sluzby/hlasovi-agenti`
- [ ] `/sluzby/automatizace-procesu`
- [ ] `/sluzby/tvorba-modernich-webu`
- [ ] `/sluzby/ai-app-development`
- [ ] `/blog`
- [ ] `/reference`
- [ ] `/projekty`
- [ ] `/gdpr`
- [ ] `/og-image.webp` resolves (1200×630)
- [ ] `/sluzby/emailova-automatizace` → 301 → `/sluzby/automatizace-procesu`

## Post-deploy checks

- [ ] **Contact form** submits successfully (success message shown)
- [ ] **Email delivery** — confirm the submission email arrives via Resend at
      `CONTACT_TO_EMAIL` (fallback `info@automatizace-ai.cz`)
- [ ] **Resend sender verified** — `CONTACT_FROM_EMAIL` domain/sender is verified
      in Resend (required before production)
- [ ] **Reply-to** — replying to the received email goes to the submitter's address
- [ ] **Vapi assistant** — `/sluzby/hlasovi-agenti` → "Vyzkoušejte naživo" / `#try-agent`,
      "ZAVOLAT AI ASISTENTOVI" starts a call (CS/EN assistant IDs)
- [ ] **Calendar booking** — "REZERVOVAT TERMÍN" opens the Google Calendar booking page
      (centralized `CALENDAR_URL` in `src/config/site.ts`)
- [ ] **Old email-automation redirect** works (see smoke test)
- [ ] **Sitemap** `/sitemap.xml` lists current routes only
- [ ] **robots.txt** references the sitemap
- [ ] **OG image** renders in a link-preview debugger
- [ ] **Mobile navigation** — hamburger menu, services dropdown, language toggle
- [ ] **Pricing** — `/cenik` shows the new structure (no calculators):
      voice = 3 monthly packages; process automation = 3 implementation
      packages with one-time price + monthly management prices;
      web dev = 3 packages with prices

## Notes / known follow-ups (not release-blocking)

- Footer social links are still placeholders (`href="#"`); real LinkedIn/Facebook/
  Instagram URLs needed from the client.
- Resend `from` sender domain should be verified before enabling that path.
