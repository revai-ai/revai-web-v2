# Phase 2R — Creative / Tooling / Storytelling Spike (REVAI redesign)

> **Status:** research/planning spike only. **No production code, routing, prerender, sitemap, header, function, asset, or meta change is made by this document.**
> **Date:** 2026-06-10.
> **Inputs:** `04-tooling-and-asset-spike-plan.md`, `02-information-architecture.md`, `03-conversion-architecture.md`, `06-implementation-roadmap.md`, `phase-3-foundation-implementation-plan.md`, `phase-3d-prerender-seo-validation.md`, plus a code-level read of the storytelling engine (`src/components/home/ImageStoryStack.tsx`, `ImageStoryScene.tsx`, `MobileImageStoryStack.tsx`, `imageStoryData.ts`), `Hero.tsx`, `Services.tsx`, `SocialProof.tsx`, `src/styles/tokens.css`, `tailwind.config.js`, and the shipped `/public/story/c/` asset set.
> **Gate state honored:** B6 NOT closed — homepage H1/title/meta wording stays frozen; nothing here changes `/cenik` or protected `/sluzby/*` SEO. B4 = recommended default (premium-web story leads, automation chapter demoted, not deleted). B5 approved (demo primary, consultation secondary). B7 default (dictionaries; all copy below is DRAFT for the copy owner). No dependency installs. No dynamic workflows.

---

## 0. Engine + asset reality (what the creative work must fit)

Facts from code, because they constrain every creative decision below:

| Fact | Source | Creative consequence |
|---|---|---|
| Story components live in `src/components/home/` (there is **no** `src/components/story/` directory) | repo | Phase 4 plans must reference the real paths |
| Desktop engine: one pinned sticky stage, `height: 1100vh`, all scenes absolutely stacked, one scroll timeline | `ImageStoryStack.tsx` | Pacing is "unhurried museum walk" — copy must survive a long hold per scene |
| `TIMING` is a **hardcoded 5-entry array** (hold 0.14 / transition 0.08 each) | `ImageStoryScene.tsx:15-21` | The scene list is **exactly 5 scenes**, or the engine must be generalized (compute timing from `total`). Recommended: keep 5; generalization is a small, separately-reviewable Phase 4 task only if the automation chapter (B4 "layer") needs a second instance with a different count |
| Two-layer composition: blurred `object-cover` backdrop + `object-contain` foreground | `ImageStoryScene.tsx` | Assets are shown **whole** (no crop). Aspect ratio is forgiving, but ~3:2–16:10 landscape fills best |
| Left-weighted warm-paper scrim (rgba(246,244,239)) keeps graphite text readable; right side of each image stays exposed | `ImageStoryStack.tsx:75-90` | **Every story asset must be right-weighted**: visual interest in the right two-thirds, quiet/light left third. This is the single most important asset brief rule |
| Mobile (<1024px) renders the **same scene data** as stacked editorial cards — pinned timeline never mounts | `MobileImageStoryStack.tsx` | One asset set serves both; no separate mobile renders needed |
| Reduced-motion path renders static full sections | both | No asset may *depend* on motion to make sense |
| Current `/public/story/c/` set: 5 webp files, **34–67 KB each, ~254 KB total** | `ls -la` | This is the perf baseline. New scene assets must hit the same weight class |
| All 5 `<img>` layers mount eagerly (no `loading="lazy"`, no preload strategy) | `ImageStoryScene.tsx` | Total story payload is paid up front → hard budget below; a lazy/priority pass is a cheap Phase 4 win |
| Scene data contract: `{ id, image, eyebrow, headline, headlineAlt, body, cta? }`, bilingual inline | `imageStoryData.ts` | New narrative = a new data file in the same shape; per B7 the *mechanism* should move to dictionaries when Phase 4 copy lands |
| Tokens: warm paper `#F6F4EF`, graphite ink `#1E1B16`, forest signal `#4F6F4A`, scoped under `.variant-c` | `tokens.css`, `tailwind.config.js` | The `.variant-c` scoping pattern is exactly the seam for per-demo-concept token variants (§5) |
| Type: `Inter` is named in `src/index.css` but **no webfont is loaded** (no Google Fonts / @font-face / fontsource in `index.html`) | grep | Most visitors currently see system sans. Any real typographic upgrade = a font asset/dependency = **approval-gated**; budget ~2 weights max |
| Eyebrows use Tailwind's default `font-mono` stack; headlines are bold, tight-tracked (`-0.01/-0.02em`), `leading-[0.94–0.96]` | components | The existing type voice is already editorial/premium; direction work should refine, not replace it |

---

## 1. Premium visual direction shortlist (D14 token candidates)

Three directions, each expressed as candidate values for the consolidated token system. **Recommendation: A for the site; B and C deployed as scoped variant palettes for two of the three demo concepts** — which turns "show range" into a token-system demo instead of three bespoke builds.

### Direction A — **Warm Editorial Forest** (evolve what's proven) — RECOMMENDED for the site

- **Mood:** gallery daylight, archival paper, calm confidence. Czech B2B trust with craft signals.
- **Token candidates:** keep `canvas #F6F4EF / ink #1E1B16 / signal #4F6F4A` family; add two premium accents: `--ifl-bronze: #8A6D4A` (hairlines, numerals, "signature" details) and `--ifl-press: #2B2823` (deep plate for inverted bands, e.g. the demo-request band).
- **Type/spacing/motion taste:** keep Inter-class grotesque, but **actually load it** (or a close premium grotesque) at 2 weights — display + text; keep mono eyebrows with `0.28em` tracking (already a signature); keep the slow `cubic-bezier(0.16,1,0.3,1)` ease and the 0.14-hold pacing. Spacing stays generous — the 1100vh patience *is* the luxury.
- **Why it fits REVAI:** the scrim, contrast pairs, and readability of this palette are already production-proven in the engine; it photographs well against both "outdated site" (cold, cluttered) and "modern engine" (warm, ordered) imagery; and it costs near-zero rework — the budget goes into assets and narrative instead of re-plumbing color. Lowest-risk path to "wow" by Phase 4.

### Direction B — **Gallery Noir** (dark luxury) — reserve for the luxury-brand demo concept

- **Mood:** private gallery at night; champagne on graphite; the "signature web" tier made visible.
- **Token candidates:** `canvas #14120F`, `surface #1E1B16`, `text #F2EFE8`, `text-70 #B5AFA4`, `accent #C8A96A` (champagne), `accent-dark #A98B4F`, hairline `#3A352C`.
- **Type/spacing/motion taste:** introduces a **serif display** (editorial high-contrast — e.g. a Canela/Freight-class face; font choice = owner/licensing decision) over the same grotesque text face; slower fades, longer holds; light-on-dark requires raising body sizes ~1 step for contrast/readability.
- **Why it fits REVAI:** it is the strongest pure-luxury statement and the natural skin for the luxury personal-brand demo — proof REVAI can do "expensive." **Why not for the site:** it inverts the entire scrim/readability system (the warm-paper gradient is hardcoded in two components), doubles asset-grading work, and dark UIs read worse for the existing automation audience arriving on automation queries. High wow, high rework — wrong trade for the homepage, right trade for one showcase.

### Direction C — **Porcelain & Ink** (cool product-modern) — reserve for the SaaS demo concept

- **Mood:** precision instrument; cool daylight studio; software you'd trust with revenue.
- **Token candidates:** `canvas #F7F8F7` (cool porcelain), `ink #14161A`, `signal #2F4156` (deep slate-indigo), `signal-tint #E8EDF2`, `accent #B4663F` (copper, sparing).
- **Type/spacing/motion taste:** tighter grid, denser sections, crisper/faster micro-motion (0.3–0.4s) than the homepage's slow cinema; mono used for data/UI chrome, not just eyebrows.
- **Why it fits REVAI:** signals product/engineering credibility and gives the interactive-SaaS demo a clearly different temperature from the warm homepage — demonstrating range *within one token architecture*. **Why not for the site:** cool palettes fight the warm photographic asset language already established, and "agency warmth" is part of the current brand equity.

**Decision sought from owner (D14):** approve A as the site direction; approve B/C as *demo-concept-scoped* variant palettes (each shipped as a `.variant-*` token scope like the existing `.variant-c`).

---

## 2. Homepage storytelling architecture

### 2.1 Hard constraint restated

Until B6 closes: the H1 („Automatizujeme procesy pomocí AI."), `<title>`, meta description, and static head wording **do not change**. The storytelling *section* (body content below the hero) is not part of the frozen surface, but per B4 the narrative swap is still owner-gated and should ship in one reviewed Phase 4 change with Search Console monitoring. Everything below is therefore **build-ready planning, not shippable copy**; all copy is DRAFT pending the B7 copy owner.

### 2.2 Hero concept — "the living before/after"

- **Layout:** keep the editorial left-type composition (it works and contains the frozen H1). The premium upgrade happens in the **ambient right layer**: replace the faint sage orb with a slow, CSS/engine-driven "website coming alive" vignette — a framed site mockup that quietly transitions from a dated, grey state to a warm, ordered premium state on a long loop (two stacked stills + the existing crossfade vocabulary; **no video**).
- **CTA hierarchy (B5 approved):** primary = **demo request** („Ukažte nám svůj web" / URL-demo flow), consultation steps back to ghost/secondary. The current `Hero.tsx` has consultation primary — flagged as a Phase 4 swap.
- **Stats row:** keep the mechanism; restate values only with owner-confirmed numbers (B10-class facts — do not invent).
- **Post-B6 (separately approved):** H1 evolves to the premium-web positioning per the phased meta-change plan. The hero is *designed* so that swap is a copy change, not a layout change.

### 2.3 Story beats — „Zastaralý web → moderní prodejní stroj"

Five beats (engine-native count), mirroring the proven chaos→order arc of the current automation story:

1. **Stagnace** — the outdated site: dated, slow, invisible; it quietly costs trust every day.
2. **První dojem** — premium first impression: craft, type, light; a visitor decides in seconds.
3. **Příběh** — storytelling leads the visitor: the page walks them, scene by scene (self-referential — the engine showcasing itself, per `02` "the engine is the proof").
4. **Konverze** — structure that sells: clear hierarchy, one primary action, demo in hours.
5. **Motor** — the measurable sales engine: enquiries, demos, growth; final CTA → demo request.

### 2.4 Scene list for the existing engine (DRAFT data, `StorySceneC` shape)

New file in Phase 4: `imageStoryDataPremium.ts` (or dictionary-backed equivalent per B7); assets under `/public/story/p/`. Copy below is **placeholder-quality draft** for the copy owner — structure (eyebrow / headline / headlineAlt / body / cta) is engine-exact.

| # | id | image (right-weighted!) | eyebrow CZ | headline / headlineAlt CZ (draft) | body gist (draft) |
|---|---|---|---|---|---|
| 1 | `outdated-site` | `/story/p/outdated-site.webp` — dim, cluttered legacy screen in shadow | `01 — Stagnace` | „Váš web stárne" / „rychleji než vaše firma." | Dated design, slow load, no story — every visitor it loses is invisible in the numbers. |
| 2 | `first-impression` | `/story/p/first-impression.webp` — premium device/site detail in warm light | `02 — První dojem` | „Rozhodnutí padne" / „během vteřin." | Craft, typography, light. A premium first impression is not dekorace — it's trust at first glance. |
| 3 | `story-guides` | `/story/p/story-guides.webp` — scene sequence / cinematic frames flowing rightward | `03 — Příběh` | „Stránka, která" / „vede návštěvníka." | Scrollytelling walks your customer through value step by step — exactly like the section you're reading now. |
| 4 | `conversion-structure` | `/story/p/conversion-structure.webp` — ordered layout blocks converging to a single CTA | `04 — Konverze` | „Struktura, která" / „prodává." | One clear primary action per view. From first scroll to inquiry without friction. |
| 5 | `sales-engine` | `/story/p/sales-engine.webp` — warm dashboard/growth still, human at ease | `05 — Motor` | „Z vizitky" / „prodejní stroj." | Measurable demand: demos, inquiries, bookings — visible from day one. **CTA → `/demo`** („Chci demo svého webu") |

EN mirrors authored in parallel (B7 — never retrofitted). Scene 5's CTA changes from `CALENDAR_URL` to the demo flow (B5).

**Automation chapter (B4 default = layer):** the *current* `STORY_SCENES_C` data survives as a compact secondary section (between Services and the demo-concept teaser per `02` order), **not** as a second 1100vh pinned instance — recommended form: the mobile card-stack treatment (`MobileImageStoryStackC` pattern) rendered at all breakpoints, so the page carries only one pinned timeline. This avoids both double-pin fatigue and the TIMING generalization. If the owner wants a second pinned chapter instead, the TIMING array must be parameterized first (small engine change, flagged for Phase 4 review).

### 2.5 Homepage section plan (per `02` §homepage order) — reuse vs. new

| # | Section | Component | Status |
|---|---|---|---|
| 1 | Hero (frozen H1; ambient upgrade; CTA swap per B5) | `home/Hero.tsx` | **Adapt** |
| 2 | **Demo-request conversion band** — URL input + name/email, posts to `demo-request.mts` (3E); „demo během pár hodin" expectation copy | new `home/DemoRequestBand.tsx` | **Build (new)** — the only major new homepage component |
| 3 | Social proof | `home/SocialProof.tsx` | **Keep**; partner logos are currently mixed png — flag a webp/quality pass into the asset list |
| 4 | Premium-web pinned story (5 scenes, §2.4) | `home/ImageStoryStack.tsx` + new scene data | **Adapt** (data + CTA target; engine internals untouched) |
| 5 | Offer hierarchy (D3 order: premium web → automation → AI apps → voice) | `home/Services.tsx` | **Adapt** (reorder; currently voice/automation lead) |
| 6 | Automation chapter (B4 layer) | card-stack reuse of current scene data | **Adapt/relocate** |
| 7 | Demo-concepts teaser (3 cards → `/ukazky`) | new `home/ShowcaseTeaser.tsx` | **Build (new, light)** |
| 8 | Process | `home/Process.tsx` | **Keep** |
| 9 | FAQ (+ `FAQPage` schema via the 3D prerender injection seam) | `home/FAQ.tsx` | **Keep + schema** |
| 10 | Secondary conversion (consultation + inquiry) | `sections/BookConsultation.tsx` | **Keep, demoted to secondary** |

Routing note: `/demo`, `/sluzby/` hub and `/ukazky` are Phase 4/5 routes; per `phase-3d` §13 each must join `ROUTE_MAP` + `PAGE_META` when created. **Not touched in 2R.**

---

## 3. Asset & tooling decisions (per the `04` gate)

### 3.1 Decision table (creative-scope tools; D–G consent/lead items live in `04`/Phase 6, B9 already defaulted email-only — out of 2R scope)

| Tool | 2R verdict | Reason / required output state |
|---|---|---|
| **Higgsfield — stills** | **Spike-only (NOT approved).** | The `04` gate requires a proof-of-capability spike *after* palette + scene list exist. Both now exist (§1, §2.4) → the spike is unblocked, but it involves **paid spend + licensing confirmation = owner approval first**. Spike brief in §3.3. Per `04`/D15 the approve/reject verdict after the spike is an Opus-tier risk decision. |
| **Higgsfield — video / hero loops** | **Rejected for Phase 4 (revisit only if the stills spike wildly over-performs).** | The hero concept (§2.2) and engine deliberately use stills + CSS/engine motion; current total story payload is ~254 KB — one compressed hero video would multiply that. `04` already leaned reject; nothing in 2R found a need video would satisfy that two stills + crossfade can't. |
| **21st.dev & similar** | **Inspiration-only (confirmed, closed).** | The two new components (DemoRequestBand, ShowcaseTeaser) are simple compositions of existing `ui/ifl` primitives + tokens; importing third-party components would fight the `.variant-c` token scoping. No code dependency, ever. |
| **Taste/Impeccable-style refs** | **Used — output delivered.** | §1 *is* the required output: moodboard-level directions expressed as token candidate values. Closed for 2R; the copy owner may add references during Phase 4 copywriting. |
| **Stock photography (licensed)** | **Approved as the fallback/benchmark pipeline.** | Zero generative-licensing ambiguity; the Higgsfield spike must beat a hand-picked stock alternative side-by-side (the `04` requirement). Cost: per-image licensing; risk: generic look — mitigated by consistent grading to the Direction-A palette. |
| **Manual webp pipeline** | **Approved (default, already proven).** | The shipped `/story/c/` set proves it: source → grade to palette → resize ~1600–2000 px wide → `cwebp -q 68–75` → target ≤ 70 KB/scene. No new tooling, no dependency. AVIF variant optional later (build-size test first). |

### 3.2 Required asset list for Phase 4 (+ early Phase 5)

| Asset | Count | Spec | Budget |
|---|---|---|---|
| Premium story scenes (§2.4) | 5 | ~1800×1200 webp, **right-weighted composition, quiet left third**, graded to Direction A | ≤ 70 KB each; **story total ≤ 350 KB** |
| Hero ambient pair ("dated" + "premium" site states) | 2 | ~1400×1000 webp, sits behind the left-type column | ≤ 60 KB each |
| Demo-concept teaser keys (luxury / SaaS / estate) | 3 | ~1200×800 webp, graded to B / C / warm-dusk respectively | ≤ 50 KB each |
| OG image replacement (flagged in 3B — current `og-image.webp` may carry the AMAI mark) | 1 | 1200×630 | ≤ 90 KB |
| Partner-logo webp normalization (currently mixed png, some >RGB-heavy) | ~6 | re-export to webp/SVG | trivial |
| *(Phase 5)* per-concept scene sets | 3×5 | same spec as story scenes, per-concept palette | same budgets |

Hard rule carried from `04`: **nothing ships from the spike**; generated/licensed assets land only via the Phase 4 approval gate with a measured perf delta.

### 3.3 The unblocked Higgsfield stills spike (needs owner approval to spend)

Per `04` §A, now concretely scoped: generate **scenes 1 + 5** of §2.4 (the two tonal extremes — dim/dated vs. warm/alive) at ~1800×1200 in Direction A grading, plus **one hero ambient still**. Compress through the §3.1 pipeline. Drop into the engine locally (uncommitted) next to a hand-picked stock alternative for the same two scenes. Measure: file size at production weight, Lighthouse perf on the story section, side-by-side quality note. Confirm commercial license + per-asset cost in writing. Then the Opus-tier approve/reject per D15. **Exit criterion 3 of `04` (production-weight sample with measured perf delta) remains open until this runs — it is the only Phase 2 exit item 2R cannot close on paper.**

### 3.4 Risks, licensing, performance constraints

- **Licensing:** Higgsfield commercial terms unconfirmed (hard gate); stock licenses must cover web + social/OG use; any display serif for Direction B needs a web-font license check. **No asset with unclear rights enters `/public`.**
- **Brand-consistency drift (generative):** 5+ scenes must read as one graded series; mitigation = single palette LUT/grade pass after generation, and the spike explicitly tests 2 scenes for series-consistency before any batch spend.
- **Performance:** eager-mounted layers make story payload a hard budget (≤ 350 KB total); the `blur-2xl` full-viewport backdrop layer is GPU-real but desktop-only (mobile uses cards) — keep; add `loading`/priority strategy for scenes 2–5 in Phase 4; **no video, no Lottie, no new motion dependency**.
- **SEO:** scene copy is client-rendered body content (the 3D prerender ships head-only) — the storytelling carries zero ranking weight, which cuts both ways: safe to restyle, but the *frozen H1/title/meta keep doing the SEO work* until B6 closes. No 2R/Phase 4 asset decision may touch that surface.
- **Operational:** the §2.4 CTA points at `/demo`, which depends on 3E (`demo-request.mts`) and the manual-fulfillment staffing promise (`03` §7) — a business commitment, not a creative one; flagged, not solved here.

---

## 4. Demo concept directions (one visual/narrative direction each)

All three are **scene-data sets on the existing engine** (the `02` Option-A premise) — same `StorySceneC` contract, per-concept token scope, per-concept asset set. No forks of the engine.

### 4.1 Luxury personal brand — „Podpis" (*The Signature*)
- **Palette:** Direction B (Gallery Noir) — graphite canvas, champagne accent, serif display.
- **Visual language:** large-format portrait photography in low warm light; generous black; hairline gold rules; mono captions like museum plaques.
- **Narrative arc (5 scenes):** presence → craft/story of the person → proof (press, work) → the offer → private invitation (CTA: inquiry). Slow, minimal copy — the most "expensive-feeling" of the three.

### 4.2 Interactive SaaS landing — „Produkt v pohybu" (*The Product Story*)
- **Palette:** Direction C (Porcelain & Ink) — cool canvas, slate-indigo signal, copper sparingly.
- **Visual language:** crisp product-UI stills (graded mockups, not screenshots), data-viz fragments, mono UI chrome; micro-interactions on cards/metrics (existing motion vocabulary, faster timings).
- **Narrative arc:** the problem in numbers → product reveal → how it works (3 beats in one scene rhythm) → metrics/outcome → trial/demo CTA. Demonstrates the *interactive* register: counters, hover states, a small inline interactive element (built on `ui/ifl`, no new deps).

### 4.3 Premium real estate — „Sídlo" (*The Estate*)
- **Palette:** Direction A warmed toward dusk — paper canvas with a golden-hour accent sub-token (`#B98A4E` family); no new scope needed beyond an accent override.
- **Visual language:** cinematic wide architecture stills at dusk, deep depth-of-field, the existing parallax doing the "walk toward the house" work; serif optional, restraint mandatory.
- **Narrative arc:** arrival (the approach) → light/space (interiors) → detail/materials → the neighborhood/life → private viewing CTA. The most photography-led concept — and the best stock-only candidate if Higgsfield fails its spike.

Together the three prove range across **dark-luxury / cool-product / warm-cinematic** while sharing one engine and one token architecture — which is itself the sales argument.

---

## 5. Decisions requiring owner approval (carried out of 2R)

1. **D14 palette:** Direction A for the site; B/C as demo-concept variant scopes (§1).
2. **Higgsfield stills spike spend + licensing confirmation** (§3.3) — the one open Phase 2 exit criterion. Video stays rejected unless the owner overrides.
3. **Web-font adoption** (load Inter or equivalent premium grotesque, ~2 weights; serif display for Direction B) — dependency/asset gate.
4. **B4 confirmation:** premium story leads, automation chapter demoted to the card-stack form (§2.4 note) — confirm "layer" and the compact form.
5. **B7 copy owner named**; all §2.4 copy is draft until then.
6. **OG image replacement** (asset, flagged since 3B).
7. **Demo fulfillment staffing** for the „few hours" promise (pre-Phase-4-ship, business decision).

## 6. Phase 2 exit-criteria status (per `04` §exit)

| Criterion | Status after 2R |
|---|---|
| 1. Decision for every tool | Creative-scope tools: done (§3.1). CMP/Pixel/lead-storage items: already decided/designed in `04`/`03`/Phase-3 plan (B9 email-only recorded). |
| 2. Palette directions as token candidates | **Done** (§1) — pending owner pick. |
| 3. Production-weight sample in the real engine + perf delta | **Open** — moved to Phase 4A. The Higgsfield spike is now scoped in `phase-4a-higgsfield-asset-pipeline-spike.md` and runs on the `exp/story-lab-canvas-higgsfield` branch. Exit criterion 3 closes when the spike's exit criteria (`phase-4a-higgsfield-asset-pipeline-spike.md` §5) are met and the owner approves. |
| 4. Consent + event contract designed | Done earlier (`03` §6, `04` §D/E) — not a 2R surface. |
| 5. Lead-storage decision | Done (B9 email-only, Phase-3 plan §6). |

---

## 7. Addendum (2026-06-11) — 2R feeds Phase 4A Storytelling Variant Lab

This addendum supersedes any assumption that the five-scene crossfade `ImageStoryStackC` is the definitive homepage storytelling engine. Phase 3 (3A–3F) is complete. The business requirement has evolved: the homepage storytelling must not assume a single implementation pattern. Phase 4A runs a controlled comparison lab before committing.

### 7.1 ImageStoryStackC role: baseline/control and secondary chapter

The existing `ImageStoryStackC` engine (five-scene crossfade pin, 1100vh, `motion/react`) is **not deprecated and not replaced by Phase 4A planning.** It serves two roles going forward:

1. **Baseline/control** in the Phase 4A lab (`exp/story-lab-control-crossfade`) — the known-good benchmark that every other variant must beat on the scorecard to win.
2. **Secondary chapter engine** — the current automation story data (`STORY_SCENES_C` in `imageStoryData.ts`) remains useful as the compact B4 "layer" chapter between Services and the demo-concept teaser (per `02` §homepage order, row 6), rendered as a card-stack at all breakpoints per the 2R §2.4 recommendation. This avoids a second 1100vh pin.

The engine's internals (`ImageStoryScene.tsx` TIMING array, scrim gradient, two-layer composition) are not modified in Phase 4A — only the data file changes if a new scene set is authored.

### 7.2 Main homepage target: may require a new continuous storytelling engine

The Phase 4A narrative arc (outdated site → premium rebuild → connected systems → /demo CTA) may be better expressed by a continuous, non-discrete engine than by the existing five-scene crossfade. The Variant Lab exists precisely to determine this. The following variants test alternatives:

- `exp/story-lab-canvas-higgsfield`: keyframe-driven canvas showing the website rebuilding itself
- `exp/story-lab-layered-dom`: richer DOM parallax without canvas
- `exp/story-lab-guiding-signal`: text-led progressive disclosure

If the control (`exp/story-lab-control-crossfade`) wins the scorecard, the existing engine is confirmed sufficient for the homepage and the new scene data feeds it. If a new approach wins, Phase 4B extracts and productionizes it while leaving the existing engine intact for the secondary chapter.

### 7.3 Palette decisions carried forward

| Decision | Status |
|---|---|
| Direction A (Warm Editorial Forest) for the site | Carried forward as the default for all Phase 4A variants. Pending owner pick (D14 still open). |
| Direction B (Gallery Noir) as luxury-brand demo-concept scope | Carried forward to Phase 5. Not a Phase 4A surface. |
| Direction C (Porcelain & Ink) as SaaS demo-concept scope | Carried forward to Phase 5. Not a Phase 4A surface. |

### 7.4 Higgsfield: spike-only, carried into Phase 4A

The 2R §3.1 verdict stands: **Higgsfield is spike-only (NOT approved for production)**. The spike is now concretely scoped in `phase-4a-higgsfield-asset-pipeline-spike.md` and runs during Phase 4A on the canvas-Higgsfield branch. The required output (production-weight sample + measured perf delta + license confirmation) is exit criterion 3 of the Phase 2 exit-criteria table above. Runtime video remains rejected by default throughout Phase 4A and until the scorecard and performance gate show otherwise.
