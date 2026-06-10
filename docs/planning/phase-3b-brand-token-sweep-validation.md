# Phase 3B — Brand-token sweep (AMAI → REVAI) — Validation note

> **Status:** implemented and validated locally. **Date:** 2026-06-10.
> Scope executed exactly per `phase-3-foundation-implementation-plan.md` §3 (values §3.1, surfaces §3.2, hard stops §3.3). No keyword wording changes, no deletions, no dependency changes.

---

## 1. Files changed (15)

| File | Change |
|---|---|
| `index.html` | `apple-mobile-web-app-title` AMAI→REVAI; JSON-LD `Organization`: `name`→REVAI, `sameAs`→ the two approved B10 URLs (AMAI LinkedIn/Facebook/Instagram removed), added `email: info@automatizace-ai.cz` and B10 Znojmo `PostalAddress`. Static title/description/OG/Twitter wording untouched (no AMAI present there). |
| `public/site.webmanifest` | `name`/`short_name` AMAI→REVAI |
| `src/components/Footer.tsx` | `mailto:info@amai.cz`→`mailto:info@automatizace-ai.cz`; placeholder `href="#"` socials → approved LinkedIn + Instagram (real links, `target="_blank" rel="noopener noreferrer"`); Facebook icon removed (no approved URL — remove, don't invent); footer line „Praha, Česká republika"/„Prague" → B10 Znojmo address; stray `id="blog"` removed; obsolete TODO comment removed; unused `Facebook` import removed |
| `src/components/home/Hero.tsx` | Eyebrow „AI Automatizace · AMAI" → „AI Automatizace · REVAI" (CS+EN); H1 and all other wording untouched |
| `src/pages/Home.tsx` | Runtime title brand suffix only (CS+EN); description untouched (no AMAI) |
| `src/pages/Contact.tsx` | Title + description brand token in place (CS+EN); address „Znojmo 1"→„Znojmo 2" (B10 fact conflict) |
| `src/pages/PricingPage.tsx` | Title brand suffix only; **no content/pricing change** |
| `src/pages/References.tsx` | Title brand suffix; 3 testimonial brand-token swaps („od AMAI"/„from AMAI" → REVAI); one testimonial already said REVAI |
| `src/pages/Projects.tsx` | Title brand suffix only |
| `src/pages/Blog.tsx` | Title brand suffix only (line 895) |
| `src/pages/GDPR.tsx` | Title brand suffix only; personal mailtos untouched per §3.3 |
| `src/pages/services/InternalAgents.tsx` | Title brand suffix only |
| `src/pages/services/VoiceAgents.tsx` | Title brand suffix + description „od AMAI"→„od REVAI" in place (CS+EN) |
| `src/pages/services/AIAppDevelopment.tsx` | Title brand suffix only |
| `src/pages/services/ModernWebDevelopment.tsx` | Title brand suffix only |

## 2. Remaining "amai" occurrences (post-sweep grep, all classified)

`grep -ri "amai" index.html src public netlify` after the sweep returns only:

| Occurrence | Classification |
|---|---|
| `public/amai-logo.png` (filename) | **Intentionally retained asset** — deletion needs the separate approved deletion pass. No source file references it (verified by grep), so nothing ships a broken reference. |
| `public/favicon.svg` (8 matches) | **False positive** — the matches are coincidental `...MAI...` substrings inside the base64-encoded PNG payload embedded in the SVG, not a brand string, text node, or id. The visual mark itself was not assessed as text; if it carries the AMAI logo visually, it needs a real REVAI asset (Phase 2/4 asset work) — **do not generate**. |

## 3. Hard stops encountered

- **Phone number** `+420 608 024 655` (JSON-LD, Contact, Footer) — B10 did not confirm it; kept unchanged, **documented as unconfirmed**. Note: the footer `tel:` href is `+420123456789` while the displayed number is `+420 608 024 655` — a pre-existing placeholder mismatch, **not AMAI-related, left unchanged**, flagged for owner confirmation.
- **Legal entity name** — only „IČO: 05013500" used; no full registered name invented anywhere.
- **No third social URL invented** — Facebook placeholder removed instead.
- **`og-image.webp`, `favicon.png`, `apple-touch-icon.png`** — not inspected pixel-level here; if they visually carry the AMAI mark they need real replacement assets later. Not changed, not generated.
- **Personal mailtos in GDPR.tsx** (`j.rehberger@…`, `d.valter@…`) — already on the correct domain, untouched per plan §3.3.

## 4. Validation command results

| Command | Result |
|---|---|
| `npm run typecheck` | ✅ green (0 errors) |
| `npm run lint` | ✅ 0 errors, 3 pre-existing warnings (react-refresh in `LanguageContext.tsx` etc. — unrelated to 3B) |
| `npm run build` | ✅ green (`vite build` completed, dist emitted) |

Live dev-preview verification (rendered DOM at `/`):
- `document.title` = „Automatizace pomocí AI – Řešení na míru | REVAI" — baseline wording + REVAI suffix only.
- H1 renders exactly „Automatizujeme procesy pomocí AI." — byte-identical to B6 §6.1.
- Runtime meta description unchanged automation wording (no AMAI was present).
- JSON-LD parses: `name: REVAI`, `sameAs` = the two B10 URLs, `email: info@automatizace-ai.cz`, Znojmo address present, phone unchanged.
- Footer: mailto + both socials resolve to B10 values; Znojmo 2 address shown; no `id` on `<footer>`; Facebook icon gone.
- `apple-mobile-web-app-title` = REVAI.

## 5. Guardrail confirmations

- ✅ Homepage H1, title keyword phrase, meta description, and static `index.html` head wording unchanged except the brand token (word-level diff inspected — every protected-page hunk changes only `AMAI`→`REVAI`).
- ✅ `/cenik` content and pricing untouched (title suffix only; calculators/components not modified).
- ✅ No `/sluzby/*` route, slug, redirect, or sitemap change. `public/_redirects` not modified: existing `emailova-automatizace` 301 and the 3A `interni-agenti` 301 intact, SPA fallback last.
- ✅ No `package.json` / `package-lock.json` change; no `npm audit fix`; no dependency installed.
- ✅ No deletions (`amai-logo.png` retained); no assets generated or replaced; no tracking added; no deploy.
- ✅ Automation keyword wording untouched everywhere (suffix/token-only diffs).

## 6. Deploy preview testing

**Allowed.** Per B1 (closed) and the Phase 3 plan §1.1, deploy previews on `revai-web-v2.netlify.app` are permitted — production remains untouched and the new subdomain is not the indexed domain. Recommended preview checks: webmanifest serves REVAI, JSON-LD validates in Google's Rich Results test, footer links resolve.

## 7. Rollback

Revert the single 3B commit — pure string changes, instantly reversible with no data or routing risk. If a single surface is contested (e.g. the JSON-LD address block or a testimonial), revert that hunk only; nothing else depends on it.
