# Phase 4A — Higgsfield Asset Pipeline Spike

> **Status:** Spike ran. Pipeline mechanics proven. Visual direction rejected. See Addendum (2026-06-11).
> **Date:** 2026-06-11.
> **Inputs:** `phase-2r-creative-tooling-spike.md` §3.1–3.3, `phase-4a-storytelling-variant-lab.md` §2.1 (canvas-higgsfield branch).
> **Gate state:** Phase 2R closed Higgsfield as "spike-only (NOT approved)" pending owner approval of spend + licensing. This document concretises the spike scope for the `exp/story-lab-canvas-higgsfield` branch. The Phase 2R verdict stands until the spike runs and the owner approves.
> **Hard stops inherited from Phase 2R:** no Higgsfield spend without owner approval; no asset with unclear license enters `public/`; runtime video rejected by default.
>
> **Filename discrepancy note:** Some Phase 4A planning references a file named
> `phase-4a-higgsfield-moment-1-5-spike.md`. **That file does not exist.** This file
> (`phase-4a-higgsfield-asset-pipeline-spike.md`) is the equivalent. All such references should resolve here.

---

## 0. Spike status and scope

Higgsfield is treated as a **capability-to-be-proven**, not an assumed capability. This spike answers one concrete question:

> Can Higgsfield generate a keyframe sequence for the "website reconstruction" narrative that (a) is commercially licensed, (b) fits within the ≤ 350 KB story asset budget when compressed, (c) raises perceived quality above the stock fallback at the same payload weight, and (d) establishes a pipeline that REVAI can replicate for client projects?

Until all four sub-questions have documented answers, Higgsfield is not in the production pipeline.

**What this spike does not decide:**
- Whether Higgsfield is used for any demo concept (Phase 5).
- Whether runtime video is ever used (rejected by default throughout; see §4.5).
- The winning storytelling variant for the homepage (that is the scorecard, not this spike).

---

## 1. Three paths (in order of preference)

The spike explores all three paths concurrently during the branch build, then selects the path that produces the highest quality within the budget constraint.

### Path 1 — Claude Code + Higgsfield connector/MCP (if available)

**Do not assume a connector exists.** Before starting, check:
```
# Check MCP tool registry for any Higgsfield connector
# Look for: higgsfield, video-generation, image-generation MCP server
# If found: load its schema via ToolSearch and evaluate capabilities
```

If a Higgsfield MCP/connector is available and:
- it supports commercial image/frame generation
- it does not require committing credentials to the repo (env-var-only)
- it can output still frames (not video-only)

Then Path 1 is usable. Claude Code orchestrates the generation brief, receives the output, and passes it through the compression pipeline.

**Path 1 is not blocked by connector absence** — if no connector exists, proceed to Path 2.

### Path 2 — Manual Higgsfield export + Claude Code compression pipeline

A team member runs Higgsfield manually (browser or API), exports the five keyframe stills, and hands them to Claude Code for:
1. Dimension verification (target ~1800×1200)
2. Palette grading check against Direction A (`#F6F4EF` canvas, `#1E1B16` ink, `#4F6F4A` signal)
3. `cwebp -q 68–75` compression to ≤ 70 KB per frame
4. File-size measurement and Lighthouse delta measurement
5. Side-by-side quality comparison against the Path 3 stock fallback

Path 2 is the primary path if no connector is available or if connector output quality is inadequate.

### Path 3 — Stock/manual webp fallback (benchmark)

**This path always runs, regardless of Paths 1 and 2.** It is the benchmark that Higgsfield must beat.

- Hand-pick five stock images matching the five narrative moments (§2.2)
- Grade to Direction A palette
- Compress through the same `cwebp -q 68–75` pipeline
- Measure: file size, Lighthouse delta, side-by-side quality

If Higgsfield (Path 1 or 2) does not produce meaningfully better quality at equal or lower payload weight, **Path 3 is used for the canvas-higgsfield branch** and the spike closes with "stock fallback selected."

---

## 2. The canvas-Higgsfield experiment

### 2.1 What the canvas-Higgsfield variant does

The `exp/story-lab-canvas-higgsfield` branch renders the story arc via a `<canvas>` layer that draws keyframes synchronized to scroll progress — similar to the Apple iPhone frame-by-frame canvas pattern but driven by the existing `motion/react` `useScroll` / `useTransform` vocabulary.

The key narrative innovation: instead of crossfading static photographs of unrelated subjects, the canvas shows **the website itself being rebuilt** — from a broken, dated state through the reconstruction and into the live sales engine.

### 2.2 Five key moments (asset brief)

| Moment | Narrative beat | Visual brief | Direction-A grading |
|---|---|---|---|
| 1 — **Broken** | The before: outdated, low-trust, slow-load site | Dim, cluttered, dated webpage screenshot/composite in shadow and cool desaturated tones; right-weighted | Grade warm: lift shadows to `#2B2823`; desaturate blues toward neutral |
| 2 — **Cleanup** | Negative space emerging; chaos resolving | The page clearing: whitespace, grid lines materialising, colour discipline appearing | Warm paper tones beginning to emerge at right |
| 3 — **Premium layout** | The REVAI-built site materialising | Crisp type, hierarchy, warm paper background, premium feel; right side shows the design in full | Full Direction A: canvas `#F6F4EF`, ink `#1E1B16`, forest signal `#4F6F4A` |
| 4 — **Connected systems** | Integrations, data flow, live site | UI fragments showing CRM/booking/demo-request connection; data flow metaphor; warm and ordered | Direction A with bronze `#8A6D4A` hairline accents |
| 5 — **Sales engine** | The outcome: demos, bookings, measurable demand | Warm dashboard/growth still; a person at ease with the result; final CTA below | Full Direction A; right side carries visual interest; left quarter quiet for scrim |

**Asset composition rule (from Phase 2R §0):** every story asset must be right-weighted — visual interest in the right two-thirds, quiet/light left third. The left-weighted scrim is hardcoded in `ImageStoryStack.tsx`. This rule applies equally to canvas-Higgsfield keyframes.

### 2.3 Keyframe vs. image sequence options

**Option A — Five static keyframes (preferred default):**
- One webp per narrative moment
- Used as canvas image sources, crossfaded via scroll progress
- Asset budget: ≤ 70 KB each, ≤ 350 KB total (same as current `/story/c/` baseline)
- Simple canvas draw: `ctx.drawImage(frame, 0, 0, w, h)` with opacity driven by scroll

**Option B — Extended frame sequence (40–80 frames, conditional):**
- A short timelapse of the website reconstruction drawn frame-by-frame on canvas
- **Only viable if:** total compressed payload stays ≤ 350 KB (roughly 4–8 KB per frame at 80 frames) AND the quality gain over Option A is measurably significant in the scorecard
- Frames must be still webp images, not video — the canvas script reads an array of `Image` objects loaded at page init (no streaming, no `<video>`)
- If an 80-frame sequence exceeds the payload budget at acceptable quality, reduce to 40 frames, then to the 5-keyframe Option A
- Frame count decision is made during the spike, not before it

### 2.4 Fallback poster image

Every canvas-Higgsfield implementation must provide a **single static fallback poster**:
- A single well-composed webp frame (e.g., Moment 3 — the premium layout materialised)
- Used as: the reduced-motion fallback, the mobile fallback (where canvas is replaced by the stacked card layout with the poster), and the `og:image` candidate (if the owner approves)
- Max: 70 KB; same Direction A grading
- The poster must make narrative sense as a standalone image (not mid-transition)

---

## 3. Pipeline specification (for all paths)

The asset pipeline must be documented in the branch. Steps:

1. **Generation / sourcing** — Higgsfield (Path 1 or 2) or stock (Path 3); record tool/source, date, and prompt/search terms used
2. **Palette grading** — match to Direction A (`#F6F4EF / #1E1B16 / #4F6F4A`); document the grading approach (LUT / manual curves / Photoshop action) so it can be repeated
3. **Resize** — target ~1800×1200 px; use `cwebp`'s `-resize` or equivalent; record exact dimensions
4. **Compression** — `cwebp -q 68 -m 6` as baseline; raise to `-q 75` only if quality is visibly degraded at 68; never exceed 70 KB per frame
5. **Measurement** — `du -sh story/p/` for total payload; Lighthouse perf (desktop + mobile) from a deploy preview with the branch assets
6. **Side-by-side comparison** — place Higgsfield and stock fallback frames side by side at production weight; document which is higher quality at equal file size

---

## 4. Requirements and hard stops

### 4.1 Licensing

- **Commercial license confirmation is required before any Higgsfield-generated image enters a branch asset directory.** Record the license tier, per-image cost, and confirmation date in the branch.
- If Higgsfield cannot provide a confirmed commercial license in writing (or in its documented terms), Path 1/2 is rejected and Path 3 (stock) is used.
- Stock images (Path 3) must carry a license covering web use + social/OG use; record the license and image IDs.
- No asset with unclear, unknown, or non-commercial licensing enters any branch's asset directory.

### 4.2 Cost

- Record the **per-asset cost** for Path 1 or 2 (credit spend, subscription cost, or per-generation fee).
- Estimate the **per-client-project cost** for replication: if generating 5 keyframes for a client costs X, document X.
- This cost estimate feeds the scorecard C8 (asset pipeline repeatability) and C10 (future client reusability).

### 4.3 Secrets and credentials

- No Higgsfield API key, token, or credential is committed to the repo.
- API keys are set as environment variables in the local shell or in Netlify's UI for the experiment branch deploy preview.
- `grep -r "higgsfield" src/ netlify/ index.html` must not return any credential string.
- If a connector/MCP uses credentials, they are passed via env vars following the same pattern as `RESEND_API_KEY`.

### 4.4 File size and Lighthouse gate

- Individual frame: ≤ 70 KB compressed webp
- Total story asset payload: ≤ 350 KB (all frames + poster)
- Lighthouse desktop perf: ≥ 90 on a deploy preview with branch assets
- Lighthouse mobile perf: ≥ 85
- If the payload cannot fit within budget at acceptable quality, reduce frame count before reducing quality

**Measurement is mandatory.** A Lighthouse report from an actual build is required — not an estimate or a local `vite dev` observation.

### 4.5 Runtime video — rejected by default

Runtime video (`.mp4`, `.webm`, HLS, DASH, or any streaming format) is **rejected for Phase 4A** unless:
1. The canvas-Higgsfield branch scores ≥ 65/70 on the scorecard AND
2. The Lighthouse perf gate passes at ≥ 90 desktop / ≥ 85 mobile WITH the video included AND
3. The owner explicitly overrides the rejection with written approval

This restates and makes binding the Phase 2R §3.1 verdict. Current story payload is ~254 KB in still webp; a single compressed hero video would likely triple that. Until the scorecard and performance gate show it is justified, video does not enter the pipeline.

---

## 5. Spike exit criteria

The Higgsfield spike for the `exp/story-lab-canvas-higgsfield` branch is complete when all of the following are documented:

| Exit criterion | Done when |
|---|---|
| Path chosen | Path 1, 2, or 3 selected and reason recorded |
| License confirmed | Written confirmation of commercial license + per-asset cost on file |
| All five keyframes produced | Right-weighted, Direction A-graded, ≤ 70 KB each |
| Fallback poster produced | Single webp, ≤ 70 KB, standalone-legible |
| Payload measured | `du -sh story/p/` shows ≤ 350 KB total |
| Lighthouse delta measured | Desktop ≥ 90, mobile ≥ 85, measured from a deploy preview |
| Side-by-side comparison done | Higgsfield vs. stock documented; quality verdict recorded |
| Pipeline documented | Step-by-step asset pipeline written in the branch (feeds C8 repeatability) |
| No uncommitted secrets | `grep -r "higgsfield\|api_key\|token" src/ netlify/` returns no credentials |

Only after all exit criteria are met does the canvas-Higgsfield branch proceed to full lab evaluation and scorecard scoring.

---

## 6. If the spike fails

If Higgsfield cannot satisfy the licensing, payload, or quality requirements:
- Path 3 (stock/manual webp) is used for the canvas-Higgsfield branch instead
- The branch is still evaluated on all scorecard criteria — the canvas mechanism itself (scroll-sync, frame draw, fallback) is tested with stock frames
- The scorecard C8 (repeatability) will reflect stock-pipeline repeatability, which is a strength
- The Higgsfield spike result is documented as "stock fallback selected" with the reason
- The Phase 2R Higgsfield exit criterion 3 (`04` §exit) remains open until either the spike passes or the stock path is formally adopted as the production default

---

## Addendum (2026-06-11) — M1/M5 bookend spike ran; visual direction rejected; re-scoped

### Spike result

The Moment 1 + Moment 5 bookend spike ran. Outputs are in `higgsfield-eval-phase4a/` (a directory that
lives **outside the repo** and is `DO-NOT-COMMIT`; it is not tracked by git and must not be `git add`-ed).

| Sub-question | Verdict |
|---|---|
| Pipeline mechanics (compression, path, tooling) | **Proven** — the accepted stills compressed within budget; the pipeline steps are reproducible. |
| Visual direction | **Rejected by owner** — the accepted M1–M5 stills show a glass browser-window shattering/reassembling on a warm beige studio backdrop. This reads too close to the existing warm-paper production style and is insufficiently cinematic. |

**Consequence:** `exp/story-lab-canvas-higgsfield` is closed as a **learning/proof branch** — the pipeline
is the learning; the visual direction is not the winner. The branch is not merged.

### Re-scope: bookend regeneration for the cinematic direction

The Higgsfield asset pipeline is re-applied to the **cinematic chaos→order direction**
(`exp/story-lab-cinematic-chaos-order`). The asset brief changes substantially:

| Moment | Old brief (rejected) | New brief (cinematic direction) |
|---|---|---|
| 1 — Chaos | Dim, cluttered legacy website screenshot in shadow | Cold, dark void; fragmented tool-shards, document-pieces, UI-elements floating disconnected — no product-photography register |
| 5 — Order | Warm dashboard/growth still; person at ease | Serene, resolved composition; warm emergent light; clean measurable-output signals — cinematic, not product-photo |

The §2.2 asset brief in this document (the glass-browser/website-rebuild brief) is **superseded** for the
primary direction. The new brief is in `phase-4a-primary-cinematic-direction.md` §2 + §6.

### Baseline to beat

The accepted M1/M5 stills are the **explicit baseline** new bookends must surpass on the cinematic
acceptance gates (`phase-4a-primary-cinematic-direction.md` §7.1). Being visually different from those
stills is a pass condition, not just a nice-to-have.

### Asset location and gate (restated)

`higgsfield-eval-phase4a/` is `DO-NOT-COMMIT`. **No asset from that directory may be copied into any
branch's `public/` or committed to the repo without passing the Phase 4A performance gate** (≤ 350 KB total
story payload, Lighthouse desktop ≥ 90 / mobile ≥ 85 on a deploy preview). This rule applies to the
re-generated bookends for the cinematic direction exactly as it applied to the original set.

### Runtime video (restated)

Runtime video remains rejected by default throughout Phase 4A (§4.5 of this document, unchanged).
