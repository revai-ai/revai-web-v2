# Phase 4A — Canvas-Higgsfield Lab Route Validation

> **Status:** preview-ready (not production-ready).
> **Date:** 2026-06-11.
> **Branch:** `exp/story-lab-canvas-higgsfield`.
> **Route:** `/__story-lab/canvas-higgsfield`.

---

## 1. Asset state

### 1.1 Raw generation assets (gitignored — never commit)

```
higgsfield-eval-phase4a/           ← root inside project, gitignored
├── accepted/
│   ├── M1.png   (1672×941, ~2.0 MB)   ACCEPTED
│   ├── M2.png   (1672×941, ~1.7 MB)   ACCEPTED
│   ├── M3.png   (1672×941, ~1.8 MB)   ACCEPTED
│   ├── M4.png   (1672×941, ~1.8 MB)   ACCEPTED
│   └── M5.png   (1672×941, ~1.9 MB)   ACCEPTED
└── rejected/                           (all prior rounds — kept for comparison)
    └── ...
```

**Hard rule:** no file from `higgsfield-eval-phase4a/` is ever committed. The directory is in `.gitignore`. Compressed preview assets derived from the accepted frames live under `public/story-lab/canvas-higgsfield/` and are the only tracked form of these images.

### 1.2 Optimized preview assets (tracked)

Compressed with Python PIL (`Image.save(… 'WEBP', quality=68, method=6)`), scaled to 1200×675 (16:9).

| Frame | Path | Size |
|---|---|---|
| M1 — Broken | `public/story-lab/canvas-higgsfield/m1.webp` | **31.5 KB** |
| M2 — Repair begins | `public/story-lab/canvas-higgsfield/m2.webp` | **28.1 KB** |
| M3 — Premium structure | `public/story-lab/canvas-higgsfield/m3.webp` | **29.0 KB** |
| M4 — Systems connecting | `public/story-lab/canvas-higgsfield/m4.webp` | **37.5 KB** |
| M5 — Sales engine | `public/story-lab/canvas-higgsfield/m5.webp` | **38.5 KB** |
| **Total** | | **164.6 KB** |

**Budget gate:** ≤ 70 KB/frame ✓ · ≤ 350 KB total ✓ (164.6 KB is 47% of budget).

---

## 2. Route

| Property | Value |
|---|---|
| URL | `/__story-lab/canvas-higgsfield` |
| SPA rewrite | `/__story-lab/*   /spa-shell.html   200` (existing in `_redirects`) |
| `noindex` (client-side) | `meta[name="robots"] = "noindex, nofollow"` injected by `StoryLabCanvasHiggsfield.tsx` |
| `X-Robots-Tag` (HTTP header) | `/__story-lab/*` block in `_headers` → `X-Robots-Tag: noindex, nofollow` |
| In `ROUTE_MAP` / `PAGE_META` | **NO** |
| In `sitemap.xml` | **NO** (verified: `grep __story-lab dist/sitemap.xml` → empty) |
| Prerendered | **NO** (SPA shell only) |

---

## 3. Interaction model

### Desktop (≥ 1024px)

- **Sticky scroll container:** `height: 1100vh`; the inner viewport is `position: sticky; height: 100vh`.
- **Five image layers** stacked absolutely; opacity controlled by `useTransform(progress, …)` from `motion/react`.
- **Timing:** identical to the production control/crossfade engine — 14% hold, 8% crossfade at each transition. Each stage "holds" for ~154vh of scroll before transitioning.
- **Two-layer composition per image:**
  - Layer A: blurred cover-fill (backdrop depth, prevents edge gaps).
  - Layer B: foreground `object-contain` (preserves the Higgsfield frame composition including the natural left quiet zone).
- **Left scrim:** warm-paper gradient from left edge, matching the production engine — copy overlays the frame's own empty left zone.
- **Caption:** eyebrow + headline + body fade in/out with each stage; final stage has the `/demo` CTA button.

### Mobile (< 1024px)

- Stacked article sections, each with image card + copy.
- `whileInView` reveal animation (disabled when `prefers-reduced-motion: reduce`).
- No sticky or pinned behavior.

### Reduced motion

- All five stages shown as full-viewport static cards with the image and copy always visible.
- No crossfades, no transitions, no spring animations.

---

## 4. Files changed / added

| File | Status | Notes |
|---|---|---|
| `src/components/story-lab/canvasHiggsfieldStages.ts` | **NEW** | Stage data (copy, image paths) |
| `src/components/story-lab/CanvasHiggsfieldStory.tsx` | **NEW** | Desktop + mobile + reduced-motion story component |
| `src/pages/story-lab/StoryLabCanvasHiggsfield.tsx` | **NEW** | Page wrapper with noindex injection and lab banner |
| `src/App.tsx` | **MODIFIED** | Added lazy import + `/__story-lab/canvas-higgsfield` route |
| `public/_headers` | **MODIFIED** | Added `/__story-lab/*` → `X-Robots-Tag: noindex, nofollow` |
| `public/story-lab/canvas-higgsfield/m{1-5}.webp` | **NEW** | Compressed preview assets |
| `.gitignore` | **MODIFIED** | Added `higgsfield-eval-phase4a/` |

---

## 5. Build validation results

| Check | Result |
|---|---|
| `npm run typecheck` | **PASS** (0 errors) |
| `npm run lint` | **PASS** (0 errors; 3 pre-existing warnings in unrelated files) |
| `npm run build` | **PASS** (clean in 1.48 s; `StoryLabCanvasHiggsfield` chunk: 10.04 kB gzip 3.01 kB) |
| `dist/sitemap.xml` contains `__story-lab` | **NO** ✓ |
| `dist/_redirects` contains `/__story-lab/*` rewrite | **YES** ✓ |
| `dist/_headers` contains `X-Robots-Tag` for `/__story-lab/*` | **YES** ✓ |
| Raw assets (`higgsfield-eval-phase4a/`) gitignored | **YES** ✓ |
| `package.json` / `package-lock.json` changed | **NO** ✓ |
| `src/`, `public/`, `netlify/` outside lab scope changed | **NO** ✓ |
| No Higgsfield credentials in repo | **YES** ✓ |

---

## 6. Known limitations (preview, not production-ready)

| Limitation | Notes |
|---|---|
| **Layered images, not true canvas** | Implementation uses `motion/react` opacity crossfades, not `ctx.drawImage()`. The route is named `canvas-higgsfield` because of the branch/lab concept; a true `<canvas>` frame engine is a Phase 4B hardening step. |
| **No Lighthouse measurement yet** | Requires a deploy preview build (not local `vite dev`). Gate: desktop ≥ 90, mobile ≥ 85. |
| **DRAFT copy** | All stage copy is B7-gated placeholder. Do not ship without copy owner sign-off. |
| **English-only copy** | No Czech translation added. Lab-only; not wired to the language context. |
| **Full 5-frame set from Round 5** | M1 and M5 are the accepted "Monolith of Strata" Round 5 frames. M2, M3, M4 were generated in Round 4 (floating-glass-pane direction, now superseded). They serve as visual placeholders to complete the 5-stage sequence; they will be replaced with Round 5 continuations when the full set is approved and generated. |
| **No Opus D15 review** | Required before any branch can advance to Phase 4B. |
| **Scorecard not yet filled** | All 14 criteria require evidence from a deploy preview. |

---

## 7. Next direction note

The next main direction after this preview is a **more polished cinematic/stage-based homepage concept** inspired by the uploaded reference video — with richer per-element choreography, tighter copy-visual synchronization, and production-grade assets from the full 5-frame "Monolith of Strata" set (Moments 2–4 pending owner spend approval). This prototype establishes the scaffold and validates the route/engine pattern; the full Phase 4B production approach will build on it.

---

## 8. Deploy-preview checks to run

After pushing this branch and getting a Netlify deploy preview:

```bash
# 1. SEO safety
curl -sI https://<preview>/__story-lab/canvas-higgsfield | grep -i "x-robots\|noindex"
# Expected: X-Robots-Tag: noindex, nofollow

# 2. Route serves 200 (not 404 or redirect)
curl -sI https://<preview>/__story-lab/canvas-higgsfield | grep HTTP
# Expected: HTTP/2 200

# 3. Sitemap clean
curl -s https://<preview>/sitemap.xml | grep -c "__story-lab"
# Expected: 0

# 4. Asset payload
curl -sI https://<preview>/story-lab/canvas-higgsfield/m1.webp | grep content-length
# Expected: ~32000

# 5. Lighthouse
# Run via PageSpeed Insights or Lighthouse CLI against the preview URL
# Gate: desktop ≥ 90, mobile ≥ 85
```
