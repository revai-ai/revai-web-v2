# Phase 4A Scorecard — Control / Crossfade

> Companion to `phase-4a-storytelling-scorecard.md` and `phase-4a-storytelling-variant-lab.md`.
> Branch: `exp/story-lab-control-crossfade`
> Status: **Stub — pending screenshots, Lighthouse, and owner review.**

---

## Implementation notes

### What this branch is

The control variant reuses the existing `ImageStoryStackC` engine (five-scene sticky-pin crossfade, 1100vh, `motion/react` spring) without any modifications to the engine internals. It feeds the engine a new Phase 4A scene data set (`CONTROL_LAB_SCENES`) expressing the "outdated website → premium rebuild → connected systems → sales engine → /demo" narrative arc.

The evaluation question: **Is the existing engine sufficient for the Phase 4A arc with the new scene data and (eventually) purpose-shot assets?**

### What was reused (read-only, no edits)

| Component / file | How reused |
|---|---|
| `src/components/home/ImageStoryScene.tsx` | `StoryImageLayerC`, `StoryCaptionC`, `StaticStorySceneC` imported read-only |
| `src/hooks/useMediaQuery.ts` | Responsive desktop/mobile split |
| `src/contexts/LanguageContext.tsx` | `useLanguage()` / `t()` bilingual copy |
| `src/hooks/useDocumentMeta.ts` | Page title + description |
| `motion/react` | Engine scroll/spring/reduced-motion — no new imports |
| `lucide-react` | `ArrowRight` icon |
| `src/styles/tokens.css` + `tailwind.config.js` | `.variant-c` token scope; all `ifl-*` tokens |

### What is new (lab-only, this branch only)

| File | Purpose |
|---|---|
| `src/components/story-lab/controlSceneData.ts` | 5-scene Phase 4A DRAFT scene data |
| `src/components/story-lab/ControlStoryStack.tsx` | New stack component: desktop (reuses engine components) + mobile card stack |
| `src/pages/story-lab/StoryLabControl.tsx` | Lab page: noindex injection, evaluation banner, renders ControlStoryStack |
| `src/App.tsx` (branch delta) | One lazy import + one `<Route>` for `/__story-lab/control` |
| `public/_redirects` (branch delta) | `/__story-lab/* /spa-shell.html 200` before the 404 fallback |

### Assets

**All assets are placeholder.** The Phase 4A evaluation requires purpose-shot `/story/p/` assets (right-weighted, ~1800×1200 px, ≤ 70 KB each, graded to Direction A). This branch uses existing `/story/c/` automation scenes as approximations:

| Scene | Temp asset | Target asset |
|---|---|---|
| 01 — Stagnace / Before | `/story/c/manual-chaos.webp` | `/story/p/outdated-site.webp` |
| 02 — Rekonstrukce / Rebuild | `/story/c/ai-routing.webp` | `/story/p/first-impression.webp` |
| 03 — Příběh / Story | `/story/c/automation-execution.webp` | `/story/p/story-guides.webp` |
| 04 — Propojení / Connected | `/story/c/systems-connected.webp` | `/story/p/conversion-structure.webp` |
| 05 — Motor / Engine | `/story/c/measurable-output.webp` | `/story/p/sales-engine.webp` |

Scoring on C1 (premium wow), C2 (narrative continuity), and C3 (business-story clarity) **must be deferred until purpose-shot assets replace the placeholders.** Initial scoring with placeholder assets is valid only for C5 (performance), C7 (reduced-motion), C9 (maintainability), C11 (dependency risk), C12 (SEO safety), and C13 (implementation complexity).

### Copy

All scene copy is **B7 DRAFT** — structural placeholders only. Eyebrows, headlines, body lines, and CTA label are prefixed `[DRAFT]` in the body copy. No placeholder copy ships.

---

## Scorecard (stub — fill after deploy-preview screenshots + Lighthouse)

```
─────────────────────────────────────────────────────────
Branch:           exp/story-lab-control-crossfade
Scored by:        [name / role]
Date:             YYYY-MM-DD
Phase 3 tip:      884e4fd
Build date:       YYYY-MM-DD
Deploy preview:   https://[branch-deploy].netlify.app
─────────────────────────────────────────────────────────

C1   Premium wow (desktop)                _/5
     Evidence: PENDING — placeholder assets in use; defer until /story/p/ assets committed.
     Notes: The engine itself (scrim, timing, typography) is production-proven.
            Wow ceiling depends entirely on asset quality. Cannot score until
            purpose-shot assets replace /story/c/ placeholders.

C2   Narrative continuity                 _/5
     Evidence: PENDING — placeholder assets thematically mismatched to Phase 4A arc.
     Notes: Copy arc (before → rebuild → story → connected → engine) is structurally
            coherent. Continuity at transitions feels smooth in-engine (spring timing
            unchanged). Awaiting real assets to evaluate felt arc.

C3   Business-story clarity               _/5
     Evidence: PENDING — placeholder assets; B7-DRAFT copy.
     Notes: Structural arc is clear. First-time visitor test deferred to real assets
            + copy-owner copy.

C4   Conversion clarity (/demo CTA)       _/5
     Evidence: PENDING — confirm /demo routes correctly in CZ and EN on deploy preview.
     Notes: Final scene CTA href="/demo" (not CALENDAR_URL). Locale-awareness:
            /demo is in ROUTE_MAP (cs: /demo, en: /en/demo) — the CTA is hardcoded
            to /demo which is correct for CZ; EN users will be redirected correctly
            by the router since /demo is a mapped route.

C5   Performance                          _/5
     Evidence (Lighthouse URLs + asset size): PENDING
     Notes: No new JS dependencies. Uses existing motion/react, lucide-react, hooks.
            Story asset payload = existing /story/c/ (≈254 KB) — well within 350 KB.
            Final payload measured with /story/p/ assets when available.

C6   Mobile fallback quality              _/5
     Evidence: PENDING — screenshots at 375px and 430px.
     Notes: Mobile card stack implemented; mirrors production MobileImageStoryStackC
            pattern. All 5 scenes rendered as editorial cards. No pinned timeline
            on mobile. Overflow: clip applied.

C7   Reduced-motion fallback              _/5
     Evidence: PENDING — manual DevTools reduced-motion test.
     Notes: StaticStorySceneC path preserved (same as production). All 5 scenes
            render as full static sections. No content hidden behind motion.

C8   Asset pipeline repeatability         _/5
     Evidence (pipeline doc link): see phase-2r-creative-tooling-spike.md §3.1
     Notes: Manual webp pipeline (approved default): source → Direction A grade →
            resize ~1800×1200 → cwebp -q 68-75 → ≤ 70 KB/scene. Fully documented,
            repeatable by any team member. Score depends on confirming
            /story/p/ assets follow the documented pipeline.

C9   Maintainability                      _/5
     Evidence (LOC / file count):
       - controlSceneData.ts: ~80 LOC — data only, no engine logic
       - ControlStoryStack.tsx: ~155 LOC — stack + mobile card, all composition
       - StoryLabControl.tsx: ~50 LOC — page wrapper + noindex
       - App.tsx delta: 5 LOC
       - _redirects delta: 4 LOC
     Notes: New developer can update scene data and assets in controlSceneData.ts
            without touching engine code. Engine components imported read-only.
            No hidden coupling. No magic numbers beyond the TIMING array in the
            shared ImageStoryScene.tsx.

C10  Future client reusability            _/5
     Evidence (adaptation scope estimate):
     Notes: To adapt for a different client:
            1. Replace controlSceneData.ts content (~30 min): new id/image/eyebrow/
               headline/headlineAlt/body/cta per scene.
            2. Replace /story/p/ assets (~2 h production grading, once pipeline is set).
            3. Token overrides in a new .variant-* scope if different palette needed.
            Estimated scope: < 1 day for a new client. Score: 4/5 (small adaptation step).

C11  Dependency risk                      _/5   → 5/5 (zero new dependencies)
     Evidence: `git diff main -- package.json package-lock.json` = empty.
     Notes: No new npm packages. All imports from motion/react, lucide-react, react,
            react-router-dom — all already in production bundle.

C12  SEO safety                           _/5
     Evidence:
       - `grep -r "__story-lab" src/i18n/` → empty (confirmed: not in ROUTE_MAP/PAGE_META)
       - `grep "noindex"` in StoryLabControl.tsx → client-side injection via useEffect
       - `dist/sitemap.xml` → does not contain __story-lab (confirmed: prerender only
         generates from ROUTE_MAP)
       - `dist/_redirects` → /__story-lab/* rule present before 404 fallback
       Notes: Noindex is client-side only (route is not prerendered). The served
              HTML shell (spa-shell.html) does not contain the noindex tag.
              After hydration, the robots meta is injected by StoryLabControl.
              For a local-only R&D lab, this is acceptable. The route is not linked
              from any production page. Deploy-preview curl check below.
     PENDING: `curl -sI https://[preview]/__story-lab/control` → confirms 200 (not 301).

C13  Implementation complexity            _/5   → 5/5 (zero new patterns)
     Evidence: ~285 LOC total (3 new files); ~9 LOC App.tsx delta; ~4 LOC _redirects delta.
     Notes: No novel patterns. Desktop stack is a composition of existing exports.
            Mobile stack is an inline mirror of the existing pattern.
            Estimated implementation time: ~2 h (mostly documentation).

C14  Owner confidence                     _/5
     Evidence (owner session notes): PENDING — owner review scheduled after deploy preview.

─────────────────────────────────────────────────────────
TOTAL:           __/70   (C11=5, C13=5 confirmed; remainder pending)

Disqualifiers:   [none identified at implementation stage]

Status:          [ ] PASS TO OWNER REVIEW
                 [ ] DISQUALIFIED — reason: ____________
                 [x] CONDITIONAL PASS — condition: purpose-shot /story/p/ assets
                     + B7 copy must replace placeholders before final scoring.
                     Performance, mobile, and reduced-motion gates must be
                     confirmed on deploy preview.

Implementer notes:
  The control variant faithfully replicates the production engine with Phase 4A
  data. The key evaluation question — whether the existing crossfade is sufficient
  for the new arc — can only be answered with real assets. Current state is a
  functional scaffold for that evaluation.
```

---

## Validation checklist (pre-scoring)

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] `dist/_redirects` contains `/__story-lab/*` rewrite before `/* /404.html 404`
- [ ] `dist/sitemap.xml` does not contain `__story-lab`
- [ ] `grep -r "__story-lab" src/i18n/` returns empty
- [ ] `/__story-lab/control` renders in local dev (`npm run dev`)
- [ ] Lab banner visible at top of page
- [ ] All 5 story scenes render (desktop: pinned crossfade; mobile: editorial cards)
- [ ] Scene 5 CTA button present, href="/demo"
- [ ] Reduced-motion path: all 5 scenes visible as static sections
- [ ] `curl -sI https://[preview]/__story-lab/control` → 200
- [ ] After hydration, `document.querySelector('meta[name="robots"]').content` → "noindex, nofollow"
- [ ] Production routes (`/`, `/demo`, `/cenik`, `/sluzby/*`) still build + serve correctly
- [ ] `package.json` and `package-lock.json` unchanged from main
- [ ] Lighthouse desktop perf ≥ 90 (placeholder assets)
- [ ] Lighthouse mobile perf ≥ 85 (placeholder assets)
- [ ] Screenshots at 375px and 430px — all 5 scenes visible, no overflow
