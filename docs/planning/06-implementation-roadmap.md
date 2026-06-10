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

## Phase 4 — Homepage / storytelling implementation
**Goal:** Build the premium-web homepage on the existing motion engine, with the new narrative + primary conversion band. *(confidence: medium)*

- **Inputs:** Phase 3 foundation; approved palette + assets (Phase 2); homepage section order (`02`); CZ+EN copy (B7); hero-CTA decision (B5).
- **Outputs:** Repositioned `Home.tsx` composition; adapted `Hero` (premium copy, fixed eyebrow); new premium scene data in `imageStoryData`; reordered `Services` (D3); demo-request conversion band wired to `demo-request.mts`; optional secondary automation chapter (if B4 = layer); FAQ structured data.
- **Allowed changes:** `pages/Home.tsx`, `components/home/*`, `components/sections/*`, story scene data, new section components, premium-web service page promotion.
- **Forbidden changes:** Editing the motion **engine internals** beyond generalization agreed in Phase 3; `/cenik`; enabling tracking; changing automation page URLs.
- **Validation commands:** `typecheck && lint && build`; Lighthouse (perf/SEO/a11y) on `/` desktop + mobile; reduced-motion path check; verify primary CTA + demo flow submit end-to-end against test inbox; CZ/EN parity check.
- **Approval gate:** Owner approves the live homepage narrative + that perf/mobile budgets hold (the brief's hard constraint: wow must not cost mobile smoothness/speed).
- **Recommended Claude Code run settings:** **Fable 5 / High** for the homepage/storytelling implementation (composition, hero, scene data, sections, demo band). **Opus 4.8 / Medium-High** for the **narrative/conversion review** — the repositioning wording carries SEO risk (R1) and the CTA hierarchy is a strategic call, so the *content/conversion* judgement gets the stronger tier even though the build is Fable 5. *(confidence: high)*

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
P0 baseline ──▶ P1 decisions ──▶ P2 spike ──▶ P3 foundation ──▶ P4 homepage ──▶ P5 demos ──▶ P6 analytics ──▶ P7 QA/deploy
  │ B1            │ B2/B3/B4/B5/B7/B8   │ B9/G        │ B10/B6           │ B5/B7
  └─ must answer B1 before anything outward-facing; B6 before any homepage meta change; consent (P6) before any tracking.
```

**Critical-path risks to watch (from `docs/audit/03`):** R1 (SEO loss) gates P1→P3→P4; R2 (i18n) gates P1→P3; R3 (consent) gates P6 and constrains P0–P5 (no tracking); R20/B1 (copied repo) gates P0. *(confidence: high that this ordering minimizes regret; magnitudes of R1/R5/R8 remain Assumption-level until real build + analytics exist.)*
