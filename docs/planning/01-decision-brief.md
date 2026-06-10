# 01 — Decision Brief (REVAI redesign)

> Planning document. No code, no installs, no implementation.
> Builds on `docs/audit/01`–`05`. Every recommendation carries a confidence tag.
> Purpose: separate what is **settled** from what is **still blocking**, give defaults so non-answers don't stall work, and record what we are deliberately *not* doing.

---

## 1. Decisions already made (locked by the brief / audit)

These are inputs, not open for re-litigation in this redesign.

| # | Decision | Source | Confidence |
|---|---|---|---|
| D1 | Brand is **REVAI** (not AMAI). | Brief | high |
| D2 | **Primary offer = premium storytelling websites.** Automation, AI app dev, voice are secondary. | Brief | high |
| D3 | Margin/priority order: premium web → process automation → AI app dev → voice. | Brief | high |
| D4 | Audience = **medium-sized business owners.** | Brief | high |
| D5 | Three primary conversions: book consultation, inquiry form, **website-URL → manual demo in hours.** | Brief | high |
| D6 | Demo fulfillment is **manual in phase 1** (automation later). | Brief | high |
| D7 | **CZ + EN both required** and (per audit) both must be genuinely indexable. | Brief + audit R2 | high |
| D8 | **Existing AI-automation SEO must be preserved.** | Brief + audit R1 | high |
| D9 | Deployment stays on **Netlify.** | Brief | high |
| D10 | **Keep the current stack** (Vite + React + TS + Tailwind) unless a strong reason emerges. | Brief | high |
| D11 | Pricing (`/cenik`) is **audit-only — not changed** in this redesign; a premium "signature" tier is additive later. | Brief + audit | high |
| D12 | Tracking (GA/Pixel/CAPI/consent) is **designed now, implemented in a later dedicated phase**, consent-gated. | Brief + audit R3 | high |
| D13 | Reuse the existing **scrollytelling motion engine** as the core "wow" asset rather than rebuilding it. | Audit area-5 / reuse map | high |
| D14 | Brand palette stays **open**; 2–3 directions explored later on a consolidated token system. | Brief + audit area-6 | high |
| D15 | **Model execution policy.** **Fable 5** is the primary implementation model for approved production work. **Opus 4.8** is used for strategic architecture, SEO/i18n, consent/tracking architecture, and high-stakes/adversarial review. **Dynamic workflows stay off by default** (considered only at high-stakes review gates, with approval). | Owner directive | high |

### D15 expanded — model execution policy

The split is **by risk, not by preference**:

| Work type | Model / effort | Why | Confidence |
|---|---|---|---|
| Approved production implementation (foundation, homepage/storytelling, demo concepts, analytics wiring, fixes) | **Fable 5** (effort per phase, see `06`) | Fast, capable implementation model; the bulk of post-approval build work is well-specified by the plan and suits Fable 5. | high |
| Strategic/architecture decisions (Phase 1), SEO/i18n design, consent/tracking architecture, redirect/keyword-preservation calls | **Opus 4.8 / High** | These are high-blast-radius, hard-to-reverse, and the explicit risk areas (R1/R2/R3). Keep the strongest judgement here. | high |
| Pre-merge / pre-launch adversarial review of the above | **Opus 4.8 / High** | Final review of SEO/i18n/consent-sensitive changes should not be done by the same model tier that wrote them at speed. | high |
| Tool-approval decisions involving SEO/perf/licensing/compliance risk (Phase 2) | **Opus 4.8 / High** | A paid/lock-in/compliance call is a risk decision, not an implementation task. | high |

**Operating rule:** Fable 5 is the *default for building*; Opus 4.8 is the *default for deciding and for final review*. When in doubt about which tier, the deciding factor is **reversibility + SEO/consent exposure**, not speed. Dynamic workflows remain off unless a high-stakes gate (Phase 7) explicitly justifies an independent cross-check, with approval. *(confidence: high)*

---

## 2. Decisions still BLOCKING (must be answered before the relevant phase)

Mapped to the seven blocking questions in `docs/audit/05`. Each blocks a specific phase in `06-implementation-roadmap.md`.

| # | Blocking decision | Blocks | Recommended default (if no answer) | Confidence in default |
|---|---|---|---|---|
| B1 | **Production source of truth** — this is a *copied, non-git* repo. Which repo/Netlify site is real? | Everything (Phase 0) | Treat this tree as scratch; reconcile to the real repo before any deploy. | high |
| B2 | **i18n URL strategy** — `/cs` + `/en` subpaths vs. subdomain vs. domain. | IA, routing, SEO (Phase 1/3) | **Subpath `/cs` + `/en` on one Netlify site**, `cs` default, reciprocal hreflang. | medium |
| B3 | **SSR / prerender** — accept client-only SEO limits, or prerender marketing routes? | Architecture (Phase 1/3) | **Prerender/SSG the marketing routes**; keep SPA behavior for app-like bits. | medium-high |
| B4 | **Homepage story strategy** — replace the automation narrative, or layer it as a secondary chapter? | Homepage (Phase 4) | **Lead with the premium-web transformation story; keep a short automation chapter** so equity isn't abandoned. | medium |
| B5 | **Hero conversion** — which of the 3 CTAs is THE primary? | Conversion arch (Phase 1) | **Website-URL demo as primary** (it's the differentiator), consultation as strong secondary. | low |
| B6 | **Keyword-preservation list** — which exact automation pages/terms must not lose ranking? | SEO plan (Phase 1) | Freeze all `/sluzby/*` URLs + their meta; re-rank, don't re-slug. | high |
| B7 | **CZ+EN copy ownership** — who authors both languages, authored in parallel? | Content (Phase 4) | Author CZ+EN together via dictionaries; no new inline `t('cs','en')`. | high |
| B8 | **Event taxonomy sign-off** — confirm the 6 events + any extras. | Analytics (Phase 6) | Use the 6 from the brief + scroll-depth on story + language switch. | medium |
| B9 | **Supabase: use or remove** for demo-request lead storage. | Function arch (Phase 2/3) | **Postpone the decision to the spike (Phase 2)**; default to email-only in phase 1, add storage only if the manual process needs it. | medium |
| B10 | **Brand facts** — real REVAI socials, support email, correct address (Znojmo vs Praha conflict), IČO unchanged? | Brand migration (Phase 3) | Block the AMAI→REVAI sweep until these are supplied; don't guess. | high |

> Defaults exist so work can *start* in low-risk areas, but **B1, B6, B10 should be answered before any outward-facing or SEO-affecting change.**

---

## 3. Recommended defaults (consolidated, with rationale)

| Topic | Default | Why | Trade-off | Confidence |
|---|---|---|---|---|
| Stack | Keep Vite+React+TS+Tailwind | Audit found it sound; rewrite cost unjustified | Vite has no first-class SSR; prerender needed for SEO | high |
| Rendering | Add prerender for marketing routes | Crawlers must see localized REVAI meta, not stale client-mutated head | Build complexity; some dynamic content needs hydration | medium-high |
| i18n | `/cs` + `/en` subpaths, dictionaries, hreflang | Simplest correct option on one Netlify site | More routing plumbing than the current toggle | medium |
| Motion | Reuse existing engine, drive via scene data | It's the strongest asset; lowers redesign risk | Engine generalization is a deliberate later task | high |
| Tokens | Consolidate duplicated palette to one source first | Enables 2–3 palette explorations as a swap, not a sweep | A tokenization pass before visual exploration | high |
| Demo flow | Email-notify the team in phase 1; storage optional | Manual fulfillment doesn't need a DB to start | Harder reporting until storage added | medium |
| Tracking | Consent-gated, server-side CAPI via Netlify function, dedicated phase | GDPR + measurable ad ROI | Extra phase; CSP must allowlist origins | medium |
| Dependencies | Standardize one motion lib + one icon set after usage audit | Bundle/debt reduction | Needs the "may change deps" approval | medium |

---

## 4. Rejected alternatives (and why)

| Alternative considered | Rejected because | Confidence in rejection |
|---|---|---|
| **Greenfield rewrite** (Next.js from scratch) | Throws away the strong motion engine, working form backend, and token system; high cost; re-introduces SEO migration risk the audit warns about. Reposition is mostly *content + IA + SEO*, not a platform problem. | high |
| **Migrate to Next.js / Astro now** for SSR | Tempting for SEO, but a framework migration mid-reposition multiplies risk (R1/R5 at once). A Vite prerender plugin gets ~80% of the SEO benefit at a fraction of the risk. Revisit only if prerender proves insufficient. | medium |
| **Keep the current runtime i18n toggle** | Fails the "EN must be indexable" requirement (audit R2); guarantees a later rewrite of all new copy. Cheaper now, far more expensive later. | high |
| **Aggressive IA re-slug** (rename `/sluzby/*`) to web-first URLs | Directly endangers automation SEO equity (D8/R1). Re-rank via homepage + internal linking instead of re-slugging. | high |
| **Ship Meta Pixel before consent** | Live GDPR contradiction already exists (R3); adding more uncon­sented tracking compounds legal exposure. | high |
| **Build 3 separate demo sites** for the demo concepts | Triples build/maintenance; the existing engine can render all three as scene-data sets. Only split if a concept needs bespoke interaction the engine can't express. | medium |
| **Auto-adopt Higgsfield / paid asset tools** | No evidence yet they beat the current local-webp workflow for *this* site; must pass a proof-of-capability spike first (see `04`). Paid + unproven = not a default. | high |
| **Delete orphaned Supabase / second motion lib now** | Audit policy is classify-not-delete; deletion needs approval and a usage check. Defer to Phase 2/3. | high |
| **Use Fable 5 for every task indiscriminately** | Model choice should depend on **risk, not preference**. The high-blast-radius, hard-to-reverse work (strategic architecture, SEO/i18n, consent/tracking, final adversarial review) keeps Opus 4.8; making Fable 5 the blanket default would put the speed-tier model in charge of exactly the decisions where a wrong call is most expensive (R1/R2/R3). Fable 5 is the default for *approved implementation*, not for *deciding*. | high |

---

## 5. Risks carried into planning

(Full register in `docs/audit/03`. These are the ones that shape the plan.)

| Risk | Severity | How the plan addresses it |
|---|---|---|
| R1 SEO loss from repositioning | high | Phase 1 keyword-preservation list + freeze `/sluzby/*` URLs; phase the homepage H1/meta change; monitor Search Console pre/post. |
| R2 Fake i18n | high | i18n strategy decided in Phase 1 *before* copy; dictionaries + hreflang in Phase 3. |
| R3 Consent contradiction (live leadsy tracker) | high (legal) | Phase 6 consent layer; interim: decide leadsy's fate + fix GDPR text early. |
| R4 Half-done brand migration | medium-high | Phase 3 deliberate AMAI→REVAI sweep gated on B10 brand facts. |
| R5 No SSR (client-mutated meta) | medium-high | Phase 3 prerender for marketing routes. |
| R6 No tests / unvalidated build | medium | Phase 0 baseline: install (with approval), typecheck/lint/build green, add smoke tests. |
| R7 Demo flow doesn't exist | high | Phase 2 design + Phase 3/4 build; instrument events from day one. |
| R17 Resend/env unverified | medium | Phase 0 verify env + sending domain in target site. |
| R20 Copied repo | medium | B1 — confirm source of truth in Phase 0. |

**Net position (confidence: high):** the redesign is a *reposition-on-foundation*, sequenced so the high-severity SEO/i18n/consent risks are resolved or consciously accepted **before** the visible build, not after.
