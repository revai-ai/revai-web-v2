# Phase 3E — Demo-request form/function: implementation & validation note

> **Date:** 2026-06-10. Executes step 3E of `phase-3-foundation-implementation-plan.md` (§6, §8) under B5 (demo primary) and B9 (email-only).
> Scope held: no 3F headers, no Phase 4 homepage work, no homepage H1/title/meta change, no `/cenik` change, no protected-slug change, no tracking, no dependency change, no `npm audit fix`, no deploy. `contact.mts` untouched (reference pattern only).

---

## 1. What shipped

An email-only website-demo request flow on a dedicated **`/demo`** route (CZ) and **`/en/demo`** (EN), per the conversion architecture (`03-conversion-architecture.md` §3) and plan §6:

- **`src/pages/DemoRequest.tsx`** — minimal demo page (full conversion-band design stays Phase 4). Fields: website URL (required), name (required), email (required), company (optional), notes (optional), required consent checkbox (opens the existing GDPRModal), honeypot. Inline client validation with `aria-invalid`/`aria-describedby` per field, `aria-live="polite"` status region (R14), loading state on submit, distinct success/error states. Copy is a per-locale dictionary object (B7 — no new inline `t()` pairs); document meta is read **directly from `PAGE_META`** so served and hydrated heads cannot drift (improves on the 3D duplication pattern for this new page).
- **`netlify/functions/demo-request.mts`** — new function on the `contact.mts` pattern (that file is byte-untouched, verified via `git diff` — empty). POST-only; safe JSON responses; honeypot returns fake success; server-side validation of required fields, email format, explicit `consent === true`, field-length ceilings; website URL **normalized and validated as a string only — never fetched** (SSRF/plan §6); best-effort per-IP + per-email rate limit (3 per 10 min per key, in-memory per warm instance); Resend email with subject **`DEMO REQUEST — {url}`**; `reply_to` = requester. Includes a `submissionId` (UUID) in the email as the seam for a later lead store / CAPI event (no rework needed). `DEMO_DRY_RUN=true` env flag short-circuits before the Resend call (R17 gate — see §5).
- **`src/components/forms/validation.ts`** — shared validation primitives (`isValidEmail`, `normalizeWebsiteUrl`, `FIELD_LIMITS`), pure functions consumed by both the page and the function (Netlify's esbuild bundles the relative TS import — verified by bundling locally with the repo's own esbuild).
- **Navbar persistent CTA** now routes to the demo page (`DEMO ZDARMA` / `FREE DEMO`, locale-aware via `localizedHref`). This is the B5-approved default recorded in `03-conversion-architecture.md` §1 ("Navbar keeps a single high-contrast CTA. Default: demo request — swap the current 'Free consultation'"). Still exactly one persistent CTA; consultation remains one click away (Contact page, BookConsultation bands, footer). Single revertible hunk if contested.

## 2. Files changed

| File | Change |
|---|---|
| `src/i18n/routes.ts` | `demo` added to `RouteKey` + `ROUTE_MAP` (`/demo` ↔ `/en/demo`). Routing, switcher, hreflang, prerender and sitemap all derive from this one entry. |
| `src/i18n/pageMeta.ts` | `demo` entry (CZ/EN title + description, priority 0.8). New-page copy — allowed by B6 §8 (new non-protected pages). |
| `src/App.tsx` | Lazy `DemoRequest`, `/demo` route, `demo` in `EN_ROUTE_ELEMENTS` (the `Record<RouteKey, …>` type forces the EN mount). Existing 301 `<Navigate>` routes untouched. |
| `src/pages/DemoRequest.tsx` | **New** — see §1. |
| `src/components/forms/validation.ts` | **New** — shared client/server validation primitives. |
| `netlify/functions/demo-request.mts` | **New** — see §1. |
| `src/components/Navbar.tsx` | Persistent CTA: external Calendar `<a>` → internal `<Link to={localizedHref('/demo', …)}>` (desktop + mobile); unused `CALENDAR_URL` import removed (the constant itself stays — used by BookConsultation). |
| `docs/planning/phase-3e-demo-request-validation.md` | **New** — this note. |

Not changed: `netlify/functions/contact.mts`, `public/_redirects` (dist copy verified byte-identical to repo), `index.html`, `src/pages/Home.tsx`, `Hero.tsx`, `PricingPage.tsx`, all `/sluzby/*` pages, `scripts/prerender.ts`, `package.json`/lockfile.

## 3. SEO / i18n behavior

- **`/demo` is indexable** — it is the headline conversion page (B5), prerendered with full head and listed in the sitemap (plan §5.2 already named `/demo` in the prerender set). No noindex needed.
- Prerender now writes **24 route heads** (12 routes × 2 locales) + `404.html` + `spa-shell.html`; sitemap has **24 URLs**, all protected URLs still present, **no `/cs/*` URL**.
- Served `dist/demo/index.html`: `lang="cs"`, title `Demo vašeho webu zdarma | REVAI`, self-canonical `https://automatizace-ai.cz/demo`, hreflang `cs=/demo`, `en=/en/demo`, `x-default=/demo`.
- Served `dist/en/demo/index.html`: `lang="en"`, title `Free Demo of Your Website | REVAI`, **self-canonical `/en/demo`** (never cross-locale), reciprocal hreflang, `x-default` → bare `/demo`.
- `_redirects` needed **no edit**: `/demo` and `/en/demo` are real files served before the 404 catch-all, and the existing `/cs/*  /:splat  301!` rule already collapses `/cs/demo` → `/demo` (mirrored in-app by `csRedirectTarget`, which is generic).

## 4. Env vars

| Var | Status |
|---|---|
| `RESEND_API_KEY` | exists (confirmed configured per plan §7) — reused. |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | exist — used as fallbacks. |
| `DEMO_TO_EMAIL` | **new, optional** — set in Netlify UI if demo requests should go to a separate inbox; falls back to `CONTACT_TO_EMAIL`, then `info@automatizace-ai.cz`. Works without it. |
| `DEMO_DRY_RUN` | **new, optional** — set `true` on deploy previews until Resend domain verification (R17) completes; full validation runs, Resend call skipped, submission logged. Remove/unset for real E2E. |

No secret committed; no `VITE_*` var added (grep-verified).

## 5. Validation results (2026-06-10)

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ green (0 errors) |
| `npm run lint` | ✅ 0 errors; same 3 pre-existing `react-refresh/only-export-components` warnings (untouched files) |
| `npm run build` | ✅ `[prerender] wrote 24 route heads (+404.html, spa-shell.html, sitemap.xml)` |
| dist heads (`/demo`, `/en/demo`) | ✅ as §3; confirmed by file grep + `vite preview` curl (`/demo/` with trailing slash — vite preview's directory-index quirk, same caveat as 3D §7; Netlify serves `/demo` directly) |
| Protected heads unchanged | ✅ `/`, `/cenik`, `/sluzby/automatizace-procesu` titles byte-identical to 3D output; `Hero.tsx`/`Home.tsx`/`PricingPage.tsx`/`index.html` not in diff |
| `dist/sitemap.xml` | ✅ 24 `<loc>`, all protected bare URLs present, `/demo` + `/en/demo` added, no `/cs/*` |
| `dist/_redirects` | ✅ byte-identical to `public/_redirects` (3A/3C/3D rules unchanged; SPA/404 catch-all still last) |
| `contact.mts` untouched | ✅ `git diff` empty |
| **Function branch tests** (bundled with the repo's own esbuild — no new dependency — and invoked in Node with `Request` objects) | ✅ 22/22: GET→405; bad JSON→400; honeypot→fake 200; missing website/name/email→400; consent missing/false/truthy-string→400; bad email→400; bad URL (no TLD / ftp / spaces)→400; over-length name/notes→400; dry-run success with URL normalized (`www.firma.cz` → `https://www.firma.cz/`); 4th request per IP→429; 4th request per email (across IPs)→429; fresh IP+email→200; missing `RESEND_API_KEY`→safe 500 |
| **Browser verification** (dev preview, CZ + EN) | ✅ `/demo` and `/en/demo` render; all labels associated (a11y tree); honeypot absent from a11y tree; empty submit shows all four inline errors with `aria-invalid`/`aria-describedby`; errors clear on input; network-failure path shows the error message in the `aria-live` region; stubbed-success path shows the success message and resets the form incl. consent; navbar CTA = `DEMO ZDARMA`→`/demo` (CZ) / `FREE DEMO`→`/en/demo` (EN); console clean except pre-existing leadsy.ai errors (known R3) |
| Resend E2E | ⛔ **not run** — gated on Resend domain verification (R17, still pending per B10). Dry-run path implemented and tested instead, as the plan prescribes. |

## 6. Deploy-preview checks required (on `revai-web-v2.netlify.app` — allowed)

1. `/demo` and `/en/demo` return 200 with the route-correct heads (with and without trailing slash); `/cs/demo` → single-hop 301 → `/demo`.
2. The 3D checklist (§11 there) still holds: existing 301s, prerendered routes not shadowed, hard 404, sitemap serving 24 URLs.
3. Function smoke with `DEMO_DRY_RUN=true`: submit the form on the preview → 200 + function log line, no email.
4. **After Resend verifies `automatizace-ai.cz`:** unset `DEMO_DRY_RUN`, submit once → email arrives in the monitored inbox with subject `DEMO REQUEST — {url}` and `reply_to` set; confirm a second rapid burst gets 429.
5. Optionally set `DEMO_TO_EMAIL` first if demo requests should land in a separate inbox.

## 7. Rollback

Revert the single 3E commit: the function is net-new with no callers besides the new page; `ROUTE_MAP`/`PAGE_META` lose the demo entry (prerender/sitemap return to 22 URLs); the navbar CTA returns to the Calendar consultation link. Contact flow unaffected throughout. Partial rollback: the Navbar hunk is independent — reverting only it restores the consultation CTA while keeping `/demo` live.

## 8. Operational note (not a code item)

The success copy promises a demo "within a few hours, business hours". Per `03-conversion-architecture.md` §7 this is an **operational commitment** — the monitored inbox and manual fulfillment log must exist before the page is exposed on the indexed domain.
