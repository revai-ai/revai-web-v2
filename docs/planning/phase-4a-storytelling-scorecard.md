# Phase 4A — Storytelling Variant Scorecard

> Companion to `phase-4a-storytelling-variant-lab.md`.
> One scorecard per experiment branch, filled in by the implementer before the Opus-tier review.
> **An Opus-tier review (`Opus 4.8 / High`) is required before any winner is declared.** See §4.

---

## 1. Scoring scale

| Score | Meaning |
|---|---|
| **5** | Exceeds requirement; a differentiating strength; would be a selling point in its own right |
| **4** | Meets requirement fully; clearly production-ready on this dimension |
| **3** | Meets requirement with minor caveats; acceptable but not ideal |
| **2** | Partially meets; a known issue requiring a workaround or a deferred fix |
| **1** | Does not meet requirement; disqualifying unless the criterion is marked non-critical |
| **—** | Not applicable or not yet tested (must be explained in Notes) |

---

## 2. Criteria

### C1 — Premium wow (desktop)

**Weight:** high
**Question:** Does the desktop experience produce an unmistakably premium, differentiated reaction at first scroll?

| Score | Anchor |
|---|---|
| 5 | Immediately premium; materially better than the control; the kind of site that gets shared and referenced |
| 4 | Clearly premium; strong first impression; holds up against agency peer benchmarks |
| 3 | Professional; good; but does not strongly differentiate REVAI from other web agencies |
| 2 | Adequate; some premium signals alongside rough edges or generic moments |
| 1 | Does not read as premium — visual noise, poor timing, or cheap feel |

**Evidence required:** side-by-side screenshot/screen recording at 1280px and 1920px; at least one independent observer comment.

---

### C2 — One-scene continuity (narrative coherence)

**Weight:** high
**Question:** Does the full arc (before → transformation → connected → engine → CTA) read as one continuous authored story rather than a disconnected slide deck?

| Score | Anchor |
|---|---|
| 5 | Fluid, authored experience; each beat feels inevitable; no chapter feels tacked on |
| 4 | Strong continuity; minor roughness at one transition |
| 3 | Mostly coherent; one noticeably jarring transition or an orphaned beat |
| 2 | Two or more disconnected moments; the deck-metaphor applies to part of the experience |
| 1 | No felt continuity; scenes feel independent |

**Evidence required:** describe felt continuity at each of the five transitions; flag any "slide-show" moments by beat number.

---

### C3 — Business-story clarity

**Weight:** high
**Question:** Does a first-time visitor who knows nothing about REVAI understand the before/after value proposition after one scroll through?

| Score | Anchor |
|---|---|
| 5 | Value proposition is immediately, unambiguously clear; the before/after contrast is visceral |
| 4 | Clear to most visitors with minimal effort; one minor ambiguity |
| 3 | Clear to an engaged visitor; requires some reading effort or prior knowledge |
| 2 | Partially clear; the transformation arc is implied but not shown; guesswork required |
| 1 | Opaque; a new visitor would not understand what is being offered |

**Evidence required:** describe what a cold first-time visitor would understand from each beat; note any points of ambiguity.

---

### C4 — Conversion clarity (/demo CTA)

**Weight:** high
**Question:** Does the final story beat make it obvious and compelling to request a demo via `/demo`?

| Score | Anchor |
|---|---|
| 5 | The CTA is the natural culmination of the narrative; the visitor feels pulled to it, not pushed |
| 4 | Clear CTA; the arc leads to it; minor copy or placement improvement possible |
| 3 | CTA present and functional but feels appended rather than earned |
| 2 | CTA present but easy to miss or its relationship to the narrative is unclear |
| 1 | CTA absent, broken, or routes to the wrong URL |

**Evidence required:** screenshot of the final CTA state; confirm `/demo` routes correctly in both CZ and EN; test form submission in the lab environment.

---

### C5 — Performance (desktop + mobile)

**Weight:** high — **disqualifying if budget is unresolvably exceeded**

| Score | Anchor |
|---|---|
| 5 | Exceeds all budgets; story section is faster than the current control |
| 4 | Meets all budgets with meaningful headroom |
| 3 | Meets all budgets; one metric is right at the limit |
| 2 | One metric over budget; fixable with targeted optimization |
| 1 | Performance budget exceeded by a wide margin; requires structural rework |

**Budgets:** total story asset payload ≤ 350 KB; Lighthouse desktop perf ≥ 90; Lighthouse mobile perf ≥ 85; new JS bundle delta ≤ threshold agreed per branch before build.

**Evidence required:** Lighthouse report (desktop + mobile) from a production build on a deploy preview; `du -sh` output for the story asset directory.

---

### C6 — Mobile fallback quality

**Weight:** high — **disqualifying if narrative is broken or missing**

| Score | Anchor |
|---|---|
| 5 | Mobile experience is independently premium; not a degraded desktop |
| 4 | Mobile reads well; a minor sizing or spacing adjustment would improve it |
| 3 | Mobile is functional and readable but noticeably simpler than desktop |
| 2 | Works but has one significant layout or readability issue |
| 1 | Mobile is broken, illegible, or missing content |

**Evidence required:** screenshots at 375px and 430px; confirm all five story beats visible; confirm no layout overflow; Lighthouse mobile score.

---

### C7 — Reduced-motion fallback

**Weight:** high — **disqualifying if any story content is inaccessible (WCAG 2.1 AA)**

| Score | Anchor |
|---|---|
| 5 | Reduced-motion path is an independently authored experience; feels intentional and complete |
| 4 | All content accessible; acceptable static form; minor polish possible |
| 3 | All content accessible; reduced-motion path is a recognizable downgrade but functional |
| 2 | One content element harder to reach or requiring extra interaction without motion |
| 1 | Story content hidden or missing without motion — WCAG 2.1 AA failure |

**Evidence required:** manual test with `@media (prefers-reduced-motion: reduce)` forced in DevTools; confirm all five beats readable; confirm no hidden content.

---

### C8 — Asset pipeline repeatability

**Weight:** medium-high
**Question:** Can the asset pipeline for this variant be replicated for a new client project in under two hours by a team member following the documented process?

| Score | Anchor |
|---|---|
| 5 | Fully documented; assets producible by any team member with the brief + process doc alone |
| 4 | Documented; one step requires judgment but is learnable from the doc |
| 3 | Reproducible but requires the original author's involvement for one or more steps |
| 2 | Partially documented; some steps are implicit or involve tooling only the author knows |
| 1 | Bespoke; cannot be replicated without starting from scratch |

**Evidence required:** written asset pipeline spec (steps, tools, formats, file-size targets, grading approach) checked in with the branch; no undocumented proprietary steps.

---

### C9 — Maintainability

**Weight:** medium
**Question:** Can the approach be understood and updated by a developer who did not write it?

| Score | Anchor |
|---|---|
| 5 | Minimal surface area; a new developer can update scene data and assets without touching engine code |
| 4 | Small, well-structured surface; straightforward onboarding |
| 3 | Moderate complexity; navigable but not immediately obvious |
| 2 | Non-trivial; hidden coupling or undocumented assumptions |
| 1 | Unmaintainable without deep context; magic numbers, fragile state, no docs |

**Evidence required:** LOC count of new code; count of new component files; description of any non-standard patterns or tight coupling.

---

### C10 — Future client reusability

**Weight:** high — the meta-goal of Phase 4A

**Question:** Can REVAI offer this storytelling approach as a repeatable product/service for client websites?

| Score | Anchor |
|---|---|
| 5 | Drop-in reusable; only scene data, tokens, and assets need to change per client |
| 4 | Reusable with a small, well-defined adaptation step (< 1 day for a new client) |
| 3 | Adaptable but requires engine-level adjustments per client project |
| 2 | Partially adaptable; one or more structural elements are REVAI-homepage-specific |
| 1 | Not reusable; bespoke to this homepage and this narrative |

**Evidence required:** describe what would need to change to adapt this for a different brand palette, content set, and narrative arc; estimate scope in hours.

---

### C11 — Dependency risk

**Weight:** medium-high

| Score | Anchor |
|---|---|
| 5 | Zero new dependencies |
| 4 | One well-maintained, MIT-licensed dependency; negligible bundle impact |
| 3 | One well-maintained dependency with minor bundle impact; acceptable trade-off |
| 2 | A dependency with maintenance risk (narrow author base, infrequent releases) or non-trivial bundle impact |
| 1 | A large, complex, or restrictively licensed dependency |

**Note:** A score of 1 or 2 requires the dependency-gate approval pass before the branch can proceed to Phase 4B, even if the branch wins on other criteria. The dependency approval is not implied by winning the lab.

**Evidence required:** list every new `package.json` entry; confirm license (MIT / Apache 2.0 / other); `bundlephobia`-style bundle size check.

---

### C12 — SEO safety

**Weight:** high — **disqualifying if lab route is indexable or any production route is affected**

| Score | Anchor |
|---|---|
| 5 | Lab route confirmed `noindex`; no production surface touched at all |
| 4 | Lab route confirmed `noindex`; one trivial shared utility touched; reviewed safe |
| 3 | Lab route confirmed `noindex`; one non-critical production file touched; reviewed and safe |
| 2 | Lab route confirmed `noindex` but one production file has an unintended side effect; fixable before scoring |
| 1 | Lab route is indexable **or** a production route is affected |

**Evidence required:** `grep -r "noindex"` confirms the lab route head; `curl -sI https://<preview>/__story-lab/VARIANT` shows 200 (not 301); `grep -r "__story-lab" src/i18n/` is empty (not in `ROUTE_MAP`/`PAGE_META`); `dist/sitemap.xml` does not contain the lab URL.

---

### C13 — Implementation complexity

**Weight:** medium
**Question:** Is the complexity proportionate to the quality it delivers?

| Score | Anchor |
|---|---|
| 5 | Surprisingly simple for the quality delivered; elegant |
| 4 | Moderate complexity, well justified by quality |
| 3 | Expected complexity for this kind of work; no surprises |
| 2 | Higher complexity than justified; some complexity is accidental |
| 1 | Disproportionately complex; the same quality could be achieved with far less |

**Evidence required:** estimated implementation hours; description of any significantly novel patterns or non-obvious solutions.

---

### C14 — Owner confidence

**Weight:** high — the final business decision

**Question:** Does the approach give the owner confidence that REVAI can deliver this quality for clients and maintain it over time?

| Score | Anchor |
|---|---|
| 5 | Enthusiastic; the owner would immediately show this to prospects as proof of capability |
| 4 | Confident; the owner sees this as a strong, saleable product |
| 3 | Positive; some questions remain but the approach is acceptable |
| 2 | Uncertain; one significant concern about delivery quality or maintenance burden |
| 1 | Not confident; would not show this to clients as-is |

**Evidence required:** structured owner review session with notes; record specific enthusiasms and concerns verbatim.

---

## 3. Disqualification criteria

The following conditions disqualify a branch **regardless of total score**. A disqualified branch is closed, not patched to pass the lab retroactively. If the disqualifying issue is genuinely fixable before scoring, fix it first — then score.

| Criterion | Disqualifying condition |
|---|---|
| Performance | Story asset payload > 350 KB **and** not fixable by lossless optimization; **or** Lighthouse mobile perf < 80 after optimization |
| Mobile fallback | Any narrative beat missing or layout broken at 375px viewport |
| Reduced-motion | Any story content inaccessible without motion (WCAG 2.1 AA failure) |
| SEO safety | Lab route is indexable **or** any production route, `ROUTE_MAP`, `PAGE_META`, or sitemap is affected |
| Demo CTA | CTA absent, broken, or routes to the wrong URL in either locale |
| Licensing | Any asset or dependency with unclear, non-commercial, or unconfirmed license rights |

---

## 4. Scoring template

Copy and complete one instance per branch:

```
─────────────────────────────────────────────────────────
Branch:           exp/story-lab-______________
Scored by:        [name / role]
Date:             YYYY-MM-DD
Phase 3 tip:      [commit hash]
Build date:       YYYY-MM-DD
Deploy preview:   https://[branch-deploy].netlify.app
─────────────────────────────────────────────────────────

C1   Premium wow (desktop)                _/5
     Evidence:

C2   Narrative continuity                 _/5
     Evidence:

C3   Business-story clarity               _/5
     Evidence:

C4   Conversion clarity (/demo CTA)       _/5
     Evidence:

C5   Performance                          _/5
     Evidence (Lighthouse URLs + asset size):

C6   Mobile fallback quality              _/5
     Evidence:

C7   Reduced-motion fallback              _/5
     Evidence:

C8   Asset pipeline repeatability         _/5
     Evidence (pipeline doc link):

C9   Maintainability                      _/5
     Evidence (LOC / file count):

C10  Future client reusability            _/5
     Evidence (adaptation scope estimate):

C11  Dependency risk                      _/5
     Evidence (new deps + licenses):

C12  SEO safety                           _/5
     Evidence (noindex grep + curl):

C13  Implementation complexity            _/5
     Evidence (hours / novel patterns):

C14  Owner confidence                     _/5
     Evidence (owner session notes):

─────────────────────────────────────────────────────────
TOTAL:           __/70

Disqualifiers:   [list any hit, or "none"]

Status:          [ ] PASS TO OWNER REVIEW
                 [ ] DISQUALIFIED — reason: ____________
                 [ ] CONDITIONAL PASS — condition: _____

Implementer notes:
```

---

## 5. Final decision template

Complete after all branches are scored and the Opus-tier review is done. Owner sign-off required before Phase 4B begins.

```
─────────────────────────────────────────────────────────
PHASE 4A WINNER DECISION
Date:              YYYY-MM-DD
Scores reviewed by (Opus-tier): [model + session date]
Owner review date: YYYY-MM-DD
─────────────────────────────────────────────────────────

Branch scores:
  exp/story-lab-control-crossfade        __/70  [status]
  exp/story-lab-canvas-higgsfield        __/70  [status]
  exp/story-lab-layered-dom              __/70  [status]
  exp/story-lab-guiding-signal           __/70  [status]
  exp/story-lab-gsap-scrolltrigger       __/70  [status / "not run"]

Winner:            exp/story-lab-______________
Winner total:      __/70
Winner rationale:  [key reasons — lead with C10 client reusability and C5 performance]

Runner-up:         exp/story-lab-______________
Runner-up total:   __/70
Graft notes:       [specific ideas from runner-up to carry into Phase 4B]

Dependency gate:   [ ] Required for winner — approval pending
                   [ ] No new deps — clear to proceed

Owner sign-off:    [ ] Approved — proceed to Phase 4B
                   [ ] Changes requested: ______________

Phase 4B start:    YYYY-MM-DD
─────────────────────────────────────────────────────────
```

---

## 6. Opus-tier review requirement

Before any winner is declared, the following must be complete:

1. The scorecard for every branch is filled in completely — all 14 criteria, all evidence fields.
2. A Lighthouse report (desktop + mobile) from a production build on a deploy preview exists for every branch.
3. An **Opus-tier review (`Opus 4.8 / High`)** reviews:
   - all completed scorecards
   - the Lighthouse reports for every branch
   - the diff of each branch relative to `main`
   - the asset pipeline documentation for the winning candidate
4. The Opus review must explicitly state a position on:
   - whether the performance gate passes or fails for each branch
   - whether the SEO safety gate passes for each branch
   - the dependency risk score for any branch introducing a new dependency
   - the final winner recommendation and rationale
5. The owner reviews the Opus recommendation and signs off.

**A Sonnet-tier or Fable-tier scorecard review is not sufficient for the winner decision.** This is the last strategic gate before committing to an implementation approach that will be replicated across client projects. It gets the strongest tier.
