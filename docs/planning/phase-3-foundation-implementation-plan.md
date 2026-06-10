# Phase 3 — Foundation Implementation Plan (REVAI redesign)

> **Status:** planning / implementation-prep only. **No code is changed by this document.**
> **Date:** 2026-06-10.
> **Inputs:** `phase-1-owner-signoff-template.md`, `phase-1-decision-records.md`, `phase-1-b6-seo-baseline.md`, `01-decision-brief.md`, `02-information-architecture.md`, `03-conversion-architecture.md`, `05-technical-architecture-proposal.md`, `06-implementation-roadmap.md`, `docs/audit/03-risk-register.md`, `docs/audit/04-implementation-constraints.md`.
> **Gate state at time of writing:** B1 closed (repo `github.com/revai-ai/revai-web-v2`, site `revai-web-v2.netlify.app`). B2 approved (subpaths, English slugs under `/en`). B3 approved (prerender, no framework migration). B5 approved (demo primary, consultation secondary). B10 answered (brand facts below). **B6 substantially baselined but NOT fully closed** — homepage title/H1/meta rewrite remains blocked. **Custom domain cutover remains blocked** (separate staging sign-off). Deploy previews on `revai-web-v2.netlify.app` are allowed.

This plan turns the Phase 3 goals from `06-implementation-roadmap.md` into small, separately executable steps (3A–3F) ready to run in later prompts.

---

## 1. Scope split

### 1.1 Safe to implement now (under the SEO guardrails in §2)

| Item | Why it's safe | Step |
|---|---|---|
| Net-new 301: `/sluzby/interni-agenti → /sluzby/automatizace-procesu` | Required by the B6 baseline itself (§6.4 — currently a soft 404 with 2 clicks / 171 impressions of equity). Fixes a defect; adds, never removes. | 3A |
| Real 404 / NotFound route | Fixes audit R12 (soft-404 class). No protected URL affected. | 3A |
| AMAI→REVAI **brand-token** sweep (B10 facts in hand) | Explicitly cleared by the B6 baseline §8: "brand tokens only, automation keywords untouched." | 3B |
| i18n scaffold: `/cs` + `/en` routing, dictionaries, hreflang plumbing | B2 approved. Safe **provided** currently indexed bare URLs keep resolving (see §4 root strategy). | 3C |
| Prerender wiring, per-route localized meta, build-time sitemap, structured data | B3 approved. Safe provided prerendered output of protected pages reproduces baseline wording (brand suffix change excepted). | 3D |
| `demo-request.mts` (email-only) + shared form validation primitives | B5 approved; B9 default = email-only. New function; `contact.mts` untouched. | 3E |
| `_headers` (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) | New file; no SEO surface. CSP needs careful allowlisting (see §7). | 3F |
| End-to-end form testing on `revai-web-v2.netlify.app` deploy previews | B1 closed; env vars confirmed configured; production untouched. Gated on Resend domain verification (§6). | 3E |

### 1.2 Must wait for separate approval

| Item | Approval needed |
|---|---|
| Dependency changes of any kind (prerender plugin install, motion/icon consolidation, router advisory fixes, lockfile changes) | The recorded "approved later dependency pass" must be explicitly invoked per-change; nothing in 3A–3F may install or modify `package.json`/lockfiles without it. If the chosen prerender approach needs a new dev dependency, **3D pauses at that point and requests approval.** |
| Deleting anything (orphaned Supabase migrations, `amai-logo.png`, second motion lib, unused `ui/*`) | Classify-don't-delete policy (`04-implementation-constraints.md`). Deletion is its own approval. |
| Supabase / lead storage | B9 default is email-only; storage only if later approved. |
| Pre-merge review of the i18n/redirect/hreflang change set | Opus-tier pre-merge architecture review per D15 / roadmap Phase 3 gate, before merge to any indexed environment. |
| Custom domain cutover | Separate staging sign-off (B1 note). **Not part of Phase 3.** |
| Homepage **narrative** swap (Phase 4 work) | B4/B6; out of Phase 3 scope entirely. |

### 1.3 Forbidden until B6 fully closes

Per `phase-1-b6-seo-baseline.md` §7 — none of these are approved by any Phase 3 step:

1. Rewriting the homepage `<title>`, H1, meta description, or static `index.html` head **wording** away from automation terms (brand suffix swap AMAI→REVAI is the sole permitted delta).
2. Changing homepage JSON-LD `Organization` wording beyond the brand-name/facts fix.
3. Any re-slug of protected URLs or removal/reorder of existing 301s.
4. Any change that stops root `/` resolving with the baseline content (both known backlinks point at root).

B6 closes only when: raw GSC exports are committed (`docs/planning/gsc-exports/`), the homepage query-level click split exists, and a phased homepage meta-change plan is separately approved and Search-Console-monitored.

---

## 2. SEO guardrails (binding on every step 3A–3F)

1. **Homepage wording freeze.** Do not change the homepage title, H1 („Automatizujeme procesy pomocí AI."), meta description, or static `index.html` head wording away from automation terms. The only permitted change to these strings is the brand token (AMAI→REVAI / suffix), verified character-by-character against the §6.1 baseline in `phase-1-b6-seo-baseline.md`.
2. **Root `/` is the SEO asset** (~82% of clicks, 100% of known backlinks). It must keep returning 200 with the baseline homepage content throughout Phase 3. No locale change may turn `/` into a redirect (see §4 recommendation).
3. **Preserve all `/sluzby/*` URLs** exactly: `automatizace-procesu`, `hlasovi-agenti`, `ai-app-development`, `tvorba-modernich-webu`. No re-slug, no removal, indexable content preserved.
4. **Preserve `/cenik` content** — frozen (D11) and carrying price-intent equity (16 clicks, pos. ~6.21). Title brand-suffix swap only; content/numbers untouched.
5. **Preserve the existing 301** `/sluzby/emailova-automatizace → /sluzby/automatizace-procesu` in **both** layers (`public/_redirects` rule and the `<Navigate>` route in `App.tsx`), unchanged, with the `_redirects` rule staying above the SPA fallback.
6. **Add the one required net-new 301:** `/sluzby/interni-agenti → /sluzby/automatizace-procesu` (301!, above the SPA fallback; plus an in-app `<Navigate>` mirroring the existing pattern).
7. **Locale routing must not orphan indexed URLs.** Every currently indexed bare URL (`/`, `/sluzby/*`, `/cenik`, `/kontakt`, plus existing redirects) must keep resolving cleanly — 200 at the bare path under the recommended root strategy (§4), never a 404/soft-404, and never a redirect chain longer than one hop.
8. **`_redirects` ordering invariant:** SPA fallback `/* /index.html 200` stays **last** in every edit; with prerender, verify rewrites don't shadow prerendered HTML files.
9. **Sitemap must include all protected URLs** in their canonical (root-served) form; no protected URL may drop out of the sitemap in any Phase 3 build.

---

## 3. Brand migration plan (AMAI → REVAI) — step 3B

**Principle (from B6 baseline §6 summary): brand-token swap ≠ keyword rewrite.** 3B replaces the brand token and broken brand facts only. Automation keyword wording in titles/H1s/descriptions is not touched in the same step — any diff hunk that changes more than the brand token on a protected meta surface is a review failure.

### 3.1 Approved B10 facts (the only values that may be used)

| Fact | Value |
|---|---|
| Support/contact email | `info@automatizace-ai.cz` |
| Instagram | `https://www.instagram.com/revai_ai/` |
| LinkedIn | `https://www.linkedin.com/company/110111764/` |
| Postal address | nám. Svobody 210/18, 669 02 Znojmo 2, Česko |
| IČO | 05013500 (legal entity per IČO — unchanged) |
| Resend sending domain | `automatizace-ai.cz` *(verification pending — see §6)* |

### 3.2 Exact surfaces to update (inventoried from code, 2026-06-10)

| Surface | File(s) | Change |
|---|---|---|
| Static head: `apple-mobile-web-app-title` | `index.html:13` (`content="AMAI"`) | → REVAI |
| Static head: OG/Twitter brand mentions | `index.html` OG/Twitter tags | Brand token only; **title/description automation wording stays** |
| JSON-LD `Organization` | `index.html` (`name`, `sameAs:` `linkedin.com/company/amai-ai`, `instagram.com/amai.ai`; address; email) | `name` → REVAI; `sameAs` → the two B10 URLs; address → Znojmo (B10); email → `info@automatizace-ai.cz` |
| Web manifest | `public/site.webmanifest` (`"name": "AMAI"`, `"short_name": "AMAI"`) | → REVAI |
| Footer | `src/components/Footer.tsx` (broken `mailto:info@amai.cz`, placeholder/AMAI socials, Praha/Prague address conflict, stray `id="blog"`) | mailto → `info@automatizace-ai.cz`; socials → B10 URLs; address → Znojmo; remove stray id |
| Hero eyebrow | `src/components/home/Hero.tsx` („AI Automatizace · AMAI") | Brand token → REVAI; **„AI Automatizace" wording stays** |
| Runtime page titles (brand suffix `| AMAI`) | `src/pages/Home.tsx`, `Contact.tsx`, `PricingPage.tsx`, `References.tsx`, `Projects.tsx`, `Blog.tsx`, `GDPR.tsx`, `src/pages/services/{InternalAgents,VoiceAgents,AIAppDevelopment,ModernWebDevelopment}.tsx` | Suffix swap only; keyword part of each title unchanged |
| Meta descriptions containing AMAI | `Contact.tsx`, `VoiceAgents.tsx` („od AMAI") | Brand token only — replace the brand word in place; do not reword the rest |
| Contact metadata / body copy mentioning AMAI | `Contact.tsx`, `References.tsx`, `GDPR.tsx`, other files in the grep inventory | Brand token + B10 facts only |
| Favicon SVG | `public/favicon.svg` (contains "amai" string) | Inspect: if it's a text/brand mark, replace with REVAI asset (asset must exist — do not generate one ad hoc); if just an internal id, rename |
| Public assets | `public/amai-logo.png` still ships | **Do not delete** (deletion needs approval). Remove remaining *references* to it; reference `logo-revai-*.webp` instead. Flag the file for the later approved deletion pass. |
| OG image | `public/og-image.webp` | Inspect: if it visually carries the AMAI mark, flag for asset replacement (Phase 2/4 asset work) — **do not guess/generate**; keep current file until a real replacement exists |

Execution note: run a full case-insensitive `grep -ri "amai"` across `index.html`, `src/`, `public/`, `netlify/` at 3B start and reconcile against this table — the table is the plan, the grep is the authority.

### 3.3 Must NOT be guessed (hard stops)

- Any social profile beyond the two B10 URLs (no X/Facebook/YouTube — if a surface has a placeholder for one, remove the link rather than invent it).
- Legal entity *name* text beyond "per IČO 05013500" — if a surface needs the full registered name spelled out (e.g. GDPR page, JSON-LD `legalName`), **ask the owner**; do not transcribe from memory or registry guesswork.
- Phone number (+420 608 024 655 in JSON-LD) — B10 did not confirm it; keep as-is and flag for owner confirmation, do not change.
- Replacement logo/OG/favicon **assets** — only use files already in `public/` (`logo-revai-forest*.webp`); never generate brand artwork.
- Personal mailtos in `GDPR.tsx` (`j.rehberger@…`, `d.valter@…`) — already on the correct domain; leave unless owner says otherwise.
- Anything touching the homepage automation keyword wording (§1.3).

---

## 4. i18n foundation plan — step 3C

**Approved direction (B2):** `/cs` + `/en` subpaths on one Netlify site; **English slugs under `/en`** (e.g. `/en/services/process-automation`); dictionaries (`src/i18n/cs.ts` / `en.ts` or equivalent), **no new inline `t('cs','en')` pairs** (B7 mechanism); language source of truth = URL, localStorage as first-visit hint only; `<html lang>` set per route.

### 4.1 Root strategy — recommendation

| Option | Mechanics | Risk profile |
|---|---|---|
| **A) Serve Czech at `/` (canonical) and also under `/cs`** | Bare paths (`/`, `/sluzby/*`, `/cenik`, `/kontakt`…) stay the canonical 200 URLs and keep serving Czech content exactly as today. `/cs/...` paths exist for symmetry but **301 (or canonicalize) to the bare path** so there is exactly one canonical CZ URL per page. `/en/...` is additive. | Zero change to any indexed URL; homepage equity untouched; both backlinks unaffected. Cost: slightly asymmetric routing (CZ bare, EN prefixed). |
| B) 301 all bare paths to `/cs/...` | Every indexed URL — including `/`, which carries ~82% of clicks and 100% of backlinks — goes through a sitewide 301 wave; canonicals, sitemap, and GSC re-crawl all move at once. | Technically clean symmetry, but it deliberately churns the single biggest SEO asset while B6 is still open. |

**Recommendation: Option A.** With the homepage carrying nearly all click equity and B6 not closed, mass-301ing the root is exactly the kind of SEO-affecting churn Phase 3 is supposed to avoid. Option A keeps every indexed URL byte-identical in the address bar, adds `/en` as a purely additive surface, and leaves a later, measured migration to full `/cs` prefixing possible if ever desired. (Consistent with `02-information-architecture.md`'s "or serve `cs` at root" allowance and B6 baseline §5.)

Consequence for 3C: in routing terms, CZ routes are defined at bare paths (unchanged from today), `/cs/*` rules 301 to bare equivalents, and `/en/*` mounts the English-slug tree. The CZ↔EN slug map is an explicit table in code (every CZ page ↔ its `/en/...` counterpart), used by hreflang, sitemap, and the language switcher.

### 4.2 hreflang / canonical requirements

- Every page emits, in **served (prerendered) HTML**: self-canonical for its own locale URL; reciprocal `hreflang` pair `cs` ↔ `en`; `x-default` → the Czech (bare-path) URL.
- Under Option A, the CZ hreflang/canonical URL is always the **bare path** (`https://…/sluzby/automatizace-procesu`), never `/cs/...`.
- No cross-locale canonicalization (EN pages never canonicalize to CZ).
- EN pages without a finished translation are **not shipped half-empty**: a route exists in the scaffold only when its dictionary content exists; otherwise it's excluded from sitemap/hreflang. (Avoids R2-style duplicate/orphan pages.)
- Language switcher maps via the slug table, falling back to the locale home if a counterpart doesn't exist yet.

---

## 5. Prerender / SEO plan — step 3D

**Approved direction (B3):** prerender/SSG marketing routes at build time; keep Vite + React SPA hydration; no framework migration.

### 5.1 Approach to investigate (investigation, not yet a dependency decision)

Evaluate Vite-compatible options in this order, against the existing build (`vite build` → `dist/`, SPA fallback in `_redirects`):

1. **`vite-prerender-plugin` / `vite-plugin-prerender`-class plugins** — build-time render of a route list into static HTML files in `dist/`.
2. **Post-build scripted prerender** (own Node script using the built bundle + a headless renderer or `react-dom/server` against the route tree) — zero new runtime deps, but more bespoke code.
3. Fallback if both prove poor fits: minimal **static-head templating per route** (generate per-route HTML shells with correct head, hydrate SPA) — least elegant, fewest moving parts.

Selection criteria: works with React Router + the locale routing from 3C; outputs real per-route HTML files that Netlify serves before the SPA fallback; doesn't break the scrollytelling engine's hydration; **any new dependency triggers the approval pause (§1.2)**.

### 5.2 Routes to prerender (marketing set, both locales where EN exists)

`/`, `/sluzby/` hub (new), `/sluzby/automatizace-procesu`, `/sluzby/hlasovi-agenti`, `/sluzby/ai-app-development`, `/sluzby/tvorba-modernich-webu`, `/cenik`, `/kontakt`, `/demo` (new), 404 page — plus their `/en/...` counterparts per the slug table. Brochure pages and `/projekty/:id`-style dynamic routes: include only if trivially enumerable; otherwise they remain SPA-rendered (record the exclusion).

### 5.3 Per-route localized meta requirements

Each prerendered file must contain, server-side: localized `<title>` (baseline wording + REVAI suffix for protected pages), meta description, canonical, OG/Twitter tags, hreflang set (§4.2), correct `<html lang>`. `useDocumentMeta` stays for client-side navigation parity, but the **served HTML is the source of truth** (fixes R5). For the protected pages, the prerendered head must reproduce the §6 baseline strings (brand suffix excepted) — this is a diff-checked acceptance criterion.

### 5.4 Build-time sitemap

Generate `sitemap.xml` during build from the route/slug table (replacing the hand-maintained file): all protected URLs in canonical bare-path form, EN URLs only where the page ships, real `lastmod` from build/content data or omitted (no hand-set values), excluded routes excluded deliberately and documented.

### 5.5 Structured data

- `Organization` (homepage): REVAI name + B10 facts (3B owns the value change; 3D moves it into prerendered output). No topical wording change.
- `Service` schema per service page (additive).
- `FAQPage` where an FAQ section exists (homepage FAQ — Phase 4 dependency; scaffold support now).
- `BreadcrumbList` on service pages (additive).

### 5.6 404 requirement

Real `NotFound` route + a prerendered `404.html` that Netlify serves with **status 404** (not the 200 SPA shell). The in-app catch-all renders the same component for client-side navigation. Helpful links to home/services/contact. This is the durable fix for the soft-404 class (R12); the `interni-agenti` 301 (3A) handles the one URL with known equity *before* it would start returning a hard 404.

---

## 6. Forms / backend foundation — step 3E

- **`contact.mts` is kept untouched** — it is the reference pattern (server-side env, honeypot, validation, Resend), copied, never mutated.
- **New `netlify/functions/demo-request.mts`** built on that pattern: validate website URL format (+ normalize), email, required fields, honeypot, basic per-IP/email rate limit; **never auto-fetch the submitted URL server-side** (SSRF/abuse; fulfillment is manual anyway); Resend email to the monitored inbox with distinct subject `DEMO REQUEST — {url}`; success copy promises "within a few hours, business hours" — never instant.
- **Email-only in phase 1** (B9 default). No Supabase, no lead store, no migration wiring unless separately approved later. Structure the handler so a store and a CAPI event (shared `event_id` seam) can be added later without rework.
- **Shared validation primitives** in `src/components/forms/` so Contact and DemoRequest don't duplicate logic; client UX gets inline validation + `aria-live` status (R14) when the demo form UI lands.
- **Env vars:** reuse `RESEND_API_KEY`; add a demo-recipient var (e.g. `DEMO_TO_EMAIL`, falling back to `CONTACT_TO_EMAIL`) — set in Netlify UI, never committed.
- **End-to-end testing on `revai-web-v2.netlify.app` deploy previews is allowed** (production untouched), **gated on**: the three confirmed env vars actually resolving in the function runtime, and **Resend domain `automatizace-ai.cz` verification completing** (R17 — still pending per B10). Until verification, test up to the Resend call with a dry-run/log path; full E2E afterward.

---

## 7. Security / config foundation — step 3F

### `_headers` plan (new file; none exists today)

| Header | Plan | Notes |
|---|---|---|
| `Content-Security-Policy` | Start as **`Content-Security-Policy-Report-Only`** on deploy previews; allowlist self, Vapi widget origins, Google Calendar (booking link target is navigation, but check embeds), leadsy origin **only if** the tag is still present (its removal/gating is a Phase 6/R3 decision — do not resolve it here); promote to enforcing only after preview verification shows zero violations on all routes incl. the story section | CSP is the fiddly one — report-only first is the rollback-free path |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` — **no `preload`** until after custom-domain cutover decisions | HSTS on the netlify.app subdomain is low-risk (already HSTS-preloaded as a platform domain) |
| `X-Content-Type-Options` | `nosniff` | |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | |

### Env vars / secrets

- Confirmed configured: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. To add: demo-request recipient (§6). Later (Phase 6, not now): `META_PIXEL_ID`, `META_CAPI_TOKEN`.
- **No secret is ever exposed as `VITE_*`** (anything `VITE_`-prefixed is bundled client-side). Functions read secrets server-side only. The hardcoded Vapi public key (R11) is client-exposed by design — moving it to config is allowed, but it is not a secret and must not be conflated with one.

### Dependency / security decision (recorded, restated as binding)

**No `npm audit fix` is ever run automatically** in any Phase 3 step. The 18 known advisories wait for the **separately approved dependency pass** (lockfile will change), where runtime `react-router`/`react-router-dom` advisories go first with a routing + i18n-routing regression check, build-tool advisories second, full `typecheck`/`lint`/`build` + smoke after every bump.

---

## 8. Implementation sequencing — future execution prompts

Order: **3A → 3B → 3C → 3D → 3E → 3F.** Each step is one future prompt, lands as one reviewable change, and ends green on the §9 checklist. 3C and 3D are the SEO-sensitive pair and get the Opus-tier pre-merge review (§1.2) before merging to anything indexed.

### 3A — Redirects + 404
- **Scope:** add `/sluzby/interni-agenti /sluzby/automatizace-procesu 301!` to `public/_redirects` **above** the SPA fallback; add matching in-app `<Navigate>` route (mirror the `emailova-automatizace` pattern); add `NotFound` component + catch-all route; if achievable without prerender tooling, a static `404.html` wired via Netlify convention (else the hard-404 serving completes in 3D).
- **Validation:** `npm run typecheck && npm run lint && npm run build`; inspect `dist/_redirects` ordering (new 301 and existing 301 above `/* /index.html 200`); `npm run preview` + curl checks: `/sluzby/interni-agenti` → 301 → `/sluzby/automatizace-procesu`; `/sluzby/emailova-automatizace` 301 unchanged; all protected URLs return 200; an unknown path renders the NotFound UI.
- **Rollback:** revert the single commit. The redirect is additive; removing it restores the (defective but known) soft-404 state. No data risk.

### 3B — Brand-token sweep (AMAI → REVAI)
- **Scope:** exactly §3.2, values exactly §3.1, hard stops §3.3. No keyword wording changes, no deletions.
- **Validation:** typecheck/lint/build; `grep -ri "amai" index.html src public netlify` returns only the deliberately retained items (the un-deleted `amai-logo.png` file, and any flagged-not-changed items); diff review confirms every protected-page title/description hunk changes **only** the brand token; homepage H1/title/description automation wording byte-identical to the B6 §6.1 baseline apart from the suffix; manifest/JSON-LD valid (paste JSON-LD into a validator); mailto + social links resolve to B10 values.
- **Rollback:** revert the commit. Pure string changes; instantly reversible. If a single surface is contested, revert that hunk only.

### 3C — i18n scaffold
- **Scope:** `src/i18n/` (locale detection from URL, dictionaries `cs`/`en`, CZ↔EN slug table), route mounting per §4.1 Option A (`/en/*` tree; `/cs/*` → 301 bare; bare paths unchanged), `<html lang>` per route, language switcher wired to the slug table, hreflang/canonical emission per §4.2 (client-side now; served-HTML in 3D), localStorage first-visit hint. **No mass copy migration** — existing inline `t()` pairs migrate incrementally; new copy dictionary-only.
- **Validation:** typecheck/lint/build; `npm run preview` + curl: every protected bare URL still 200 with unchanged content; `/cs/sluzby/automatizace-procesu` → 301 → bare; `/en/` and any shipped `/en/...` route render English; no redirect chains >1 hop; language switcher round-trips CZ↔EN on a mapped page.
- **Rollback:** revert the commit; bare-path routes were never moved (Option A), so rollback risk to indexed URLs is nil. If only EN misbehaves, the `/en` mount can be reverted/feature-flagged independently.

### 3D — Prerender + meta + sitemap scaffold
- **Scope:** investigate per §5.1 (**pause for approval before any dependency install**); wire prerender for the §5.2 route list; per-route localized meta + hreflang/canonical in served HTML; build-time sitemap (§5.4); structured data (§5.5); hard-404 serving for the 404 page; verify `_redirects` rules don't shadow prerendered files.
- **Validation:** typecheck/lint/build; inspect `dist/` for per-route HTML files; for each protected page, diff the prerendered `<title>`/description/H1 against the B6 §6.1–6.8 baseline (brand suffix the only permitted delta); curl preview server: served HTML (not post-hydration DOM) contains correct localized meta + hreflang; `dist/sitemap.xml` contains all protected URLs in bare-path form; unknown path returns status 404; existing 301s still resolve.
- **Rollback:** revert commit; build falls back to SPA-only output identical to pre-3D behavior (the SPA fallback still serves everything). Prerender is additive at serve time — its removal degrades crawler HTML, not user-facing routing.

### 3E — Demo-request form/function
- **Scope:** `netlify/functions/demo-request.mts` per §6; shared validation primitives; a minimal `/demo` page/band wiring the form (full conversion-band design is Phase 4); `DEMO_TO_EMAIL` env documented (set in Netlify UI). `contact.mts` untouched.
- **Validation:** typecheck/lint/build; local function invocation tests of validation branches (bad URL, missing email, honeypot trip, rate limit); deploy-preview E2E on `revai-web-v2.netlify.app` → email arrives in the monitored inbox **(only after Resend domain verification — otherwise stop at the dry-run branch and record it)**; confirm `git diff` shows `contact.mts` untouched; confirm no new `VITE_*` var.
- **Rollback:** revert commit; the function is net-new with no callers besides the new form — removal restores prior state exactly. Contact flow unaffected throughout.

### 3F — Headers/security config
- **Scope:** add `public/_headers` per §7, CSP in Report-Only first; document the env-var inventory; no dependency or tracking changes.
- **Validation:** typecheck/lint/build (headers file passes through build untouched — confirm present in `dist/`); deploy preview: curl `-I` shows all four headers; browse `/`, `/cenik`, `/kontakt`, the story section, Vapi button with devtools console open — zero CSP violation reports; only after a clean report-only soak, flip to enforcing (separate commit).
- **Rollback:** delete/revert `_headers` (or drop back to Report-Only) — takes effect on next deploy; no code coupling.

---

## 9. Validation checklist (every step; full list at Phase 3 exit)

- [ ] `npm run typecheck` green
- [ ] `npm run lint` green
- [ ] `npm run build` green
- [ ] **Protected URLs verified** — `/`, `/sluzby/automatizace-procesu`, `/sluzby/hlasovi-agenti`, `/sluzby/ai-app-development`, `/sluzby/tvorba-modernich-webu`, `/cenik`, `/kontakt` all return 200 with expected content at their bare paths
- [ ] **Redirects verified** — `/sluzby/emailova-automatizace` → 301 → `/sluzby/automatizace-procesu` (unchanged); `/sluzby/interni-agenti` → 301 → `/sluzby/automatizace-procesu` (new); `/cs/*` → 301 → bare (after 3C); SPA fallback still last; no chains >1 hop
- [ ] **No homepage title/H1/meta rewrite** — homepage title, H1, meta description, and static `index.html` head wording byte-identical to the B6 §6.1 baseline except the AMAI→REVAI brand token
- [ ] **No `/cenik` content change** — content/numbers diff-clean (title brand suffix only)
- [ ] **No custom domain cutover** — `automatizace-ai.cz` / any custom domain untouched; production site untouched
- [ ] **Deploy preview only** — all testing on `revai-web-v2.netlify.app` previews; nothing published to the indexed domain; no sitemap submission
- [ ] No `package.json`/lockfile/dependency change without its explicit approval; no `npm audit fix`
- [ ] No tracking added; no secrets in `VITE_*`; no deletions without approval

---

## Execution readiness summary

- **Run first: 3A** (interni-agenti 301 + 404) — smallest blast radius, fixes a live defect the B6 baseline itself demands, and exercises the full validate/preview loop before anything SEO-adjacent runs.
- **Implementation may begin** for 3A–3F under the §2 guardrails: B1/B2/B3/B5/B10 are closed/approved and the B6 protective default explicitly permits this internal foundation work, with deploy previews allowed on the new Netlify subdomain.
- **Still blocked by B6:** any rewrite of homepage title/H1/meta/static-head wording away from automation terms; homepage JSON-LD topical changes; any protected-URL re-slug or 301 removal. **Separately blocked regardless of B6:** custom domain cutover (staging sign-off), dependency changes (per-change approval), deletions, Supabase, tracking.
