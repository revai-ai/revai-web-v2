# 04 — Tooling & Asset Spike Plan (REVAI redesign)

> Planning document. **Premise: do not adopt any helper tool blindly.** Each candidate must earn its place by a proof-of-capability test that shows a *measurable improvement to the final production result*. If it doesn't clearly improve output, the recommendation is **don't use it**.
> This whole document describes **Phase 2** in the roadmap (`06`). Nothing here is installed or configured yet.
> Confidence tags reflect how likely the tool earns adoption, given this specific site (premium storytelling, Vite/React/Netlify, CZ/EN, SEO-sensitive).

---

## How a tool gets approved (the gate)

A candidate tool is **approved only if all four hold:**
1. **Clear job** — it does something we actually need for this site.
2. **Proof-of-capability passed** — a small, time-boxed test produced an artifact good enough for production.
3. **Required output exists** — the concrete deliverable below is in hand and reviewed.
4. **Cost/lock-in acceptable** — price, licensing, and "can we live without it later" are understood.

Default bias (per the brief): **prefer the existing local workflow** (local webp assets, hand-built Tailwind components, the existing motion engine) unless a tool beats it on quality or time *without* hurting performance/SEO.

A tool that fails its spike is **documented as rejected with the reason** — not silently dropped.

---

## Model usage during tooling and asset spikes

Per the model execution policy (`01` D15), the spike work is split by **risk, not preference**.

| Spike activity | Model / effort | Why | Confidence |
|---|---|---|---|
| Prototype implementation, integrating sample assets into the existing story engine, rebuilding a UI pattern natively (the 21st.dev test), quick throwaway experiments | **Fable 5 / Medium** (raise to **High** for fiddlier engine integration or perf-sensitive prototypes) | These are well-scoped, reversible, sandboxed build tasks — exactly where the fast implementation model fits. | high |
| **Tool-approval decisions** where SEO, performance, licensing, compliance, or architecture risk is involved (Higgsfield cost/licensing/perf verdict, CMP build-vs-buy, Pixel/CAPI sequencing, Supabase use/postpone) | **Opus 4.8 / High** | A paid/lock-in/compliance/perf call is a risk decision, not an implementation task; a wrong "approve" here is expensive and hard to unwind. | high |
| Reviewing a spike's perf delta / asset weight before it informs a production decision | **Opus 4.8 / High** | The verdict feeds an architecture/perf gate; keep the strongest judgement on the sign-off. | medium-high |

**Rules:**
- Fable 5 *builds the spikes*; Opus 4.8 *makes the approve/reject/postpone call* whenever SEO/perf/licensing/compliance/architecture risk is in play. *(confidence: high)*
- **No dynamic workflows for tooling spikes** unless an explicit independent cross-check is approved for a specific high-stakes decision. Default: off. *(confidence: high)*
- The spike sandbox stays uncommitted regardless of model — model choice does not change the "nothing ships from the spike without approval" rule.

---

## Candidate tools

### A. Higgsfield (MCP/CLI) — cinematic image/video assets
- **Possible job:** generate the premium scrollytelling scene imagery (the "outdated site → modern sales engine" story, and the 3 demo-concept visuals) and any short cinematic video/hero loops.
- **Why it's tempting:** the redesign's "wow" leans heavily on premium imagery; the current `/public/story/` webp set is automation-themed and must be re-shot anyway.
- **Why NOT to assume it's worth it (critical):**
  - It's a **paid, external** tool — cost + lock-in + per-asset spend.
  - **Performance risk:** AI video/large renders can wreck the mobile/speed budget the brief protects. Cinematic ≠ fast.
  - **Brand consistency risk:** generative output drifts; matching an as-yet-undecided palette (2–3 directions, D14) across 5+ scenes is hard.
  - **Licensing/rights** for commercial use must be confirmed.
- **When to configure:** Phase 2 only, and **only after** the palette direction and homepage scene list are at least provisionally chosen (otherwise you generate assets you throw away).
- **Proof-of-capability test:** generate **2 story scenes** at the target aspect ratio + **1 short hero loop**, in one tentative palette. Drop them into the existing engine locally (not committed). Measure: visual quality vs. a hand-sourced/stock alternative, **file size after webp/av1 compression**, and Lighthouse impact on the story section.
- **Required output before approval:** the 2 scenes + 1 loop, *compressed to production weight*, rendered in the real engine, with a side-by-side note vs. the non-Higgsfield alternative and a measured perf delta. Plus written confirmation of commercial licensing and per-asset cost.
- **Recommendation:** **Conditional / spike-gated. Do not assume worth.** Approve only if it beats stock/commissioned imagery on quality *and* stays within the performance budget. For *video* specifically, lean skeptical — a great compressed still + CSS/engine motion often out-performs heavy AI video on mobile. *(confidence: low that video clears the bar; medium that stills might)*

### B. 21st.dev (or similar) — UI component inspiration
- **Possible job:** reference patterns/snippets for premium sections (hero, pricing, feature grids, marquees).
- **Why cautious:** great as **inspiration**, risky as a **dependency** — pasted components often drag in their own styling assumptions, conflict with the `.variant-c` token system, and add bloat. The repo already has a clean `ui/ifl/*` primitive set.
- **When:** Phase 2, inspiration-only.
- **Proof-of-capability test:** reproduce **one** desired pattern using the existing `ui/ifl` primitives + tokens. If it's faster/cleaner to hand-build on the existing system than to adapt an imported component, the tool is inspiration-only.
- **Required output:** a short "patterns we want, rebuilt natively" note — *not* committed third-party component code.
- **Recommendation:** **Use as inspiration, do NOT adopt as a code dependency.** *(confidence: high)*

### C. Design inspiration / "Taste" / "Impeccable"-style resources
- **Possible job:** curate the premium visual language (typography pairings, spacing rhythm, motion references) and the 2–3 palette directions.
- **Why fine:** these are **reference/curation**, near-zero technical risk, and directly feed the palette exploration (D14) and the asset brief for Higgsfield/stock.
- **When:** Phase 1–2, early — they *inform* the asset spike rather than depend on it.
- **Proof-of-capability test:** produce a one-page moodboard + a typography/spacing/motion reference set that the team agrees "feels REVAI-premium."
- **Required output:** a moodboard + 2–3 palette directions as **token candidate values** (so they slot into the consolidated token system).
- **Recommendation:** **Use** (low cost, high leverage on the "wow" goal). Keep it as inputs, not infrastructure. *(confidence: medium-high)*

### D. Analytics + cookie-consent tooling
- **Possible job:** GA4 for engagement; a Consent Management Platform (CMP) to gate all non-essential tags (fixes audit R3).
- **Why it matters:** the brief requires analytics + consent; a live un-consented `leadsy.ai` tracker already exists (R3). This is **compliance-critical**, not optional.
- **Candidates:** GA4 (analytics); CMP = build-a-simple-banner vs. a hosted CMP (Cookiebot/Usercentrics/Klaro/Osano). For CZ/EU, a real CMP with granular categories + Google Consent Mode v2 is the safer default.
- **When:** configured in **Phase 6**, but the **consent contract designed in Phase 1** (what's essential vs. not, categories, default-deny).
- **Proof-of-capability test:** in staging, prove **no non-essential tag fires before consent**, GA4 + Pixel respect the consent signal, and the existing leadsy tag is gated or removed.
- **Required output:** a staging recording/log showing pre-consent network = zero non-essential trackers; consent grant then enables them; GDPR text updated to match.
- **Recommendation:** **Use a real CMP** (build-your-own only if scope is genuinely tiny). Consent Mode v2 default-deny. *(confidence: high that a CMP is needed; medium on build-vs-buy — lean buy for EU defensibility)*

### E. Meta Pixel + Conversions API (CAPI)
- **Possible job:** measure + optimize Meta Ads for real leads (demo_request_submit, inquiry_submit, consultation_click).
- **Approach (recommended):** Pixel (browser) **+ CAPI (server-side via a Netlify function)** with shared `event_id` dedup. Server-side CAPI improves resilience to ad-blockers/ITP and is the modern default — but it's more work.
- **Why cautious:** only worth the CAPI complexity if Meta Ads spend justifies it. If ad budget is small at launch, **Pixel-only (consent-gated) first, add CAPI when spend grows.**
- **When:** Phase 6, after consent (D) is proven. Never before consent.
- **Proof-of-capability test:** fire `demo_request_submit` from both Pixel and CAPI in Meta Events Manager test mode; confirm **deduplication** (one event, not two) and consent gating.
- **Required output:** Events Manager screenshot showing deduped test events + consent respected; documented event→Pixel-standard-event mapping.
- **Recommendation:** **Pixel + CAPI is the right target; sequence by ad spend.** Start Pixel-only if budget is small, design the function seam for CAPI now. *(confidence: medium)*

### F. Lead storage for demo requests
- **Possible job:** persist demo requests for SLA tracking/reporting beyond email.
- **Candidates:** (1) **email-only** (Resend, phase 1 default), (2) **Supabase** (migrations already exist for `contact_messages`), (3) a sheet/Airtable for the manual team.
- **Why not auto-pick Supabase:** it's currently **orphaned** (audit R10) — adopting it means owning a DB, RLS, and an integration the manual process may not need yet.
- **When:** decided in Phase 2 spike; built in Phase 3 only if justified.
- **Proof-of-capability test:** model whether the **manual fulfillment process** (`03` §7) actually needs queryable storage or whether inbox + a sheet suffices for phase-1 volume.
- **Required output:** a one-paragraph decision: email-only vs. Supabase vs. sheet, with the trigger that would upgrade it.
- **Recommendation:** **Email-only in phase 1**, with the function structured so a store can be added without reworking the flow. *(confidence: medium)*

### G. Supabase — use or postpone?
- **Possible job:** lead store (F) and/or future automation backend.
- **Current state:** migrations for `contact_messages` exist, **no code uses them** (R10).
- **Recommendation:** **Postpone.** Don't wire it up just because it's there. Adopt only if (a) F concludes storage is needed, or (b) the automation phase needs a backend. If postponed long-term, the orphaned migrations should be removed *with approval* (not in this phase). *(confidence: medium-high)*

---

## Summary table

| Tool | Job | Configure when | Approve only if… | Default recommendation | Confidence |
|---|---|---|---|---|---|
| Higgsfield (stills) | Story/demo imagery | Phase 2, after palette+scene list | Beats stock/commissioned on quality AND within perf budget | **Conditional / spike-gated** | low-medium |
| Higgsfield (video) | Hero/cinematic loops | Phase 2 | Compressed video beats still+CSS motion on mobile | **Lean reject** | low |
| 21st.dev & similar | UI pattern ideas | Phase 2 | n/a (inspiration only) | **Inspiration only, not a dependency** | high |
| Taste/Impeccable-style refs | Moodboard, palettes, type | Phase 1–2 | Produces agreed premium direction + token candidates | **Use** | medium-high |
| GA4 | Engagement analytics | Phase 6 (design P1) | Consent-gated, fires only post-consent | **Use** | high |
| CMP (consent) | Gate all non-essential tags | Phase 6 (design P1) | Pre-consent network = zero non-essential | **Use (lean buy)** | high |
| Meta Pixel + CAPI | Ad measurement | Phase 6 | Deduped + consent-respecting in test mode | **Use; sequence by ad spend** | medium |
| Lead storage | Persist demo requests | Phase 2 decide / P3 build | Manual process actually needs queryable storage | **Email-only first** | medium |
| Supabase | Lead/automation backend | Postponed | A concrete need emerges (F or automation) | **Postpone** | medium-high |

---

## Tools that should NOT be used yet (explicit)

- **Any paid asset/video generator at scale** before the stills spike proves quality + perf. *(confidence: high)*
- **Higgsfield video** until still-vs-video perf is measured on mobile. *(confidence: medium)*
- **Third-party UI component libraries as code dependencies** (21st.dev exports, big component kits) — they fight the token system and inflate bundle. *(confidence: high)*
- **Meta Pixel / CAPI / GA4 in production** before the consent layer exists — would extend the current GDPR contradiction. *(confidence: high)*
- **Supabase** until storage need is proven. *(confidence: medium-high)*
- **A second framework / SSR rewrite** as a "tool" — covered in `05`; prerender first. *(confidence: high)*
- **Dynamic multi-agent workflows** — not needed for this build. Reconsider only for an independent cross-check at a high-stakes gate (e.g. pre-launch SEO/perf/a11y review in Phase 7), and only with explicit approval. *(confidence: high)*

---

## Spike exit criteria (what "Phase 2 done" means)

1. A decision recorded for **every** tool above: approved / inspiration-only / rejected / postponed — each with its required output or reason.
2. Provisional **palette direction(s)** as token candidate values.
3. A **production-weight sample** of the hero/story imagery approach (whatever tool wins) proven in the real engine with a measured perf delta.
4. The **consent + event contract** designed (even though implemented later).
5. The **lead-storage decision** for demo requests.

No production asset pipeline is committed until these exist. *(confidence: high)*
