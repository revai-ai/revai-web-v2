# Phase 3C — i18n scaffold: implementation & validation note

> **Date:** 2026-06-10. Executes step 3C of `phase-3-foundation-implementation-plan.md` under the approved **Option A** root strategy (§4.1): Czech stays canonical at bare paths, `/en` is additive with English slugs, `/cs/*` 301s to bare paths and never becomes a canonical public URL.
> Routing/i18n scaffold only — no prerender (3D), no dependency changes, no copy migration.

---

## 1. Files changed

| File | Change |
|---|---|
| `src/i18n/locales.ts` | **New.** `Locale` type, `LOCALES`, `DEFAULT_LOCALE` (`cs`), `LANG_STORAGE_KEY`, `isLocale` guard. |
| `src/i18n/routes.ts` | **New.** `ROUTE_MAP` (explicit CZ↔EN slug table, 11 entries), `normalizePath`, `localeFromPathname`, `findRoute`, `pathForLocale`, `switcherTarget` (with locale-home fallback), `localizedHref` (keeps internal links inside the current locale tree), `csRedirectTarget` (strips `/cs`, resolves legacy slugs so no chain forms). |
| `src/i18n/meta.ts` | **New.** `SITE_URL` (moved here from the hook, value unchanged), `absoluteUrl`, `hreflangAlternatesFor` (cs ↔ en pair + `x-default` → bare Czech URL, per plan §4.2), `canonicalPathFor` (self-canonical per locale, never cross-locale). Pure functions — 3D prerender consumes the same data. |
| `src/i18n/LocaleSync.tsx` | **New.** Router-mounted component: URL → `LanguageContext` sync (URL is the locale source of truth, B2), client-side `<html lang>` per route, localStorage first-visit hint (root only, see §6). |
| `src/i18n/index.ts` | **New.** Barrel re-exports for the layer. |
| `src/App.tsx` | Mounts the `/en/*` tree from `ROUTE_MAP` (same lazy page components; copy localizes via the existing language system); adds `/cs` + `/cs/*` in-app redirect routes (`CsRedirect`); mounts `LocaleSync`. All existing bare-path routes, the two protected `<Navigate>` 301 mirrors, and the 3A catch-all are byte-identical/unmoved; `/cs` routes sit above the catch-all and cannot shadow any defined route. |
| `src/components/Navbar.tsx` | CZ/EN buttons now call `switchLocale` → navigate via the slug table (and persist the hint); all internal nav links (`logo`, services, projects, pricing, blog, contact) go through `localizedHref` so EN visitors stay in the `/en` tree. Visual toggle unchanged; CTA hierarchy unchanged. |
| `src/hooks/useDocumentMeta.ts` | Locale-aware: canonical/`og:url` resolve via `canonicalPathFor` (EN routes self-canonicalize to their `/en` path); emits client-side `hreflang` `<link>` set for mapped routes (tagged `data-i18n-hreflang`, cleared on every route change so unmapped pages carry none). Titles/descriptions pass through untouched. |
| `public/_redirects` | Added `/cs` block **above** the SPA fallback: two legacy-slug collapses, `/cs → /`, `/cs/* → /:splat`, all `301!`. Existing `emailova-automatizace` and `interni-agenti` 301s byte-identical; SPA fallback still last. |
| `docs/planning/phase-3c-i18n-scaffold-validation.md` | **New.** This note. |

Not changed: `index.html` (incl. head/JSON-LD), `src/pages/Home.tsx`, `src/components/home/Hero.tsx`, `src/pages/PricingPage.tsx`, `src/contexts/LanguageContext.tsx`, `public/sitemap.xml`, `package.json`/`package-lock.json`, `netlify/`, any `/sluzby/*` slug or page.

## 2. Route mapping implemented (`src/i18n/routes.ts` `ROUTE_MAP`)

| key | CZ canonical (bare) | EN additive |
|---|---|---|
| home | `/` | `/en/` |
| processAutomation | `/sluzby/automatizace-procesu` | `/en/services/process-automation` |
| voiceAgents | `/sluzby/hlasovi-agenti` | `/en/services/voice-assistants` |
| aiAppDevelopment | `/sluzby/ai-app-development` | `/en/services/ai-app-development` |
| modernWeb | `/sluzby/tvorba-modernich-webu` | `/en/services/premium-websites` |
| pricing | `/cenik` | `/en/pricing` |
| contact | `/kontakt` | `/en/contact` |
| projects | `/projekty` | `/en/projects` |
| references | `/reference` | `/en/references` |
| blog | `/blog` | `/en/blog` |
| gdpr | `/gdpr` | `/en/privacy` |

EN routes render the **same page components** as their CZ counterparts; all copy comes from the existing `t(cs, en)` language system (no new final copy invented, B7 respected — no new inline pairs added). Unmapped routes (`/projekty/:id`, brochures) deliberately have no EN counterpart; the switcher falls back to the locale home.

## 3. /cs redirect behavior

Two layers, no chains:

- **Netlify (`_redirects`,** effective on deploys/previews**):** `/cs/sluzby/emailova-automatizace` and `/cs/sluzby/interni-agenti` map straight to `/sluzby/automatizace-procesu` (listed before the splat so the would-be two-hop chain collapses to one); then `/cs → /` and `/cs/* → /:splat`, all `301!`, all above the SPA fallback.
- **In-app (`CsRedirect`):** `/cs` and `/cs/*` routes strip the prefix and resolve the same legacy map, `<Navigate replace>` to the bare path in a single client-side hop.

`/cs/...` therefore never serves indexable duplicate content; the bare Czech path is the only canonical CZ URL (Option A).

## 4. /en routes implemented

All 11 mapped EN paths (table above) mount in `App.tsx` from `ROUTE_MAP`. `/en` and `/en/` both match (paths normalized). Locale is driven by the URL: `LocaleSync` flips the language context to `en` for any `/en...` path, so direct loads and client navigations both render English copy.

## 5. Language switcher behavior (verified in preview)

- On `/` → EN button → `/en/` (English homepage, existing EN copy). ✅
- On `/en/services/process-automation` → CZ button → `/sluzby/automatizace-procesu`. ✅
- On unmapped `/projekty/ai-chatbot-pacienti` → EN button → fallback `/en/`. ✅
- Choice persisted to `localStorage` (`revai-lang`); visual toggle (pill buttons, active state) unchanged; CTA hierarchy untouched.
- Nav links while on EN pages point inside the `/en` tree (verified: all 9 internal nav hrefs were `/en/...` on the EN homepage).

## 6. html lang behavior

- `LocaleSync` sets `document.documentElement.lang` to `cs`/`en` on every route change (verified both directions in preview).
- **Client-side only** — static `index.html` still ships `lang="cs"` (deliberately untouched; B6 head freeze). **3D must emit the correct `lang` per route in served/prerendered HTML.**
- localStorage first-visit hint: stored `en` preference redirects exactly `/` → `/en/` client-side once per page load (verified). Crawlers/first-time visitors unaffected — `/` keeps serving the Czech homepage with status 200; no server-side redirect exists.

## 7. Canonical / hreflang helper status

- `canonicalPathFor` + `hreflangAlternatesFor` are pure functions over `ROUTE_MAP` — consumed now by `useDocumentMeta` (client-side), designed to be consumed by 3D prerender for served HTML.
- Verified in preview: `/` → canonical `https://automatizace-ai.cz/`, hreflang `cs=/`, `en=/en/`, `x-default=/`; `/en/services/process-automation` → self-canonical to its own `/en` URL with reciprocal pair back to the bare CZ path; no cross-locale canonicalization anywhere; NotFound page carries zero hreflang links (stale links are cleared).
- `og:url` follows the locale-correct canonical. Protected titles/descriptions were not reworded (the hook only resolves URLs).

## 8. Validation command results (2026-06-10)

| Command | Result |
|---|---|
| `npm run typecheck` | ✅ green (0 errors) |
| `npm run lint` | ✅ 0 errors; same 3 pre-existing `react-refresh/only-export-components` warnings (`ui/badge.tsx`, `ui/button.tsx`, `LanguageContext.tsx`) — untouched files |
| `npm run build` | ✅ built in ~1.3 s; `dist/_redirects` inspected — ordering correct, SPA fallback last |

Preview checks (local Vite dev server — in-app layer; Netlify `_redirects` 301s verified by `dist/_redirects` inspection and need a deploy-preview curl pass):

| Check | Result |
|---|---|
| `/` | ✅ 200, Czech homepage; title „Automatizace pomocí AI – Řešení na míru \| REVAI", H1 „Automatizujeme procesy pomocí AI.", meta description — byte-identical to B6 §6.1 baseline; `lang="cs"` |
| `/en/` | ✅ English homepage via existing EN copy ("AI Automation – Custom Solutions \| REVAI" / "We automate processes with AI."); `lang="en"`; self-canonical `/en/` |
| `/sluzby/automatizace-procesu` | ✅ 200, unchanged title/H1 |
| `/en/services/process-automation` | ✅ renders English counterpart ("AI Process Automation \| REVAI"); correct canonical + hreflang |
| `/cs` | ✅ redirects to `/` |
| `/cs/sluzby/automatizace-procesu` | ✅ redirects to `/sluzby/automatizace-procesu` |
| `/cs/sluzby/emailova-automatizace` | ✅ collapses straight to `/sluzby/automatizace-procesu` (single hop) |
| `/sluzby/emailova-automatizace` | ✅ still redirects to `/sluzby/automatizace-procesu` (unchanged) |
| `/sluzby/interni-agenti` | ✅ still redirects to `/sluzby/automatizace-procesu` (unchanged) |
| `/cenik` | ✅ content unchanged (title „Ceník AI služeb \| REVAI", H1 „Ceník jednotlivých služeb"; `PricingPage.tsx` not in diff) |
| `/totally-nonexistent-route` | ✅ renders NotFound UI („Stránka nenalezena") |
| Redirect chains | ✅ none >1 hop in either layer (legacy `/cs` slugs pre-collapsed) |
| Console | only pre-existing `r2.leadsy.ai/tag.js` fetch errors (known R3 item); nothing from new code |

## 9. Guardrail confirmations

- ✅ Homepage title / H1 / meta description / static `index.html` head: **not changed** (files not in diff; runtime values verified against B6 §6.1, REVAI suffix from 3B preserved).
- ✅ Root `/` resolves 200 with the Czech homepage; **no mass 301 from `/` to `/cs`**; `/cs` paths are redirects, never canonical/indexable.
- ✅ Protected `/sluzby/*` slugs unchanged; no re-slug, no route removal; both protected 301s (`emailova-automatizace`, `interni-agenti`) byte-identical in both layers.
- ✅ `_redirects` SPA fallback still last; new rules above it.
- ✅ `/cenik` content untouched.
- ✅ No `package.json`/lockfile change, no installs, no `npm audit fix`, no tracking, no deploy, no custom-domain change, no deletions.
- ✅ No new inline `t('cs','en')` pairs introduced (B7); no new final copy invented.

## 10. Known limitations deferred to 3D (and later)

1. **Served HTML is still the SPA shell**: canonical, hreflang, `<html lang>`, localized titles/meta exist only after hydration. 3D prerender must emit all of these per route in served HTML (the `src/i18n/meta.ts` helpers are the intended source).
2. **Static `index.html`** keeps `lang="cs"` and the homepage head for every route until 3D.
3. **Sitemap** is still the hand-maintained CZ-only file; the 3D build-time sitemap should add shipped `/en` URLs from `ROUTE_MAP` (bare-path CZ form for protected URLs).
4. **Hard 404 status** still pending 3D (3A note §3).
5. **Footer (and in-page) internal links** are not yet locale-aware — from an EN page they lead to bare CZ paths (which flips the locale back, correctly but jarringly). Migrate alongside the 3D/Phase 4 copy work; Navbar is locale-aware now.
6. **`/en` Netlify-layer serving** relies on the SPA fallback until 3D prerenders EN pages.
7. Deploy-preview curl verification of the real HTTP 301s for the `/cs` block is pending (allowed on `revai-web-v2.netlify.app`).

## 11. Rollback

Revert the single 3C commit. Bare-path CZ routes were never moved (Option A), so rollback risk to indexed URLs is nil. If only EN misbehaves, the `/en` mount in `App.tsx` (the `ROUTE_MAP.map` block) and the `/cs` rules can be reverted independently; the i18n module is additive and unused once its call sites revert. The localStorage hint key (`revai-lang`) is harmless if orphaned.
