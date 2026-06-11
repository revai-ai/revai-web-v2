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
- `_redirects`: originally unedited; the **2026-06-11 follow-up (§9)** added build-generated canonical no-trailing-slash rewrites after the deploy preview showed Netlify 301-ing `/demo` → `/demo/`. The existing `/cs/*  /:splat  301!` rule still collapses `/cs/demo` → `/demo` (mirrored in-app by `csRedirectTarget`, which is generic).

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
| `dist/_redirects` | ✅ at 3E time byte-identical to `public/_redirects`; **superseded by §9** — since 2026-06-11 the build replaces a marker with 22 canonical rewrites (3A/3C 301s byte-unchanged; SPA/404 catch-all still last) |
| `contact.mts` untouched | ✅ `git diff` empty |
| **Function branch tests** (bundled with the repo's own esbuild — no new dependency — and invoked in Node with `Request` objects) | ✅ 22/22: GET→405; bad JSON→400; honeypot→fake 200; missing website/name/email→400; consent missing/false/truthy-string→400; bad email→400; bad URL (no TLD / ftp / spaces)→400; over-length name/notes→400; dry-run success with URL normalized (`www.firma.cz` → `https://www.firma.cz/`); 4th request per IP→429; 4th request per email (across IPs)→429; fresh IP+email→200; missing `RESEND_API_KEY`→safe 500 |
| **Browser verification** (dev preview, CZ + EN) | ✅ `/demo` and `/en/demo` render; all labels associated (a11y tree); honeypot absent from a11y tree; empty submit shows all four inline errors with `aria-invalid`/`aria-describedby`; errors clear on input; network-failure path shows the error message in the `aria-live` region; stubbed-success path shows the success message and resets the form incl. consent; navbar CTA = `DEMO ZDARMA`→`/demo` (CZ) / `FREE DEMO`→`/en/demo` (EN); console clean except pre-existing leadsy.ai errors (known R3) |
| Resend E2E | ⛔ **not run** — gated on Resend domain verification (R17, still pending per B10). Dry-run path implemented and tested instead, as the plan prescribes. |

## 6. Deploy-preview checks required (on `revai-web-v2.netlify.app` — allowed)

> Superseded in part by §9 (2026-06-11): the function smoke **passed** once the
> correct payload key was used, and the trailing-slash 301s are fixed by the
> generated rewrites. Re-run the §9.4 list on the next deploy preview.

### Function payload contract (authoritative — see §9.1 for the failed-smoke postmortem)

| JSON key | Meaning |
|---|---|
| `website` | the real website URL (required) — **not `websiteUrl`** |
| `name`, `email` | required |
| `company`, `notes`, `locale` | optional |
| `consent` | must be boolean `true` |
| `_honeypot` | hidden bot field — empty string for legitimate requests; **fill this (not `website`) to test the fake-success path** |

Correct smoke commands:

```sh
# Valid request → 200 {"success":true} (dry-run logs, or email if live)
curl -s -X POST https://<preview>/.netlify/functions/demo-request \
  -H 'Content-Type: application/json' \
  -d '{"website":"www.firma.cz","name":"Test Tester","email":"test@firma.cz","consent":true,"_honeypot":""}'

# Honeypot trip → 200 {"success":true} but NOTHING is sent (check function log)
curl -s -X POST https://<preview>/.netlify/functions/demo-request \
  -H 'Content-Type: application/json' \
  -d '{"website":"www.firma.cz","name":"Bot","email":"bot@spam.tld","consent":true,"_honeypot":"http://spam"}'

# Validation branch → 400 {"success":false,"error":"Invalid website URL"}
curl -s -X POST https://<preview>/.netlify/functions/demo-request \
  -H 'Content-Type: application/json' \
  -d '{"website":"not a url","name":"Test","email":"test@firma.cz","consent":true,"_honeypot":""}'
```

1. `/demo` and `/en/demo` return 200 with the route-correct heads (no-trailing form must be 200, not 301 — §9); `/cs/demo` → single-hop 301 → `/demo`.
2. The 3D checklist (§11 there) still holds: existing 301s, prerendered routes not shadowed, hard 404, sitemap serving 24 URLs.
3. Function smoke with `DEMO_DRY_RUN=true`: the curl above (or the form) → 200 + function log line, no email.
4. **After Resend verifies `automatizace-ai.cz`:** unset `DEMO_DRY_RUN`, submit once → email arrives in the monitored inbox with subject `DEMO REQUEST — {url}` and `reply_to` set; confirm a 4th rapid submission gets 429.
5. Optionally set `DEMO_TO_EMAIL` first if demo requests should land in a separate inbox.

## 7. Rollback

Revert the single 3E commit: the function is net-new with no callers besides the new page; `ROUTE_MAP`/`PAGE_META` lose the demo entry (prerender/sitemap return to 22 URLs); the navbar CTA returns to the Calendar consultation link. Contact flow unaffected throughout. Partial rollback: the Navbar hunk is independent — reverting only it restores the consultation CTA while keeping `/demo` live.

## 8. Operational note (not a code item)

The success copy promises a demo "within a few hours, business hours". Per `03-conversion-architecture.md` §7 this is an **operational commitment** — the monitored inbox and manual fulfillment log must exist before the page is exposed on the indexed domain.

---

## 9. Follow-up (2026-06-11) — deploy-preview findings & fixes

### 9.1 Function smoke "failure" was a test-payload error, not a function bug

The first deploy-preview smoke POSTed the URL under the key **`websiteUrl`**, which is not part of the contract — the function (correctly) returned `400 {"error":"Missing required fields"}`. A second attempt put the URL into `_honeypot`-adjacent confusion territory; for the record: `_honeypot` is the hidden anti-bot field and must be **empty** on legitimate requests — filling it yields a deliberate *fake* 200 with nothing sent. With the correct payload (`website` = URL, `_honeypot` = `""`) **the deployed function returns 200 and behaves exactly as the 22 local branch tests predicted. No function code changed in this follow-up.** The §6 table + curl examples are now the authoritative smoke commands; the original ad-hoc commands (never committed to the repo — `websiteUrl` appears nowhere in code or docs) should not be reused.

### 9.2 Canonical trailing-slash mismatch (real defect, fixed)

Observed on the deploy preview: `/demo` → `301 Location: /demo/` (same for `/en/demo` and the other prerendered routes). Cause: prerendered routes are `dist/<path>/index.html` files, and Netlify's directory-index handling 301s the no-slash form to the slash form — while sitemap, canonicals and hreflang all emit **no-trailing** URLs. The canonical URL must be the 200, not a 301.

**Fix:** `public/_redirects` now contains a `# @canonical-route-rewrites` marker that `scripts/prerender.ts` replaces at build time with one explicit rewrite per prerendered route (22 rules, derived from `ROUTE_MAP` — cannot drift from the route set):

```
/demo   /demo/index.html   200
/en/demo   /en/demo/index.html   200
/cenik   /cenik/index.html   200
… (one per route, both locales)
```

Placement and invariants (verified in built `dist/_redirects`):

- Rules sit **after** the forced 301s (`emailova-automatizace`, `interni-agenti` — byte-unchanged) and the `/cs` 301 block (`/cs` paths are never rewritten, they remain 301s), and **before** the SPA-only rewrites and the final `/* /404.html 404` catch-all (still last).
- Excluded by design: `/` (real file at the root, already 200) and `/en/` (its canonical *includes* the trailing slash, so the platform `/en` → `/en/` 301 lands on the canonical in one hop).
- No redirect chains: every rewrite is a direct 200; `/cs/demo` → `/demo` (one hop) → 200.
- The exact `/projekty` rewrite precedes the `/projekty/*` SPA splat — first match wins, so `/projekty` serves its prerendered head and `/projekty/:id` still hits `spa-shell.html`.
- Build fails loudly if the marker disappears from `public/_redirects` (prevents the rules and the catch-all ordering from silently drifting).
- Sitemap unchanged: 24 URLs, no-trailing (only `/` and `/en/` carry a slash), `/demo` + `/en/demo` present, no `/cs`.

`dist/_redirects` is therefore **no longer byte-identical** to `public/_redirects` (supersedes the §5 row): the repo file holds the marker, the built file holds the generated rules. 3D note §14 records the same change from the 3D side.

### 9.3 Validation (2026-06-11)

`npm run typecheck` ✅ · `npm run lint` ✅ (same 3 pre-existing warnings) · `npm run build` ✅ — `[prerender] wrote 24 route heads (+404.html, spa-shell.html, sitemap.xml, 22 canonical rewrites)`. Inspected `dist/_redirects` ordering (as §9.2), sitemap (24 no-trailing URLs, no `/cs`), spot-checked canonicals (`/demo`, `/en/demo`, `/cenik`, `/en/services/process-automation` — all no-trailing).

### 9.4 Deploy-preview checks to re-run

1. `curl -sI https://<preview>/demo` → **200** (not 301); same for `/en/demo`, `/cenik`, `/sluzby/automatizace-procesu`, `/en/services/process-automation`; heads route-correct.
2. Trailing-slash forms (`/demo/`, `/cenik/`) still 200 (directory index; canonical tag points at no-trailing).
3. `/en` → 301 → `/en/` (single hop, lands on the canonical); `/cs/demo` → 301 → `/demo` (single hop).
4. `/sluzby/emailova-automatizace`, `/sluzby/interni-agenti` → 301 → `/sluzby/automatizace-procesu` (unchanged).
5. `/totally-nonexistent-route` → HTTP 404 with the noindex head; `/projekty/ai-chatbot-pacienti` + brochures → 200 via `spa-shell.html`.
6. Function smoke with the **§6 curl commands** (correct `website` key); honeypot curl → fake 200 + no log/email of a send.
