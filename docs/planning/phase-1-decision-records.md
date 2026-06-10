# Phase 1 — Decision Records (REVAI redesign)

> **Work mode:** decision-record phase. No code, no installs, no dependency/lockfile changes, no `npm audit fix`, no deploys, no outward-facing changes. Documentation only, under `docs/planning/`.
> **Model:** Opus 4.8 / High — per D15, this is the strategic-decision phase (highest blast radius, hardest to reverse). No Fable 5 default here.
> **Inputs:** `docs/planning/01–06`, `docs/audit/03–05`, `docs/planning/phase-0-baseline-validation.md`.
> **Date:** 2026-06-10.

This pack converts the blocking decisions **B1–B10** from `01-decision-brief.md §2` into formal decision records, plus a security/dependency decision carried from Phase 0 and the Phase 1 exit criteria.

**How to read a record:** a *recommended default* is the audit/planning team's low-regret position so low-risk work can start — it is **not** a substitute for owner sign-off where one is required. "Implementation may proceed without it" and "Outward-facing changes may proceed without it" are deliberately separated, because several decisions are safe to *build behind* but unsafe to *ship* without an answer.

**Critical honesty note (applies to the whole pack):** three of these — **B1, B6, B10** — are hard blockers on anything outward-facing or SEO-affecting, and **none of the three can be answered from the code or this environment.** They require the owner. Defaults do not unblock them. This document does not paper over that.

---

## Status legend

| Field | Values |
|---|---|
| Current status | `approved` / `rejected` / `pending` / `needs owner input` |
| Confidence (in the recommended default) | `high` / `medium` / `low` |
| Implementation may proceed without it | `yes` / `no` |
| Outward-facing changes may proceed without it | `yes` / `no` |

> "Outward-facing" = deploy, publish, sitemap submission, social-handle change, any SEO-affecting change to an indexed surface, any tracking that fires in production.

---

## Summary table

| ID | Decision | Status | Confidence | Impl w/o it | Outward w/o it | Blocks |
|---|---|---|---|---|---|---|
| B1 | Production source of truth | **needs owner input** | high | no | **no** | Everything (Phase 0 gate) |
| B2 | i18n URL strategy (`/cs` + `/en`) | pending (default recommended) | medium | partial | no | IA / routing / SEO (P1→P3) |
| B3 | SSR / prerender for marketing routes | pending (default recommended) | medium-high | yes | no | Architecture (P1→P3) |
| B4 | Homepage story strategy | pending (default recommended) | medium | yes | no | Homepage (P4) |
| B5 | Hero conversion / primary CTA | **needs owner input** | low | yes | no | Conversion arch (P1), Homepage (P4) |
| B6 | Keyword-preservation list | **needs owner input** | high | partial | **no** | SEO plan (P1), any homepage meta/H1 change |
| B7 | CZ+EN copy ownership (dictionaries) | pending (default recommended) | high | yes | no | Content (P4) |
| B8 | Event taxonomy sign-off | pending (default recommended) | medium | yes | yes (design only) | Analytics (P6) |
| B9 | Supabase / lead storage | pending (default recommended) | medium | yes | yes | Function arch (P2/P3) |
| B10 | Brand facts (REVAI) | **needs owner input** | high | partial | **no** | Brand migration (P3) AMAI→REVAI sweep |

> **Three hard gates:** B1, B6, B10 must be answered before any outward-facing or SEO-affecting change. Everything else has a low-regret default that lets *internal* work start without committing the owner to a wrong, hard-to-reverse call.

---

## B1 — Production source of truth

- **ID:** B1
- **Decision title:** Confirm the real production repository and Netlify site (this tree is a copied, non-git working copy).
- **Current status:** **needs owner input** — unresolved and not resolvable from the code.
- **Recommended default:** Treat this tree as **scratch**. Do not initialize git, do not deploy, do not reconcile anything outward-facing until the owner names the production repo + Netlify site. (This is a containment default, not an answer.)
- **Owner input required (exact):**
  1. The URL/location of the **authoritative git repository** for the production site (host + org/repo + default branch).
  2. The **Netlify site** that serves production (site name/ID + production domain).
  3. Whether **this local tree** is ahead of, behind, or divergent from that repo — and how changes are to be reconciled back (PR into the real repo? replace it? this becomes the repo?).
  4. Confirmation that the env/secrets (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) live on **that** Netlify site (ties to R17).
- **Risk if left unresolved:** Any work that lands here may be applied to the **wrong tree** and silently diverge from production (R20). Worse: an outward-facing change made against a scratch copy could either be lost or, if mistaken for production, overwrite/contradict the live site. Every downstream SEO/brand/i18n decision is built on sand until this is known.
- **What phase it blocks:** **Everything outward-facing.** It is the Phase 0 approval gate; per `06`, no further phase starts (for deploy purposes) until B1 is answered. Phase 1 *decision work* (this document) is allowed to proceed on the scratch copy.
- **Recommended next action:** Owner provides the four items above. Until then, all build work stays local and uncommitted; nothing is deployed or reconciled.
- **Confidence (in default):** high (the *containment* default is clearly correct; it is not a substitute for the answer).
- **Implementation may proceed without it:** **no** for anything intended to reach production; *local/throwaway* exploration only.
- **Outward-facing changes may proceed without it:** **no.**

> **Do not guess** which repo/site is real. There is no safe inference here.

---

## B2 — i18n URL strategy

- **ID:** B2
- **Decision title:** How are CZ and EN expressed in URLs — subpaths, subdomains, or separate domains?
- **Current status:** pending — **recommended default stands unless rejected.**
- **Recommended default:** **`/cs` + `/en` subpaths on one Netlify site**, `cs` as default/canonical, reciprocal `hreflang` (`cs`↔`en` + `x-default`) on every page. 301 the bare indexed paths → `/cs/...` (or serve `cs` at root) so currently-indexed URLs never 404. *(confidence: medium)*
- **Owner input required (exact):** Approve subpaths, OR choose subdomain/separate-domain (and state why — e.g. distinct EN market/brand). **Plus the real trade-off below must be decided**, because the default left it open at low confidence:
  - **Sub-decision (slugs under `/en/`):** Do EN pages reuse the **Czech slugs** (e.g. `/en/sluzby/automatizace-procesu`) or use **English slugs** (e.g. `/en/services/process-automation`)?
- **Trade-off — Czech slugs under `/en` vs. English slugs (state explicitly):**
  - **Czech slugs under `/en/`** (e.g. `/en/sluzby/...`): operationally simpler — one slug set, fewer redirects, simpler `hreflang`/canonical bookkeeping, lower risk of orphaned/duplicate EN pages. **Cost:** weaker EN keyword targeting — the URL token doesn't match what an English speaker searches, costing some on-page EN SEO signal.
  - **English slugs under `/en/`** (e.g. `/en/services/...`): better EN keyword relevance and cleaner UX for English readers. **Cost:** more `hreflang`/canonical/redirect bookkeeping; every CZ↔EN pair must be mapped; a mistake creates duplicate-content or orphaned EN pages (R2-adjacent).
  - **Recommendation:** if EN search volume for this business is **low**, reuse Czech slugs under `/en/` (safer). If EN is a **real acquisition channel**, invest in English slugs + the bookkeeping. This depends on a business fact (EN keyword value) the audit cannot supply — **the owner must state it.** *(confidence: low on the slug sub-decision specifically)*
- **Risk if left unresolved:** Writing new copy or routing before this is fixed risks a later rewrite of routes + all new copy (R2). The current runtime toggle makes EN effectively non-indexable; committing to it guarantees rework.
- **What phase it blocks:** IA finalization, routing, sitemap, canonicals, `hreflang` — **Phase 1 direction → Phase 3 build.** Must be settled *before* new copy is authored (Phase 4).
- **Recommended next action:** Owner approves subpaths and answers the slug sub-decision (informed by EN keyword value). Direction-level approval is enough to unblock Phase 1; the slug detail can be confirmed before Phase 3.
- **Confidence (in default):** medium (subpaths); low (slug sub-decision — genuine business-dependent trade-off).
- **Implementation may proceed without it:** **partial** — engine/section/token work that is locale-agnostic can proceed; routing, dictionaries scaffolding, and `hreflang` cannot be finalized until direction is approved.
- **Outward-facing changes may proceed without it:** **no** (any URL/locale change touching indexed pages is SEO-affecting).

---

## B3 — SSR / prerender

- **ID:** B3
- **Decision title:** Accept client-only SEO limits, or prerender marketing routes?
- **Current status:** pending — **recommended default stands unless rejected.**
- **Recommended default:** **Prerender/SSG the marketing routes** at build time (Vite-compatible prerender approach) so each route + locale ships **real HTML** with correct REVAI + localized meta. Keep SPA hydration for interactive parts. **Do not migrate frameworks.** *(confidence: medium-high)*
- **Owner input required (exact):** Approve "prerender marketing routes, keep Vite/React SPA" as the rendering direction. (No business fact needed; this is an architecture sign-off.)
- **Why a Next.js / greenfield migration remains rejected (for now):**
  - A framework migration **mid-reposition** stacks the two highest SEO risks at once — R1 (repositioning ranking loss) **and** R5 (SSR/meta) — multiplying migration risk instead of isolating it.
  - It **throws away working assets** the audit rated sound: the scrollytelling motion engine (D13), the working Resend form backend, the token system. The redesign's problem is **content + IA + SEO + brand**, *not* the framework (D10, `05`).
  - A Vite prerender plugin delivers **~80% of the SEO benefit at a fraction of the risk** — crawlers get correct per-locale REVAI HTML without a platform change.
  - **Revisit only if** prerender proves insufficient (e.g. heavy dynamic personalization — which this marketing site does not have). Until then, greenfield/Next.js is **rejected**, consistent with `01 §4`.
- **Risk if left unresolved:** Without prerender, crawlers that don't execute JS see the **stale static `index.html` head** (today: "AMAI") and no per-locale meta (R4/R5). New REVAI positioning and EN content index weakly or not at all. Leaving it open also blocks the Phase 3 architecture.
- **What phase it blocks:** Architecture lock (Phase 1) → foundation build (Phase 3 prerender wiring, per-locale meta, build-time sitemap).
- **Recommended next action:** Owner approves prerender-not-migrate. Phase 2 spike can validate the specific prerender approach against the engine; Phase 3 implements.
- **Confidence (in default):** medium-high.
- **Implementation may proceed without it:** **yes** (foundation work can be structured to accept prerender; nothing is foreclosed by waiting).
- **Outward-facing changes may proceed without it:** **no** (rendering strategy changes served HTML — SEO-affecting).

---

## B4 — Homepage story strategy

- **ID:** B4
- **Decision title:** Replace the automation narrative, or layer it as a secondary chapter?
- **Current status:** pending — **recommended default stands unless rejected.**
- **Recommended default:** **Lead with the premium-web transformation story** ("outdated site → modern sales engine") as the signature homepage moment, and **keep a short, compact automation chapter as a secondary section** so existing automation equity/narrative isn't abandoned. Reuse the existing motion engine driven by new scene data; the automation chapter reuses *current* scene data, demoted not deleted. *(confidence: medium)*
- **Owner input required (exact):** Confirm "premium-web story first, automation as a short secondary chapter" vs. a full replacement (drop automation narrative entirely) vs. keeping automation primary. If "layer", confirm the automation chapter may reuse the existing scene data in a demoted position.
- **Risk if left unresolved:** Phase 4 homepage composition can't be finalized; scene-data production (asset spike, Phase 2) can't be scoped. Choosing "replace" without B6 in hand risks **R1** (dropping automation ranking signals). Choosing nothing stalls the visible build.
- **What phase it blocks:** Homepage / storytelling (Phase 4); informs the asset spike scope (Phase 2).
- **Recommended next action:** Owner approves "lead premium-web, keep short automation chapter." Note this interacts with **B6** — the *narrative* swap must not change ranking signals before the keyword-preservation/redirect plan exists.
- **Confidence (in default):** medium.
- **Implementation may proceed without it:** **yes** (engine generalization, section scaffolding, token work proceed regardless).
- **Outward-facing changes may proceed without it:** **no** (homepage narrative is SEO-affecting; gated additionally by B6).

---

## B5 — Hero conversion

- **ID:** B5
- **Decision title:** Which of the three CTAs is THE primary hero conversion?
- **Current status:** **needs owner input** — this is a business call; the architecture supports any ordering but the *choice* is the owner's.
- **Recommended default:** **Website-URL demo request as the primary CTA** ("paste your current site → tailored demo in a few hours"), because it is the **differentiator**; **book-a-consultation as a strong secondary** (existing Google Calendar flow); inquiry form as the contact-page entry. *(confidence: low — ordering is a business decision)*
- **Owner input required (exact):** Confirm the primary hero CTA = **website-URL demo**, secondary = **consultation**. If the owner prefers consultation-first (the current site's behavior), say so explicitly — because then the demo differentiator gets buried and the architecture/measurement emphasis changes.
- **Risk if left unresolved:** The current site leads **every** CTA with the Google Calendar consultation. If the demo is meant to be the new differentiator but the calendar CTA isn't stepped back to secondary, **the headline conversion gets buried** (`03 §1`). Leaving B5 open means the navbar persistent CTA, hero, and demo band can't be finalized, and event-emphasis (B8) can't be tuned to the real primary conversion.
- **What phase it blocks:** Conversion architecture (Phase 1); hero + persistent CTA + demo band on the homepage (Phase 4).
- **Recommended next action:** Owner picks the primary CTA. Recommended: demo primary, consultation strong secondary, one dominant action per view.
- **Confidence (in default):** low (genuine business call; the recommendation is sound but the owner owns it).
- **Implementation may proceed without it:** **yes** (build both flows; CTA *prominence* is a late, cheap swap).
- **Outward-facing changes may proceed without it:** **no** (don't ship a homepage whose primary CTA hierarchy isn't owner-approved).

---

## B6 — Keyword-preservation list

- **ID:** B6
- **Decision title:** Which exact automation pages/terms must not lose ranking?
- **Current status:** **needs owner input / external data required** — cannot be derived from the code; needs Search Console (or equivalent) data.
- **Recommended default (containment):** Until the list exists, **freeze all `/sluzby/*` URLs and their current meta**; **re-rank, don't re-slug**; keep the existing `emailova-automatizace → automatizace-procesu` 301. Do **not** change any homepage H1/title/JSON-LD automation wording. (This protects equity in the absence of data, but is not a substitute for the list.) *(confidence: high in the containment posture)*
- **Owner input required — minimum data needed from Search Console (exact):**
  1. **Top automation queries** driving organic impressions/clicks (last 12 months), with **clicks, impressions, average position** per query.
  2. The **landing pages** those queries map to (the must-not-lose URLs) — expected to include `/sluzby/automatizace-procesu`, `/sluzby/ai-app-development`, `/sluzby/hlasovi-agenti`, and the home/`emailova-automatizace` path.
  3. Current **meta title/description and H1** for each of those pages (so changes can be measured against a baseline).
  4. Any pages with **external backlinks** worth preserving (to prioritize 301s if a slug ever must move).
  5. A **baseline snapshot date** so pre/post repositioning can be compared (R1 monitoring).
- **Risk if left unresolved:** This is the single biggest SEO risk (**R1**). Repositioning the homepage from "AI automation" to "premium websites" **without knowing which terms/pages carry the equity** can silently drop existing organic leads — an explicit business constraint (D8) says this must not happen. No analytics exist in the repo, so this risk is currently **un-sized**.
- **What phase it blocks:** **Any homepage meta/H1/title/JSON-LD or SEO-affecting change** (Phases 1→3→4). Per `06`, B6 must be answered before any homepage meta change.
- **Recommended next action:** Owner (or whoever has Search Console access) exports the five items above. Phase 0 could not obtain a Search Console baseline from this environment — this remains the gating external input.
- **Confidence (in default):** high (in the *freeze-and-wait* posture).
- **Implementation may proceed without it:** **partial** — non-meta, non-narrative work (engine, tokens, components, EN parity scaffolding) proceeds; **any homepage meta/H1/SEO change does not.**
- **Outward-facing changes may proceed without it:** **no** (blocks any homepage meta/H1/SEO change explicitly).

---

## B7 — CZ+EN copy ownership

- **ID:** B7
- **Decision title:** Who authors both languages, and how is copy stored?
- **Current status:** pending — **recommended default stands unless rejected.**
- **Recommended default:** **Author CZ + EN together in dictionaries** (`cs.ts` / `en.ts` or equivalent), **not** as new inline `t('cs','en')` pairs. Migrate existing inline pairs incrementally; **all new premium copy goes through dictionaries** so EN is first-class and not retrofitted later. *(confidence: high on the mechanism)*
- **Owner input required (exact):** (1) **Who authors** the CZ and EN copy (in-house? the owner? a copywriter? translation vendor?) and confirmation that **both languages are authored in parallel** (not EN-as-afterthought). (2) Acceptance of the **dictionaries, no-new-inline-pairs** rule as a hard constraint for the redesign.
- **Risk if left unresolved:** Continuing to author inline `t('cs','en')` pairs (the current pattern, hundreds of them) **doubles the rework** when real i18n lands (R2) and tends to leave EN as a weak machine-translated courtesy — failing the "EN must be genuinely indexable" requirement (D7). If ownership is unassigned, the homepage rebuild (Phase 4) stalls on missing copy.
- **What phase it blocks:** Content authoring (Phase 4); the i18n dictionary structure (Phase 3) should be ready to receive it.
- **Recommended next action:** Owner names the copy author(s), confirms parallel CZ+EN authoring, and accepts the dictionary rule. Engineering can scaffold empty dictionaries in Phase 3 regardless.
- **Confidence (in default):** high (mechanism); the *ownership* assignment is a business/staffing fact the owner must supply.
- **Implementation may proceed without it:** **yes** (dictionary scaffolding and i18n plumbing don't need the final copy).
- **Outward-facing changes may proceed without it:** **no** (don't ship copy whose authorship/quality/parallel-language status is unconfirmed).

---

## B8 — Event taxonomy

- **ID:** B8
- **Decision title:** Confirm the conversion/analytics event set and which events are primary vs. micro.
- **Current status:** pending — **recommended default stands unless rejected.** Design only; **implementation remains Phase 6.**
- **Recommended default — start from the taxonomy in `03-conversion-architecture.md §6`:**

  | Event name | Trigger | Type | Confidence |
  |---|---|---|---|
  | `demo_request_submit` | demo-request function returns success | **PRIMARY (hero conversion)** | high |
  | `inquiry_submit` | contact function returns success | **PRIMARY** | high |
  | `consultation_click` | click any "Book consultation" CTA (outbound to Calendar) | **PRIMARY** (best obtainable; see caveat) | high |
  | `inquiry_start` | first focus/typing in contact form | micro | medium |
  | `pricing_cta_click` | click CTA on `/cenik` | micro | medium |
  | `demo_section_engage` | story/demo section reaches engagement threshold (scroll depth / N seconds visible) | micro | medium |
  | `language_switch` | CZ↔EN toggle | diagnostic | low |
  | `contact_copy` | copy phone/email click | micro | low |

- **Primary vs. micro (confirm):**
  - **Primary (real conversions — ad optimization targets):** `demo_request_submit`, `inquiry_submit`, `consultation_click`.
  - **Micro / diagnostic (engagement, not optimization targets):** `inquiry_start`, `pricing_cta_click`, `demo_section_engage`, `language_switch`, `contact_copy`.
  - **Caveat on `consultation_click`:** booking **completes off-site on Google Calendar**; we can reliably track only the **outbound click**, not the confirmed booking. For ad optimization toward real outcomes, plan an **offline/CAPI conversion upload** when a demo→consultation→deal closes (`03 §7`). The owner should acknowledge this measurement gap.
- **Owner input required (exact):** (1) Confirm the **6 brief events + the 2 additions** (scroll-depth/`demo_section_engage` and `language_switch`), or amend. (2) Confirm the **primary vs. micro split** above. (3) Acknowledge the Calendar off-site measurement caveat. Event **names are proposals** — finalize now because **renaming post-launch breaks reporting continuity.**
- **Risk if left unresolved:** If primary vs. micro isn't fixed, Phase 6 ad optimization can target **scroll noise instead of real leads**. If names aren't frozen, later renames break reporting continuity. None of this is urgent for the build, but it should be **signed off in Phase 1** so Phase 6 has a stable contract.
- **What phase it blocks:** Analytics implementation (**Phase 6 only**). Nothing in Phases 1–5 fires events.
- **Recommended next action:** Owner signs off the event list + primary/micro split now (cheap, design-only). Implementation stays in Phase 6, consent-gated, with **no event firing before consent** and **CAPI/Pixel deduped via shared `event_id`**.
- **Confidence (in default):** medium.
- **Implementation may proceed without it:** **yes** (taxonomy is a Phase 6 concern; design now, build later).
- **Outward-facing changes may proceed without it:** **yes for the design**; **no** for any actual tracking — tracking is Phase 6 and gated on consent (R3) regardless of B8.

---

## B9 — Supabase / lead storage

- **ID:** B9
- **Decision title:** Use Supabase (or another store) for demo-request lead storage, or email-only?
- **Current status:** pending — **recommended default stands unless rejected.**
- **Recommended default:** **Email-only in Phase 1** — the `demo-request` function notifies a monitored inbox via Resend (mirroring the `contact.mts` pattern). **Postpone Supabase** unless the manual fulfillment process actually needs queryable storage. Structure the function so a store can be added later **without reworking the flow**. *(confidence: medium)*
- **Owner input required (exact):** Decide whether the **manual fulfillment process** (`03 §7`: capture → alert → triage → build → deliver → log → measure) needs **queryable storage** in Phase 1 (e.g. for SLA reporting at volume), or whether **inbox + a simple sheet** suffices. If queryable storage is required, approve adopting Supabase (which means owning a DB + RLS + integration). The default is **email-only**; the decision itself can also be deferred to the Phase 2 spike.
- **Risk if left unresolved:** Low and reversible. Wiring Supabase prematurely means adopting **orphaned infrastructure** (R10 — migrations exist, no code uses them) and owning a DB the manual process may not need. Conversely, if volume/reporting needs outgrow email and a sheet, adding storage later is a contained change because the function seam is designed for it. The real risk is *over-building*, not under-building.
- **What phase it blocks:** Function/data architecture (decided in Phase 2 spike, built in Phase 3 only if justified).
- **Recommended next action:** Default to **email-only** for Phase 1; let the **Phase 2 spike** model whether phase-1 volume needs queryable storage. **Supabase stays postponed unless explicitly approved.** Do not delete the orphaned migrations in this phase (deletion needs approval).
- **Confidence (in default):** medium.
- **Implementation may proceed without it:** **yes** (email-only is the safe default; storage is additive).
- **Outward-facing changes may proceed without it:** **yes** (email-only demo-request has no special outward-facing exposure beyond the form itself, which is gated by other launch criteria).

---

## B10 — Brand facts

- **ID:** B10
- **Decision title:** Supply the real REVAI brand facts needed to complete the AMAI→REVAI migration.
- **Current status:** **needs owner input** — these are business facts the audit/code **cannot supply or invent.**
- **Recommended default (containment):** **Block the AMAI→REVAI sweep** until the facts below are supplied. **Do not guess** socials, email, address, or legal identity. (Phase 0 confirmed the migration is half-done and reaches production: `amai-logo.png` still ships in `dist/` alongside the REVAI logo; titles/OG/JSON-LD/manifest/`sameAs` still say AMAI — R4.) *(confidence: high in the block-and-wait posture)*
- **Owner input required — exact facts needed:**
  1. **Support/contact email** — the real REVAI inbox (current code has the broken `mailto:info@amai.cz`).
  2. **Social media URLs** — real REVAI profiles (current `sameAs`/footer use AMAI handles or placeholder `href="#"`); or explicit instruction to **remove** the links if no profiles exist.
  3. **Postal address** — resolve the **Znojmo (Contact page) vs. Praha/Prague (Footer)** conflict (R13): which is the correct registered/operating address?
  4. **Legal entity / IČO** — confirm whether **IČO 05013500** (and the legal entity name) is **unchanged** under REVAI, or supply the new identifier(s). This affects `Organization` JSON-LD and any legal/GDPR text.
  5. **Resend `from`/sending domain** — confirm the REVAI sending domain to verify (ties to R17) so form email doesn't fail/spam.
- **Risk if left unresolved:** The brand looks **inconsistent to users and crawlers** (weak brand SERP, broken social links, broken `mailto:`), and an address/legal mismatch **erodes trust** and can create legal/structured-data inaccuracies (R4/R13). Guessing any of these and shipping it is worse than waiting — it publishes wrong business facts under the REVAI name.
- **What phase it blocks:** The **AMAI→REVAI brand migration sweep** (Phase 3) across `index.html` + source + manifest + JSON-LD + footer/nav.
- **Recommended next action:** Owner supplies the five items above. Until then, the sweep is **blocked**; engineering may *prepare* the sweep (locate every AMAI surface) but must not fill in invented values.
- **Confidence (in default):** high (in the block-and-wait posture).
- **Implementation may proceed without it:** **partial** — engineering can **inventory** every AMAI surface to migrate; it **cannot apply** real values without the facts.
- **Outward-facing changes may proceed without it:** **no** (publishing brand facts requires correct facts).

---

## Security and dependency decision from Phase 0

> Carried from `phase-0-baseline-validation.md §8`. This is recorded here as a **Phase 1 technical decision**, not as a Phase 0 fix. **No `npm audit fix` is run automatically.** No lockfile/dependency change in this phase.

### What Phase 0 found

- `npm audit` reported **18 vulnerabilities — 1 low, 8 moderate, 9 high** — all reporting "fix available."
- **Deliberately not fixed:** any `npm audit fix` mutates `package-lock.json`, which is **forbidden** in Phase 0 (and in this Phase 1 decision phase).
- The baseline is otherwise **green**: install, typecheck, lint, build all pass; `package.json` and `package-lock.json` were byte-identical before/after `npm install`.

### Separate build-tool vs. runtime-dependency vulnerabilities

This separation drives urgency — a build-time ReDoS in a dev toolchain is **not** the same exposure as a vulnerability in code shipped to and executed in the **user's browser**.

| Class | Packages (from Phase 0 §8) | Exposure | Urgency |
|---|---|---|---|
| **Build-tool / dev-time** | `vite`, `rollup`, `glob`, `minimatch`, `picomatch`, `cross-spawn`, `flatted` | Mostly ReDoS-class, exercised only at build/CI time, not shipped to end users | Lower — patch during an approved dependency pass; low runtime risk |
| **Runtime dependencies** | **`react-router`, `react-router-dom`** | Shipped to the browser; part of the app users actually run | **Higher — review deliberately;** these warrant the closest look |

> The runtime advisories (`react-router` / `react-router-dom`) are the ones that justify a deliberate, owner-approved upgrade decision, because a fix there changes code that runs in production.

### Decision

- **Do not run `npm audit fix` automatically** (now or as a side effect of any phase). Any fix touches the lockfile and must be an **explicit, approved** action.
- **Recommend a later, approved dependency review** — scheduled for the **Phase 2/3 dependency pass** (which already requires the "may change deps" approval per `04`/`05`), when the motion-lib and icon-set consolidation also happens. Bundle the audit remediation into that single approved, validated pass rather than a reactive `audit fix`.
- **Triage order when that pass runs:** (1) the runtime `react-router`/`react-router-dom` advisories first, with a regression check on routing (and the i18n routing work that lands in Phase 3); (2) build-tool advisories as routine maintenance; (3) re-run `typecheck`/`lint`/`build` and a smoke test after any bump, since there is no test safety net yet (R6).
- **Owner input required:** approval to perform a dependency-change pass (lockfile will change), and acknowledgement that the runtime router advisories get priority. No action until approved.
- **Confidence:** high that this is a Phase 1 *decision* (not a Phase 0 fix) and that auto-fixing now would be wrong; medium on the eventual remediation scope until the upgrades are actually attempted and regression-tested.

---

## Phase 1 exit criteria

Phase 1 is complete when **all** of the following hold. Items marked **(owner)** cannot be satisfied by the team alone.

- [ ] **B1 answered (owner)** — production source of truth (real repo + Netlify site) confirmed. *Nothing outward-facing proceeds without this.*
- [ ] **B6 answered enough to protect automation SEO (owner / Search Console)** — the must-keep automation pages/terms are known (minimum: top queries, their landing pages, current meta/H1, baseline snapshot date), so no homepage meta/H1/SEO change can blindly damage R1 equity.
- [ ] **B10 answered (owner)** — real REVAI support email, social URLs (or remove-instruction), correct address (Znojmo vs. Praha resolved), and legal entity/IČO confirmation supplied, so the AMAI→REVAI sweep can run with real values.
- [ ] **B2 direction approved** — `/cs` + `/en` subpaths (or an explicit alternative) signed off; the Czech-slugs-vs-English-slugs sub-decision noted (can be finalized before Phase 3).
- [ ] **B3 direction approved** — prerender marketing routes, keep Vite/React SPA, no framework migration.
- [ ] **B5 hero CTA approved (owner)** — primary vs. secondary CTA hierarchy decided (recommended: demo primary, consultation strong secondary).
- [ ] **Dependency/security decision recorded** — Phase 0's 18 npm-audit findings logged as a Phase 1 technical decision: no auto-fix, deliberate approved review later, runtime (`react-router`*) separated from build-tool advisories. *(satisfied by the section above)*
- [ ] **No code changed** — this phase produced **documentation only**; no source files, `package.json`, lockfiles, assets, tracking, or deploys were touched.

**Recommended-default decisions that do not block Phase 1 exit but should be noted as approved-by-default unless rejected:** B4 (lead premium-web, short automation chapter), B7 (dictionaries, parallel CZ+EN authoring + named owner), B8 (event taxonomy + primary/micro split, design-only), B9 (email-only lead storage, Supabase postponed).

### Honest status at time of writing

Of the eight exit criteria, **four require owner/external input that this environment cannot provide** (B1, B6, B10, B5). The three pure-architecture approvals (B2/B3 direction, dependency decision) are ready for sign-off now. **Phase 1 cannot be declared complete — and no outward-facing or SEO-affecting work may start — until B1, B6, and B10 are answered.** The defaults let internal, low-risk preparation proceed; they do not close these gates.
