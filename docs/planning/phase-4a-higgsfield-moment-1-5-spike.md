# Phase 4A — Higgsfield Moment 1 + Moment 5 Generation Spike

> **Status:** spike executed — first approved test generation complete.
> **Date:** 2026-06-11.
> **Branch:** `exp/story-lab-canvas-higgsfield` (documentation only; no code, no assets in repo).
> **Approvals honored:** commercial license confirmed OK by owner; spend approved for Moment 1 + Moment 5 test generation only; full 5-frame set NOT generated (separate approval still open).
> **Inputs:** `phase-4a-higgsfield-connector-capability-note.md` (§11 cost preflight), `phase-4a-higgsfield-asset-pipeline-spike.md`, `phase-4a-storytelling-variant-lab.md`, `phase-2r-creative-tooling-spike.md` §3.3.

---

## 1. What was generated

Two visual proof-of-concept stills for the future canvas-Higgsfield storytelling variant (Path 1, Direction A "Warm Editorial Forest"), per the 2R §3.3 tonal-extremes brief:

| Moment | Narrative beat | Iterations | Final candidate |
|---|---|---|---|
| **1 — Broken** | Outdated, fragmented, low-trust website as "elegant digital ruins" | 1 (first attempt accepted) | `moment-1-broken-soul-cinematic-v1.png` |
| **5 — Engine** | Reconstructed premium sales engine; connected systems, conversion readiness | 2 (v1 rejected, one refinement) | `moment-5-engine-soul-cinematic-v2.png` |

No other moments were generated. No assets entered the repo.

---

## 2. Model, parameters, and cost per output

| Output | Model | Aspect | Output dimensions | Credits |
|---|---|---|---|---|
| Moment 1 v1 (accepted) | `soul_cinematic` | 3:2 | **2016 × 1344** | 0.12 |
| Moment 5 v1 (rejected) | `soul_cinematic` | 3:2 | 2016 × 1344 | 0.12 |
| Moment 5 v2 (accepted) | `soul_cinematic` | 3:2 | 2016 × 1344 | 0.12 |

- **Total actual spend: 0.36 credits** (verified via `transactions`: three `Soul Cinematic` spend entries of −0.12 each; balance 400.14 → **399.78**).
- Escalation ladder was NOT needed: `soul_location`, `cinematic_studio_2_5`, and `recraft-v4-1` were not used. `soul_cinematic` met the quality bar in ≤ 2 iterations per moment, and Direction A palette fidelity was achievable by prompt alone — no explicit `colors` grounding required.
- Output dimensions **2016 × 1344 exceed the ~1800×1200 target** — confirms the open "exact pixel dimensions" unknown from the capability note §5. Downscale + `cwebp` will be needed anyway, so this is headroom, not waste.

### Generation job IDs (Higgsfield)

| Output | Job ID |
|---|---|
| Moment 1 v1 | `20203cd4-cbfc-41e9-bf2b-dec595de5509` |
| Moment 5 v1 | `3bd72de7-ff2d-4ac9-bfd1-cad92d862640` |
| Moment 5 v2 | `e1c916fa-1e3b-4ab8-a9a4-a4f6b1835754` |

---

## 3. Prompts used

### Moment 1 v1 (accepted)

> Premium editorial photograph, cinematic still. Concept: an outdated, broken, low-trust website expressed as a physical scene of elegant digital ruins. Right two-thirds of the frame: a dim, dated workspace in disarray — old dark computer monitors with blank lifeless screens, fragmented torn wireframe sheets and curling paper layouts scattered and overlapping, tangled grey cables, fine dust in the air, sagging shelves, visual fatigue and clutter, the feeling of a neglected system quietly failing. Left third of the frame: a quiet, empty, warm paper-toned wall in soft daylight, completely uncluttered negative space. Color grading: warm paper off-white #F6F4EF, deep graphite ink #1E1B16 in the shadows, muted desaturated mid-tones, one faint muted forest green #4F6F4A accent object. Serious, somber, archival — elegant decay, not trashy or comic. Soft directional window light from the left, shallow cinematic depth of field. Absolutely no readable text, no letters, no logos, no screen UI, no people. Photorealistic editorial magazine quality, believable as a premium brand storytelling image, not a generic stock photo.

### Moment 5 v1 (rejected — see §5)

> Premium editorial photograph, cinematic still. Concept: a rebuilt, premium digital sales engine expressed as a refined physical scene — the after-state of a website reconstruction. Right two-thirds of the frame: an immaculate modern studio workspace — a sleek minimal display glowing with soft warm abstract light (no readable interface), connected by slender bronze and brass conduit lines running cleanly along the wall suggesting integrated systems, pipelines and automation flowing toward the viewer; precisely ordered stacks of fine archival paper, a small healthy forest-green plant, exact geometry, calm forward momentum, a sense of quiet machinery working. Left third of the frame: a quiet, empty warm paper-toned wall in gallery daylight, uncluttered negative space. Color grading: warm paper canvas #F6F4EF, graphite ink #1E1B16 details, forest green #4F6F4A accents, subtle bronze #8A6D4A hairline detailing. Confident, polished, trustworthy, premium craft, business momentum. Soft morning light from the left, cinematic but believable. Absolutely no readable text, no letters, no logos, no UI characters, no people. Photorealistic editorial magazine quality, not a generic SaaS stock image, no neon, no sci-fi dashboard.

### Moment 5 v2 (accepted — refinement)

> Premium editorial photograph, cinematic still. Concept: a rebuilt, premium digital sales engine expressed as a refined physical scene — the after-state of a website reconstruction. Right two-thirds of the frame: an immaculate modern studio workspace — a sleek minimal wall-mounted display whose screen shows only a soft warm abstract gradient of light, like a blank canvas glowing at dawn, with absolutely no interface, no menu bar, no rows of marks, no icons, no characters of any kind on the screen; around the display, slender bronze and brass conduit lines run cleanly along the wall in precise rectilinear paths, suggesting integrated systems, pipelines and automation quietly at work; below, a dark graphite desk with precisely ordered stacks of fine archival paper, a closed dark notebook, and a small healthy forest-green plant; exact geometry, calm forward momentum. Left third of the frame: a quiet, empty, pale warm paper-white wall, the exact tone of warm archival paper #F6F4EF, softly lit gallery daylight, completely uncluttered flat negative space — NOT gold, NOT dark, just pale warm off-white. Color grading: dominant warm paper canvas #F6F4EF, graphite ink #1E1B16 details, forest green #4F6F4A accents, restrained subtle bronze #8A6D4A only in the thin conduit lines. Confident, polished, trustworthy, premium craft, business momentum. Soft morning light from the left, cinematic but believable. Absolutely no readable text, no letters, no logos, no UI, no people. Photorealistic editorial magazine quality, not a generic SaaS stock image, no neon, no sci-fi dashboard.

**Refinement deltas v1 → v2:** screen content pinned to "abstract gradient of light … no menu bar, no rows of marks"; left third pinned to "pale warm paper-white … NOT gold, NOT dark"; bronze restricted to "only in the thin conduit lines."

---

## 4. Output locations (NOT in repo — do not commit)

Local evaluation directory, deliberately **outside** the repo working tree:

```
/Users/jan.rehberger/CURSOR_LOCAL/higgsfield-eval-phase4a/
├── DO-NOT-COMMIT.md                          (local guard note)
├── moment-1-broken-soul-cinematic-v1.png     (2016×1344, ~2.5 MB raw PNG)
├── moment-5-engine-soul-cinematic-v1.png     (rejected candidate, kept for comparison)
└── moment-5-engine-soul-cinematic-v2.png     (2016×1344, accepted)
```

Higgsfield CDN URLs (may expire; job IDs in §2 are the durable reference via `job_display`):

- Moment 1 v1: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_083614_20203cd4-cbfc-41e9-bf2b-dec595de5509.png`
- Moment 5 v1: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_083621_3bd72de7-ff2d-4ac9-bfd1-cad92d862640.png`
- Moment 5 v2: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_084209_e1c916fa-1e3b-4ab8-a9a4-a4f6b1835754.png`

No generated file is tracked by git. `public/` and `src/` are untouched.

---

## 5. Quality assessment

### Moment 1 v1 — Broken (ACCEPTED)

**Strengths**
- Narrative reads instantly: dark monitors with dead screens, tangled cables, scattered fragmented paper layouts — "neglected system quietly failing" with genuine editorial gravity. Serious, not trashy.
- Left third is a literal flat warm-paper panel — the quiet zone is maximally usable for the future scrim/text layer.
- No rendered text, no logo. The pinned wireframe sheet is a faint pencil sketch — close-up inspection confirmed no readable characters.
- Palette: graphite shadows, warm desaturated mids, one green accent object present. On-direction.

**Weaknesses**
- The left third is rendered as a hard-edged flat panel (split-screen feel) rather than a continuous photographic wall — useful for the scrim, but the abrupt vertical edge may need a soft gradient blend in post or a reframe if the canvas sequence wants continuous space.
- Right side is very dark; in a graded series next to Moment 5 the exposure gap is large (defensible as the narrative point, but the in-between Moments 2–4 must bridge it).

### Moment 5 v1 — Engine (REJECTED)

- Composition and bronze conduit motif were excellent, but two brief violations: (a) **faint rendered UI text** on the screen (a thin nav row with word-like marks — exactly the "fake unreadable UI text" failure mode), and (b) the left third rendered as a **saturated gold panel**, off the #F6F4EF warm-paper canvas and inconsistent with Moment 1's quiet zone.

### Moment 5 v2 — Engine (ACCEPTED)

**Strengths**
- Screen shows a pure abstract warm light gradient — close-up inspection confirmed **zero text, zero UI marks**.
- Bronze hairline conduits run in clean rectilinear paths across a warm-paper panelled wall — "connected systems / pipelines / automation" communicated without any dashboard cliché.
- Left third is a flat pale warm-paper wall: quiet zone met, and tonally consistent with Moment 1's quiet zone (the two frames now share the same left-third treatment — good for series coherence and crossfade).
- Graphite sideboard, ordered objects, healthy forest-green plant: hierarchy, polish, trust. Palette is the strongest Direction A match of the three outputs.

**Weaknesses**
- Reads as premium interior/brand scene more than explicitly "website" — the website metaphor is carried by the screen + conduits; acceptable for a proof-of-concept, worth one more art-direction pass when generating the full set.
- Conversion-readiness ("pointing toward /demo") is implied by momentum and order, not by any explicit visual device — by design (no text allowed), the CTA will be carried by the DOM layer.

---

## 6. Brief-compliance checklist

| Requirement | Moment 1 v1 | Moment 5 v2 |
|---|---|---|
| Direction A palette (#F6F4EF / #1E1B16 / #4F6F4A) | **PASS** (graphite-dominant by design; paper + green present) | **PASS** (strongest match; bronze #8A6D4A as hairlines) |
| Right-weighted composition | **PASS** | **PASS** |
| Quiet left-third zone for scrim/text | **PASS** (flat paper panel) | **PASS** (flat paper wall, consistent with M1) |
| No rendered text | **PASS** (verified at crop zoom) | **PASS** (verified at crop zoom; v1 failed this) |
| No logo | **PASS** | **PASS** |
| No stock-photo vibe / SaaS cliché / neon / sci-fi | **PASS** | **PASS** |
| Cinematic but believable premium scene | **PASS** | **PASS** |
| 3:2 aspect, ≥ ~1800×1200 | **PASS** (2016×1344) | **PASS** (2016×1344) |

**Direction A achieved: YES** — by prompting alone, on the cheapest model, without `recraft-v4-1` palette grounding.
**Text/logo contamination in accepted outputs: NONE** (one rejected candidate had faint UI text — the failure mode is real and must be checked per frame in the full set).

---

## 7. Canvas-sequence suitability

- Both accepted frames share the same structural grammar: flat quiet paper-toned left third + right-weighted scene, 3:2, 2016×1344. They will crossfade/canvas-draw cleanly against the left-weighted scrim.
- The dark→light tonal arc between Moment 1 and Moment 5 is exactly the narrative contrast wanted; Moments 2–4 need to bridge exposure and carry the wall/desk spatial grammar so the sequence reads as one place transforming.
- Series consistency risk (capability note §4: no style-lock across calls) is real but manageable: the v1→v2 refinement showed prompt-pinning the quiet-zone tone works. A shared prompt scaffold (same wall, same light direction, same palette clause) is the recommended mechanism for the full set, possibly plus reference-image input (`medias[].role = "image"`) from these accepted frames.
- Raw PNGs are ~2.5–3 MB; the §3 pipeline (downscale to ~1800×1200 + `cwebp -q 68`) still must prove the ≤ 70 KB/frame gate — not yet run, deliberately out of this spike's scope.

**Suitable for a canvas sequence: YES, with the shared-scaffold consistency approach for Moments 2–4.**

---

## 8. Verdict (Round 1 — soul_cinematic mood stills)

| Question | Answer |
|---|---|
| Is Path 1 (connector generation) visually proven for Direction A? | **YES** — both moments pass the brief on `soul_cinematic` at 0.12 credits/frame, ≤ 2 iterations each |
| Was escalation (soul_location / cinematic_studio_2_5 / recraft-v4-1) needed? | **NO** |
| Total spend (Round 1) | **0.36 credits** (balance after: 399.78) |
| Are soul_cinematic mood stills the final target? | **NO — see §9 pivot** |

---

## 9. Pivot: cinematic morph sequence (2026-06-11)

### 9.1 Why the mood-still direction is not the final target

The `soul_cinematic` Round 1 outputs (M1 and M5) established Direction A palette viability and left-third quiet-zone framing. However, reviewing the canvas-Higgsfield brief against the original inspiration (a locked-composition reference video), the correct target is **not** "premium mood stills that evoke a website" — it is a **cinematic morph sequence**:

- One locked physical composition throughout all 5 frames
- One persistent main object: a digital display (monitor/screen) in the same position in every frame
- The **transformation happens on the screen** — broken website layout → premium rebuilt website layout
- The room context changes subtly (entropy → order), but the camera angle, framing, and main object remain constant
- Left third: quiet for DOM copy overlay; right side: the display and the story

The soul_cinematic outputs are interior mood photographs — premium and on-palette, but they do not meet the locked-composition morph requirement. They show two different scenes rather than one scene transforming. They are not used further.

---

## 10. Bakeoff: nano_banana_2 vs cinematic_studio_2_5 (Round 2, 2026-06-11)

### 10.1 Models tested

| Model requested | Model actually used (server coercion) | Cost/frame | Aspect | Resolution |
|---|---|---|---|---|
| `nano_banana_pro` | **`nano_banana_2`** (server auto-coerced) | 2 credits | 16:9 | 1K |
| `cinematic_studio_2_5` | `cinematic_studio_2_5` | 2 credits | 16:9 | 1K |

**Note:** `nano_banana_pro` was silently coerced to `nano_banana_2` by the Higgsfield server. This means the "Google — ultimate quality" tier was not tested; what was tested is the "Google — fast, photorealistic" tier. For a final full-set generation, a `nano_banana_pro`-explicit model ID or an explicit resolution escalation would be needed.

### 10.2 Job IDs

| Output | Model | Job ID |
|---|---|---|
| M1 nano_banana | `nano_banana_2` | `72fcabbe-03b2-41ae-894e-4e9609c43fa0` |
| M5 nano_banana | `nano_banana_2` | `2e27d38a-f2aa-4803-9dd4-dddd38925b7a` |
| M1 cinematic_studio | `cinematic_studio_2_5` | `11dda3cb-d04c-4125-b208-3be841d5e0a3` |
| M5 cinematic_studio | `cinematic_studio_2_5` | `c95a9373-7481-4c2a-9460-c08bc3c01126` |

### 10.3 Prompts used

**Moment 1 (both models — identical):**
> Cinematic editorial still photograph. Frame 1 of a locked-composition 5-frame website reconstruction morph sequence. Scene: a sleek flat-panel display mounted directly on a warm off-white wall (#F6F4EF), positioned in the right two-thirds of the frame, with a minimal dark desk below. The display screen shows the abstract structure of a broken, outdated website — fragmented, misaligned rectangular layout blocks in washed-out grey and muddy dull tones, weak visual hierarchy, disordered sections, no coherent grid, digital decay expressed only through abstract color-and-form composition. A cable sags loosely near the desk. Left one-third of the frame: a flat, empty warm-paper wall (#F6F4EF), soft even gallery daylight, clean negative space for future text. Direction A palette: warm paper #F6F4EF dominant, graphite shadows #1E1B16, one faint muted forest green #4F6F4A detail, bronze #8A6D4A in the monitor frame. Soft left-side window light, shallow depth of field, premium editorial magazine photography quality. The website on screen is visible as layout geometry only — absolutely no readable text, no letters, no words, no numbers, no logos, anywhere in the image or on the screen. Right-weighted composition. Not sci-fi, not neon, not cyberpunk, not generic SaaS stock.

**Moment 5 (both models — identical):**
> Cinematic editorial still photograph. Frame 5 of a locked-composition 5-frame website reconstruction morph sequence. Scene: the same sleek flat-panel display, same wall, identical position and framing as Frame 1. The display screen now shows the abstract structure of a premium, reconstructed website — clean strong hierarchy: clear header band, bold primary content block, ordered card sections, elegant column grid, refined color discipline in warm and forest tones, confident compositional geometry suggesting a complete business presence with forms and booking flows as abstract ordered shapes. The room: ordered and confident — a small forest-green plant on the desk, precise stacks of archival paper, no clutter. Left one-third: the same flat warm-paper wall (#F6F4EF), same gallery daylight, quiet negative space. Direction A palette: warm paper #F6F4EF dominant, graphite #1E1B16 details, forest green #4F6F4A accent in plant and one screen section, bronze #8A6D4A monitor frame hairline. Same soft left-side window light as Frame 1, shallow depth of field. Premium editorial magazine quality. Absolutely no readable text, no letters, no words, no numbers, no logos anywhere, including on the screen. Right-weighted composition. Not sci-fi, not neon, not generic SaaS stock.

### 10.4 Output locations

```
/Users/jan.rehberger/CURSOR_LOCAL/higgsfield-eval-phase4a/
├── bakeoff-m1-nano-banana-2-v1.png         (1376×768, ~1.4 MB)
├── bakeoff-m5-nano-banana-2-v1.png         (1376×768, ~1.4 MB)
├── bakeoff-m1-cinematic-studio-25-v1.png   (1376×768, ~1.8 MB)
└── bakeoff-m5-cinematic-studio-25-v1.png   (1376×768, ~1.6 MB)
```

CDN URLs (may expire; job IDs above are the durable reference):
- M1 nano_banana_2: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_091321_72fcabbe-03b2-41ae-894e-4e9609c43fa0.png`
- M5 nano_banana_2: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_091326_2e27d38a-f2aa-4803-9dd4-dddd38925b7a.png`
- M1 cinematic_studio: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_091329_11dda3cb-d04c-4125-b208-3be841d5e0a3.png`
- M5 cinematic_studio: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_091335_c95a9373-7481-4c2a-9460-c08bc3c01126.png`

### 10.5 Per-output assessment

#### nano_banana_2 M1 — Broken (PASS for screen content; COMPOSITION MISMATCH with M5)

**Screen content:** Wall-mounted flat-panel display in a warm-toned wood-framed monitor on a dark console/shelf. Screen shows clearly fragmented rectangular blocks in grey/brown/silver — reads immediately as "broken website layout geometry." No readable text confirmed by crop zoom. ✓

**Room:** Warm-ish wall close to #F6F4EF, dark console, cable visible ✓. Left side has a window with soft light — not a fully flat quiet zone but acceptable.

**Composition:** Monitor wall-mounted, centered to right-of-center, dark shelf below. Loose cable. Editorial quality is good.

**Direction A palette:** Partial — warm wall and wood/bronze frame ✓; screen is grey-dominant (by design for the broken state) ✓.

**Critical issue:** The M1 setup is **wall-mounted** (flat on the wall, frontal view). The M5 setup for the same model is a **desktop on a table** (angled perspective). These two frames **cannot morph** — they are different physical setups.

---

#### nano_banana_2 M5 — Engine (PASS for screen content and palette; COMPOSITION MISMATCH with M1)

**Screen content:** Desktop computer monitor on a wooden table, angled 3/4 perspective. Screen shows a premium website layout with: warm paper/sand header band, bold dark forest green primary section, mixed content cards with earth/warm tones and greens, ordered column grid. This is the **best Direction A screen content of all four outputs** — the palette match is excellent.

**Room:** Warm wooden desk, small forest-green plant on right, paper stacks, premium feel ✓.

**Text check:** Horizontal bars visible as placeholder text rows — not readable letters; similar to "Lorem ipsum" bars in a design mockup. Marginal pass; at canvas rendering distance this is acceptable.

**Direction A palette:** BEST of all 4 — warm paper tone, forest green, graphite, very on-direction ✓.

**Critical issue:** **Desktop on table at an angle** — completely different setup from the wall-mount in nano_banana M1. Unusable as a morph-sequence pair with M1.

---

#### cinematic_studio_2_5 M1 — Broken (PASS for screen concept; weak palette; COMPOSITION MISMATCH with M5)

**Screen content:** Wall-mounted TV on a plain warm wall, dark console below. Screen shows grey/blue-grey rectangular blocks in a stacked Mondrian-like composition — clean abstract layout geometry, clearly readable as "broken website structure." Zero text confirmed by crop zoom ✓.

**Room:** Very stark and plain — the warm wall is close to #F6F4EF but the room has no warmth or editorial richness.

**Direction A palette:** Weakest of all 4 — plain beige wall, no green, no bronze, just grey and off-white.

**Critical issue:** Wall-mounted setup (matches M1 nano_banana geometry), but the M5 for this model is a desktop.

---

#### cinematic_studio_2_5 M5 — Engine (PARTIAL PASS — palette present; screen reads more design-tool than website; COMPOSITION MISMATCH)

**Screen content:** Desktop monitor on a wooden desk, angled. Screen shows a warm sand/paper header band, dark forest green primary block, and a lower half with a card grid plus what looks like color chips/swatches and toggle-like elements — reads more like an interface design tool (Figma/style guide) than a website layout. The color palette on screen is excellent Direction A, but the visual metaphor is off.

**Room:** Small plant on right ✓, paper stacks ✓, wooden desk, bronze frame ✓. Direction A palette in the room is good.

**Direction A palette:** Good in the room; the screen content is on-palette but the layout metaphor is weak.

**Critical issue:** Desktop-on-table vs wall-mount M1; same composition mismatch.

---

### 10.6 Composition-continuity verdict (critical failure for the morph concept)

| Pair | M1 setup | M5 setup | Morph-compatible? |
|---|---|---|---|
| nano_banana_2 | Wall-mounted TV, frontal | Desktop on table, angled | **NO** |
| cinematic_studio_2_5 | Wall-mounted TV, frontal | Desktop on table, angled | **NO** |

Both models independently arrived at the same interpretation: "broken website → old wall-mounted TV; premium website → modern desktop." This is the model's default semantic mapping for "broken vs premium digital display" — a pattern that overrides the explicit composition-lock instruction unless the physical setup is pinned with extreme specificity.

**Root cause:** The prompt said "same flat-panel display mounted on wall … same wall, identical position" in M5, but the model re-interpreted "premium, reconstructed website … ordered and confident … forest-green plant" as a desktop studio scene. The "Frame 5 of a sequence" framing was not sufficient to override the model's scene-style inference.

---

### 10.7 Direction A and website-reconstruction readability

| Criterion | Best output | Notes |
|---|---|---|
| "Broken website" on screen readability | nano_banana_2 M1 | Grey fragmented blocks, cleanest abstract layout |
| "Premium website" on screen readability | nano_banana_2 M5 | Best website-hierarchy-as-color-blocks; closest to actual layout mockup |
| Direction A palette (room + screen) | nano_banana_2 M5 | Warm paper, forest green, graphite all present |
| Screen text-free compliance | All 4 pass | No readable text; nano M5 has placeholder-row bars (marginal) |
| Website-reconstruction reading as a pair | **NONE** | Composition mismatch prevents any pair from reading as same-scene morph |

---

### 10.8 Model winner

**nano_banana_2** is the stronger model for this concept:
- Photorealism is higher than cinematic_studio_2_5 at 1K
- Direction A palette execution is better (warmer tones, more accurate colours)
- Screen layout content more closely resembles actual website hierarchy (vs cinematic_studio's design-tool feel)
- **Caveat:** the requested `nano_banana_pro` was silently coerced to `nano_banana_2`; true `nano_banana_pro` output is untested

---

### 10.9 Spend (Round 2)

- 4 images × 2 credits = **8.00 credits**
- Balance before: 399.78
- Balance after: **391.78**
- Total spend across all rounds (Rounds 1 + 2): **8.36 credits**

---

## 11. Recommendation

| Question | Answer |
|---|---|
| Does the cinematic morph sequence concept work in principle? | **YES** — both models can render a display with website-layout geometry on screen; the "website on screen" metaphor is clearly legible |
| Is the locked-composition requirement met? | **NO** — both models switched from wall-mount (M1) to desktop-on-table (M5); morph continuity fails |
| What must be solved before the full 5-frame set? | **Composition pinning**: explicitly fix one physical setup (recommend wall-mounted monitor, frontal, same dark desk/shelf below) and pin the camera angle and room geometry across all 5 prompts |
| Which model to use for the composition-pinning iteration? | **nano_banana_2** (best palette and photorealism at this tier); try explicit `nano_banana_pro` model ID in the next call to verify if the coercion persists |
| Should the full 5-frame set be generated now? | **NO** — composition lock must be solved first (one more targeted M1+M5 pair with explicit setup pinning) |
| Should the canvas route/engine be implemented now? | **YES — scaffolding can begin**. The concept is proven; the screen-layout-as-morph-frame approach works. The engine does not depend on final assets — use the nano_banana M1 and M5 as placeholder bookends for the canvas implementation, exactly as the control branch used /story/c/ placeholders. Final assets can drop in after the composition issue is resolved. |
| Next generation step | One targeted nano_banana_2 bakeoff with explicit composition pin: specify wall-mounted monitor OR desktop (pick one), camera angle, exact same room description element-by-element, and add a reference image input (`medias[].role = "image"`) from the accepted M1 to anchor M5's composition |
| Model tier for canvas engine implementation | **Sonnet 4.6** for the engine scaffolding (mechanical React/canvas work). **Fable 5** for the next generation/art-direction step and for visual judgment on whether the composition-pinning attempt succeeds. |

> **Superseded by §12:** rather than pinning a physical monitor setup, the visual concept was pivoted away from physical interiors entirely. See the floating-canvas correction below.

---

## 12. Nano Banana floating-canvas correction (Round 3, 2026-06-11)

### 12.1 Why the physical-monitor direction was rejected

Round 2 (§10) failed composition continuity: both models mapped "broken website" to an old wall-mounted TV and "premium website" to a modern desktop monitor — different physical objects that can never morph into each other. Rather than fighting the models' semantic prior with ever-more-specific room descriptions, the concept was pivoted **away from physical interiors entirely**:

- **No room, no desk, no monitor, no TV, no office.** Physical-display semantics are what dragged the composition apart.
- **New main object: one large floating glass website canvas** — a browser-window-proportioned pane of architectural glass hovering in an infinite warm-paper studio void.
- The pane itself carries the abstract website layout; the transformation (broken → premium sales engine) happens **on and to the pane**, while camera, position, and scale stay locked.
- This also matches the cinematic morph-sequence reference video energy better than any interior could: the object is unambiguously *the website*, not a screen in a room showing a website.

### 12.2 Model used and coercion finding

`nano_banana_pro` was requested; job metadata again reported **`nano_banana_2`** (same silent coercion as Round 2). However, the **billing ledger records both spends as "Nano Banana Pro"** — so the coercion may be an internal model-ID alias rather than a genuine tier downgrade. Treated as nano_banana_2-tier output for evaluation purposes per the work-mode instruction; the ambiguity is recorded here and does not block the direction decision.

`soul_cinematic` and `cinematic_studio_2_5` were not used.

### 12.3 Prompt scaffold

**Shared base (identical wording in both prompts):**

> Premium cinematic concept still — frame from a locked-camera 5-frame website transformation morph sequence. Environment: an infinite seamless warm paper-toned studio void, color #F6F4EF, soft warm editorial gallery light, only a faint soft shadow beneath the floating object — no room, no walls, no furniture, no desk, no monitor stand, no wall-mounted television, no office interior, no laptop, no keyboard, no people. Main object: ONE large floating glass website canvas — a wide rounded-rectangle pane proportioned like a minimalist browser window, made of fine architectural glass with a thin graphite #1E1B16 frame edge, hovering weightlessly in the right 60% of the frame, viewed straight-on from a locked eye-level camera, filling most of the right half of the image. The pane carries an abstract website layout made ONLY of flat rectangular color panels — a header band, content blocks, card rows — pure layout geometry with absolutely no readable text, no letters, no words, no numbers, no icons, no logos, no brand marks anywhere. Left 40% of the frame: completely empty warm paper #F6F4EF negative space reserved for future typography — nothing in it. […state block…] Cinematic depth, fine film grain, premium editorial art direction — not sci-fi, not neon, not cyberpunk, not a generic SaaS mockup.

**M1 state block (BROKEN):**

> Transformation state of this frame: BROKEN. The glass canvas is cracked and decaying — thin fracture lines run across the pane; its layout panels are misaligned, overlapping and sliding out of the grid; dull washed-out grey and muddy taupe panel tones; weak, cluttered, chaotic hierarchy; pieces at the lower right edge of the pane break away into drifting glass shards and fine dust dissolving downward; the inner glow is dim and uneven. Mood: serious, elegant digital ruins — refined decay, not horror, not trashy, not comic. Palette: warm paper #F6F4EF, graphite ink #1E1B16, faint muted forest green #4F6F4A trace, subtle bronze #8A6D4A hairline detail.

**M5 state block (RECONSTRUCTED)** — plus an added continuity clause in the object description ("the exact same pane, same position, same scale, same camera as the broken frame of this sequence"):

> Transformation state of this frame: RECONSTRUCTED. The same glass canvas is whole and pristine — its layout panels perfectly aligned in a confident grid: warm paper #F6F4EF panels, graphite #1E1B16 structural blocks, bold forest green #4F6F4A action blocks with one prominent green call-to-action panel, strong clear hierarchy; the glass glows softly with warm inner light; slender bronze #8A6D4A lines flow out from the right edge of the canvas, connecting to a few small floating abstract nodes and rings that imply CRM, forms, booking and data pipelines orbiting the canvas; faint motes of warm light rise around it. Mood: premium sales engine fully alive — calm power, business momentum, cinematic wow. Palette: warm paper #F6F4EF, graphite ink #1E1B16, forest green #4F6F4A, subtle bronze #8A6D4A linework.

No reference image was used — the new textual concept was deliberately generated clean to avoid anchoring back to the physical-monitor setup.

### 12.4 Outputs, cost, dimensions

| Output | Job ID | Dimensions | Credits |
|---|---|---|---|
| M1 glass-broken (accepted) | `edac3240-0605-46e2-bc58-da1ea5c6dede` | 1376 × 768 | 2 |
| M5 glass-engine (accepted) | `e478ca64-838e-432d-8b49-fbf9bc0bb390` | 1376 × 768 | 2 |

- **Round 3 spend: 4.00 credits** (balance 391.78 → **387.78**; verified via `transactions`, two −2 "Nano Banana Pro" entries).
- **Cumulative spike spend (Rounds 1–3): 12.36 credits** (~3% of starting balance).
- Both accepted on first attempt — **no refinement iteration was needed** (limit was 4 images; 2 were generated).

Local files (outside repo, with `DO-NOT-COMMIT.md` guard):

```
/Users/jan.rehberger/CURSOR_LOCAL/higgsfield-eval-phase4a/
├── glass-m1-broken-nano-banana-2-v1.png   (1376×768, ~1.7 MB)
└── glass-m5-engine-nano-banana-2-v1.png   (1376×768, ~1.2 MB)
```

CDN URLs (may expire; job IDs are durable):
- M1: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_092356_edac3240-0605-46e2-bc58-da1ea5c6dede.png`
- M5: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_092404_e478ca64-838e-432d-8b49-fbf9bc0bb390.png`

### 12.5 Visual assessment

**M1 glass-broken — PASS**
- One floating rounded-rectangle glass pane in a warm paper void, thin graphite frame, soft shadow — no room, no furniture, no monitor hardware. The pivot worked.
- Layout panels are misaligned grey/taupe blocks sliding off-grid; fine fracture lines across the glass; the lower-right corner shatters into drifting shards. "Elegant digital ruins" achieved — serious, restrained, not horror.
- Left ~40%: completely empty warm paper. Quiet zone fully met.
- Crop-zoom check: zero text, zero letters, zero logos.

**M5 glass-engine — PASS**
- The same class of object: floating rounded-rectangle glass pane, right-of-frame, similar scale and slight three-quarter angle.
- Layout: confident grid — graphite header bands, warm paper panels, bold forest-green content blocks, one small light inset block inside a green panel that reads as a CTA/button without any text. Strong hierarchy; unmistakably a website.
- Bronze hairline circuit-paths flow out of the pane to small nodes and orbit rings — connected CRM/forms/booking/pipelines implied exactly as briefed; bronze, not neon, so it stays editorial.
- Light motes and warm inner glow give it noticeably more energy than the rejected Round 1 interior M5 — **wow/action improved**.
- Crop-zoom check: zero text, zero letters, zero logos.
- Minor notes: a few bronze lines and motes drift into the left half (the leftmost ~35% remains clean — acceptable for the scrim); pane proportions are slightly more square than M1's wider pane, and the perspective angle differs by a few degrees.

### 12.6 Continuity verdict

| Criterion | Round 2 (monitors) | Round 3 (floating canvas) |
|---|---|---|
| Same object class in M1 and M5 | **FAIL** (wall TV vs desktop) | **PASS** (one floating glass pane in both) |
| Same position/scale | FAIL | **PASS (approximate)** — both right-of-frame, similar size |
| Same camera | FAIL | **MOSTLY** — both slight 3/4 float; angle differs by a few degrees |
| Reads as two frames of one morph | NO | **YES** — broken pane → reconstructed pane is legible as one object transforming |

**Same-object continuity: dramatically improved and now fundamentally sound.** The remaining gap (pane proportion/angle drift of a few degrees) is the kind of drift the full-set generation should close by passing the accepted M1 as a reference image (`medias[].role = "image"`) and/or reusing the seed-stable scaffold; it does not invalidate the direction.

### 12.7 Verdict and recommendation

| Question | Answer |
|---|---|
| Does the pair now read as cinematic website reconstruction? | **YES** — the floating glass canvas is unambiguously "the website," and broken → rebuilt reads as one object transforming |
| Did wow/action improve over previous M5 attempts? | **YES** — bronze system lines, nodes, light motes; alive rather than decorative |
| Direction A palette | **PASS in both** — paper void, graphite frame/structure, forest green action blocks, bronze linework |
| Text/logo contamination | **NONE** in either frame (crop-zoom verified) |
| Proceed to full 5-frame generation? | **YES — this scaffold is good enough.** Generate Moments 2–4 from the same shared base prompt with interpolated state blocks (e.g. M2 "fractures sealing, panels drifting back toward the grid", M3 "grid locked, panels still pale/unfinished", M4 "color and green action blocks arriving, first bronze lines emerging"), passing the accepted M1/M5 as reference images to pin pane geometry. Requires the still-open owner approval for full-set spend (~6–10 credits at 2/frame incl. one retry margin). |
| Proceed to canvas route implementation? | **PROCEED** — the direction is proven; scaffold the route/engine against these two accepted frames as untracked placeholders (same placeholder pattern as the control branch). Implementation no longer needs to wait on generation. |
| Open items carried forward | nano_banana_pro/2 alias ambiguity (cosmetic); pane-geometry pinning via reference image in the full set; cwebp ≤ 70 KB + Lighthouse gates; Path 3 stock side-by-side; Opus-tier D15 approve/reject before anything ships |

---

## 13. Full 5-frame floating-canvas sequence (Round 4, 2026-06-11)

> **Owner direction honored:** full 5-frame sequence approved; floating-glass-canvas direction kept; Frame 5 pushed harder toward "sales engine."

### 13.1 What was generated

Four new frames completing the sequence — Frames 2, 3, 4, and a **boosted Frame 5** (replacing Round 3's M5 as the final state). Round 3's accepted M1 remains **Frame 1** unchanged. Reference-image anchoring via `medias[].value = <job_id>` was used for the first time and worked: the connector resolved prior job IDs into `reference_images` inputs.

| Frame | State | Reference anchor | Job ID | Credits |
|---|---|---|---|---|
| 2 — Repair beginning | cracks sealing, shards returning, panels re-aligning | Frame 1 (`edac3240…`) | `8bb57f35-3dec-43e8-84f4-5b843d2ce5e5` | 2 |
| 3 — Premium structure formed | whole pane, clean grid, first green action block, no external systems yet | Frame 1 (`edac3240…`) | `a759daeb-ba5b-49b4-87bc-108a3a669a33` | 2 |
| 4 — Systems connecting | first bronze lines/nodes arriving at the right edge, green blocks glowing | Round 3 M5 (`e478ca64…`) | `0c3f257a-ce13-41bb-82f7-668ab7ee8817` | 2 |
| 5 — Full sales engine (boosted) | dense bronze pipeline network, visible lead inflow (dots + blank glass chips) converging into glowing green conversion zones | Round 3 M5 (`e478ca64…`) | `b8fdcce9-a5f1-4702-91c7-e01229e0f9b1` | 2 |

- **Model:** `nano_banana_pro` requested; job metadata reported **`nano_banana_2`** again (consistent with Rounds 2–3); billing ledger again says "Nano Banana Pro." Behavior recorded; treated as the same Nano Banana path throughout — all 5 frames of the final sequence are therefore from one model family, which helps series consistency.
- **All frames 1376 × 768 (16:9, 1K).**
- **Round 4 spend: 8.00 credits** (4 × 2; balance 387.78 → **379.78**, verified via `transactions`). 4 of the allowed 7 images were generated — no regeneration was needed.
- **Cumulative spike spend (Rounds 1–4): 20.36 credits** (~5% of starting balance).

### 13.2 Final sequence files (outside repo — do not commit)

```
/Users/jan.rehberger/CURSOR_LOCAL/higgsfield-eval-phase4a/
├── glass-m1-broken-nano-banana-2-v1.png            FRAME 1 (Round 3, unchanged)
├── glass-f2-repair-nano-banana-2-v1.png            FRAME 2
├── glass-f3-structure-nano-banana-2-v1.png         FRAME 3
├── glass-f4-connecting-nano-banana-2-v1.png        FRAME 4
├── glass-f5-salesengine-boosted-nano-banana-2-v1.png  FRAME 5 (boosted, replaces Round 3 M5)
└── glass-m5-engine-nano-banana-2-v1.png            (Round 3 M5 — superseded, kept as reference anchor)
```

CDN URLs (job IDs above are the durable reference via `job_display`):
- F2: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_093737_8bb57f35-3dec-43e8-84f4-5b843d2ce5e5.png`
- F3: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_093746_a759daeb-ba5b-49b4-87bc-108a3a669a33.png`
- F4: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_093755_0c3f257a-ce13-41bb-82f7-668ab7ee8817.png`
- F5 boosted: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_093803_b8fdcce9-a5f1-4702-91c7-e01229e0f9b1.png`

Prompts: the §12.3 shared base was reused verbatim per frame with (a) a leading continuity clause naming the reference image's role ("the reference image is frame 1/5 of the same sequence — keep the EXACT same floating pane object, same position, same scale, same camera angle"), and (b) a swapped per-frame state block (REPAIR BEGINNING / PREMIUM STRUCTURE FORMED / SYSTEMS CONNECTING / FULL SALES ENGINE). Full prompt text is preserved in the Higgsfield job records.

### 13.3 Per-frame visual verdict

| Frame | Verdict | Notes |
|---|---|---|
| 1 — Broken | **PASS** (carried from §12.5) | Fractured grey pane, shattering corner, empty left 40% |
| 2 — Repair | **PASS** | Same pane geometry as F1 (left-edge-closer angle matches almost exactly); most cracks sealed, last shards hovering at the lower-right edge mid-return; panels warming from grey toward taupe with the first muted green hints; reads unmistakably as "the same object healing" |
| 3 — Structure | **PASS** (weakest of the set) | Whole pristine pane, graphite header band, clean paper card grid, single green action block; calm and composed as intended — but the least dynamic frame, panel field is mostly white/paper and the header band is heavy; acceptable as the quiet midpoint; candidate for a warmth retouch if any frame is ever redone |
| 4 — Connecting | **PASS** | Premium green/graphite/paper layout active; bronze circuit lines, nodes and one ring emerging from the right edge; green blocks glowing gently; energy clearly between F3 and F5 |
| 5 — Sales engine (boosted) | **PASS — boost achieved** | Dense elegant bronze network on the right; visible inflow of small bronze/green lead-dots plus tiny blank glass chips streaming along the pipeline curves INTO the canvas; lines converge into glowing forest-green conversion zones; the pane radiates warm light; clearly stronger sales-engine reading than the superseded Round 3 M5 — attracts, routes, converts is legible without a single word |

**Text/logo contamination: NONE in any frame** — crop-zoom verified on F4's green blocks/CTA chip, F5's lead-chip stream, and F5's header band. The "incoming client cards" rendered as blank glass chips exactly as briefed.

### 13.4 Sequence continuity verdict

| Criterion | Verdict |
|---|---|
| Same object class across all 5 | **PASS** — one floating glass pane in a warm paper void, every frame |
| Same environment | **PASS** — seamless #F6F4EF void + soft floor shadow throughout; zero room/desk/monitor regressions |
| Same position/scale | **PASS** — right-of-frame, comparable scale in all 5 |
| Quiet left zone | **PASS** — left ~35–40% clean in all 5 (faint motes near the pane edge in F4/F5, far left untouched) |
| Camera | **PASS with note** — F1/F2 lean with the pane's left edge nearer; F3 sits near-frontal; F4/F5 lean with the right edge nearer (inherited from their respective reference anchors). Scrolled 1→5 this reads as one slow graceful rotation of the pane while it heals — a defensible, even attractive, motion arc for a crossfade/canvas sequence rather than a continuity break. A strict-lock purist could regenerate F4/F5 against F1's angle, but the current arc is coherent and cinematic. |
| Reads as 5 stages of one transforming object | **PASS** |

### 13.5 Verdict and next steps

| Question | Answer |
|---|---|
| Boosted Frame 5 clearly reads as a sales engine? | **YES** — lead inflow, pipeline routing, glowing conversion zones; a cold viewer sees attraction → routing → conversion momentum, not just a pretty redesign |
| Whole-set continuity | **PASS** (with the intentional-rotation note above) |
| Weakest frame | **Frame 3** — least dynamic, palest panel field; fit for purpose as the calm midpoint; optional warmth retouch only if the canvas build shows it sags in sequence |
| Any frame requiring regeneration before implementation? | **NO** — all five pass the quality bar; F3 retouch is optional polish, not a blocker |
| Ready for canvas route implementation? | **YES — implement now** against these five frames as untracked local assets; the cwebp ≤ 70 KB/frame + ≤ 350 KB total pipeline gate runs as part of that work before anything enters a tracked path |
| Strong enough for a later video/motion artifact? | **YES, promising** — the locked object + escalating-energy arc is exactly the input a frame-interpolating video model needs; generate only as a review/social/fallback artifact after the 5-frame set is validated in the canvas engine (runtime video remains rejected by default per spike §4.5) |
| Remaining gates before assets enter the repo | cwebp/payload + Lighthouse gates; Path 3 stock side-by-side benchmark; Opus-tier D15 approve/reject |

> **Superseded by §14:** the owner rejected the Round 3–4 floating-glass-pane outputs as too basic, too sterile and too wireframe-like. The §13 5-frame set is NOT used as a positive reference going forward.

---

## 14. Fresh high-wow art-direction reset (Round 5, 2026-06-11)

> **Owner direction honored:** full visual reset. The flat "floating glass rectangle with simple UI blocks" direction (Rounds 3–4) is rejected and is not used as a positive reference. No previous frames were passed as reference images — the new concept was generated clean, deliberately, to avoid anchoring back to the rejected pane.

### 14.1 Why the previous direction was rejected

The Round 3–4 floating-glass-pane frames solved morph continuity but failed the wow bar:

- **Too basic** — a single flat rounded rectangle with colored blocks is a wireframe presentation slide, not a cinematic object.
- **Too sterile** — frontal flat-on camera, no dimensional depth, no materiality; the "glass" read as a thin border, not a physical thing.
- **Too wireframe-like** — the layout-as-flat-color-panels device is exactly the "simple UI mockup" the brief excludes; it evokes a design tool, not a premium morph sequence.
- **Not mindblowing** — nothing in the frame implies kinetic transformation, physical reconstruction, or AI-era visual ambition. The reference target is a premium cinematic morph (one dominant object, kinetic transformation, dimensional depth, object physically reconstructing); a flat pane cannot carry that.

### 14.2 New direction: "Monolith of Strata" — a dimensional interface sculpture

The website is no longer a pane. It is **one monumental levitating layered sculpture** — the anatomy of a website as physical exploded-view architecture: stacked translucent glass strata, warm archival paper sheets, matte graphite slabs, held by a thin bronze framework, photographed like a museum installation from a slightly low three-quarter cinematic camera. Broken state = the stack physically collapsing (shattered glass frozen mid-fall, torn paper bursting from between layers, dead graphite, snapped bronze filaments). Engine state = the same stack reconstructed and alive (warm light in the air gaps, forest-green lacquered conversion chambers glowing at the core, bronze signal conduits weaving through the layers, particle/chip lead-streams flowing in and converging into the green chambers).

This keeps everything that already worked (warm-paper void, Direction A materials, right-weighted composition, quiet left 35–40%, no text) while replacing the flat object with a deep kinetic one.

### 14.3 Models used and coercion record

| Model requested | Model in job metadata | Billing ledger name | Frames | Credits/frame |
|---|---|---|---|---|
| `nano_banana_pro` (16:9, 2K) | **`nano_banana_2`** (silent coercion again, consistent with Rounds 2–4) | "Nano Banana Pro" | M1 + M5 | 2 |
| `seedream_v4_5` (16:9, quality high) | `seedream_v4_5` (no coercion) | "Seedream 4.5" | M1 + M5 | 1 |

`soul_cinematic` was not used (per work-mode instruction). The stronger-cinematic-model slot went to `seedream_v4_5` (ByteDance, "4K output, precise control, transformations"), untested in prior rounds.

### 14.4 Prompts used

**Shared visual scaffold (identical wording in all four prompts):**

> Epic cinematic concept still, premium editorial art direction, frame from a scroll-driven website-transformation morph sequence. Environment: infinite seamless warm-paper studio void, color #F6F4EF, soft volumetric gallery light, one large soft shadow on the ground beneath the floating object — no room, no walls, no furniture, no desk, no monitor, no television, no laptop, no office, no people. Hero object: ONE monumental levitating interface sculpture — a deep multi-layered architecture of stacked translucent glass strata, warm archival paper sheets and matte graphite slabs held by a thin bronze framework, hovering in the right 60-65% of the frame, seen from a slightly low dramatic three-quarter camera angle so the layers recede with strong dimensional depth, like an exploded-view architectural model of a website photographed as a museum installation. The strata read as the anatomy of a website in physical form: a wide header plane on top, content-card layers beneath, navigation ribs along one edge — pure abstract layout geometry as sculpture, never a screen. Macro-physical realism: every layer has true thickness, edges catch the light, air gaps breathe between strata. Left 35-40% of the frame: completely empty warm-paper negative space, nothing in it. Materials: architectural glass, warm archival paper, matte graphite #1E1B16, brushed bronze #8A6D4A, deep forest-green lacquer #4F6F4A. Absolutely no readable text, no letters, no words, no numbers, no icons, no logos, no brand marks, no people. Shallow cinematic depth of field, fine film grain, dramatic but controlled highlights — not sci-fi, not neon, not cyberpunk, not a computer monitor, not a flat UI mockup, not generic SaaS stock.

**M1 state block (COLLAPSED RUIN):**

> State of this frame: COLLAPSED RUIN. The layered sculpture is physically broken and disintegrating in mid-air: the upper strata are shattered, large glass shards and torn paper fragments hang suspended, frozen mid-fall around the structure; whole layers are dislodged, tilted and sliding off the stack; the panels are dead matte graphite, cold and unlit; snapped bronze filaments dangle and curl from the framework; the route through the layers is visibly interrupted — a cascade of small stepping panels collapses before it reaches a dark extinguished chamber at the heart of the stack; fine paper dust drifts in the light shafts. Hierarchy has failed, gravity is winning, the system is quietly dying. Mood: serious premium digital ruin — elegant, archival, somber; not horror, not dirty, not apocalyptic, not comic. Light: dim, cool-neutral ambience with one warm shaft raking across the broken strata from the upper left.

**M5 state block (LIVING SALES ENGINE):**

> State of this frame: LIVING SALES ENGINE. The same category of layered sculpture, fully reconstructed and ascending: the strata are locked into a precise, confident architecture, warm light glowing in the air gaps between layers; deep forest-green lacquered conversion chambers sit at the heart of the stack, glowing softly from within; a dense, elegant network of slender bronze signal conduits weaves through and around the layers; streams of small luminous particles and tiny blank glass chips flow in from the upper right like incoming clients, are channeled along the bronze conduits, pass through routing gates between the strata, and converge into the glowing green chambers — attraction, routing and conversion legible as pure motion, no symbols needed; a few faint orbital rings and small nodes circle the structure, implying connected CRM, forms, booking and automation systems; warm light motes rise around the sculpture. Mood: calm monumental power, business momentum, cinematic wow. Light: warm golden-hour editorial light, crisp highlights tracing the glass and bronze edges.

### 14.5 Outputs, dimensions, cost

| Output | Job ID | Dimensions | Credits | Verdict |
|---|---|---|---|---|
| M1 nano_banana (2K) | `8aeeb16a-8824-427b-a647-37eef24e7e55` | 2752 × 1536 | 2 | **ACCEPTED** |
| M5 nano_banana (2K) | `c280e18f-1fc8-46ce-a40d-22de38d96874` | 2752 × 1536 | 2 | **ACCEPTED** |
| M1 seedream_v4_5 (high) | `e508c794-59ec-4927-ba7c-b4a01d1e88e6` | 5120 × 2880 | 1 | **REJECTED** (text contamination + room environment) |
| M5 seedream_v4_5 (high) | `43771bc6-2bce-410e-885f-41d4c6d1ef0d` | 5120 × 2880 | 1 | **REJECTED** (literal hex text + PCB aesthetic) |

- **Round 5 spend: 6.00 credits** (balance 379.78 → **373.78**, verified via `transactions`: two −2 "Nano Banana Pro" entries, two −1 "Seedream 4.5" entries).
- **Cumulative spike spend (Rounds 1–5): 26.36 credits** (~6.6% of starting balance).
- 4 of the allowed 4 images were generated; no retries needed for the winning pair.
- Note: `nano_banana_pro` at 16:9 costs the same 2 credits at 1K and 2K (preflighted) — 2K is free quality headroom over Rounds 3–4 (2752×1536 vs 1376×768).

Local files (outside repo, alongside the existing `DO-NOT-COMMIT.md` guard):

```
/Users/jan.rehberger/CURSOR_LOCAL/higgsfield-eval-phase4a/
├── reset-m1-broken-monolith-nano-banana-v1.png       (2752×1536, ~7.7 MB) ACCEPTED
├── reset-m5-salesengine-monolith-nano-banana-v1.png  (2752×1536, ~7.2 MB) ACCEPTED
├── reset-m1-broken-monolith-seedream-45-v1.png       (5120×2880, ~17 MB)  rejected, kept for comparison
└── reset-m5-salesengine-monolith-seedream-45-v1.png  (5120×2880, ~17 MB)  rejected, kept for comparison
```

CDN URLs (may expire; job IDs are durable via `job_display`):
- M1 nano: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_095805_8aeeb16a-8824-427b-a647-37eef24e7e55.png`
- M5 nano: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_095814_c280e18f-1fc8-46ce-a40d-22de38d96874.png`
- M1 seedream: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_100116_e508c794-59ec-4927-ba7c-b4a01d1e88e6.png`
- M5 seedream: `https://d8j0ntlcm91z4.cloudfront.net/user_394rVJ7OmQUVAuQDkhtgXmSUmDy/hf_20260611_100125_43771bc6-2bce-410e-885f-41d4c6d1ef0d.png`

### 14.6 M1 verdict (nano_banana — ACCEPTED)

- One layered monolith mid-collapse: the top glass stratum shattered with radiating fracture lines, torn archival paper bursting and curling out from between the layers, dead matte graphite slabs below, a snapped bronze filament dangling in a loose curl, fine debris suspended around the object. The stack visibly tilts — gravity winning — above a soft ground shadow.
- One warm light shaft rakes in from the upper left across a dim cool field: serious, archival, premium ruin. Not dirty, not horror.
- The object is unmistakably *physically broken*, not merely "displaying a broken layout" — the failure is structural, which is exactly the reset brief.
- Left ~38% is empty warm-paper void; right-weighted composition holds.
- Crop-zoom check: **zero text, letters, numbers, logos**.
- Not a monitor, not a TV, not a flat pane, not a wireframe. **High-wow: yes — reads as cinema-grade CGI concept art.**

### 14.7 M5 verdict (nano_banana — ACCEPTED)

- The same category of object reconstructed: a precise levitating stack — clear glass strata top and bottom, warm paper and graphite layers between, deep forest-green lacquered chambers seated at the core glowing warm from within, the whole architecture wrapped in slender bronze conduits with junction nodes.
- A luminous particle stream (gold/bronze motes) pours in from the upper right along bronze rails, threads through the strata, and converges into the glowing core — **attract → route → convert is legible as pure motion**, no text needed. The conduit network + nodes read as connected CRM/forms/booking/automation systems.
- Faint abstract layout geometry is embossed on the top glass plane — the website anatomy reading survives without becoming a UI mockup.
- Left ~36% empty warm-paper void; soft shadow grounds the object; golden-hour editorial light, no neon.
- Crop-zoom check (core chambers, particle stream, top plane): **zero text, letters, numbers, logos**.
- **High-wow: yes — materially stronger and more dynamic than any clean UI mockup; the strongest single frame of the entire spike.**

### 14.8 Seedream rejection detail (the useful failure)

`seedream_v4_5` produced dramatic, dimensional compositions (its M1 broken cabinet with fanning paper is genuinely cinematic) but failed two hard rules:

1. **It transcribes prompt hex codes as literal rendered text.** M5 stamps a glowing "#8EAB46" onto the graphite base; M1 renders a nav band whose "menu items" are readable tokens including "1E1B16" and "8A6D" — the palette codes from the prompt. Crop-zoom verified both. For any future seedream use, the palette must be described in words only, never hex.
2. **Concept drift.** M5 drifted into circuit-board/PCB-with-chips aesthetic (tech-literal, off the editorial brief); M1 placed the object in a visible room with walls/floor corner instead of the infinite void.

Verdict: seedream is a capable cinematic tier but needs a hex-free prompt rewrite to be usable; at 1 credit/frame it remains a cheap second opinion. Not selected for this direction.

### 14.9 Reset verdict

| Question | Answer |
|---|---|
| Did wow improve over the floating-pane direction? | **YES, decisively.** From a flat rectangle with colored blocks to a dimensional, kinetic, physically transforming sculpture with real materials, depth-of-field and frozen-motion energy. These frames read as premium cinematic morph keyframes, not wireframes. |
| Did business/sales-engine meaning improve? | **YES.** M1's brokenness is now physical and structural (collapsing hierarchy, dead panels, snapped connections) rather than "grey blocks on a pane." M5's attract→route→convert is carried by visible lead-particle inflow, routing conduits and glowing green conversion chambers at the object's heart. One trade-off recorded: the "this is a website" reading is more abstract than the literal browser pane — it is carried by the layout-geometry strata and will be anchored by the DOM copy layer ("your website") in the canvas route. |
| M1/M5 morph-compatible? | **YES (category-level).** Same object class (layered stack), same void, same shadow grammar, similar three-quarter camera. M1 tilts and scatters where M5 sits level and composed — correct for the narrative. Layer-count and angle drift exists; the full set must pin geometry by passing the accepted M1/M5 as reference images, as proven in Round 4. |
| Strong enough to justify a full 5-frame set? | **YES.** Recommended interpolation: M2 "shards and paper drawing back in, stack righting itself," M3 "strata aligned, still pale and unlit, first green chamber waking," M4 "conduits growing, first particles arriving." ~10–14 credits incl. retry margin at 2 credits/frame; requires the standing owner approval pattern. |
| Canvas-Higgsfield: pursue or deprioritize behind layered-dom? | **PURSUE.** The asset ceiling was the open question, and this round answers it — the connector can produce genuinely high-wow morph bookends on the cheap Nano Banana tier in one attempt each. Bonus de-risk: the layered-strata aesthetic translates directly to the layered-dom variant (parallax strata = the same visual language), so this art direction feeds both branches; the scorecard still decides the winner. |
| Models | Winner: `nano_banana_pro`-requested / `nano_banana_2`-reported (alias ambiguity persists; billing says Pro). `seedream_v4_5` tested and rejected for hex-text transcription. `soul_cinematic` not used per work mode. |
| Repo hygiene | All four PNGs live outside the repo; no tracked paths touched except this document. |

---

## 15. Lab route implementation (2026-06-11)

> **Scope:** `/__story-lab/canvas-higgsfield` preview prototype scaffolded on the `exp/story-lab-canvas-higgsfield` branch. No new Higgsfield generations. No new dependencies.

### 15.1 Hard workspace rule honored

All files created or modified are inside the project root (`/Users/jan.rehberger/CURSOR_LOCAL/web 4.0/`). No files were created, read, written, moved, or modified outside the project root.

### 15.2 Asset compression

Raw source PNGs (`higgsfield-eval-phase4a/accepted/M{1-5}.png`, 1672×941, ~1.7–2.0 MB each) were compressed via Python PIL (`quality=68, method=6, format=WEBP`) scaled to 1200×675.

| Frame | Compressed path | Size |
|---|---|---|
| M1 — Broken | `public/story-lab/canvas-higgsfield/m1.webp` | 31.5 KB |
| M2 — Repair | `public/story-lab/canvas-higgsfield/m2.webp` | 28.1 KB |
| M3 — Structure | `public/story-lab/canvas-higgsfield/m3.webp` | 29.0 KB |
| M4 — Connecting | `public/story-lab/canvas-higgsfield/m4.webp` | 37.5 KB |
| M5 — Engine | `public/story-lab/canvas-higgsfield/m5.webp` | 38.5 KB |
| **Total** | | **164.6 KB** (budget gate: ≤ 350 KB ✓) |

Note: M1 and M5 are the Round 5 "Monolith of Strata" accepted frames. M2–M4 are Round 4 floating-pane frames used as visual placeholders; they will be replaced with Round 5 continuations when the full set is generated (pending owner spend approval).

### 15.3 Files changed

| File | Change |
|---|---|
| `src/components/story-lab/canvasHiggsfieldStages.ts` | NEW — stage data |
| `src/components/story-lab/CanvasHiggsfieldStory.tsx` | NEW — desktop/mobile/reduced-motion story component |
| `src/pages/story-lab/StoryLabCanvasHiggsfield.tsx` | NEW — page wrapper with noindex injection |
| `src/App.tsx` | MODIFIED — lazy import + route `/__story-lab/canvas-higgsfield` |
| `public/_headers` | MODIFIED — `/__story-lab/*` → `X-Robots-Tag: noindex, nofollow` |
| `public/story-lab/canvas-higgsfield/m{1-5}.webp` | NEW — compressed preview assets |
| `.gitignore` | MODIFIED — `higgsfield-eval-phase4a/` added |

### 15.4 Validation summary

| Check | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run lint` | **PASS** (0 errors; 3 pre-existing warnings) |
| `npm run build` | **PASS** (1.48 s; chunk 10.04 kB / gzip 3.01 kB) |
| `dist/sitemap.xml` clean | **YES** |
| `dist/_redirects` has `/__story-lab/*` | **YES** |
| `dist/_headers` has `X-Robots-Tag` | **YES** |
| `higgsfield-eval-phase4a/` gitignored | **YES** |
| No package.json / lock changes | **YES** |
| No production homepage changes | **YES** |

### 15.5 Implementation notes

- **Layered images, not true canvas.** The preview uses `motion/react` opacity crossfades (identical mechanism to the control/crossfade variant) rather than `ctx.drawImage()`. A true `<canvas>` raster engine is a Phase 4B hardening step.
- **Same timing as production engine.** 14% hold + 8% crossfade per stage, 1100vh total scroll height.
- **Same scrim as production engine.** Warm-paper gradient from the left edge; the Higgsfield frames' own left quiet zone aligns naturally under it.
- Full validation details in `docs/planning/phase-4a-canvas-higgsfield-validation.md`.

