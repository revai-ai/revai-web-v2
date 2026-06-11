# Phase 4A — Higgsfield Connector Capability Note

> **Status:** capability probe only — no assets generated, no credits spent.
> **Date:** 2026-06-11.
> **Branch:** `exp/story-lab-control-crossfade` (probe run here; canvas-Higgsfield branch not yet created).
> **Probe method:** ToolSearch schema inspection + live connector calls to `models_explore`, `balance`, `list_workspaces`. No `generate_image` call was made.
> **Inputs:** `phase-4a-higgsfield-asset-pipeline-spike.md`, `phase-4a-storytelling-variant-lab.md`, `phase-2r-creative-tooling-spike.md`.

---

## 1. Connector tools found

The Higgsfield MCP server (`8f5e78ba-33ac-4fd9-9324-94e2b55f495a`) exposes the following tools:

| Tool | Purpose |
|---|---|
| `generate_image` | Submit an image generation job |
| `generate_video` | Submit a video generation job |
| `models_explore` | List / search / detail / recommend models |
| `balance` | Read current credit balance and plan |
| `show_plans_and_credits` | Open billing widget (plan upgrade / credit top-up) |
| `transactions` | List credit transaction history |
| `show_generations` | Browse past completed generations |
| `show_medias` | List uploaded media files |
| `media_upload` | Upload bytes to a Higgsfield-held URL |
| `media_upload_widget` | Open local-file upload widget (Apps UI only) |
| `media_import_url` | Import a web-hosted media file by URL |
| `media_confirm` | Confirm an upload after bytes are posted |
| `job_display` | Re-display a specific past generation result |
| `list_workspaces` | List accessible workspaces |
| `select_workspace` | Switch active workspace |
| `show_marketing_studio` | Marketing Studio workflows (product ads) |
| `show_characters` | Character/Soul management |
| `show_reference_elements` | Reference element management |
| `presets_show` | List presets for `higgsfield_preset` model |
| `motion_control` | Motion parameter control (video only) |
| `virality_predictor` | Video engagement prediction |
| `outpaint_image` | Outpaint / extend an image |
| `remove_background` | Background removal |
| `reframe` | Reframe / recompose an image |
| `upscale_image` | Upscale an image |
| `upscale_video` | Upscale a video |
| `video_analysis_create` / `_jobs` / `_status` | Video analysis pipeline |
| `personal_clipper_*` | Personal Clipper workflow |
| `sync_agents` | Sync agent list |

**Image generation is a first-class capability**, separate from and independent of video generation.

---

## 2. Image models available (full catalog as of 2026-06-11)

| Model ID | Provider | Description | Aspect ratios | Max resolution |
|---|---|---|---|---|
| `cinematic_studio_2_5` | **Higgsfield** | **Cinematic stills, up to 4K** | 1:1, 4:3, 3:4, 16:9, 9:16 | 4K |
| `soul_cinematic` | **Higgsfield** | **Cinema-grade stills and concept art** | 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9 | 2K |
| `soul_location` | **Higgsfield** | Environment and location generation | 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, 9:21 | default |
| `soul_2` / `soul_v2` | **Higgsfield** | UGC, fashion, editorial, character | 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3 | 2K |
| `soul_cast` | **Higgsfield** | Consistent cinematic character identity | 16:9 only | 50-500 budget units |
| `marketing_studio_image` | **Higgsfield** | Product/ads | many | 4K |
| `ms_image` (DTC Ads) | **Higgsfield** | DTC ad generation, brand kit | many | 4K |
| `image_auto` | **Higgsfield** | Auto-selects best model | 1:1, 4:3, 3:4, 16:9, 9:16 | — |
| `nano_banana_2` | Google | Fast, photorealistic | 3:2, 16:9, and more | 4K |
| `nano_banana_pro` | Google | Ultimate quality, text/diagrams | 3:2, 16:9, and more | 4K |
| `nano_banana` | Google | Budget realistic | 3:2, 16:9, and more | — |
| `seedream_v4_5` | ByteDance | 4K, precise control, transformations | 3:2, 16:9, and more | 4K |
| `seedream_v5_lite` | ByteDance | Visual reasoning, instruction editing | 1:1, 16:9, 9:16, 4:3, 3:4 | high |
| `flux_2` | Black Forest Labs | Precise prompt adherence, variants | 1:1, 4:3, 16:9, and more | 2K |
| `flux_kontext` | Black Forest Labs | Context-aware editing, style transfer | 1:1, 4:3, 16:9, and more | — |
| `kling_omni_image` | Kling | Versatile photorealistic | 3:2, 16:9, 21:9, and more | 2K |
| `gpt_image` | OpenAI | Editing, best text rendering | 1:1, 3:2 | — |
| `gpt_image_2` | OpenAI | Next-gen, 1k/2k/4k | 1:1, 4:3, 16:9, 3:2, and more | 4K |
| `grok_image` | xAI | Expressive, high-contrast | 1:1, 4:3, 16:9, and more | quality mode |
| `recraft-v4-1` | Recraft | Photorealistic + explicit palette control | 3:2, 16:9, and more | 2K |
| `z_image` | Tongyi-MAI | Fast, stylized, budget | 1:1, 4:3, 16:9, and more | — |

**Primary candidates for the five narrative keyframes:**

- `cinematic_studio_2_5` (Higgsfield) — cinematic stills up to 4K; best match for "premium editorial" narrative; **does not support 3:2** (only 16:9, 4:3)
- `soul_cinematic` (Higgsfield) — cinema-grade stills and concept art; supports 3:2 aspect ratio; max 2K resolution
- `soul_location` (Higgsfield) — environment/scene generation; supports 3:2; best for Moments 1 and 5 (scene-dominant, no character)
- `recraft-v4-1` (Recraft) — supports explicit `colors` parameter accepting `#RRGGBB` values; enables direct Direction A palette grounding (`#F6F4EF`, `#1E1B16`, `#4F6F4A`)

---

## 3. Supported capabilities (confirmed by schema + probe)

| Capability | Status | Detail |
|---|---|---|
| Still image generation (not video) | **YES** | `generate_image` is fully independent of `generate_video`; no video output required |
| Prompt-controlled output | **YES** | `prompt` parameter on all image models |
| Aspect ratio control | **YES** | Multiple aspect ratios per model; 3:2 available on `soul_cinematic` and `soul_location`; 16:9 on `cinematic_studio_2_5` |
| Resolution tiers | **YES** | 1K / 2K / 4K tiers on primary cinematic models |
| Reference image input | **YES** | `medias[].role = "image"` on multiple models for style/content reference |
| Per-generation cost preflight | **YES** | `get_cost: true` flag on `generate_image` returns credit cost without spending |
| Credit balance visibility | **YES** | `balance` returns `{credits: 400.14, subscription_plan_type: "starter"}` |
| Transaction history | **YES** | `transactions` tool available |
| No credential exposure | **YES** | MCP uses env-var-based auth; no secrets in schemas or calls |
| No forced video output | **YES** | Image and video are distinct tools; image calls never produce video |
| Multi-frame via repeated calls | **YES** | Five separate `generate_image` calls with distinct prompts produce 5 independent keyframes |
| Palette grounding | **PARTIAL** | `recraft-v4-1` has explicit `colors: ["#RRGGBB", ...]` parameter; other models rely on prompt-level color description only |
| Output as URL | **YES** | Generation results include URLs; `show_generations` returns `{results}` with download-able URLs |
| Image upscaling | **YES** | `upscale_image` tool available post-generation |
| Background removal | **YES** | `remove_background` tool available post-generation |
| Outpainting | **YES** | `outpaint_image` tool available for aspect-ratio adjustment |

---

## 4. Unsupported capabilities

| Capability | Status | Detail |
|---|---|---|
| Native keyframe / image-sequence export | **NOT AVAILABLE** | No dedicated "generate frame sequence" or "generate N-frame animation sequence as stills" tool; sequences require N separate `generate_image` calls |
| 3:2 aspect ratio on `cinematic_studio_2_5` | **NOT AVAILABLE** | This Higgsfield-native 4K model supports only 1:1, 4:3, 3:4, 16:9, 9:16; the ~1800×1200 (3:2) target requires `soul_cinematic` or post-generation reframe/crop |
| Exact output pixel dimensions in schema | **NOT STATED** | Resolution tiers (1K, 2K, 4K) are documented; exact pixel sizes at each aspect ratio and tier are not exposed in the schema and must be verified by running a test generation or consulting Higgsfield docs |
| Direct local file write | **NOT AVAILABLE** | Generated images are returned as URLs, not written directly to the filesystem; a Bash `curl`/`wget` step is needed to download and place images in the repo asset directory |
| Series-consistent grading across 5 frames | **NOT AVAILABLE** | No "style-lock" or "palette-lock" mechanism across multiple separate `generate_image` calls; palette consistency must be enforced via careful prompting and/or post-generation grading (LUT / manual curves per §3 of the spike plan) |
| Commercial license metadata in API response | **NOT AVAILABLE** | No license field, commercial-use flag, or license URL is returned by any tool call; licensing terms must be verified manually via account settings or Higgsfield's published terms |

---

## 5. Unknowns requiring manual verification

| Unknown | Why it matters | How to resolve |
|---|---|---|
| **Commercial license coverage on starter plan** | Hard gate: no asset enters the repo without confirmed commercial license (spike §4.1) | Check Higgsfield's Terms of Service / subscription plan page; confirm whether starter plan grants commercial use rights for generated images |
| **Per-image credit cost for cinematic models** | Required for spike §4.2 cost documentation and scorecard C8 (pipeline repeatability) | Run `generate_image` with `get_cost: true` for `cinematic_studio_2_5` at 4K and `soul_cinematic` at 2K — **zero spend, but requires owner acknowledgement before execution** |
| **Exact output pixel dimensions** | Required to confirm the ~1800×1200 target is achievable without quality-destroying upscale or crop | Run a single test generation at the target resolution tier and aspect ratio — **requires spend approval** |
| **Prompt adherence for the five narrative moments** | The narrative is highly specific (a Czech website rebuilding itself, Direction A palette); unknown whether any Higgsfield model renders this faithfully without iteration | Run Path 1 proof-of-concept generation for Moments 1 and 5 (tonal extremes, per 2R §3.3) — **requires spend approval and license confirmation first** |
| **Whether starter plan has adequate generation quota** | Low-credit account could exhaust during a 5-frame spike | Check current plan limits vs. estimated credit cost from `get_cost` preflight |

---

## 6. Path viability assessment

### Path 1 — Claude Code + Higgsfield connector

**Verdict: PARTIALLY VIABLE — blocked on licensing confirmation and owner spend approval.**

The connector has the technical capability to:
- Generate five individual cinematic stills via five separate `generate_image` calls
- Accept aspect ratio and resolution parameters sufficient to approximate the ~1800×1200 target (3:2 at 2K via `soul_cinematic`, or 16:9 at 4K via `cinematic_studio_2_5` with post-generation crop)
- Preflight credit costs without spending
- Operate without committing credentials
- Return image URLs that can be downloaded via Bash and compressed through the existing `cwebp` pipeline

**Path 1 is blocked until:**
1. Commercial license terms are confirmed for the active plan (starter)
2. Owner approves credit spend for the preflight (`get_cost`) and, subsequently, actual generation
3. Exact pixel dimensions are verified (can be done as part of a test generation, after spend approval)

**If licensing is confirmed and spend approved, Path 1 is viable as the primary generation mechanism for the canvas-Higgsfield branch.**

### Path 2 — Manual Higgsfield export + Claude Code compression

**Verdict: STILL NECESSARY if licensing cannot be confirmed via the connector alone, or if owner prefers manual generation oversight.**

Path 2 remains the safest route if:
- The starter plan's commercial terms require manual review or a plan upgrade
- The owner wants direct control over each generation prompt before credits are spent
- The connector's prompt adherence for the specific narrative moments proves insufficient in early test generations

Path 2 and Path 1 are not mutually exclusive during the spike — the connector can assist with the compression and measurement pipeline (steps 3–6 of spike §3) even if initial generation is done manually.

### Path 3 — Stock / manual webp fallback

**Verdict: MUST RUN regardless of Path 1/2 outcome.**

As required by the spike plan §1: Path 3 is the benchmark. The stock fallback always runs and its Lighthouse/quality measurements are required for the side-by-side comparison, regardless of whether Higgsfield paths succeed. This does not require any connector capability.

---

## 7. Spend and licensing approvals required before generation

| Approval | Required for | Status |
|---|---|---|
| **Commercial license confirmation** | Any generated asset entering a branch asset directory (spike §4.1 hard gate) | **OPEN — not resolvable via connector alone** |
| **Owner spend approval for preflight** | Running `get_cost: true` to document per-image credit cost in the spike record | **OPEN — technically zero spend but still a formal approval step per spike §4.2** |
| **Owner spend approval for test generation** | Generating Moments 1 and 5 as the 2R §3.3 proof-of-concept | **OPEN — must be explicit before any `generate_image` call without `get_cost: true`** |
| **Owner spend approval for full 5-frame set** | Generating all five keyframes + fallback poster | **OPEN — separate from test generation approval** |

**Current account state:** 400.14 credits on the starter plan. The credit balance is healthy for a spike of this scale, but spend is still owner-gated per the Phase 2R/4A constraint.

---

## 8. Recommended next action

**Immediate (no spend, no generation):**

1. Owner manually verifies commercial license coverage on the Higgsfield starter plan.
2. Owner reviews this note and approves (or declines) the cost preflight step.

**After commercial license confirmed + preflight approved:**

3. Run `generate_image` with `get_cost: true` for `cinematic_studio_2_5` (4K, 16:9) and `soul_cinematic` (2K, 3:2) to document per-image credit cost — **no images generated, no spend**.
4. Document license tier, per-asset cost, and confirmation date per spike §4.1–4.2.

**After spend approved for test generation:**

5. Generate Moments 1 and 5 (the two tonal extremes per 2R §3.3) as the path proof-of-concept.
6. Measure output pixel dimensions, run through `cwebp -q 68`, check file size against the ≤ 70 KB gate.
7. Place alongside Path 3 stock equivalents for side-by-side comparison.
8. Report Lighthouse delta on the story section.

**Only after the above exit criteria pass (spike §5):** create the `exp/story-lab-canvas-higgsfield` branch and begin canvas engine implementation.

---

## 9. Model recommendation for each next step

| Next step | Recommended model | Reason |
|---|---|---|
| This capability note (done) | Sonnet 4.6 | Documentation only; no visual/canvas work |
| Owner approval of commercial license terms | Human (owner) | Business/legal decision, cannot be delegated |
| Cost preflight (`get_cost: true` calls) | Sonnet 4.6 | Mechanical connector call + documentation; no visual work |
| Generating Moment 1 and 5 test frames | **Fable 5** | Prompt engineering for cinematic stills; visual judgment on output quality and Direction A palette match requires a storytelling-optimised tier |
| Canvas engine implementation (`exp/story-lab-canvas-higgsfield`) | **Fable 5** | Canvas pipeline, scroll-sync frame drawing, and visual motion choreography per roadmap §Phase 4A recommendation |
| Post-generation quality/palette grading decisions | **Fable 5** | Visual asset direction judgment |
| Spike exit-criteria review and approve/reject on Path 1/2/3 | **Opus 4.8** | Approval-gate risk decision per 2R §3.3 / roadmap D15; determines client-project methodology |

---

## 10. Summary verdict

| Question | Answer |
|---|---|
| Does a Higgsfield connector exist? | **YES** — MCP server connected and authorized |
| Can it generate still images (not video)? | **YES** — `generate_image` is independent of video |
| Does it support prompt-controlled aspect ratio? | **YES** — 3:2 on `soul_cinematic`; 16:9 on `cinematic_studio_2_5` |
| Does it support the ~1800×1200 resolution target? | **PROBABLY** — 3:2 at 2K on `soul_cinematic` likely yields ~2048×1365; exact dims unverified |
| Can it produce 5 keyframes for the narrative? | **YES via 5 separate calls** — no native sequence tool |
| Can output be downloaded for the repo pipeline? | **YES via URL + Bash curl** |
| Is cost visible before spending? | **YES** — `get_cost: true` preflight |
| Is commercial license confirmed? | **NO — must be verified manually; not surfaced in connector** |
| Are credentials safe from repo commitment? | **YES** |
| Is Path 1 viable? | **PARTIALLY — technically capable, blocked on license + owner spend approval** |
| Is Path 2 still necessary? | **POSSIBLY — fallback if licensing can't be confirmed or owner prefers manual generation** |
| Must Path 3 run? | **YES — always, as benchmark** |
| Is owner approval required before generation? | **YES — spend + license** |
| Is it safe to proceed to canvas branch implementation? | **NOT YET — license and spend must be approved first; canvas engine can be scaffolded but no asset generation until approved** |
| Is Fable 5 justified for the next step? | **YES — once generation is approved, prompt engineering and visual asset direction require Fable 5** |
