# Phase 3A — Redirects + 404: implementation & validation note

> **Date:** 2026-06-10. Executes step 3A of `phase-3-foundation-implementation-plan.md`.
> Smallest-blast-radius foundation step: one net-new 301 (required by the B6 baseline §6.4) + a real NotFound route (fixes audit R12 soft-404 class).

---

## 1. Files changed

| File | Change |
|---|---|
| `public/_redirects` | Added `/sluzby/interni-agenti   /sluzby/automatizace-procesu   301!` as a new rule **above** the SPA fallback. Existing `emailova-automatizace` 301 untouched. |
| `src/App.tsx` | Added in-app `<Navigate>` route `/sluzby/interni-agenti → /sluzby/automatizace-procesu` (mirrors the existing `emailova-automatizace` pattern); added lazy-loaded `NotFound` import and catch-all `<Route path="*" element={<NotFound />} />` as the **last** route. |
| `src/pages/NotFound.tsx` | **New.** Simple, accessible 404 component: 404 code, H1, explanation, and links to `/`, `/sluzby/automatizace-procesu`, `/kontakt`. Uses existing `ifl-*` token classes, `useDocumentMeta`, and the per-language dictionary pattern (GDPR-page style — no new inline `t('cs','en')` pairs, per B7). |

No other source, config, or dependency files were changed. `package.json` / `package-lock.json` untouched; no installs; no `npm audit fix`.

## 2. Redirects added / verified

`dist/_redirects` after build (verified by inspection):

```
/sluzby/emailova-automatizace   /sluzby/automatizace-procesu   301!   ← existing, unchanged
/sluzby/interni-agenti          /sluzby/automatizace-procesu   301!   ← new (3A)
/*                              /index.html                    200    ← SPA fallback, last
```

**Ordering invariant holds:** both 301s sit above the SPA fallback; the fallback is the last rule. ✅

## 3. Static 404.html — DEFERRED to 3D

Not added. Reason: with the SPA fallback `/* /index.html 200` in `_redirects`, Netlify never falls through to the `404.html` convention — the fallback matches every path with status 200, so a `public/404.html` would ship but never be served. Serving a hard `404` status therefore requires the prerender-aware setup (per-route HTML files + adjusted fallback/404 handling), which is exactly what plan §5.6 assigns to **step 3D**. Until then, unknown paths return HTTP 200 but render the real NotFound UI (no longer an empty soft-404 shell), and the one URL with known equity (`interni-agenti`) is now 301'd before it could hard-404.

**Follow-up for 3D:** prerender `404.html`, configure Netlify to serve it with status 404, and verify `_redirects` rules don't shadow prerendered files.

## 4. Validation command results (2026-06-10)

| Command | Result |
|---|---|
| `npm run typecheck` | ✅ green (no errors) |
| `npm run lint` | ✅ 0 errors; 3 pre-existing `react-refresh/only-export-components` warnings in untouched files (`ui/badge.tsx`, `ui/button.tsx`, `LanguageContext.tsx`) |
| `npm run build` | ✅ built in ~1.4 s; `dist/_redirects` present with correct ordering; `NotFound` emitted as its own lazy chunk (`dist/assets/NotFound-*.js`) |

## 5. Preview / manual checks (local Vite dev server)

> Note: locally, Vite does not process `_redirects`, so redirect checks below exercise the **in-app `<Navigate>` layer**; the Netlify `_redirects` 301 layer was verified by inspecting `dist/_redirects` and will return real HTTP 301s on a Netlify deploy preview.

| Check | Result |
|---|---|
| `/sluzby/interni-agenti` | ✅ lands on `/sluzby/automatizace-procesu` (title „Automatizace procesů pomocí AI \| AMAI", H1 „Interní workflow, které běží samy za vás.") |
| `/sluzby/emailova-automatizace` | ✅ still redirects to `/sluzby/automatizace-procesu` (unchanged) |
| `/` | ✅ homepage renders; title „Automatizace pomocí AI – Řešení na míru \| AMAI"; H1 „Automatizujeme procesy pomocí AI." — byte-identical to B6 §6.1 baseline |
| `/sluzby/automatizace-procesu` | ✅ valid content (see first row) |
| `/cenik` | ✅ renders; title „Ceník AI služeb \| AMAI"; H1 „Ceník jednotlivých služeb" — unchanged |
| `/kontakt` | ✅ renders; title „Kontakt \| AMAI – AI Automatizace"; H1 „Kontaktujte nás" |
| `/totally-nonexistent-route` | ✅ renders the real NotFound UI (404 code, „Stránka nenalezena" H1, links to home / process automation / contact) inside the normal Navbar+Footer layout — no longer an empty soft-404 shell |
| Console | only pre-existing `r2.leadsy.ai/tag.js` fetch errors (known R3 item; tag is unconditionally loaded today); no errors from the new code |

## 6. Guardrail confirmations

- **Homepage title / H1 / meta description / static `index.html` head: NOT changed.** `index.html` and `src/pages/Home.tsx` / `src/components/home/Hero.tsx` are not in the diff; runtime values verified against the B6 §6.1 baseline in preview.
- **Homepage JSON-LD: NOT changed** (`index.html` untouched).
- **`/cenik` content: NOT changed** (`PricingPage.tsx` not in the diff; page verified rendering in preview).
- **Protected `/sluzby/*` URLs: unchanged**; no re-slug, no route removal.
- **Existing `emailova-automatizace` 301: unchanged in both layers** (`_redirects` rule byte-identical; `App.tsx` route untouched), verified working.
- The catch-all `path="*"` route is last in the route list and cannot shadow any defined (protected) route.
- New page title uses the REVAI suffix (net-new surface, B10 brand name; not a protected baseline string).

## 7. Remaining follow-ups

1. **3D:** hard-404 serving (prerendered `404.html` + Netlify status 404) — see §3.
2. **Deploy preview:** curl-verify the real HTTP 301s for both redirect rules on `revai-web-v2.netlify.app` once this lands on a deploy preview (allowed; production/indexed domain untouched).
3. NotFound copy migrates into the 3C dictionaries when `src/i18n/` lands.

## 8. Rollback

Revert the single commit. The redirect is additive; reverting restores the prior (defective but known) soft-404 state. No data risk.
