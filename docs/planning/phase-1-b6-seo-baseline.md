# Phase 1 — B6 SEO Baseline (REVAI redesign)

> Documentation only. Read-only analysis of the GSC data supplied by the owner + the current code's SEO surfaces. No code, routes, redirects, meta, or deploys were changed.
> **Baseline snapshot date: 2026-06-10.**
> Companion to `phase-1-decision-records.md` (B6) and `phase-1-owner-signoff-template.md` §3.

---

## 1. GSC export inventory

Per the owner's directive, the following exports exist:

| Export | Scope | Status |
|---|---|---|
| Overall Performance | last 12 months | supplied (figures below) |
| Page-filtered Performance | `https://automatizace-ai.cz/` (homepage) | supplied |
| Page-filtered Performance | `/sluzby/automatizace-procesu` | supplied |
| Page-filtered Performance | `/sluzby/hlasovi-agenti` | supplied |
| Page-filtered Performance | `/sluzby/interni-agenti` | supplied |
| Page-filtered Performance | `/cenik` | supplied |
| External links baseline | site-wide | supplied (see §5) |

> ⚠️ **Integrity note (do not hide):** the referenced folder `docs/planning/gsc-exports/` **does not exist in this repo** at the time of writing — the figures below are the owner-supplied numbers from the directive, recorded as the baseline. They are internally consistent and sufficient to baseline B6, but the **raw CSV/export files should be committed to `docs/planning/gsc-exports/`** so the baseline is independently verifiable and re-checkable post-launch.

### Recorded performance figures (last 12 months)

| Page | Clicks | Impressions | Avg. position | Note |
|---|---|---|---|---|
| `/` (homepage) | **136** | **3,515** | — | Carries the large majority of all clicks |
| `/cenik` | 16 | 565 | ~6.21 | Strong position on price-intent queries |
| `/sluzby/hlasovi-agenti` | 12 | 735 | — | |
| `/sluzby/interni-agenti` | 2 | 171 | — | ⚠️ URL has **no route and no redirect** in current code — see §6 |
| `/sluzby/automatizace-procesu` | 0 | 744 | — | Impressions but no clicks — visibility without CTR |

**Reading (critical):** the **homepage is the SEO asset** — ~136 of ~166 known clicks (~82%) land on `/`, on automation-intent queries. The repositioning risk (R1) is therefore concentrated almost entirely in the homepage title/H1/meta. The service pages have impressions but little click equity of their own; preserving their URLs is cheap insurance, but the thing that must not be broken carelessly is the **homepage's automation-query relevance**.

---

## 2. Protected query clusters

| Cluster | Queries | Landing page | Status |
|---|---|---|---|
| **Core automation (brand-adjacent)** | `ai automatizace`, `automatizace ai`, `automatizace a ai`, `ai automatizace pro firmy` | `/` | **PRESERVE — highest priority.** These drive the homepage's 136 clicks. |
| **Price-intent automation** | `automatizace cen`, `kolik stojí automatizace`, `ai řešení pro firmy cena`, `automatizace workflow cena` | `/cenik` | **PRESERVE.** Avg. position ~6.21; `/cenik` is audit-only anyway (D11). |
| **Voice assistants** | `ai hlasový asistent`, `hlasový ai asistent`, `hlasovi agenti` (where present in export) | `/sluzby/hlasovi-agenti` | **PRESERVE.** |
| **Process automation** | `ai automatizace procesů`, `automatizace procesů ai` (where present in export) | `/sluzby/automatizace-procesu` | **PRESERVE URL + content.** 744 impressions, 0 clicks — equity is potential, not realized. |
| **AI apps** | `ai aplikace`, `ai app development` (where present) | `/sluzby/ai-app-development` | **PRESERVE.** No page-filtered export supplied; protected by default. |
| **Premium web (new positioning)** | `tvorba webových stránek`, `moderní webové stránky` | `/sluzby/tvorba-modernich-webu`, future homepage | **MONITOR.** Not yet proven as existing equity — this is the cluster the redesign tries to *win*, not preserve. |

---

## 3. Protected landing pages

All of the following are frozen: **URL preserved, indexable content preserved, no re-slug** (re-rank via prominence and internal linking only, per `02`).

1. `/` — primary SEO asset (most clicks + all known external links)
2. `/sluzby/automatizace-procesu`
3. `/sluzby/hlasovi-agenti`
4. `/sluzby/interni-agenti` — **legacy URL, see §6: currently broken (no route, no redirect); must be 301'd, not left to soft-404**
5. `/sluzby/ai-app-development`
6. `/sluzby/tvorba-modernich-webu`
7. `/cenik` — content frozen anyway (audit-only, D11)
8. `/kontakt`
9. `/sluzby/emailova-automatizace` → 301 → `/sluzby/automatizace-procesu` — **the redirect itself is the protected object** (earned link equity)

---

## 4. Query → landing page mapping

| Query | Landing page | Equity (12 mo) | Action |
|---|---|---|---|
| ai automatizace | `/` | part of 136 clicks / 3,515 impr. | preserve homepage relevance for this term through any reposition |
| automatizace ai | `/` | 〃 | preserve (also the anchor text of the only known backlink) |
| automatizace a ai | `/` | 〃 | preserve |
| ai automatizace pro firmy | `/` | 〃 | preserve |
| automatizace cen | `/cenik` | part of 16 clicks / 565 impr., pos. ~6.21 | preserve — `/cenik` content frozen |
| kolik stojí automatizace | `/cenik` | 〃 | preserve |
| ai řešení pro firmy cena | `/cenik` | 〃 | preserve |
| automatizace workflow cena | `/cenik` | 〃 | preserve |
| ai hlasový asistent (+ variants) | `/sluzby/hlasovi-agenti` | 12 clicks / 735 impr. | preserve |
| ai automatizace procesů (+ variants) | `/sluzby/automatizace-procesu` | 0 clicks / 744 impr. | preserve URL/content; CTR improvement is allowed (meta tweaks here are *less* risky than homepage) |
| (legacy queries) | `/sluzby/interni-agenti` | 2 clicks / 171 impr. | **301 to `/sluzby/automatizace-procesu` in Phase 3** — currently soft-404s |
| ai aplikace / ai app development | `/sluzby/ai-app-development` | not in supplied exports | preserve by default |
| tvorba webových stránek / moderní webové stránky | `/sluzby/tvorba-modernich-webu` | unproven | monitor; target cluster for the redesign |

---

## 5. External links baseline

| Metric | Value |
|---|---|
| Total external links | **2** |
| Target URL | `https://automatizace-ai.cz/` (homepage only) |
| Linking site | `seomaker.cz` |
| Anchor text | `automatizace ai cz` |

**Implication:** the backlink profile is tiny and points **only at the homepage root**, with an automation-branded anchor. This reinforces two rules: (a) the **root URL must keep resolving** (200 at `/`, or a clean 301 if locale routing moves `cs` under `/cs/` — per `02`, prefer serving `cs` at root); (b) losing the homepage's automation relevance risks the only earned links' topical match. There is **no backlink equity anywhere else** — service-page URLs are preserved for ranking continuity, not for links.

---

## 6. Current code SEO baseline for protected pages

> Source inspected read-only on 2026-06-10. Per-page meta is applied **client-side** via `src/hooks/useDocumentMeta.ts` (mutates `document.title`, description, OG tags, canonical after hydration). The static `index.html` head is what JS-less crawlers see — it is the homepage's de-facto served baseline (R5). `t(cs, en)` = runtime language toggle; CZ listed first.

### 6.1 `/` — Homepage

| Surface | Current value |
|---|---|
| Route/component | `/` → `src/pages/Home.tsx` (hero: `src/components/home/Hero.tsx`) |
| Visible H1 | „Automatizujeme procesy pomocí AI." (Hero.tsx:53; EN: "We automate processes with AI.") |
| Hero eyebrow | „AI Automatizace · AMAI" ⚠️ AMAI |
| Document title (runtime) | „Automatizace pomocí AI – Řešení na míru \| AMAI" ⚠️ AMAI |
| Meta description (runtime) | „Česká agentura na AI automatizaci. Hlasoví asistenti, automatizace procesů, moderní weby a vývoj AI aplikací pro firmy." |
| Static `index.html` title | „Automatizace pomocí AI – Řešení na míru" (no AMAI suffix) |
| Static `index.html` description | „Automatizujeme procesy pomocí AI – hlasoví asistenti, AI automatizace interních workflow, emailová automatizace a custom APP development" |
| Canonical | `/` (runtime, via useDocumentMeta) |
| OG title/description | static: same as static title/desc; `og:url` = `https://automatizace-ai.cz/`; OG image `og-image.webp` |
| JSON-LD | `Organization.name = "AMAI"` ⚠️ AMAI; phone +420608024655 |
| Manifest / misc | `apple-mobile-web-app-title = "AMAI"` ⚠️; `<html lang="cs">` hardcoded |
| Sitemap | present, priority 1.0 |
| Redirects | none (root) |

**This is the frozen baseline for any future homepage meta/H1 change.** Title, H1, description, and the static head are all automation-worded — consistent with the queries carrying the 136 clicks.

### 6.2 `/sluzby/automatizace-procesu`

| Surface | Current value |
|---|---|
| Route/component | `/sluzby/automatizace-procesu` → `src/pages/services/InternalAgents.tsx` *(note: component named "InternalAgents" but serves the process-automation URL)* |
| H1 | „Interní workflow, které běží samy za vás." |
| Title (runtime) | „Automatizace procesů pomocí AI \| AMAI" ⚠️ AMAI |
| Meta description | „Automatizujte opakující se procesy, e-mailovou komunikaci a workflow s AI. Integrace Make, n8n, Zapier a vlastních systémů." |
| Canonical | `/sluzby/automatizace-procesu` |
| OG | derived from title/description by the hook |
| Sitemap | present, priority 0.9 |
| Redirects | receives 301 from `/sluzby/emailova-automatizace` (`public/_redirects` + in-app `<Navigate>` in App.tsx) |

### 6.3 `/sluzby/hlasovi-agenti`

| Surface | Current value |
|---|---|
| Route/component | → `src/pages/services/VoiceAgents.tsx` |
| H1 | „Hlasový asistent, který zvládne každý hovor." |
| Title (runtime) | „Hlasoví AI asistenti pro firmy \| AMAI" ⚠️ AMAI (description also says „od AMAI") |
| Meta description | „AI hlasoví asistenti od AMAI automatizují příchozí hovory, objednávky a zákaznický servis 24/7. Integrace s CRM a interními systémy." |
| Canonical | `/sluzby/hlasovi-agenti` |
| Sitemap | present, 0.9 |

### 6.4 `/sluzby/interni-agenti` ⚠️ **DEFECT — soft 404**

| Surface | Current value |
|---|---|
| Route | **none.** Not in `App.tsx` routes, not in `_redirects`, not in sitemap. |
| Behavior | SPA fallback (`/* → /index.html 200`) serves the shell; with no matching route and no 404 page (R12), the user/crawler gets a **200 with an empty layout** — a soft 404. |
| GSC equity | 2 clicks / 171 impressions in the last 12 months — Google still surfaces this URL. |

**Required (Phase 3, decision recorded here, not implemented now):** add `301 /sluzby/interni-agenti → /sluzby/automatizace-procesu` (the content that historically lived there — the serving component is even still named `InternalAgents`). This is the **one net-new redirect** the B6 baseline demands.

### 6.5 `/sluzby/ai-app-development`

| Surface | Current value |
|---|---|
| Route/component | → `src/pages/services/AIAppDevelopment.tsx` |
| H1 | „Custom AI aplikace postavené na míru." |
| Title (runtime) | „Vývoj AI aplikací na míru \| AMAI" ⚠️ AMAI |
| Meta description | „Vývoj vlastních AI aplikací, dashboardů a inteligentních systémů. Full-stack řešení s LLM, RAG a agentic workflow pro firmy." |
| Canonical | `/sluzby/ai-app-development` |
| Sitemap | present, 0.9 |

### 6.6 `/sluzby/tvorba-modernich-webu`

| Surface | Current value |
|---|---|
| Route/component | → `src/pages/services/ModernWebDevelopment.tsx` |
| H1 | „Weby, která mají hodnotu." *(note: grammar — „která" should be „které"; fix belongs to Phase 4 copy work, recorded here only as observed baseline)* |
| Title (runtime) | „Tvorba moderních webů s AI \| AMAI" ⚠️ AMAI |
| Meta description | „Navrhujeme a vyvíjíme moderní weby s integrací AI. React, Vite, Tailwind — rychlé, přístupné a SEO-optimalizované weby na míru." |
| Canonical | `/sluzby/tvorba-modernich-webu` |
| Sitemap | present, 0.9 |

### 6.7 `/cenik`

| Surface | Current value |
|---|---|
| Route/component | → `src/pages/PricingPage.tsx` |
| H1 | „Ceník jednotlivých služeb" |
| Title (runtime) | „Ceník AI služeb \| AMAI" ⚠️ AMAI |
| Meta description | „Transparentní ceník AI automatizace, hlasových asistentů, tvorby webů a vývoje AI aplikací. Kalkulátory pro okamžitý odhad ceny." |
| Canonical | `/cenik` |
| Sitemap | present, 0.8 |
| Constraint | content/numbers frozen (audit-only, D11) — and it carries real price-intent equity (16 clicks, pos. ~6.21), which independently justifies the freeze |

### 6.8 `/kontakt`

| Surface | Current value |
|---|---|
| Route/component | → `src/pages/Contact.tsx` |
| H1 | „Kontaktujte nás" |
| Title (runtime) | „Kontakt \| AMAI – AI Automatizace" ⚠️ AMAI |
| Meta description | „Kontaktujte tým AMAI. Odpovíme do 24 hodin. Nabízíme nezávaznou konzultaci AI automatizace pro vaši firmu." ⚠️ AMAI |
| Canonical | `/kontakt` |
| Sitemap | present, 0.7 |

### 6.9 `/sluzby/emailova-automatizace` (redirect)

| Surface | Current value |
|---|---|
| `_redirects` | `/sluzby/emailova-automatizace → /sluzby/automatizace-procesu 301!` (above the SPA fallback — correct ordering) |
| In-app | `<Route>` with `<Navigate to="/sluzby/automatizace-procesu" replace />` in `App.tsx` |
| Status | **working as intended — preserve both layers unchanged.** |

### AMAI/REVAI inconsistency summary (all protected pages)

Every protected page's **runtime title contains "AMAI"**; `/kontakt` and `/sluzby/hlasovi-agenti` also carry AMAI in descriptions; the homepage additionally has AMAI in the hero eyebrow, JSON-LD `Organization.name`, and the webmanifest title — and `amai-logo.png` still ships in `public/`. This is the known half-done migration (R4). **The AMAI→REVAI sweep (Phase 3, B10 facts now available) may change the brand suffix — but the automation keyword wording in titles/H1s/descriptions of `/` must not be changed in the same step.** Brand-token swap ≠ keyword rewrite; treat them as separate, separately reviewable changes.

---

## 7. What homepage title/H1/meta changes remain BLOCKED

Despite this baseline, the following are **not approved by this document**:

1. **Rewriting the homepage `<title>`, H1, meta description, or static `index.html` head wording** away from automation terms toward premium-web positioning. The homepage carries ~82% of click equity on automation queries and 100% of known backlinks — this change needs its own phased, owner-approved plan (per `02`: "phase the homepage meta change", monitor Search Console pre/post).
2. **Changing the homepage JSON-LD `Organization` wording** beyond the brand-name fix (AMAI→REVAI is approved by B10; *keyword/topical* changes are not).
3. **Any re-slug of protected URLs** or removal/reorder of the existing 301s.
4. **Any change that stops the root `/` resolving** (locale routing must keep `/` serving or 301-ing cleanly — backlinks point at root).

> Per the decision rule: **this document alone does not approve a homepage title/H1/meta rewrite.** It provides the baseline against which such a rewrite must later be proposed, approved, and measured.

## 8. What internal implementation may proceed safely

With this baseline recorded, the following carry **no B6 risk** and may proceed (subject to their own phase gates):

- All **Phase 2 spike** work (tooling, palette, assets, prototypes — sandboxed).
- **Phase 3 foundation** work that does not alter protected-page keyword wording: i18n routing scaffolding (`/cs` + `/en`, English slugs per B2) *provided* bare indexed URLs 301 to their `/cs/` equivalents or `cs` serves at root; prerender wiring (B3); token consolidation; `demo-request.mts`; `_headers`; build-time sitemap (must include all protected URLs); 404 route (fixes the soft-404 class of defect).
- The **AMAI→REVAI brand-suffix sweep** (B10 facts in hand) — brand tokens only, automation keywords untouched, reviewed against this baseline.
- **Preparing** (not shipping) the `interni-agenti → automatizace-procesu` 301 and the redirect map for locale routing.
- New pages/sections that don't touch protected URLs: `/demo`, services hub, showcase gallery.
- Deploy previews on `revai-web-v2.netlify.app` (production untouched; the new site is not the indexed domain).

## 9. What final data is still missing

| Item | Impact | Severity |
|---|---|---|
| **Raw GSC export files in `docs/planning/gsc-exports/`** | The folder referenced does not exist in the repo; baseline figures are owner-supplied and unverifiable from files. Commit the CSVs to make the baseline auditable. | medium — figures are recorded, provenance isn't |
| Avg. position for `/`, `/sluzby/*` pages (only `/cenik` has one) | Without position, post-change rank movement on the core cluster is harder to attribute. Pull from the existing exports. | low-medium |
| Page-filtered export for `/sluzby/ai-app-development` and `/sluzby/tvorba-modernich-webu` | Both protected by default; equity unknown (likely small). | low |
| Query-level click split for the homepage cluster | Useful for choosing which exact terms must survive a future homepage meta change. | low-medium |
| GSC links report beyond the 2 known external links (or a third-party backlink check) | Confirms there's truly nothing else to protect before domain cutover. | low |

None of these block internal implementation. The first item (raw exports committed) plus the homepage-cluster query split should exist **before the homepage meta-change proposal** is written.

---

## B6 verdict

**B6 status: SUBSTANTIALLY BASELINED — not fully closed for homepage meta changes.**

- Closed: protected queries, protected pages, query→page mapping, backlink baseline, full per-page code SEO baseline (titles/H1/meta/canonicals/sitemap/redirects), snapshot date (2026-06-10), and one required new 301 (`interni-agenti`) recorded.
- Not closed: the homepage title/H1/meta rewrite remains **blocked** until (a) raw exports are committed for provenance, (b) the homepage query-level split informs which terms the new wording must retain, and (c) a phased meta-change plan is separately approved and Search-Console-monitored.
