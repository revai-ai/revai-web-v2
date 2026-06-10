# Phase 3D — Prerender + served SEO scaffold: implementation & validation note

> **Date:** 2026-06-10. Executes step 3D of `phase-3-foundation-implementation-plan.md` (§5) under Option A (B2/B3 approved; B6 wording freeze respected).
> One coherent layer: served HTML heads / build-time sitemap / hard 404. No 3E (demo-request), no 3F (headers), no Phase 4, no Phase 2R work.

---

## 1. Implementation approach chosen

**Plan §5.1 option 3 — build-time per-route HTML shells with route-correct heads**, implemented as an inline Vite plugin (`scripts/prerender.ts`, hooked into `closeBundle` of the normal `vite build`). Pure Node `fs` string templating over the built `dist/index.html`; the i18n layer (`src/i18n/routes.ts`, `meta.ts`, new `pageMeta.ts`) is the single source of truth for paths, canonicals, hreflang and meta values.

Why not the other options:

- **Option 1 (prerender plugin):** requires a new dev dependency → hard stop per the dependency gate. Not installed; no approval requested because option 3 satisfies the 3D scope without it.
- **Option 2 (full `react-dom/server` render):** zero new deps but a large bespoke surface; the page tree assumes browser APIs (scrollytelling engine, `window`/`localStorage`, Vapi widget) and was never written to be SSR-safe. Risk/benefit poor for this phase.

What option 3 delivers vs. defers: served HTML now carries route-correct `<html lang>`, title, meta description, canonical, hreflang and OG/Twitter basics (fixes audit **R5** for meta). The `<body>` remains the empty SPA root — page *content* still renders client-side, exactly as before. JS-executing crawlers (Google) get correct head + full content; JS-less agents get correct head + empty body. Full-content prerender would require the dependency approval pass (or an SSR-safety refactor) — **deferred, documented here.**

## 2. Dependencies

**None needed; none installed.** `package.json` and `package-lock.json` are byte-untouched (verified via `git diff` — empty). No `npm audit fix`. The dependency-approval note was not required.

## 3. Files changed

| File | Change |
|---|---|
| `src/i18n/pageMeta.ts` | **New.** Per-route localized title/description (`PAGE_META`) + 404 meta (`NOT_FOUND_META`) + sitemap priority. Values are **byte-copies of the runtime `useDocumentMeta` strings** in the page components (B6 baseline wording + REVAI suffix from 3B). Header comment binds the two surfaces: if a page's meta changes, this table changes in the same commit. |
| `scripts/prerender.ts` | **New.** Vite plugin (`apply: 'build'`, `closeBundle`): writes `dist/spa-shell.html` (pristine shell), 22 per-route HTML files, `dist/404.html` (noindex), `dist/sitemap.xml`. Fails the build loudly if an expected head pattern is missing (never ships a half-templated head). |
| `vite.config.ts` | Registers `prerenderPlugin()`. Dev server behavior unchanged (`apply: 'build'`). |
| `public/_redirects` | Existing 301s + `/cs` block byte-identical. Added Phase 3D block: `/projekty/*` + 3 brochure paths → `/spa-shell.html 200`; final catch-all changed `/* /index.html 200` → **`/* /404.html 404`** (documented fallback adjustment, see §6). |
| `netlify.toml` | Comment block only — updated to describe the current `_redirects` contents (was stale). |
| `src/i18n/index.ts` | Barrel re-exports for `pageMeta`. |
| `.claude/launch.json` | Added a `vite preview` (dist) launch config used for validation. Tooling-only. |
| `docs/planning/phase-3d-prerender-seo-validation.md` | **New.** This note. |

Not changed: `index.html` (source — incl. title/description/OG/JSON-LD wording), `public/sitemap.xml` (source file retained, see §5), `src/App.tsx`, `src/hooks/useDocumentMeta.ts`, all page components, `src/pages/PricingPage.tsx`, `netlify/functions/*`, `package.json`/lockfile.

One follow-up fix found during browser verification: prerendered hreflang `<link>`s initially lacked the `data-i18n-hreflang` marker, so `useDocumentMeta`'s cleanup didn't remove them on hydration (duplicate set; stale pairs after client-side navigation). Fixed by emitting the marker — the hook now replaces the served set with identical values; verified exactly 1 canonical + 3 hreflang after hydration and after navigation.

## 4. Routes prerendered / covered (22 + 404)

All 11 `ROUTE_MAP` entries × both locales:

| CZ (canonical bare) | EN (additive) |
|---|---|
| `/` | `/en/` |
| `/sluzby/automatizace-procesu` | `/en/services/process-automation` |
| `/sluzby/hlasovi-agenti` | `/en/services/voice-assistants` |
| `/sluzby/ai-app-development` | `/en/services/ai-app-development` |
| `/sluzby/tvorba-modernich-webu` | `/en/services/premium-websites` |
| `/cenik` | `/en/pricing` |
| `/kontakt` | `/en/contact` |
| `/projekty` | `/en/projects` |
| `/reference` | `/en/references` |
| `/blog` | `/en/blog` |
| `/gdpr` | `/en/privacy` |

Plus `dist/404.html` (Czech/x-default head, `noindex`; the SPA renders the locale-correct NotFound UI after hydration). Output form: `dist/<path>/index.html` per route; `/` overwrites `dist/index.html` (the pristine shell survives as `dist/spa-shell.html`).

**Routes deliberately excluded** (served via `spa-shell.html` rewrites, no prerendered head, not in sitemap — same serving behavior as before 3D):

- `/projekty/:id` — dynamic; enumerating project ids is Phase 4/5 content work.
- `/brozura-hotely`, `/brozura-zdravotnictvi`, `/brozura-autoservisy` — standalone brochure pages, never in the sitemap, no locale mapping; head templating would need their meta added to the route map first (defer until/unless they matter for SEO).

## 5. Sitemap behavior

`dist/sitemap.xml` is now **generated at build time** from `ROUTE_MAP` + `PAGE_META` (in `scripts/prerender.ts`): 22 URLs — 11 canonical bare Czech URLs first (all protected URLs present: `/`, all four `/sluzby/*`, `/cenik`, `/kontakt`), then the 11 shipped `/en` URLs. **No `/cs/*` URL is listed** (Option A: `/cs` is never canonical). Priorities carried over from the hand-maintained file (1.0 home / 0.9 services / 0.8 cenik+reference / 0.7 kontakt+projekty+blog / 0.3 gdpr), same value per route pair. `lastmod` deliberately omitted (plan §5.4 — no hand-set values).

**How the old file is replaced:** `public/sitemap.xml` still exists in the repo and is copied to `dist/` by Vite's public-dir copy, then **overwritten** by the generated file in `closeBundle`. The committed file is therefore superseded at every build and never ships. It is *retained* (not deleted) per the classify-don't-delete policy — flagged for the separately-approved deletion pass. `public/robots.txt` already points at `/sitemap.xml`; unchanged.

## 6. Hard 404 behavior (documented `_redirects` adjustment)

Implemented. The final catch-all is now `/* /404.html 404` instead of `/* /index.html 200`. This is safe because the route inventory is closed:

1. Every marketing route is a **real file** in `dist/` — Netlify serves existing files before any non-forced rule, so prerendered pages can't be shadowed.
2. The protected 301s and the `/cs` block sit above everything, **forced (`!`)**, byte-identical to 3A/3C.
3. The only SPA-only routes (`/projekty/:id`, the 3 brochures) get explicit `200` rewrites to `/spa-shell.html` (the pristine shell — no homepage canonical/hreflang pollution on those URLs).
4. Everything else falls through to `404.html` served **with status 404** (noindex head; the SPA inside it renders the NotFound UI at the requested path, both locales). This completes the 3A deferral and is the durable R12 fix.

Known sub-case: an invalid project id (`/projekty/neexistuje`) still returns 200 + client-rendered fallback (the rewrite can't know valid ids) — same as today; would need id enumeration to fix.

## 7. Served HTML validation results (built output + `vite preview` curl)

| Check | Result |
|---|---|
| `dist/` contains per-route HTML files | ✅ 22 files + `404.html` + `spa-shell.html` (`find dist -name "*.html"` inventory in §4) |
| `/` served HTML | ✅ `lang="cs"`; title `Automatizace pomocí AI – Řešení na míru \| REVAI`; description `Česká agentura na AI automatizaci. …` (runtime baseline string); canonical `https://automatizace-ai.cz/`; hreflang `cs=/`, `en=/en/`, `x-default=/` |
| `/en/` served HTML | ✅ `lang="en"`; `AI Automation – Custom Solutions \| REVAI`; English description; **self-canonical `/en/`**; hreflang `cs` → bare `/`, `x-default` → bare `/` |
| `/en/services/process-automation` served HTML | ✅ self-canonical to its own `/en` URL (never Czech); reciprocal hreflang to `/sluzby/automatizace-procesu` |
| `/sluzby/automatizace-procesu`, `/cenik` served HTML | ✅ baseline titles + REVAI suffix; bare-path self-canonicals |
| OG/Twitter | ✅ og:title/og:description/og:url + twitter:title/description set per route (og:url = self-canonical); og:image untouched |
| JSON-LD `Organization` | ✅ carried unchanged from `index.html` into every prerendered head — REVAI + B10 facts exactly as 3B left them (name, email, Znojmo address, two `sameAs` URLs, phone unchanged-unconfirmed) |
| Hydration parity (browser, dist preview) | ✅ post-hydration `document.title`/lang/canonical/description identical to served values; exactly 1 canonical + 3 hreflang after hydration and after client-side navigation; H1 renders „Automatizujeme procesy pomocí AI." |
| `/totally-nonexistent-route` (browser) | ✅ NotFound UI („Stránka nenalezena", 404 title, zero hreflang). HTTP 404 status is Netlify-layer (`_redirects`) — verified by file inspection; **HTTP-level check pending deploy preview** (vite preview doesn't process `_redirects`) |
| Console | only pre-existing `r2.leadsy.ai/tag.js` fetch errors (known R3 item); nothing from new code |

**Documented meta delta (flag for owner review):** the served homepage head now carries the *runtime* baseline strings (title with `| REVAI` suffix; the „Česká agentura na AI automatizaci…" description) instead of the old static-shell strings — i.e., served HTML now equals what `useDocumentMeta` has produced post-hydration since before this phase. Both old and new served descriptions are automation-worded; the title is the §6.1 baseline phrase + REVAI suffix only. The source `index.html` wording was not touched.

## 8. Structured data

- `Organization` JSON-LD: present in served HTML of every prerendered route (inherited from the 3B-corrected template). REVAI/B10 facts confirmed in built output; no topical/keyword wording change.
- `Service`, `FAQPage`, `BreadcrumbList`: **deferred.** Service/Breadcrumb schemas need name/description/breadcrumb-label decisions and the FAQ section is Phase 4 content — adding them now would mean inventing copy (B7/B6 violation). The prerender head-injection point in `scripts/prerender.ts` is the scaffold they will plug into.

## 9. B6 guardrail confirmations

- ✅ Homepage served title = automation baseline phrase + REVAI suffix only (`Automatizace pomocí AI – Řešení na míru | REVAI`).
- ✅ Homepage visible H1 exactly „Automatizujeme procesy pomocí AI." (no component touched; verified rendered in preview).
- ✅ Homepage meta description automation-worded (runtime baseline string; see §7 delta note).
- ✅ `/cenik` content and pricing untouched (`PricingPage.tsx` not in diff; served title `Ceník AI služeb | REVAI`).
- ✅ Protected `/sluzby/*` routes and slugs unchanged; all four prerendered at their bare paths and present in the sitemap.
- ✅ Existing 301s byte-identical in `_redirects` (both `emailova-automatizace` and the 3A `interni-agenti` rule, plus their `/cs` collapses) and untouched in `App.tsx`.
- ✅ Root `/` remains a 200 serving the Czech homepage; `x-default` → bare Czech everywhere; EN pages never canonicalize to Czech.
- ✅ No custom-domain change, no tracking added, no deletions, no `npm audit fix`, no dependency/lockfile change, no deploy.

## 10. Validation command results (2026-06-10)

| Command | Result |
|---|---|
| `npm run typecheck` | ✅ green (0 errors) |
| `npm run lint` | ✅ 0 errors; same 3 pre-existing `react-refresh/only-export-components` warnings (untouched files) |
| `npm run build` | ✅ built in ~1.4 s; `[prerender] wrote 22 route heads (+404.html, spa-shell.html, sitemap.xml)` |

## 11. Deploy-preview checks still required (on `revai-web-v2.netlify.app` — allowed)

The Netlify serving layer cannot be exercised locally; before merging anywhere indexed, curl on a deploy preview:

1. `/sluzby/emailova-automatizace` and `/sluzby/interni-agenti` → HTTP 301 → `/sluzby/automatizace-procesu` (carried from 3A; ordering unchanged).
2. `/cs`, `/cs/sluzby/automatizace-procesu`, `/cs/sluzby/emailova-automatizace` → single-hop 301s (carried from 3C).
3. All 22 prerendered URLs return **200 with the route-correct head** (i.e., files are not shadowed by any rule) — spot-check `/`, `/cenik`, `/en/`, `/en/services/process-automation`, both with and without trailing slash.
4. `/totally-nonexistent-route` returns **HTTP 404** with the 404.html head and renders the NotFound UI.
5. `/projekty/ai-chatbot-pacienti` and the three brochure paths return 200 via `spa-shell.html` and render correctly.
6. `/sitemap.xml` serves the generated 22-URL file (no `/cs`).
7. No sitemap submission to GSC (outward-facing; not approved).

## 12. Rollback

Revert the single 3D commit. The build then emits the plain SPA `dist/` again and `_redirects` returns to the `/* /index.html 200` fallback — byte-identical to post-3C behavior. Prerender is additive at serve time: removing it degrades crawler-visible heads, not user-facing routing. Partial rollback: dropping only the `_redirects` 3D block (restoring the SPA fallback) keeps the prerendered files + sitemap working while removing the hard-404 (prerendered files still shadow a non-forced `/* /index.html 200`).

Maintenance risk to watch: `src/i18n/pageMeta.ts` duplicates the `useDocumentMeta` strings. Drift between them would split served vs. hydrated meta — review both files together whenever page meta changes (a later refactor could make the pages consume `PAGE_META` directly; not done here to keep 3D's blast radius minimal).

## 13. What remains for 3E / 3F / Phase 4

- **3E:** `netlify/functions/demo-request.mts` (email-only, B9), shared form validation, minimal `/demo` wiring, `DEMO_TO_EMAIL` env; E2E gated on Resend domain verification (R17). Note: a `/demo` route, once added, must join `ROUTE_MAP` + `PAGE_META` to be prerendered and sitemapped.
- **3F:** `public/_headers` (CSP report-only first, HSTS, nosniff, referrer-policy).
- **Phase 4:** homepage narrative/copy work (blocked on B6 close for meta/H1 rewrites), FAQ + FAQPage schema, Service/BreadcrumbList content decisions (§8), footer locale-aware links (3C note §10.5), `/sluzby/` hub + `/demo` pages (plan §5.2 "new" routes — not created in 3D since no approved content exists).
- **Cross-cutting:** Opus-tier pre-merge review of the 3C+3D SEO-sensitive change set before merge to anything indexed; deploy-preview curl pass (§11); raw GSC exports commit (B6 closure prerequisite).
