# 04 — Implementation Constraints (REVAI redesign)

> Audit-only. This document defines the guardrails the implementation phase must respect.
> It does not implement anything. Confidence/reason/trade-off noted where a judgement is involved.

---

## What NOT to touch initially (pass 1)

Leave these working/isolated/high-blast-radius areas alone until the foundation (i18n, SEO, brand migration, tokens) is in place.

| Area | Path | Reason | Trade-off |
|---|---|---|---|
| Contact email backend | `netlify/functions/contact.mts` | Working, correct secret handling. Base for the new demo function — copy, don't mutate. | Improvements (rate-limit, logging) deferred. |
| Pricing + calculators | `pages/PricingPage.tsx` + 4 calculator/pricing components | Brief: **audit, do not change** pricing. Self-contained. | Premium tier is additive later. |
| Motion engine | `components/home/ImageStoryScene.tsx`, `ImageStoryStack.tsx`, `MobileImageStoryStack.tsx` | The redesign's biggest asset; reposition via *data*, not engine edits. | Engine refactor (generalization) is a later, deliberate task. |
| Booking config | `config/site.ts` | Single source for `CALENDAR_URL`; referenced widely. | — |
| GDPR modal/page | `components/GDPRModal.tsx`, `pages/GDPR.tsx` | Legal content. **Exception:** the "no cookies/analytics" text must be corrected when tracking lands (see consent constraints). | — |
| Brochure pages | `pages/brochures/*` | Standalone, independent of homepage redesign. | — |
| Supabase migrations | `supabase/migrations/*` | Orphaned; decide before deleting. **Do not delete in audit/pass 1.** | Dead code lingers until decision. |
| Redirects | `public/_redirects` | Encodes a real 301 (emailova-automatizace→automatizace-procesu) + SPA fallback. Changing order can break routing. | New redirects must be appended carefully (SPA fallback stays LAST). |

*(confidence: high — these are the lowest-regret things to freeze first.)*

---

## What MUST be preserved

| Must preserve | Why | Source |
|---|---|---|
| Automation/voice/AI-app service URLs and their indexable content | Explicit business constraint: don't destroy existing AI-automation SEO equity | `/sluzby/*` routes, sitemap priorities 0.9 |
| Existing canonical URLs for indexed pages | Avoid ranking loss / duplicate-content during repositioning | `useDocumentMeta` canonicals + sitemap |
| The 301 `emailova-automatizace → automatizace-procesu` | Already-earned link equity | `_redirects`, `App.tsx` `<Navigate>` |
| Working contact form → Resend path | Only working lead-capture channel today | `Contact.tsx` + `contact.mts` |
| Reduced-motion fallbacks | Accessibility + the brief's "don't sacrifice mobile smoothness" | `useReducedMotion` across components |
| Mobile/desktop motion split | Keeps heavy timeline off phones (perf) | `useMediaQuery` + `ImageStoryStack` |
| Booking CTA (Google Calendar) | A primary conversion ("book a consultation") | `CALENDAR_URL` |

*(confidence: high. Trade-off: preserving URLs constrains how aggressively the IA can be restructured — re-rank rather than re-slug where possible.)*

---

## What needs approval (do not do without explicit sign-off)

Per the command rules in the brief and prudent change control:

- **`npm install` / installing or changing any dependency** — `node_modules` is absent; nothing can be built/linted/typechecked until this is approved.
- **Editing `package.json` / lockfiles** (`package-lock.json`, etc.).
- **Deleting anything** (including orphaned Supabase migrations, the second motion/icon library, unused `ui/*` primitives). Audit policy = classify, don't delete.
- **Changing pricing** content/numbers on `/cenik`.
- **Touching production secrets / Netlify env / DNS / Resend domain.**
- **Any outward-facing publish** (deploy, sitemap submission, social handle changes).
- **Switching framework / adding SSR/prerender** (architectural change with broad impact).
- **Adding/altering tracking** (Pixel, GA, CAPI) — gated on consent design + legal sign-off.

*(confidence: high. Reason: each is hard to reverse or has legal/cost/SEO blast radius. Trade-off: slower, but matches the audit-only mandate.)*

---

## Validation commands that must pass later

Once dependencies are installed (with approval), these must be green before a redesign milestone is considered done. **None could be run in this audit (no `node_modules`).**

| Command | Purpose | Current status |
|---|---|---|
| `npm install` | Restore deps | **Not run (needs approval)** |
| `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`) | Type safety | Unknown — could not run |
| `npm run lint` (`eslint .`) | Lint | Unknown — could not run |
| `npm run build` (`vite build`) | Production build | Unknown — could not run |
| `npm run preview` | Verify built output locally | Unknown |
| *(none)* `test` | **No test script / runner exists** | **Missing — recommend adding** |

**Recommended minimum gate before redesign coding (confidence: high):**
1. `npm install` succeeds with the committed lockfile.
2. `typecheck`, `lint`, `build` all pass on the current code — establishes a clean baseline.
3. Add a tiny smoke test (renders `/`, `/cenik`, `/kontakt` without crashing) + one test for the contact function's validation branches.
*Trade-off: a few hours of setup vs. flying blind through a large redesign.*

> Document any failure with: (1) command, (2) error summary, (3) likely cause, (4) whether it blocks redesign planning — per the brief's command rules.

---

## Constraints for CZ/EN

Current state **[Fact]:** in-memory `LanguageContext` (`cs` default), `t(cs,en)` helper, no persistence, no localized routing, no `hreflang`, no per-language served HTML. Hundreds of inline bilingual pairs.

Constraints for doing it properly:
- **Decide the URL strategy before writing new copy** — e.g. `/cs/...` + `/en/...` subpaths (simplest on Netlify), or subdomain/domain split. This determines routing, sitemap, canonicals, and `hreflang`. *(confidence: medium — subpath is usually the pragmatic choice; trade-off: more route plumbing, but best for one Netlify site + SEO.)*
- **Each language needs its own indexable URL, meta, and `hreflang` reciprocal tags** — otherwise EN is invisible to search (R2).
- **Persist language** (localStorage + URL) and set `<html lang>` accordingly; today `index.html` is hardcoded `lang="cs"`.
- **Do not keep authoring copy as inline `t('cs','en')`** — move to dictionaries so the redesign's new premium copy isn't doubled work later.
- **SSR/prerender strongly recommended** so crawlers see localized meta (ties to R5).

---

## Constraints for Meta Ads & cookies

Current state **[Fact]:** no GA/GTM/Pixel/CAPI, no consent banner — **but** `index.html` already loads `r2.leadsy.ai/tag.js` unconditionally, and the GDPR text claims "no cookies or analytical tools are used" (live contradiction, R3).

Constraints before any ad tracking ships:
- **Consent first.** A cookie-consent mechanism (Consent-Mode-style) must gate all non-essential trackers, including the existing leadsy tag and any future Meta Pixel. *(confidence: high — EU/CZ GDPR + ePrivacy.)*
- **Update the GDPR text** the moment tracking is added; the current "none used" statement becomes false.
- **Meta Pixel + Conversions API** need: a Pixel ID, server-side event endpoint (likely a Netlify function), event dedup keys, and a consent signal. Define the **event taxonomy now** (see `05`): consultation-booking click, inquiry-form start, inquiry-form submit, website-URL-demo submit, pricing-CTA click, demo-section engagement.
- **Do not implement tracking in pass 1** (per brief). Design the consent + event layer as its own phase.

---

## Constraints for Netlify deployment

Current state **[Fact]:** `netlify.toml` (build `npm run build`, publish `dist`, functions `netlify/functions`), `_redirects` (1 redirect + SPA fallback), no `_headers` file.

Constraints / required for production:
- **Env vars must be set in the target Netlify site:** `RESEND_API_KEY` (mandatory — function 500s without it), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (fallbacks exist but should be explicit). Add any new vars for the demo-request function. *(confidence: high.)*
- **Resend sending domain must be verified** for the `from` address, or emails fail/spam (R17).
- **Keep the SPA fallback (`/* → /index.html 200`) LAST** in `_redirects`; new rules go above it. Adding localized routes will require new rules.
- **No security headers today** — add a `_headers` file (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) before production; note CSP must allowlist Vapi + any analytics/leadsy origins. *(confidence: medium — standard hardening; trade-off: CSP can break third-party scripts if too strict.)*
- **Functions runtime:** `.mts` ESM function using global `fetch`/`Response` — confirm the Netlify function runtime/Node version supports it in the target site.
- **This is a copied repo** — confirm the production repo/site before deploying anything (R20).
