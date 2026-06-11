# Phase 3F — Headers / security config: implementation & validation note

> **Date:** 2026-06-11. Executes step 3F of `phase-3-foundation-implementation-plan.md` (§7) and the 3F entry of §8.
> One coherent layer: a new `public/_headers` adding conservative security + cache headers, with CSP in **Report-Only** mode. No 3A–3E logic touched, no Phase 4 work, no dependency/tracking changes, no deploy.

---

## 1. Files changed

| File | Change |
|---|---|
| `public/_headers` | **New.** Site-wide security headers + CSP-Report-Only + per-path Cache-Control. Copied to `dist/_headers` at build time by Netlify's public-dir copy (same mechanism as `_redirects`), verified byte-identical. |
| `docs/planning/phase-3f-headers-security-validation.md` | **New.** This note. |

**Not changed:** `index.html`, `src/**`, `netlify/functions/**` (incl. `demo-request.mts`), `public/_redirects`, `scripts/prerender.ts`, `netlify.toml`, `public/sitemap.xml`/generated sitemap, `package.json`, `package-lock.json`. Verified via `git status --short` → only `public/_headers` (untracked) + this doc.

No header required a Netlify config adjustment — `_headers` is a passthrough static file, so `netlify.toml` and `_redirects` were left untouched.

## 2. Exact headers added

Applied to `/*` (site-wide; Netlify merges matching rules, most-specific path wins per header):

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=31536000; includeSubDomains
Permissions-Policy: camera=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), microphone=(self), autoplay=(self), fullscreen=(self)
Content-Security-Policy-Report-Only: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; script-src 'self' 'unsafe-inline' https://r2.leadsy.ai https://unpkg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.vapi.ai https://*.vapi.ai wss://*.vapi.ai https://*.daily.co wss://*.daily.co https://r2.leadsy.ai https://*.leadsy.ai; media-src 'self' blob: https://*.daily.co; worker-src 'self' blob:; frame-src 'self' https://friendly-sunshine-69ae5e.netlify.app https://elaborate-blini-c35314.netlify.app https://rainbow-sherbet-664224.netlify.app
Cache-Control: public, max-age=0, must-revalidate   (HTML default; overridden per path below)
```

Header rationale:

- **X-Content-Type-Options: nosniff** — block MIME sniffing. No downside.
- **Referrer-Policy: strict-origin-when-cross-origin** — plan §7 value; modern browser default-equivalent, leaks only origin cross-site.
- **X-Frame-Options: SAMEORIGIN** + **CSP `frame-ancestors 'self'`** — anti-clickjacking. Safe because no REVAI page is meant to be embedded by third parties. (The brochure pages embed *external* iframes — that is `frame-src`, the opposite direction, and is unaffected.)
- **Strict-Transport-Security: `max-age=31536000; includeSubDomains`, NO `preload`** — plan §7. The site is currently served on `revai-web-v2.netlify.app`, which is already on the platform HSTS preload list, so this is low-risk. `preload` and the `includeSubDomains` implications for the apex `automatizace-ai.cz` are deliberately deferred to the **custom-domain cutover** (its own staging sign-off — plan §1.2). Re-review this header at cutover before pointing the apex domain.
- **Permissions-Policy** — deny features the site does not use (`camera, geolocation, payment, usb, magnetometer, gyroscope, accelerometer`). **Kept at `self`** the three features that ARE used: `microphone` (Vapi voice agent), `autoplay` (Vapi assistant audio), `fullscreen` (brochure `<iframe allowFullScreen>`). `microphone=(self)` equals the browser's default allowlist, so Vapi behavior is unchanged from today — but this header IS enforced (unlike the CSP), so the deploy-preview Vapi voice check below is required.

### Cache policy summary

| Path pattern | Cache-Control | Why |
|---|---|---|
| `/*` (HTML / clean-URL routes incl. `/`, `/cenik`, `/demo`, …) | `public, max-age=0, must-revalidate` | HTML must always revalidate so prerendered head changes/new deploys are picked up immediately (no-cache style). |
| `/assets/*` | `public, max-age=31536000, immutable` | Vite content-hashed bundles — filename changes when content changes, so a 1-year immutable cache is safe. |
| `/sitemap.xml`, `/robots.txt` | `public, max-age=3600` | Crawl-control files; short cache so an updated (build-generated) sitemap propagates quickly. |
| `/site.webmanifest` | `public, max-age=86400` | PWA manifest; conservative 1-day. |
| `/*.webp` `/*.png` `/*.svg` `/*.jpg` `/*.ico` | `public, max-age=86400` | Unhashed public images (logos, og-image, favicons, photos) — replaceable in place, so a conservative 1-day cap avoids long staleness. |

Security headers from `/*` still apply to every path (Netlify merges rules); only `Cache-Control` is overridden by the more-specific path blocks.

## 3. Why CSP is Report-Only

Shipped as **`Content-Security-Policy-Report-Only`**, not enforcing, per plan §7 ("report-only first is the rollback-free path"):

- A Report-Only policy **never blocks** a request — it only emits a console violation report. So it cannot break the SPA, prerendered heads, the Vapi widget, the Leadsy tag, the brochure iframes, or the demo form, regardless of any source I under-allowed.
- The third-party runtime surface (especially the Vapi voice stack, which pulls in Daily.co WebRTC endpoints at runtime) cannot be fully enumerated from static source alone. Report-Only lets a deploy-preview soak surface the real set in the console before any enforcing flip.
- Promotion to enforcing `Content-Security-Policy` is a **separate, later commit** after a clean report-only soak across all routes incl. the story section and the Vapi button (plan §8 3F).

**No `report-uri`/`report-to` endpoint was added** (none exists; plan §7 / task guidance) — violations are visible in the browser console only.

`'unsafe-inline'` is present in `script-src` and `style-src` deliberately: React inline `style={}` attributes and the Leadsy/Vite inline injections need it, and keeping it means the eventual enforce flip is non-breaking. Tightening to nonces/hashes is a later hardening step, not part of 3F.

## 4. Known allowed external sources (inventoried from current code, 2026-06-11)

`grep`-verified against `src/`, `index.html`, `public/`, `netlify/`:

| Source | Where it comes from | CSP directive |
|---|---|---|
| `https://r2.leadsy.ai` (+ `https://*.leadsy.ai`) | Instantly/Leadsy tracking tag `tag.js` in `index.html:79` (known R3 consent item — left as-is) | `script-src`, `connect-src` |
| `https://unpkg.com` | Vapi embed widget UMD script in `index.html:88` | `script-src` |
| `https://api.vapi.ai`, `https://*.vapi.ai`, `wss://*.vapi.ai` | `@vapi-ai/web` SDK runtime (`src/components/VapiCallButton.tsx`) | `connect-src` |
| `https://*.daily.co`, `wss://*.daily.co` | Daily.co WebRTC transport used by the Vapi voice stack at runtime | `connect-src`, `media-src` |
| `https://friendly-sunshine-69ae5e.netlify.app`, `https://elaborate-blini-c35314.netlify.app`, `https://rainbow-sherbet-664224.netlify.app` | Brochure `<iframe>` embeds (`src/pages/brochures/*`) | `frame-src` |
| `data:` images, `https:` images | favicons/og-image/logos + any tracker pixels | `img-src` |

Documented wildcard/breadth decisions (per task "no broad wildcards unless needed and documented"):

- `img-src 'self' data: https:` — `https:` breadth is intentional: tracker/analytics pixels can originate from arbitrary hosts and image loads are low-risk. Documented rather than enumerated.
- `*.vapi.ai` / `*.daily.co` — the Vapi voice stack uses rotating/sharded subdomains; a wildcard is the realistic allowlist for a working voice agent.
- **Not in CSP (intentionally):**
  - `https://api.resend.com` — called **server-side only** from `netlify/functions/demo-request.mts`; never a browser request, so not a CSP source.
  - `https://calendar.google.com` — used only as an `<a href>` booking link (`src/config/site.ts`), i.e. a top-level navigation, which CSP fetch directives do not govern. Not framed, not fetched.
  - `https://www.linkedin.com`, `https://www.instagram.com` — `<a href>` social links + JSON-LD `sameAs` strings; navigation only.

## 5. Validation command results (2026-06-11)

| Command | Result |
|---|---|
| `npm run typecheck` | ✅ green (0 errors) |
| `npm run lint` | ✅ 0 errors; same 3 pre-existing `react-refresh/only-export-components` warnings (`ui/badge.tsx`, `ui/button.tsx`, `LanguageContext.tsx` — untouched files) |
| `npm run build` | ✅ built in ~1.4 s; `[prerender] wrote 24 route heads (+404.html, spa-shell.html, sitemap.xml, 22 canonical rewrites)` |

Built-output inspection:

- ✅ `dist/_headers` exists and is **byte-identical** to `public/_headers` (`diff` empty) — the headers file is a passthrough, unaffected by the prerender plugin.
- ✅ `dist/_redirects` unchanged from 3E output: legacy forced 301s (`emailova-automatizace`, `interni-agenti`) byte-identical; `/cs` forced 301 block byte-identical; **22 canonical `200!` route rewrites** present and unchanged; SPA-only rewrites (`/projekty/*` + 3 brochures) unchanged; final `/* /404.html 404` still **last**.
- ✅ `dist/sitemap.xml` — **24 `<loc>`** entries; `grep -c "/cs" = 0` (no `/cs` URL); all protected URLs present.
- ✅ No `package.json` / `package-lock.json` change (`git status --short` shows only `public/_headers` + this doc).

## 6. Redirect / sitemap guardrail confirmation

- **Legacy forced 301s** (`/sluzby/emailova-automatizace`, `/sluzby/interni-agenti` → `/sluzby/automatizace-procesu`): unchanged.
- **`/cs` forced 301s** (`/cs`, `/cs/*`, and the two legacy-slug collapses): unchanged.
- **Canonical route forced `200!` rewrites** (22, one per prerendered route × locale, excl. `/` and `/en/`): unchanged.
- **SPA-only rewrites** (`/projekty/*`, `/brozura-*` → `/spa-shell.html 200`): unchanged.
- **Hard 404 fallback** (`/* /404.html 404`): still the **last** rule.
- **Sitemap**: 24 URLs, no `/cs`, all protected URLs present — unchanged from 3E.

`_headers` and `_redirects` are independent Netlify files; adding `_headers` does not touch redirect ordering or sitemap generation.

## 7. Deploy-preview curl checks required (on `revai-web-v2.netlify.app` — allowed; not run locally)

`vite preview` does not process Netlify `_headers`, so the header layer can only be exercised on a deploy preview:

1. `curl -I https://<preview>/` → **200**; shows `x-content-type-options: nosniff`, `referrer-policy`, `x-frame-options: SAMEORIGIN`, `strict-transport-security`, `permissions-policy`, `content-security-policy-report-only`, and `cache-control: public, max-age=0, must-revalidate`.
2. `curl -I https://<preview>/demo` → **200** (not 301) with the same security headers (canonical `200!` rewrite + headers both apply).
3. `curl -I https://<preview>/en/demo` → **200** with the same headers.
4. `curl -I https://<preview>/totally-nonexistent-route` → **404** (hard 404 unaffected by headers); security headers still present on the 404 response.
5. `curl -I https://<preview>/.netlify/functions/demo-request` → **405** for GET, and the function still responds normally — confirm `_headers` did not alter function behavior (it governs static responses only).
6. `curl -I https://<preview>/assets/<some-hashed-file>.js` → `cache-control: public, max-age=31536000, immutable`.
7. `curl -I https://<preview>/sitemap.xml` → `cache-control: public, max-age=3600`; still serves the 24-URL file.
8. **Demo dry-run POST** (with `DEMO_DRY_RUN=true`) using the authoritative payload from `phase-3e-demo-request-validation.md` §6 → **200** `{"success":true}` + function log line, no email — confirms headers did not break the demo function path or Resend seam.
9. **Browser console soak** — load `/`, `/cenik`, `/kontakt`, the homepage story section, and trigger the Vapi call button + a brochure page; read the console for `Content-Security-Policy-Report-Only` violation reports. **Report-only messages are NOT automatically failures** — they are the inventory to reconcile before any enforce flip. Specifically confirm the **Vapi voice call still connects** (Permissions-Policy `microphone=(self)` is enforced) and the **Leadsy tag still loads** (known R3 consent item — expected to remain until Phase 6).

## 8. Known limitations deferred to Phase 6 (consent / analytics)

- **Leadsy/Instantly tag** (`r2.leadsy.ai/tag.js`) is allowed in the CSP and continues to load with no consent gating — this is the known **R3** item. Gating/removing it behind a consent layer is a **Phase 6** decision, explicitly **not** resolved here (plan §7).
- **CSP enforce flip** — promoting `Content-Security-Policy-Report-Only` → `Content-Security-Policy` (and tightening `'unsafe-inline'` toward nonces/hashes) waits for a clean deploy-preview report-only soak; separate commit.
- **HSTS `preload` + apex `includeSubDomains` review** — deferred to the custom-domain cutover sign-off.
- **No analytics/consent management** added (no tracking added — plan guardrail).

## 9. Rollback

Delete/revert `public/_headers` (or, for the CSP alone, it is already Report-Only and can simply be dropped). Takes effect on the next deploy; there is **no code coupling** — the SPA, prerendered routes, redirects, functions, and sitemap are all independent of this file. Partial rollback: remove only the CSP-Report-Only line to drop CSP while keeping the security/cache headers, or remove a single Cache-Control block to revert that path's caching.

---

## 10. 3F status (local)

**GREEN locally.** Typecheck/lint/build all pass; `dist/_headers` present and correct; redirect ordering, sitemap (24 URLs, no `/cs`), and `package.json`/lockfile all confirmed unchanged. The only remaining work is the **deploy-preview curl + console soak (§7)**, which cannot run locally because `vite preview` does not process `_headers`.

## 11. What remains / can Phase 4A begin

- **Remaining for 3F:** the §7 deploy-preview checks on `revai-web-v2.netlify.app` (header presence on `/`, `/demo`, `/en/demo`; hard 404 intact; function 405/200; cache values; CSP report-only console soak incl. Vapi voice + Leadsy). None require code changes; if the soak surfaces a genuinely required source, add it to the CSP and re-soak before any enforce flip.
- **Phase 4A (Storytelling Variant Lab):** may begin **after deploy-preview acceptance** of 3F (and the standing 3C/3D Opus-tier pre-merge review + deploy-preview pass for anything merged to an indexed environment). 3F is additive and non-blocking for Phase 4 content work; the headers layer does not touch storytelling, homepage design, or copy. Phase 4 homepage **meta/H1/title** rewrites remain independently blocked by B6.
