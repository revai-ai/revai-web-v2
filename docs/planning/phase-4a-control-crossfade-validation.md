# Phase 4A — Control Branch Validation Notes

> Branch: `exp/story-lab-control-crossfade`
> Date: 2026-06-11
> Phase 3 tip: `884e4fd`

---

## Build validation

Run on each significant change:

```bash
npm run typecheck
npm run lint
npm run build
```

All three must pass cleanly before the branch is submitted for scoring.

---

## File-level invariants (must hold throughout this branch)

### i18n namespace — must return empty

```bash
grep -r "__story-lab" src/i18n/
```

Expected: no output. The lab route is intentionally outside the i18n route system.

### sitemap — must not contain lab route

```bash
npm run build && grep "__story-lab" dist/sitemap.xml
```

Expected: no match. Lab route is not in `ROUTE_MAP`, so the prerender plugin never adds it to the sitemap.

### _redirects — lab rewrite must precede 404 fallback

```bash
npm run build && grep -A2 "__story-lab" dist/_redirects
```

Expected output (approximate):
```
/__story-lab/*   /spa-shell.html   200

# Phase 3D: hard 404 for everything else ...
```

The `/__story-lab/*` rewrite must appear **before** `/* /404.html 404`.

### package.json — no new dependencies

```bash
git diff main -- package.json package-lock.json
```

Expected: no output. This branch introduces zero new npm dependencies.

### Production homepage components — must be unmodified

```bash
git diff main -- src/components/home/ src/pages/Home.tsx
```

Expected: no output. No production homepage file was edited in this branch.

---

## Local dev smoke test

Start dev server:
```bash
npm run dev
```

1. Navigate to `http://localhost:5173/__story-lab/control`
2. Verify: lab banner visible at top (dark navy bar with branch/draft labels)
3. Verify: ControlStoryStack renders (desktop: pinned 1100vh crossfade; mobile: editorial cards)
4. Verify: all 5 scenes present with Phase 4A eyebrows (01 — Stagnace, 02 — Rekonstrukce, etc.)
5. Verify: scene 5 CTA button → `/demo`
6. In DevTools console: `document.querySelector('meta[name="robots"]').content` → `"noindex, nofollow"`
7. Verify production routes unaffected: `http://localhost:5173/` (homepage)

### Reduced-motion check

In DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion: reduce`:
- Navigate to `/__story-lab/control`
- Expected: 5 static full-section scenes (StaticStorySceneC), no pinned timeline, no crossfade
- All 5 scenes must be visible by scrolling

### Mobile viewport check

In DevTools, set viewport to 375px width:
- All 5 scenes render as editorial card stack (MobileControlStack)
- No horizontal overflow
- CTA button visible on scene 5

---

## Deploy-preview checks (Netlify branch deploy)

After Netlify deploys the branch preview:

### Route availability
```bash
curl -sI https://[preview-url]/__story-lab/control
```
Expected: `HTTP/2 200` (the `/__story-lab/*` SPA rewrite returns 200).
If 404: check that `dist/_redirects` contains the rewrite rule before the 404 fallback.

### Noindex in served HTML
```bash
curl -s https://[preview-url]/__story-lab/control | grep -i noindex
```
Expected: **empty** — the served SPA shell does not contain the noindex tag.
This is correct and expected: the lab route is not prerendered, so the noindex
is injected client-side only (after JS hydration). The route is not linked from
any production page and is not in the sitemap. Client-side injection is the only
mechanism for SPA-shell-served routes. See C12 scorecard note.

To verify client-side noindex in the browser:
```js
document.querySelector('meta[name="robots"]').content
// expected: "noindex, nofollow"
```

### Production routes unaffected
```bash
curl -sI https://[preview-url]/
curl -sI https://[preview-url]/demo
curl -sI https://[preview-url]/cenik
curl -sI https://[preview-url]/sluzby/tvorba-modernich-webu
```
All must return `HTTP/2 200`.

### Sitemap clean
```bash
curl -s https://[preview-url]/sitemap.xml | grep "story-lab"
```
Expected: no output.

---

## Lighthouse (run from deploy preview — not localhost)

Run via Chrome DevTools > Lighthouse or `npx lighthouse`:

| Metric | Target | Notes |
|---|---|---|
| Desktop performance | ≥ 90 | With placeholder /story/c/ assets |
| Mobile performance | ≥ 85 | With placeholder /story/c/ assets |
| SEO | ≥ 90 | noindex will lower SEO score — expected and correct |
| Accessibility | ≥ 90 | aria-hidden on decorative images; keyboard-accessible CTA |

Record results in the scorecard stub (C5, C6).

---

## Known limitations of this validation pass

1. **Placeholder assets**: C1 (premium wow), C2 (narrative continuity), C3 (business-story clarity)
   cannot be fully scored until `/story/p/` purpose-shot assets replace `/story/c/` placeholders.
   The Higgsfield or stock-photo spike must run first (see `phase-4a-higgsfield-asset-pipeline-spike.md`).

2. **DRAFT copy**: All scene copy is B7-gated structural draft. Copy quality scoring is deferred
   until the copy owner provides production-ready text.

3. **Client-side noindex only**: The lab route is served via `spa-shell.html` (not prerendered).
   The `noindex, nofollow` robots meta is injected after hydration, not in the served HTML.
   This is acceptable for a local R&D lab route with no inbound links and no sitemap entry.
   The production validation check for C12 must account for this; a curl-based grep will
   return empty (correct), and the in-browser console check confirms the tag post-hydration.

4. **CTA locale-awareness**: The scene 5 CTA uses `href="/demo"` (Czech canonical). English
   users navigating to `/__story-lab/control` while on the EN locale will have the CTA route
   to `/demo` (Czech), which in the production router is a valid route. The EN equivalent
   `/en/demo` is handled by ROUTE_MAP. For Phase 4B productionization, use `localizedHref`
   to make the CTA locale-aware.
