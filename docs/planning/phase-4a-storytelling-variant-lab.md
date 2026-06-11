# Phase 4A — Storytelling Variant Lab

> **Status:** planning only. No code, no branches, no assets, no installs, no deploys changed by this document.
> **Date:** 2026-06-11.
> **Inputs:** `phase-2r-creative-tooling-spike.md`, `phase-3-foundation-implementation-plan.md`, `phase-3d-prerender-seo-validation.md`, `phase-3e-demo-request-validation.md`, `06-implementation-roadmap.md`, `02-information-architecture.md`, `03-conversion-architecture.md`, `phase-1-b6-seo-baseline.md`; code-level read of `ImageStoryStack.tsx`, `ImageStoryScene.tsx`, `MobileImageStoryStack.tsx`, `imageStoryData.ts`, `DemoRequest.tsx`.
> **Gate state:** Phase 3 (3A–3F) complete. B6 NOT closed — homepage H1/title/meta wording stays frozen throughout Phase 4A. B4 default = premium-web story leads (not confirmed as a specific implementation pattern). B5 approved (demo primary). B7 copy owner not yet named — all copy in this document is DRAFT structure, not shippable text.

---

## 0. Purpose and standing constraints

### 0.1 What Phase 4A is

Phase 4A is a **controlled R&D lab, not homepage production.**

The goal is to compare multiple premium scroll-storytelling approaches side by side before committing any single approach to the live homepage. The existing `ImageStoryStackC` engine (five-scene crossfade pin) is the **baseline/control** — a proven, shipped pattern — but it is not the assumed winner. It may emerge as the right choice. It may not. That question is answered by the lab.

### 0.2 The meta-goal (why this is a lab, not a build)

REVAI is not only redesigning one homepage. It is learning and systematizing how it builds premium scroll-storytelling websites for clients. The lab's output is therefore not "a better homepage" alone — it is a **replicable, documented methodology** for constructing scroll-storytelling that REVAI can repeat across client projects at varying budget and complexity levels.

Every experiment must be evaluated on *future client project reusability*, not just homepage visual quality. An approach that scores a 5 on wow but a 1 on repeatability is not a product.

### 0.3 Standing constraints (binding throughout Phase 4A)

- **B6 frozen:** no homepage H1/title/meta/static-head rewrite anywhere in this phase.
- No `/cenik` content change.
- No protected `/sluzby/*` slug, content, or redirect change.
- No changes to production routing, prerender, sitemap, `_redirects`, or Netlify functions.
- No dependency installs without the explicitly approved dependency pass.
- No assets committed to `public/` in the main branch or any indexed environment.
- **Lab routes are `noindex` and excluded from sitemap** (see §3).
- No dynamic workflows.
- Experiment branches are never merged to `main` — only the Phase 4B productionization step extracts the chosen approach.

---

## 1. Narrative arc (the story all variants must tell)

All experiment branches share one narrative arc. The story is not about REVAI's automation capability (that is the current site's story). The Phase 4A story is about what REVAI does to a client's web presence:

```
BEFORE      — Outdated / broken / low-trust website
               Dated design, slow load, invisible in search, no story.
               Every visitor it loses is invisible in the numbers.
                    ↓
TRANSFORM   — The reconstruction
               Premium layout, craft typography, trust signals, clear hierarchy.
               A visitor decides in seconds. Craft is not decoration — it is trust.
                    ↓
CONNECTED   — Integrated systems
               The site as a live sales instrument: CRM, booking, demo flow.
               Not a brochure — a working machine.
                    ↓
ENGINE      — The measurable sales engine
               Demo requests, bookings, enquiries. Visible from day one.
                    ↓
CTA         → /demo  ("Chci demo svého webu" / "I want a demo of my website")
```

**Five checkpoints** map naturally to the five-scene engine count — a coincidence of design, not a hard constraint. A continuous engine may express the same arc as one unbroken scroll. The narrative arc is invariant across branches; the *mechanism* for expressing it is what each branch explores.

**Copy:** all scene copy is B7-gated (DRAFT until the owner assigns a copy owner). Phase 4A uses structural placeholder copy for evaluation purposes only. No placeholder copy ships.

---

## 2. Experiment branches

### 2.1 Required branches (no new dependency approval needed)

| Branch | Pattern | Based on | Key evaluation question |
|---|---|---|---|
| `exp/story-lab-control-crossfade` | Five-scene sticky-pin crossfade; same engine internals as current `ImageStoryStack.tsx` | `ImageStoryStack.tsx` + new scene data | Is the existing engine sufficient with the new arc and better assets? Does it earn its 1100vh patience? |
| `exp/story-lab-canvas-higgsfield` | Canvas-rendered image/keyframe sequence; scroll-synced frame drawing | New `<canvas>` layer; Higgsfield/stock keyframes from the spike (§3 / `phase-4a-higgsfield-asset-pipeline-spike.md`) | Does a keyframe sequence that shows the website rebuilding itself raise the quality ceiling enough to justify the asset pipeline? |
| `exp/story-lab-layered-dom` | Multi-layer DOM composition; deep z-index + transform stack; rich parallax; no canvas | DOM-only; no new scroll library dependency | Does a richer DOM parallax approach match canvas quality while remaining simpler to maintain? |
| `exp/story-lab-guiding-signal` | Progressive-disclosure signal path: text-first, image-second; a guiding typographic/visual path that leads the eye through the arc before imagery fills in | DOM-only; no canvas | Does a text-architecture-first approach outperform image-first on conversion clarity and client-project reusability? |

### 2.2 Optional branch (requires separate dependency-pass approval)

| Branch | Pattern | Gate |
|---|---|---|
| `exp/story-lab-gsap-scrolltrigger` | GSAP ScrollTrigger-driven cinematic scroll; richer per-element choreography than the current spring-based Motion engine | **Blocked until the approved dependency pass explicitly names `gsap`.** Do not create this branch or install gsap without that approval. If the owner wants this variant evaluated, request the dependency approval first — it is a separate decision. |

### 2.3 Branch discipline

- All branches use the prefix `exp/story-lab-` — clearly ephemeral, scopable for cleanup.
- Each branch is forked from `main` at the Phase 3 tip (post-3F).
- Branch work lives under a new directory — **no edits to existing homepage components** (`Hero.tsx`, `ImageStoryStack.tsx`, `ImageStoryScene.tsx`, `MobileImageStoryStack.tsx`, `imageStoryData.ts`, `Home.tsx`) in any experiment branch. The control branch may reference `imageStoryData.ts` read-only.
- Branches are never merged to `main`. Phase 4B extracts only the chosen approach.
- A branch that fails a disqualification criterion in the scorecard is closed, not patched to pass.

---

## 3. Lab routes

Lab routes are local/preview R&D surfaces only. They are never indexed, never in the sitemap, and never promoted to production URLs.

| Route | Branch | Description |
|---|---|---|
| `/__story-lab/control` | `exp/story-lab-control-crossfade` | Crossfade control with Phase 4A scene data |
| `/__story-lab/canvas-higgsfield` | `exp/story-lab-canvas-higgsfield` | Canvas + Higgsfield/stock keyframe sequence |
| `/__story-lab/layered-dom` | `exp/story-lab-layered-dom` | Multi-layer DOM parallax |
| `/__story-lab/guiding-signal` | `exp/story-lab-guiding-signal` | Progressive-disclosure signal-path approach |
| `/__story-lab/gsap-scrolltrigger` | `exp/story-lab-gsap-scrolltrigger` | GSAP variant (conditional on dependency approval) |

### 3.1 Noindex and sitemap exclusion

Lab routes must emit `<meta name="robots" content="noindex, nofollow">` — set via `useDocumentMeta` in each lab route component.

Lab routes are **not added to `ROUTE_MAP` or `PAGE_META`**. The prerender system (`scripts/prerender.ts`) generates only from `ROUTE_MAP`, so lab routes are excluded from `dist/sitemap.xml` by default. Do not add them.

### 3.2 Routing note for when branches are created

The current `_redirects` catch-all is `/* /404.html 404` (Phase 3D). Lab routes therefore need an explicit `200` rewrite to `spa-shell.html` for the `/__story-lab/*` prefix — identical to how `/brozura-*` brochure routes are handled. This rewrite belongs only in the experiment branch, not in `main` or any production `_redirects`.

---

## 4. Production gates (all required; no branch wins on wow alone)

No variant advances to Phase 4B unless it passes every gate. Visual quality alone is not a gate. A 5/5 wow score with a failing mobile fallback is a disqualified branch.

| Gate | Requirement | Evidence form |
|---|---|---|
| **Desktop quality** | Full narrative arc is legible, premium, and strongly differentiated at 1280px and 1920px | Side-by-side screenshots + screen recording |
| **Mobile fallback** | Non-pinned mobile experience (375px–430px); all five story beats visible and readable; no layout overflow; Lighthouse mobile perf ≥ 85 | Screenshots at 375px/430px + Lighthouse mobile report |
| **Reduced-motion fallback** | `prefers-reduced-motion: reduce` path presents all story content accessibly; no content hidden behind unreachable motion states | Manual test with reduced-motion forced; a11y audit |
| **Performance budget** | Total story asset payload ≤ 350 KB (matching Phase 2R baseline); Lighthouse desktop perf ≥ 90; mobile ≥ 85; new JS bundle delta within threshold agreed per branch | Lighthouse report; `du -sh` on story assets |
| **Accessibility** | WCAG 2.1 AA: all copy reachable without motion; no color-contrast failures; no keyboard trap; decorative layers `aria-hidden` | Axe or equivalent + keyboard walkthrough |
| **Repeatability for client projects** | The approach is documented as a replicable methodology; asset pipeline is not bespoke to REVAI or this single project | Written methodology note checked in with the branch |
| **Demo CTA integration** | Final story beat drives to `/demo` (locale-aware, via `localizedHref`); CTA functions correctly; routes correctly in both CZ and EN | Form submission test on deploy preview |
| **SEO safety** | Lab route confirmed `noindex` in served HTML; no production route, `ROUTE_MAP`, `PAGE_META`, or sitemap affected | `grep noindex` in served HTML; `curl -sI` on lab URL; `grep -r "__story-lab" src/i18n/` returns empty |

---

## 5. Scorecard

Each branch is scored against all 14 criteria in `phase-4a-storytelling-scorecard.md` before the winner decision. An **Opus-tier review** is required before any winner is declared. The scorecard explicitly includes disqualification criteria that override total score.

---

## 6. Sequencing

| Step | Status | Output |
|---|---|---|
| Phase 4A planning (this doc + scorecard + Higgsfield spike plan) | **Done** | Lab plan, scoring system, spike brief |
| Phase 4A branch creation | Pending | 4 branch worktrees forked from `main` at Phase 3 tip |
| Phase 4A implementation | Pending | Each branch builds + mounts its lab route |
| Phase 4A asset spike | Pending (needs owner approval for spend) | Higgsfield or stock keyframes for the canvas branch |
| Phase 4A scoring | Pending | All 4 branches scored; Lighthouse reports captured |
| Phase 4A Opus review | Pending | Independent review of scorecards + diffs |
| Phase 4A winner decision | Pending owner sign-off | One branch named winner |
| Phase 4B | Pending | Winner extracted, productionized, production-ready |

---

## 7. What Phase 4A does not decide

- **Copy.** Scene copy is B7-gated. All 4A copy is structural placeholder.
- **Homepage H1/title/meta.** B6 frozen; unchanged throughout 4A. The lab routes are not the homepage.
- **Asset source.** Higgsfield vs. stock is decided by the spike gate and owner approval (`phase-4a-higgsfield-asset-pipeline-spike.md`).
- **Demo-concept variants.** Phase 5 work. 4A is homepage storytelling only.
- **Services section reorder.** Phase 4C work, after the winner lands.
- **Secondary automation chapter placement.** B4 "layer" decision. Phase 4C.
- **Hero ambient upgrade.** Phase 4C — the Hero is untouched in 4A.
