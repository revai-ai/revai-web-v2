# 06 — Implementation Roadmap (REVAI redesign)

> Planning document. Eight phases, each with goal / inputs / outputs / allowed / forbidden / validation / approval gate.
> **Validation commands cannot run today** — `node_modules` is absent (audit); Phase 0 establishes the baseline once `npm install` is approved. No command in this doc has been executed.
> Sequencing principle: resolve the high-severity SEO / i18n / consent risks **before** the visible build. Confidence tags per phase.

**Standing rules for every phase:**
- No dependency installs/changes without explicit approval (and never edit lockfiles without it).
- Don't touch `/cenik` content (D11). Keep `/sluzby/*` URLs (D8).
- No tracking before consent exists (R3).
- No outward-facing publish without approval.
- Dynamic workflows stay **off** unless a gate explicitly calls for an independent cross-check (only Phase 7 might).
- Model selection must follow **D15** in `docs/planning/01-decision-brief.md`; the per-phase settings below are the current application of that policy.

**Global model policy (applies across all phases; per-phase notes below refine this):**

| Model | Use for |
|---|---|
| **Sonnet 4.6** | Planning docs, scoped fixes, headers/config, form validation, routing wiring, simple components, any diff that is small and well-understood |
| **Fable 5** | Storytelling prototypes, Higgsfield/canvas pipeline, production visual implementation, large motion-engine work, complex component composition, performance-intensive build tasks |
| **Opus 4.8** | SEO/security/dependency review, pre-merge architecture review on SEO-sensitive change sets, final Phase 4A variant selection, compliance/consent review, any gate where the blast radius of a wrong call is high and hard to reverse |

---

## Phase 0 — Baseline validation
**Goal:** Establish a known-good, reproducible baseline before changing anything. *(confidence: high)*

- **Inputs:** This repo; approval to `npm install`; access to the target Netlify site/env; answer to **B1** (production source of truth), **B6** (keyword list), **B10** (brand facts), **R17** (Resend/env).
- **Outputs:** Recorded results of `install` + `typecheck` + `lint` + `build`; a documented list of any failures (command / error / cause / blocks-planning?); confirmation of which repo/site is production; current Search Console baseline snapshot (if available) for the automation keywords.
- **Allowed changes:** None to source. Create only a baseline notes file (outside `docs/audit/`). Run read-only/validation commands.
- **Forbidden changes:** Any source edit; dependency changes beyond a clean `install`; any deploy.
- **Validation commands:** `npm install` → `npm run typecheck` → `npm run lint` → `npm run build` (capture output). 
- **Approval gate:** Owner confirms production source of truth (B1) and that baseline build is green (or failures are understood). **No further phase starts until B1 is answered.**
- **Recommended Claude Code run settings:** **Fable 5 / Low-Medium** — command execution + documenting baseline results is mechanical, low-risk work. **Opus 4.8** only if baseline failures surface an *architecture* judgement (e.g. a build break implying a structural change). *(confidence: high)*

---

## Phase 1 — Decisions & architecture
**Goal:** Close the blocking decisions and lock the architecture so the build can't stall mid-flight. *(confidence: high)*

- **Inputs:** `docs/planning/01–05`; answers to **B2** (i18n URLs), **B3** (prerender), **B4** (homepage story), **B5** (hero CTA), **B7** (copy ownership), **B8** (event taxonomy).
- **Outputs:** Signed-off i18n strategy, prerender decision, homepage story strategy, primary-CTA decision, finalized event taxonomy, keyword-preservation + redirect map plan, AMAI→REVAI migration plan (gated on B10).
- **Allowed changes:** Documentation/decision records only (outside `docs/audit/`). No production code.
- **Forbidden changes:** Source code; assets; tracking; deploys.
- **Validation commands:** None (decisions phase). 
- **Approval gate:** Owner signs the decision set (esp. B2/B3/B6). **B6 must be answered before any homepage meta change in later phases.**
- **Recommended Claude Code run settings:** **Opus 4.8 / High** — this is the strategic-decision phase (i18n, prerender, SEO keyword/redirect strategy, brand-migration plan). Highest blast radius, hardest to reverse; keep the strongest judgement here. **No Fable 5 default for this phase.** *(confidence: high)*

---

## Phase 2 — Tooling & asset spike
**Goal:** Decide every helper tool by proof-of-capability, not assumption (`04`). Produce provisional palette + a perf-proven asset approach. *(confidence: high on process; tool outcomes TBD)*

- **Inputs:** `04` spike plan; provisional palette refs (Taste/Impeccable-style); homepage scene list (from Phase 1); answers to **B9** (lead storage), **G** (Supabase).
- **Outputs:** Approve/inspiration-only/reject/postpone decision for **each** tool with required output or reason; 2–3 palette directions as token candidate values; one production-weight hero/story asset sample proven in the real engine with a measured perf delta; consent+event contract designed; lead-storage decision.
- **Allowed changes:** Local, throwaway experiments (uncommitted); a separate spike worktree/branch; documentation of results. Configure candidate tools **in isolation** only.
- **Forbidden changes:** Committing third-party UI component code as a dependency; shipping any generated asset to production; installing prod deps without approval; enabling any tracking.
- **Validation commands:** For asset samples, Lighthouse/real-device perf check on the story section (in the spike sandbox). 
- **Approval gate:** Owner approves the tool decisions and the asset approach **before** any production asset pipeline or paid-tool spend is committed. Higgsfield (esp. video) only proceeds if its spike beat the alternative on quality *and* perf.
- **Recommended Claude Code run settings:** **Fable 5 / Medium-High** for building the spikes (prototypes, engine asset integration, native UI-pattern rebuilds, experiments). **Opus 4.8 / High** for tool-approval decisions where SEO/perf/licensing/compliance/architecture risk is involved (see `04` → "Model usage during tooling and asset spikes"). No dynamic workflows unless an explicit cross-check is approved. *(confidence: high)*

---

## Phase 3 — Foundation implementation
**Goal:** Build the invisible foundation — brand migration, real i18n, prerender/SEO, token consolidation, form backend — so later visible work sits on solid ground. *(confidence: medium-high)*

- **Inputs:** Phase 1 decisions; Phase 2 token candidates; B10 brand facts; approval for any dependency changes (motion/icon consolidation, prerender tooling).
- **Outputs:** AMAI→REVAI sweep across `index.html` + source + manifest + JSON-LD (fix `mailto:info@amai.cz`, socials, address, `apple-mobile-web-app-title`); locale routing + dictionaries + hreflang; prerender for marketing routes; per-locale meta via `useDocumentMeta`/prerender; consolidated token system; build-time sitemap; 404 route; `demo-request.mts` (email-only default) + shared form validation; `_headers` with CSP/HSTS; redirect map for any slug/locale moves.
- **Allowed changes:** `index.html`, routing, i18n layer, tokens (`tokens.css`/`tailwind.config.js`), `useDocumentMeta`, Navbar/Footer fixes, new function, `_redirects`/`_headers`, sitemap generation. Dependency consolidation **if approved**.
- **Forbidden changes:** `/cenik` content; enabling tracking; deleting orphaned Supabase/second-lib without approval; homepage *narrative* swap that changes ranking signals before B6 redirect/keyword plan is in place.
- **Validation commands:** `npm run typecheck && npm run lint && npm run build`; verify prerendered HTML contains correct per-locale REVAI meta; verify `/sluzby/*` URLs unchanged + 301s resolve; manual function test (contact + demo-request) against a test inbox.
- **Approval gate:** Owner reviews the AMAI→REVAI + redirect/hreflang changes (SEO-sensitive) before merge/deploy to any indexed environment.
- **Recommended Claude Code run settings:** **Fable 5 / High** for the implementation work (brand sweep, i18n layer, prerender wiring, token consolidation, new function, headers/sitemap). **Opus 4.8 / High** for the **pre-merge architecture review** — the i18n/redirect/hreflang/consent-adjacent changes here are SEO-sensitive and should not be reviewed by the same speed-tier that wrote them. *(confidence: high)*

---

## Phase 4A — Storytelling Variant Lab
**Goal:** Build and evaluate the primary cinematic chaos→order storytelling direction; produce a scored, Opus-reviewed winner decision. *(confidence: high on process; direction decided — see `phase-4a-primary-cinematic-direction.md`)*

> **Direction update (2026-06-11):** The four-way bake-off is superseded. Primary direction = **cinematic, stage-based chaos→order storytelling** (`exp/story-lab-cinematic-chaos-order`). `exp/story-lab-canvas-higgsfield` is closed as a learning/proof branch (pipeline proven; visual direction rejected — too close to warm-paper production, insufficiently cinematic). `exp/story-lab-control-crossfade` is retained as the baseline/control engine and secondary-chapter engine. `exp/story-lab-layered-dom` and `exp/story-lab-guiding-signal` are parked unless the cinematic direction fails its gates. Homepage stays **AI automation** (B6-safe); the web-rebuild arc relocates to `/sluzby/tvorba-modernich-webu` (see `phase-4a-primary-cinematic-direction.md` §3). Full detail: `phase-4a-primary-cinematic-direction.md`.

- **Inputs:** Phase 3 foundation (`main` at post-3F tip); Phase 2R palette + Direction A; `phase-4a-storytelling-variant-lab.md`; `phase-4a-storytelling-scorecard.md`; `phase-4a-higgsfield-asset-pipeline-spike.md`; `phase-4a-primary-cinematic-direction.md`; B5 approved (demo primary); B7 (copy owner — DRAFT copy only in 4A).
- **Outputs:** `exp/story-lab-cinematic-chaos-order` branch with lab route `/__story-lab/cinematic-chaos-order`, completed scorecard, Lighthouse reports, asset pipeline documentation, and cinematic bookend evaluation; `exp/story-lab-control-crossfade` retained as baseline; Opus-tier winner recommendation; owner sign-off on winner.
- **Asset gate:** Homepage Stage 1 + Stage 5 bookends generated and owner-evaluated **before** Stages 2–4 are generated. Stages 2–4 blocked on bookend gate. Lab route scaffolding blocked on full five-stage set. All assets remain uncommitted/local until the performance gate passes.
- **Allowed changes:** `exp/story-lab-cinematic-chaos-order` branch only; new `src/components/story-lab/` or equivalent directory; new lab route component `/__story-lab/cinematic-chaos-order` (noindex); branch-only `_redirects` `200` rewrite for `/__story-lab/*`; story asset directory. **No changes to existing homepage components, `main` branch `_redirects`, or `ROUTE_MAP`/`PAGE_META`.**
- **Forbidden changes:** Homepage H1/title/meta/static head (B6 frozen); `/cenik`; enabling tracking; protected `/sluzby/*` slugs/content; production `_redirects` or sitemap; dependency installs without the approved dependency pass.
- **Validation commands:** `npm run typecheck && npm run lint && npm run build` on the branch; `grep "noindex"` in served lab route HTML; Lighthouse (desktop + mobile) from a deploy-preview build; `du -sh` on story asset directory; `grep -r "__story-lab" src/i18n/` returns empty.
- **Approval gate:** Bookend gate (§ Asset gate above) → full scorecard + Lighthouse reports → Opus-tier review → owner sign-off before Phase 4B. **No branch advances without passing all production gates (`phase-4a-storytelling-variant-lab.md` §4) and all cinematic-direction gates (`phase-4a-primary-cinematic-direction.md` §7).**
- **Recommended Claude Code run settings:** **Fable 5 / High** for cinematic prompt/art-direction, Stage 1 + Stage 5 bookend generation, and implementation. **Sonnet 4.6** for docs, scaffolding, noindex wiring, compression pipeline, and validation scripts. **Opus 4.8 / High** for the **final variant selection review** — this is the strategic call that determines the client-project methodology; it gets the strongest tier. *(confidence: high)*

---

## Phase 4B — Winner productionization
**Goal:** Extract the Phase 4A winning approach from its experiment branch and build it to production quality: engine-clean, token-clean, i18n-complete, and performance-proven. *(confidence: medium — depends on 4A winner)*

- **Inputs:** 4A winner branch + signed scorecard; approved palette (Phase 2R Direction A); Higgsfield/stock assets with confirmed license; B7 copy owner assigned.
- **Outputs:** Production-quality storytelling component (new directory under `src/components/home/` or a dedicated path agreed in 4A); new `imageStoryDataPremium.ts` (or dictionary-backed equivalent per B7); story assets in `public/story/p/`; methodology document for client-project reuse.
- **Allowed changes:** New story component(s); `public/story/p/` asset directory; new scene data file; token/variant additions agreed in 4A. **`imageStoryData.ts` and the existing engine are untouched** unless the winner requires a small, separately-reviewed generalization (e.g. parameterising the TIMING array count).
- **Forbidden changes:** B6-frozen surfaces; `/cenik`; tracking; protected `/sluzby/*` slugs; engine internals beyond the agreed generalization.
- **Validation commands:** `typecheck && lint && build`; Lighthouse (perf/SEO/a11y) desktop + mobile on the story component in isolation; reduced-motion path check; CZ/EN parity; `public/story/p/` payload ≤ 350 KB.
- **Approval gate:** Owner approves story assets + production-quality component before Phase 4C wires it into the live homepage.
- **Recommended Claude Code run settings:** **Fable 5 / High** for the production story component, canvas pipeline if applicable, and visual polish. **Opus 4.8 / Medium** for the **production quality review** — perf budgets and reduced-motion correctness; lower blast radius than 4A selection but still SEO-adjacent (homepage perf). *(confidence: medium-high)*

---

## Phase 4C — Homepage integration
**Goal:** Wire the Phase 4B production story component into the live `Home.tsx`; reorder sections per `02`; adapt `Hero.tsx` ambient upgrade and CTA (B5); relocate the automation chapter (B4 "layer" decision). *(confidence: medium)*

- **Inputs:** Phase 4B productionized component; Phase 3 foundation; approved homepage section order (`02`); B4/B5/B6/B7 gate states at time of execution.
- **Outputs:** Repositioned `Home.tsx` composition with premium-web story leading; adapted `Hero.tsx` (ambient upgrade; B5 CTA wiring confirmed); `Services.tsx` reordered (D3); automation chapter relocated to compact card-stack form (B4 default); `DemoRequestBand` component wired to `demo-request.mts` (new `home/DemoRequestBand.tsx`); `ShowcaseTeaser` for demo concepts (new `home/ShowcaseTeaser.tsx`); FAQPage structured data scaffold.
- **Allowed changes:** `pages/Home.tsx`, `components/home/*`, `components/sections/*`, new section components. B6-frozen: homepage H1, title, meta description, and static `index.html` head wording — the only permitted delta remains the AMAI→REVAI brand suffix (already done in 3B). **Post-B6 close only:** H1 evolution per the phased meta-change plan; not in 4C scope unless B6 explicitly closes first.
- **Forbidden changes:** `/cenik`; enabling tracking; automation URL changes; motion engine internals beyond what 4B agreed.
- **Validation commands:** `typecheck && lint && build`; Lighthouse on `/` desktop + mobile; reduced-motion path; primary CTA (`/demo`) smoke test; CZ/EN parity; homepage H1/title/meta diff against B6 baseline (only brand suffix permitted).
- **Approval gate:** Owner approves the live homepage composition + that perf/mobile budgets hold.
- **Recommended Claude Code run settings:** **Fable 5 / High** for homepage composition, hero wiring, section reorder, new band components. **Opus 4.8 / Medium-High** for the **narrative/conversion review** — the repositioning wording carries SEO risk (R1) and the CTA hierarchy is a strategic call; content judgement gets the stronger tier. *(confidence: medium)*

---

## Phase 4D — Polish / performance / accessibility
**Goal:** Harden the Phase 4C homepage to production quality: a11y pass, Lighthouse targets met, CZ/EN parity, reduced-motion correctness, lazy/priority loading strategy for story images, font loading decision. *(confidence: medium-high)*

- **Inputs:** Phase 4C homepage; Lighthouse reports; a11y audit; B3 (approved); B7 copy (final for this phase).
- **Outputs:** a11y-clean homepage (WCAG 2.1 AA); Lighthouse desktop ≥ 90 perf / ≥ 95 SEO; mobile ≥ 85 perf; story image loading strategy (`loading`/`fetchpriority` pass on scenes 2–5); web-font adoption decision executed if owner approves (Phase 2R §5 pending decision, D14); `og:image` replacement if asset approved.
- **Allowed changes:** a11y/perf/polish fixes; image loading attributes; optional font adoption (gated); `og:image` swap if approved asset exists.
- **Forbidden changes:** New features; `/cenik`; tracking; unreviewed redirect changes.
- **Validation commands:** `typecheck && lint && build`; Lighthouse (all four categories) desktop + mobile; axe a11y; keyboard + screen-reader walkthrough; reduced-motion; CZ/EN; B6 homepage head diff.
- **Approval gate:** Owner confirms perf and a11y targets met before Phase 5 begins.
- **Recommended Claude Code run settings:** **Fable 5 / Medium** for polish fixes, loading attributes, font wiring. **Opus 4.8 / Medium** for the **a11y + perf final QA** — last check before homepage ships to the indexed domain. *(confidence: high)*

---

## Phase 5 — Demo concepts
**Goal:** Show range (luxury brand / SaaS / real estate) as engine-driven scene sets, not bespoke builds. *(confidence: medium)*

- **Inputs:** Phase 4 homepage; approved demo-concept assets (Phase 2); placement decision (`02`, Option A default).
- **Outputs:** `/ukazky` (`/showcase`) gallery + per-concept pages, each a scene-data set on the existing engine; internal links from premium-web service page + homepage teaser; indexable if used as ad landers.
- **Allowed changes:** New showcase routes + scene data; reuse of engine + `ui/ifl`.
- **Forbidden changes:** Forking the engine into three bespoke variants; `/cenik`; tracking; automation URL changes.
- **Validation commands:** `typecheck && lint && build`; per-concept Lighthouse (mobile perf especially); CZ/EN parity; sitemap includes new pages.
- **Approval gate:** Owner approves concept content + that each concept stays within perf budget.
- **Recommended Claude Code run settings:** **Fable 5 / High** for demo-concept implementation (scene-data sets on the existing engine, showcase routes). **Opus 4.8 / Medium** for the **concept/performance review** — lower strategic risk than the homepage, but mobile perf per concept still warrants a stronger-tier sign-off. *(confidence: medium-high)*

---

## Phase 6 — Analytics & cookies
**Goal:** Implement consent-gated analytics + Meta tracking. Resolve the live GDPR contradiction (R3). *(confidence: medium)*

- **Inputs:** Consent+event contract (Phase 2); event taxonomy (B8); CMP + Pixel/CAPI decisions (`04`); legal sign-off on consent text; Meta Pixel ID + CAPI token (env).
- **Outputs:** CMP (default-deny, granular categories) gating all non-essential tags; GA4 (consent-gated); Meta Pixel + (if spend justifies) CAPI via `capi.mts`, deduped by `event_id`; the 6 conversion events wired (`03`); existing leadsy tag gated or removed; **GDPR text updated** to match reality.
- **Allowed changes:** Consent layer, analytics config, `capi.mts`, event hooks in CTAs/forms, GDPR text, `_headers` CSP allowlist for tag origins, new env vars.
- **Forbidden changes:** Any tag firing before consent; storing PII without basis; `/cenik` content; touching the motion engine.
- **Validation commands:** `typecheck && lint && build`; staging proof that **pre-consent network = zero non-essential trackers**; Meta Events Manager test-mode dedup screenshot; GA4 debug view confirms events; consent withdrawal stops tags.
- **Approval gate:** Owner + legal sign off that consent gating is correct and GDPR text is accurate **before** production.
- **Recommended Claude Code run settings:** **Fable 5 / Medium-High** for the implementation (CMP wiring, event hooks, `capi.mts`, GDPR text edits). **Opus 4.8 / High** for the **consent/tracking/compliance review** — this is a legal-exposure area (R3) and the most consequential "did we gate everything correctly" check in the project; the verification gets the strongest tier. *(confidence: high)*

---

## Phase 7 — QA & deployment
**Goal:** Final hardening, cross-checks, and a controlled production launch that protects existing SEO. *(confidence: medium-high)*

- **Inputs:** All prior phases; redirect/hreflang map; keyword-preservation list (B6); confirmed production site/env (B1); verified Resend domain (R17).
- **Outputs:** Green `typecheck`/`lint`/`build`; smoke tests (render `/`, `/cenik`, `/kontakt`, `/demo` per locale; contact + demo-request function validation branches); cross-browser + mobile QA; a11y pass (keyboard, contrast, reduced-motion, form `aria-live`); Lighthouse budgets met; SEO checks (per-locale meta, canonicals, hreflang, sitemap, structured data, `/sluzby/*` URLs intact); deploy runbook + rollback plan; post-launch Search Console monitoring plan.
- **Allowed changes:** Bug fixes, test additions, perf/a11y/SEO tuning, deploy config.
- **Forbidden changes:** New features; `/cenik` content; risky refactors at the gate; un-reviewed redirect changes.
- **Validation commands:** `npm run typecheck && npm run lint && npm run build`; smoke/route + function tests; Lighthouse (perf/SEO/a11y/best-practices) desktop+mobile; link check (no dead links / no empty 404 renders); verify 301s + hreflang in built output.
- **Approval gate:** Owner approves production deploy after a **staging sign-off**. **This is the one gate where an independent cross-check (SEO + perf + a11y) may be worth a dynamic workflow** — propose it explicitly, with cost/limit risk and the decision it improves, and only run it with approval. Default remains: no workflow unless requested.
- **Recommended Claude Code run settings:** **Fable 5 / Medium** for fixes/test additions/tuning. **Opus 4.8 / High** for the **final QA review** (SEO meta/canonicals/hreflang, redirect integrity, a11y, perf budgets) — the last line of defense before a deploy that must not damage existing SEO. **Dynamic workflows may be proposed here only with explicit approval**, for an independent SEO/perf/a11y cross-check; off by default otherwise. *(confidence: high)*

---

## Phase dependency summary

```
P0 baseline ──▶ P1 decisions ──▶ P2 spike ──▶ P3 foundation ──▶ P4A lab ──▶ P4B winner ──▶ P4C homepage ──▶ P4D polish ──▶ P5 demos ──▶ P6 analytics ──▶ P7 QA/deploy
  │ B1            │ B2/B3/B4/B5/B7/B8   │ B9/G        │ B10/B6           │ scorecard   │ assets/copy  │ B5/B7         │ a11y/perf
  └─ must answer B1 before anything outward-facing; B6 before any homepage meta change (4C/H1); consent (P6) before any tracking.
  └─ model policy: Sonnet 4.6 (docs/fixes/validation) · Fable 5 (storytelling/visual/motion) · Opus 4.8 (SEO/security/4A selection/final QA)
```

**Critical-path risks to watch (from `docs/audit/03`):** R1 (SEO loss) gates P1→P3→P4; R2 (i18n) gates P1→P3; R3 (consent) gates P6 and constrains P0–P5 (no tracking); R20/B1 (copied repo) gates P0. *(confidence: high that this ordering minimizes regret; magnitudes of R1/R5/R8 remain Assumption-level until real build + analytics exist.)*
