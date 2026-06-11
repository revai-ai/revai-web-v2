# Phase 4A — Primary Cinematic Direction

> **Status:** Direction decided. Supersedes the four-way bake-off framing of `phase-4a-storytelling-variant-lab.md`.
> **Date:** 2026-06-11.
> **Branch:** `exp/story-lab-cinematic-chaos-order` (already checked out locally; no remote yet).
> **Inputs:** Owner review of `higgsfield-eval-phase4a/accepted/M1–M5.png`; `phase-4a-storytelling-variant-lab.md`; `phase-4a-higgsfield-asset-pipeline-spike.md`; `phase-2r-creative-tooling-spike.md`; `06-implementation-roadmap.md`.
> **Gate state inherited:** B6 frozen (homepage H1/title/meta stay unchanged). B5 approved (demo primary). B7 (copy owner not yet named — all copy below is DRAFT structure). No dependency installs. No production merges before Opus review.

---

## 0. Strategic correction this document records

Phase 2R and the original variant-lab plan assumed the *homepage* storytelling arc would reposition toward
**website-building** (outdated site → premium rebuild → /demo), with AI automation demoted to a secondary
chapter. The owner's revised direction **reverses** that:

- **Homepage** stays primarily about **AI process automation** — chaos→order. This is the B6-safe choice:
  the existing `STORY_SCENES_C` automation arc maps directly to the cinematic stages below, so the homepage
  cinematic work is a *re-skin of an existing, SEO-aligned story*, not a repositioning.
- **Website-building** offer gets its **own cinematic sequence** on `/sluzby/tvorba-modernich-webu` (planning
  only in Phase 4A; any future implementation uses a lab route, never edits the live service page).
- Three **cinematic demo concepts** are added later, framed explicitly as "REVAI demo concept — illustrative,
  not a real client" (not Phase 4A implementation scope).

---

## 1. Decision

### 1.1 canvas-higgsfield branch: closed as learning/proof

`exp/story-lab-canvas-higgsfield` proved the **canvas pipeline and asset compression mechanics** but its visual
direction is rejected by the owner:

- The accepted bookend stills (`higgsfield-eval-phase4a/accepted/M1–M5.png`) show a **glass browser-window
  shattering and reassembling on a warm beige studio backdrop**.
- This reads **too close to the existing warm-paper production style** and **is not cinematic enough**.
- The learning is recorded and the branch is preserved for reference. It is **not merged as winner**.

### 1.2 New primary visual direction

**Cinematic, stage-based chaos→order storytelling** — inspired by the reference video provided by the owner.
The visual language must be **distinctly cinematic**: dark void space, particle/fragment fields, emergent
structure, light as signal. It must depart clearly from the warm-studio/product-literal look of the existing
production site and the glass-browser bookends.

### 1.3 Branch

**`exp/story-lab-cinematic-chaos-order`** — already created locally. Push to origin when the first
scaffolding commit is ready.

### 1.4 Lab variant status change

| Branch | Status after this decision |
|---|---|
| `exp/story-lab-canvas-higgsfield` | Closed — learning/proof branch. Pipeline proven; direction rejected. |
| `exp/story-lab-control-crossfade` | Retained — baseline engine + secondary-chapter engine (per Phase 2R §7.1). |
| `exp/story-lab-layered-dom` | Parked — revisit only if the cinematic direction fails its gates. |
| `exp/story-lab-guiding-signal` | Parked — revisit only if the cinematic direction fails its gates. |
| **`exp/story-lab-cinematic-chaos-order`** | **Active — primary direction.** |

This reframes Phase 4A from a four-way bake-off to a **committed primary direction with a retained control
baseline**.

---

## 2. Homepage cinematic narrative

**Story:** AI process automation — chaos→order.
**SEO constraint:** B6 frozen. Homepage H1/title/meta/static head **unchanged**. The cinematic section is body
content below the hero — it carries zero indexed ranking weight and is safe to restyle without a B6 review.
**Mapping:** stages map directly to the existing `STORY_SCENES_C` scene IDs in `src/components/home/imageStoryData.ts`.
No homepage copy, H1, title, or meta change is authorised by this document.

| Stage | Narrative beat | Cinematic object (right side) | Maps to `STORY_SCENES_C` id |
|---|---|---|---|
| **1 — Chaos** | Scattered processes / manual chaos / fragmented tools | Cold, dark void; tool-shards, document-fragments, UI-elements floating disconnected in low-light space | `manual-chaos` |
| **2 — Signal** | Signal emerges / pattern recognition | A coherent line of light cuts through the noise; fragments begin to orient toward it | `ai-routing` |
| **3 — Structure** | Workflows align / structure forms | A lattice or grid materialises; elements lock into lanes; order is visible | `automation-execution` |
| **4 — Network** | AI automation network connects systems | Glowing connective network lights up — CRM, email, database, voice AI nodes linking | `systems-connected` |
| **5 — Order** | Calm business operating system / measurable order | Serene, resolved composition; warm; clean numbers visible; a person at ease | `measurable-output` |

### 2.1 CTA path (gated)

Final stage CTA: consultation/automation-audit primary (existing scene-5 `CALENDAR_URL`), `/demo` available as
secondary. **No homepage copy change is authorised here.** The CTA wording is B7-gated (copy owner not yet
named). This document does not change the CTA path — it only records the intended direction for when B7 closes.

---

## 3. Website-building page cinematic narrative

**Route context:** `/sluzby/tvorba-modernich-webu` — B6-protected URL, indexable content preserved.
**Phase 4A scope:** planning only. Any future implementation prototypes on a lab route (e.g.
`/__story-lab/web-rebuild`) and **never edits the live service page in this phase**. The lab route follows
the same noindex/sitemap-exclusion rules as all lab routes (see `phase-4a-storytelling-variant-lab.md` §3).

| Stage | Narrative beat | Cinematic object |
|---|---|---|
| **1 — Before** | Old / low-trust website | Dated, dim, cluttered legacy site rendering in shadow; cool, desaturated tones |
| **2 — Structure** | Storytelling structure emerges | Narrative scaffold and content hierarchy materialising; whitespace and grid appearing |
| **3 — Premium** | Premium web experience forms | Craft typography, warm light, trust signals, full premium layout assembled |
| **4 — Connected** | Connections to forms / CRM / booking / lead routing | The site as a live instrument; data-flow lines linking booking/CRM/demo-request nodes |
| **5 — Engine** | Premium sales engine | Measurable demand visible; final CTA → `/demo` |

The web-rebuild CTA **may** point to `/demo` because `/sluzby/tvorba-modernich-webu` is not the B6-frozen
homepage — but no implementation is authorised in Phase 4A. This is recorded for Phase 4B/4C planning.

---

## 4. Three cinematic demo concepts

Each is the **same REVAI chaos→order methodology** applied in a different business context. Each is labelled
explicitly: **"REVAI demo concept — illustrative, not a real client."** These are not Phase 4A implementation
scope; they are planning targets for Phase 5.

The three concepts below **recast** Phase 2R §4's luxury-brand / SaaS / real-estate "show-range" set toward
**SME-relatable business contexts** (medium-sized business owners, the target buyer). The engine +
per-concept `.variant-*` token-scope reuse principle from Phase 2R carries forward; only the narrative and
palette vary.

### 4.1 Professional-services SME
*Accounting / legal / consultancy — process automation + internal agents*

**Arc:** Manual document/email intake (chaos) → AI routing and classification → automated workflows + CRM
integration → connected client-facing and internal systems → measurable throughput (order).

**Why this demo:** Professional-service owners understand the pain of email/document overload immediately.
The "measurable throughput" outcome maps cleanly to billable-hours recovery — a concrete ROI story.

### 4.2 Field-service / trades SME
*HVAC / installation / logistics — voice agents + booking automation*

**Arc:** Missed calls + manual scheduling (chaos) → AI voice agent answering and routing → connected calendar
and CRM → automated job confirmation and follow-up → measurable booked and completed jobs (order).

**Why this demo:** Voice agent demos are visually compelling and the missed-call pain point is universal for
field-service businesses. Booking automation is the most direct "money left on the table" narrative.

### 4.3 Retail / hospitality SME
*Multi-channel shop / hotel / clinic — premium web + automation + lead routing*

**Arc:** Dated web + scattered orders/reservations (chaos) → premium site + connected order/booking/lead
routing → automated follow-up and CRM integration → measurable sales engine (order).

**Why this demo:** This demo crosses web-design + automation — the most complete showcase of the full REVAI
service stack. It directly mirrors the website-building narrative (§3) applied to a high-relatability context.

### 4.4 Owner decision gate

The three SME concepts above are a **proposal requiring owner confirmation** before Phase 5 planning begins.
The alternative is retaining Phase 2R §4's luxury-brand / SaaS / real-estate set. Both use the same engine
and token-scope architecture; only the target audience framing differs.

---

## 5. Interaction style

**Stage-based scroll** (not endless freeform continuum):

| Behaviour | Spec |
|---|---|
| Scroll unit | One scroll action (or swipe) advances to the **next stage** |
| Transition | Smooth, cinematically timed (existing `cubic-bezier(0.16,1,0.3,1)` vocabulary as baseline) |
| Hold | Stage **holds** before the next transition begins |
| Copy side | Left side — copy explains the business point for the current stage |
| Visual side | Right side — cinematic object **transforms** between stages |
| Mobile | Stacked stage cards (same pattern as `MobileImageStoryStackC`) |
| Reduced motion | Static selected frames per stage — all content accessible without motion |

**Implementation note (for the branch, not this doc):** the discrete "one scroll = one stage" stepping is a
refinement over the current continuous 1100vh scroll timeline in `ImageStoryStack.tsx`. The branch should
evaluate scroll-snap vs. stepped `useTransform` progress bucketing — this is a lab design question to be
resolved in `exp/story-lab-cinematic-chaos-order`, not locked by this planning document.

---

## 6. Asset strategy

### 6.1 Bookend-first gate

1. Generate homepage **Stage 1 + Stage 5** bookends first — the two tonal extremes (highest wow-factor
   signal, fastest visual validation).
2. Evaluate the bookends against the acceptance gates (§7) **before** generating Stages 2–4.
3. Only after the bookends pass → generate **Stages 2–4**.
4. Only after the full five-stage set passes → scaffold the lab route.

This gate prevents wasted generation spend if the overall visual direction needs correction.

### 6.2 What the new bookends must beat

The prior glass-browser M1/M5 stills (`higgsfield-eval-phase4a/accepted/`) are the **baseline to beat**.
The new bookends must:
- Depart clearly from the warm-studio / product-literal aesthetic.
- Read as **genuinely cinematic**: dark field, light as signal, emergence, not a product-photography
  still of a rendered browser window.
- Business meaning legible **without text** (the most important visual gate).

### 6.3 Model assignment for asset work

| Task | Model |
|---|---|
| Cinematic prompt/art-direction, Stage 1 + Stage 5 generation | **Fable 5** |
| Docs, scaffolding, compression pipeline, validation | **Sonnet 4.6** |
| Final variant selection review (after scorecard complete) | **Opus 4.8** |

This is consistent with the model policy in `06-implementation-roadmap.md` Phase 4A.

### 6.4 Video

Runtime video (`.mp4`, `.webm`, or any streaming format) is **rejected for Phase 4A**. Video is at most an
optional review / social / fallback artifact — it is **never** the primary implementation. This restates
`phase-4a-higgsfield-asset-pipeline-spike.md` §4.5.

### 6.5 Asset location and gate

All generated assets stay **uncommitted and local** (outside the repo, following the
`higgsfield-eval-phase4a/` `DO-NOT-COMMIT` pattern) until they pass the performance gate (≤ 350 KB total
story payload, Lighthouse desktop ≥ 90 / mobile ≥ 85 on a deploy preview). No asset enters any branch's
`public/` directory without that gate passing.

---

## 7. Acceptance gates

### 7.1 Cinematic-direction-specific (new for this direction)

| Gate | Pass condition |
|---|---|
| **Distinct from production** | Visual language clearly different from the existing warm-paper/product-photo production style |
| **Visibly cinematic** | Dark field, light as signal, emergence, transformation — not a product-photography or studio register |
| **Business meaning without text** | A viewer unfamiliar with REVAI can infer the chaos→order business meaning from the image alone |
| **Homepage reads as AI automation** | The staged cinematic sequence, read with the existing copy, still tells an AI-automation story — not a web-design story |

### 7.2 Carried gates (from `phase-4a-storytelling-variant-lab.md` §4)

| Gate | Requirement |
|---|---|
| **Performance budget** | Story asset payload ≤ 350 KB; Lighthouse desktop ≥ 90; mobile ≥ 85 |
| **Mobile fallback** | All five stages visible and readable at 375px–430px; no overflow |
| **Reduced-motion fallback** | All story content accessible without motion (WCAG 2.1 AA) |
| **No sitemap exposure** | Lab route emits `noindex`; not in `ROUTE_MAP` / `PAGE_META` / `dist/sitemap.xml` |
| **Demo CTA functional** | Final stage CTA routes correctly in both CZ and EN |
| **No production merge** | Branch never merged to `main` before full scorecard + Opus review |

A branch failing any cinematic-direction gate (§7.1) is revised before scoring, not patched after.
A branch failing any carried gate (§7.2) is subject to the disqualification rules in `phase-4a-storytelling-scorecard.md`.

---

## 8. Next implementation steps

| Step | Owner | Status |
|---|---|---|
| Branch `exp/story-lab-cinematic-chaos-order` exists locally | — | Done (current branch) |
| Generate homepage Stage 1 + Stage 5 bookends (Fable 5 art direction) | Implementer | **Next** |
| Evaluate bookends against §7.1 gates | Owner + implementer | Pending |
| Generate Stages 2–4 (only after bookends pass) | Implementer | Blocked on bookend gate |
| Scaffold `/__story-lab/cinematic-chaos-order` lab route (noindex; branch-only `_redirects` rewrite; not in `ROUTE_MAP`/`PAGE_META`/sitemap) | Implementer | Blocked on bookend gate |
| Full scorecard evaluation | Implementer | Blocked on lab route |
| Opus-tier review | Opus 4.8 | Blocked on scorecard |
| Owner sign-off → Phase 4B | Owner | Blocked on Opus review |

---

## 9. Open owner decisions (non-blocking for Phase 4A)

1. **Homepage terminal CTA:** consultation-primary vs. `/demo`-primary. B5 approved demo-primary but B7 copy
   owner not yet named — no copy change authorised. Direction recorded; execution gated on B7.
2. **Demo-concept categories:** SME-relatable set (§4) vs. Phase 2R's luxury-brand / SaaS / real-estate set.
   Owner confirmation required before Phase 5 planning begins.
3. **`exp/story-lab-cinematic-chaos-order` push to origin:** optional before first commit; no blocker.

---

## Appendix — Filename discrepancy note

The Phase 4A planning refers in some contexts to a file named
`phase-4a-higgsfield-moment-1-5-spike.md`. **That file does not exist.**
The equivalent real file is **`phase-4a-higgsfield-asset-pipeline-spike.md`**. All references to the
moment-1-5 spike should resolve to that file. The addendum in `phase-4a-higgsfield-asset-pipeline-spike.md`
records the spike result and re-scopes the bookend regeneration.
