# Phase 1 — Owner Sign-off (REVAI redesign)

> Owner answers recorded below. Full context for each decision: `docs/planning/phase-1-decision-records.md`.
>
> ⛔ **Gate status:** B1 and B10 are answered. **B6 remains only PARTIALLY answered** — the final GSC export is still missing, so **homepage meta/H1/SEO changes remain blocked until B6 is fully closed.** Custom domain cutover stays blocked until explicit staging sign-off.

- **Filled in by:** Owner (via directive)
- **Date:** 2026-06-10

---

## 1. B1 — Production source of truth ✅ ANSWERED

- Production GitHub repository URL: **https://github.com/revai-ai/revai-web-v2.git** *(created)*
- Default branch: main
- Netlify site (redesign): **https://revai-web-v2.netlify.app** *(created; new site for the redesign)*
- Existing production site: remains **untouched** as legacy fallback
- Production domain: temporary Netlify subdomain (`revai-web-v2.netlify.app`) first; custom REVAI/Automatizace domain cutover **not approved yet** — later, after staging sign-off
- Reconciliation method: the new GitHub repository is the source of truth for the redesign; existing production remains legacy fallback until explicit cutover
- Netlify env/secrets on `revai-web-v2`: **confirmed — all three configured** *(status only; values are never recorded in documentation)*
  - `RESEND_API_KEY`: configured
  - `CONTACT_TO_EMAIL`: configured
  - `CONTACT_FROM_EMAIL`: configured
- Notes: No current production deploy or domain migration is approved in Phase 1.

> **Status: B1 CLOSED.** The new GitHub repo and Netlify site exist, and all three required env vars are confirmed as configured on `revai-web-v2`. The redesign's source of truth is settled. **Custom domain cutover remains a separate, later approval after staging sign-off** — closing B1 does not approve it.

## 2. B5 — Hero CTA decision ✅ ANSWERED

- Primary hero CTA: website-URL demo request
- Secondary hero CTA: book consultation
- Navbar persistent CTA: website-URL demo request
- Decision approved: **yes**
- Notes: Recommended copy direction: "Pošlete mi demo mého webu" or "Získat návrh webu zdarma". Consultation remains a strong secondary CTA.

## 3. B6 — Keyword preservation list ⛔ PARTIALLY ANSWERED

> **Status: partially answered — protective default approved, final GSC export still required.**

- Search Console date range: last 3 months from available screenshot; export last 12 months before any homepage meta/H1 change if available
- Top automation queries:
  - ai automatizace — **preserve**
  - automatizace ai — **preserve**
  - ai automatizace procesů / automatizace procesů ai — preserve if present in export
  - ai hlasový asistent — **preserve**
  - hlasový ai asistent / hlasovi agenti — preserve if present
  - ai aplikace / ai app development — preserve if present
  - tvorba webových stránek / moderní webové stránky — monitor, but not yet proven as existing SEO equity
- Landing pages to preserve:
  - `/`
  - `/sluzby/automatizace-procesu`
  - `/sluzby/hlasovi-agenti`
  - `/sluzby/ai-app-development`
  - `/sluzby/tvorba-modernich-webu`
  - `/cenik`
  - `/kontakt`
  - existing 301: `/sluzby/emailova-automatizace` → `/sluzby/automatizace-procesu`
- Current title / meta description / H1 per preserved page: export from current code before Phase 3; **do not rewrite homepage title/H1/meta until this baseline is recorded**
- Pages with external backlinks worth preserving: unknown; run Search Console links export or backlink check before cutover; default is preserve all existing indexed URLs and redirects
- Baseline snapshot date: to be set on the date of final GSC export before Phase 3 / before homepage meta change
- Notes: **B6 does not fully close until the final GSC export exists.** This protective default allows internal non-SEO work but does **not** allow homepage meta/H1/SEO changes.

## 4. B10 — REVAI brand facts ✅ ANSWERED

- Support/contact email: info@automatizace-ai.cz
- Social URLs:
  - https://www.instagram.com/revai_ai/
  - https://www.linkedin.com/company/110111764/
- Correct postal address: nám. Svobody 210/18, 669 02 Znojmo 2, Česko
- Legal entity: according to IČO 05013500
- IČO: 05013500
- Resend sending domain: automatizace-ai.cz *(verification pending after new Netlify/Resend setup)*
- Notes: If a REVAI-specific domain becomes the sending domain later, this must be updated before production.

## 5. B2 — i18n approval ✅ APPROVED

- URL strategy approved: **subpaths**
- EN slug strategy: **English slugs**
- Notes: Use `/cs/...` and `/en/...`; English slugs are chosen for better EN UX and keyword targeting, with correct hreflang/canonical mapping.

## 6. B3 — Prerender approval ✅ APPROVED

- Prerender marketing routes approved: **yes**
- Framework migration (Next.js/greenfield) rejected for now: **yes**
- Notes: Use prerender/SSG for marketing routes while keeping Vite + React SPA; do not migrate to Next.js/greenfield now.

## 7. Dependency/security decision ✅ RECORDED

- npm audit auto-fix rejected: **yes**
- Approved later dependency review (lockfile will change): **yes**
- Runtime router advisories (`react-router` / `react-router-dom`) prioritized: **yes**
- Notes: Do not run `npm audit fix` automatically. Runtime react-router/react-router-dom advisories get priority in a later approved dependency pass.

## 8. Final Phase 1 gate

- [x] **B1 answered** — repo (`github.com/revai-ai/revai-web-v2`) and Netlify site (`revai-web-v2.netlify.app`) created; production untouched as legacy fallback; all three env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) confirmed configured. Domain cutover still requires separate staging sign-off.
- [x] **B5 answered** — demo request primary, consultation secondary, demo in navbar.
- [~] **B6 partially answered** — protective default approved (queries + pages listed above, meta/H1 frozen); pending final GSC export before any homepage meta/H1/SEO change. **Not fully closed.**
- [x] **B10 answered** — brand facts supplied; Resend domain verification pending after new Netlify/Resend setup.
- [x] **B2 direction approved** — subpaths, English slugs for `/en/`.
- [x] **B3 direction approved** — prerender marketing routes, no framework migration.
- [x] **Dependency/security decision recorded** — no auto-fix; runtime router advisories prioritized in a later approved pass.
- [x] **No code changed** — documentation only.

> ⚠️ **Warning — one gate not fully closed:** **B6** (final GSC export missing). Internal implementation may proceed under the protective defaults, and deploy previews/testing on the temporary `revai-web-v2.netlify.app` subdomain may proceed since production is untouched; **custom domain cutover remains not approved (separate staging sign-off required), and no homepage meta/H1/SEO change may happen until B6 is fully closed.**

**Owner signature / confirmation:** Owner directive, 2026-06-10  **Date:** 2026-06-10
