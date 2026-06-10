# Phase 0 — Baseline Validation Results (REVAI redesign)

> Validation-only run per `06-implementation-roadmap.md` Phase 0 and D15 (`01-decision-brief.md`).
> No source files edited. No dependencies changed. No deploy performed.

- **Date/time:** 2026-06-10
- **Working directory:** `/Users/jan.rehberger/CURSOR_LOCAL/web 4.0`
- **Executed by:** Fable 5 (per D15 — mechanical baseline work)

---

## 1. Repository / source-of-truth status (B1, R20)

| Check | Result |
|---|---|
| `git status` | **Not a git repository** (`fatal: not a git repository`) |
| `.gitignore` present | Yes (artifact of a copied repo) |
| `.git` directory | Absent |
| Conclusion | This tree is a **copied, non-git working copy** — consistent with audit finding R20 and blocking question **B1**. |

**B1 remains OPEN.** Per the decision brief, treat this tree as scratch until the owner confirms the production repo / Netlify site. Git was **not** initialized (forbidden in this phase). **No outward-facing or SEO-affecting change may start until B1 is answered.**

Also still open from Phase 0 inputs: **B6** (keyword-preservation list), **B10** (brand facts), **R17** (Resend/env verification — requires access to the target Netlify site, not available in this local run). No Search Console baseline snapshot was possible (no access from this environment).

## 2. Package manager & lockfile status

| Item | Result |
|---|---|
| Manifest | `package.json` (Vite + React 18 + TS + Tailwind — matches D10 stack) |
| Lockfile | `package-lock.json` **present** |
| `pnpm-lock.yaml` / `yarn.lock` / `bun.lockb` | Absent |
| Package manager | **npm** (unambiguous) |
| Node / npm versions used | Node v25.8.1 / npm 11.12.0 |

## 3. Install result — PASS

- **Command:** `npm install`
- **Result:** PASS — 302 packages added in ~4s, no errors, no peer-dependency warnings.
- **Integrity check:** SHA-256 of `package.json` and `package-lock.json` captured **before and after** install — both **byte-identical** (no unintended manifest/lockfile mutation).
- **Warnings:** `npm audit` reports **18 vulnerabilities (1 low, 8 moderate, 9 high)** — see §8. Not fixed (would change the lockfile; out of scope for Phase 0).

## 4. Typecheck result — PASS

- **Command:** `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`)
- **Result:** PASS — exit 0, zero errors, zero warnings.
- Blocks planning: no. Blocks implementation: no.

## 5. Lint result — PASS (3 warnings, 0 errors)

- **Command:** `npm run lint` (`eslint .`)
- **Result:** PASS — exit 0. **0 errors, 3 warnings**, all `react-refresh/only-export-components` (file exports non-component values alongside components, affecting HMR only):
  - `src/components/ui/badge.tsx:36`
  - `src/components/ui/button.tsx:56`
  - `src/contexts/LanguageContext.tsx:27`
- Severity: cosmetic / DX-only. Blocks planning: no. Blocks implementation: no. (Note: `LanguageContext.tsx` is slated for rework in the Phase 3 i18n layer anyway.)

## 6. Build result — PASS

- **Command:** `npm run build` (`vite build`, Vite v5.4.8)
- **Result:** PASS — exit 0, 1,932 modules transformed, built in ~1.4s.
- **Warnings:**
  - `Browserslist: caniuse-lite is outdated` — informational; updating it touches the lockfile, so deferred (do during an approved dependency pass).
- **Output observations (read-only inspection of `dist/`):**
  - `dist/` created, ~4.3 MB total, 23 asset chunks, `index.html`, `_redirects`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `blog/`, `story/` all present.
  - Largest chunks: `VoiceAgents` **313.5 kB** (83.4 kB gzip), `vendor-react` 174.2 kB, `vendor-motion` 122.6 kB. The VoiceAgents chunk is a perf-budget candidate for later phases (likely `@vapi-ai/web`), not a Phase 0 blocker.
  - Brand-migration evidence in shipped output: **`amai-logo.png` ships in `dist/` alongside `logo-revai-*.webp`** — confirms the half-done AMAI→REVAI migration (R4) reaches production output. For the Phase 3 sweep; not a baseline blocker.
- No deploy, no publish, no Netlify config change performed.

## 7. Blocking issues

| # | Issue | Blocks |
|---|---|---|
| 1 | **B1 unanswered** — copied, non-git tree; production repo/Netlify site unconfirmed | Everything outward-facing; the Phase 0 approval gate itself |
| 2 | **B6 / B10 / R17 / Search Console baseline** not obtainable from this environment | Phase 1 SEO decisions (B6), Phase 3 brand sweep (B10), function/email verification (R17) |

No **technical** blockers: install/typecheck/lint/build are all green.

## 8. Non-blocking warnings

1. **18 npm audit vulnerabilities** (1 low / 8 moderate / 9 high; all report "fix available"). High-severity packages: `vite`, `rollup`, `react-router`, `react-router-dom`, `glob`, `minimatch`, `picomatch`, `cross-spawn`, `flatted`. Mostly build-time tooling ReDoS-class issues, but **`react-router` / `react-router-dom` are runtime dependencies** — worth a deliberate, approved upgrade decision. **Deliberately not fixed** (any `npm audit fix` mutates the lockfile — forbidden in Phase 0).
2. 3 ESLint `react-refresh` warnings (§5) — DX-only.
3. `caniuse-lite` outdated (§6) — informational.
4. `VoiceAgents` chunk 313 kB — perf-budget watch item for Phases 4/7.
5. `amai-logo.png` in `dist/` — R4 evidence, scheduled for Phase 3.

## 9. Recommended next action

1. **Owner answers B1** (production source of truth: real repo + Netlify site). This is the Phase 0 approval gate — nothing outward-facing proceeds without it.
2. Owner supplies **B6** (keyword-preservation list) and **B10** (brand facts), and grants access for **R17** (Resend/env on the target site) + a Search Console baseline snapshot.
3. Schedule a decision (not an action) on the npm-audit findings — especially the runtime `react-router`/`react-router-dom` advisories — as part of the approved dependency pass (Phase 2/3), since any fix touches the lockfile.
4. Then proceed to **Phase 1 — Decisions & architecture**.

## 10. Is Opus 4.8 review needed?

**Not for this baseline.** Per D15 and the Phase 0 run-settings note, Opus 4.8 is triggered only if baseline failures surface an *architecture* judgement. All commands passed; no structural issue emerged. Opus 4.8 / High remains required for **Phase 1** (strategic decisions: B2/B3/B6, i18n, prerender, redirect strategy), as already specified in the roadmap. The npm-audit dependency-upgrade decision is a risk call that should go to the stronger tier when it's made, but it does not require a review *now*.

---

**Phase 0 verdict: 🟡 YELLOW** — technically green (all four commands pass, reproducible baseline established), but the Phase 0 approval gate (B1) is an owner decision that remains open, and B6/B10/R17/Search-Console inputs are still missing. Phase 1 *decision work* can begin on this baseline; nothing outward-facing may.
