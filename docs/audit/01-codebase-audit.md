# 01 — Codebase Audit (REVAI)

> Audit-only document. No production code was changed. Date: 2026-06-10.
> Scope: local copied repository at `web 4.0/`, not the production repo.
> Live reference site: https://automatizace-ai.cz/

Legend used throughout: **Fact** = directly observed in the code. **Assumption** = inferred, needs confirmation. Recommendations are tagged `confidence: high/medium/low`, with reason + trade-off.

---

## Executive summary

The codebase is a **small, single-language-rendered React SPA** (~6,000 lines of app code across ~55 files) built on Vite + React 18 + TypeScript + Tailwind, deployed to Netlify with a single serverless function (Resend email). It is in noticeably better shape than a typical "AI-generated starter": there is already a **production-grade scrollytelling system** (pinned crossfade on desktop, stacked editorial cards on mobile, with `prefers-reduced-motion` fallbacks), a coherent design-token system ("Invisible Flow" — warm paper / graphite / olive), and lazy-loaded routes.

However, it is **not ready for the repositioning** as-is, and several things are mislabelled, half-migrated, or quietly broken:

- **Brand is mid-migration.** The UI chrome says "REVAI", but **page titles, meta descriptions, structured data, the manifest, and many on-page strings still say "AMAI"** and "AI automation" positioning. This is a brand-consistency and SEO problem, not a cosmetic one.
- **i18n is a façade.** "CZ/EN" is a runtime string swap via an in-memory React context. There is **no localized routing, no `hreflang`, no persisted language, no per-language metadata in the served HTML.** Search engines only ever see Czech URLs and Czech meta. Real CZ/EN is a build-out, not a toggle.
- **The homepage tells the wrong story.** The pinned scrollytelling is excellent *engineering*, but its content is the "manual chaos → AI automation → measurable output" narrative — i.e. the **old** positioning. The premium-website story does not exist yet.
- **A few concrete defects**: a broken `mailto:info@amai.cz` link (old domain), a hardcoded third-party tracking script (`leadsy.ai`) loaded with no consent while the GDPR text claims "no cookies or analytics are used", a hardcoded Vapi public key in source, an orphaned Supabase migration set with no code using it, and inconsistent company address (Znojmo vs. Prague).

None of these block *planning* the redesign. Several block *shipping* it.

**Recommended next step:** Treat this as a **content-and-positioning rebuild on top of a reusable design/motion foundation**, not a rewrite. Keep the motion engine, token system, form backend, and routing shell; replace the homepage narrative, fix the brand/SEO migration deliberately (to protect existing AI-automation SEO), and design real CZ/EN before writing new copy. Details in `02-reuse-map.md`, risks in `03-risk-register.md`.

---

## Current stack (Fact)

| Layer | Technology | Version (from `package.json`) | Notes |
|---|---|---|---|
| Build | Vite | ^5.4.2 | `npm run build` → `dist/` |
| Framework | React | ^18.3.1 | `StrictMode`, `createRoot` |
| Language | TypeScript | ^5.5.3 | `tsc --noEmit` available as `typecheck` |
| Routing | react-router-dom | ^7.9.4 | `BrowserRouter`, client-side SPA |
| Styling | Tailwind CSS | ^3.4.1 | + PostCSS, Autoprefixer |
| Motion | framer-motion **and** motion | ^12.23.24 (both) | Two packages, same major; see debt note |
| Icons | lucide-react + @tabler/icons-react | 0.344.0 / 3.35.0 | Two icon libraries |
| Voice | @vapi-ai/web | ^2.5.0 | Voice agent demo button |
| UI primitives | @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge | — | shadcn-style utility layer |
| Backend | Netlify Functions | `netlify/functions/contact.mts` | 1 function, emails via Resend |
| Email | Resend (REST) | n/a (raw `fetch`) | No SDK dependency |
| DB (orphaned) | Supabase | migrations only | **No client code references it** |
| Host | Netlify | `netlify.toml` | publish `dist`, SPA redirect |
| Origin | Bolt.new template | `.bolt/` | `bolt-vite-react-ts` |

**Build tooling status (Fact):** `node_modules` is **absent**. Validation commands (`build`, `lint`, `typecheck`) **could not be run** — see `13` area below and `04-implementation-constraints.md`. Running them requires `npm install`, which this audit did not perform (per command rules).

---

## Architecture map

```
web 4.0/
├── index.html                 # Static head: title/OG/Twitter/JSON-LD — ALL still "AMAI" + old positioning
│                              # Loads leadsy.ai tracker + Vapi widget UMD via <script>
├── netlify.toml               # build=npm run build, publish=dist, functions dir
├── netlify/functions/
│   └── contact.mts            # Resend email sender; server-side env only; honeypot + validation
├── supabase/migrations/       # 5 migrations for contact_messages table — ORPHANED (no code uses it)
├── public/                    # Images (webp), favicons, _redirects, robots.txt, sitemap.xml, manifest
│   ├── _redirects             # 301 emailova-automatizace→automatizace-procesu; SPA fallback
│   ├── story/c/               # 5 scrollytelling scene images (local-only by design)
│   └── blog/                  # 8 blog images
├── src/
│   ├── main.tsx               # Root: <LanguageProvider><App/>
│   ├── App.tsx                # Router + route table + lazy imports + brochure layout switch
│   ├── index.css              # Tailwind layers + .prose styles (hardcoded grays) + smooth scroll
│   ├── styles/tokens.css      # .variant-c design tokens (Invisible Flow palette)
│   ├── config/
│   │   ├── site.ts            # CALENDAR_URL (Google Calendar booking) — single source
│   │   └── motion.ts          # Shared EASE cubic-bezier
│   ├── contexts/LanguageContext.tsx   # in-memory cs/en + t(cs,en) helper
│   ├── hooks/
│   │   ├── useDocumentMeta.ts # Imperative <title>/meta/canonical updates per route
│   │   └── useMediaQuery.ts   # Drives desktop/mobile motion split
│   ├── data/                  # projects.ts, services.ts (content data)
│   ├── components/
│   │   ├── Navbar / Footer / ScrollToTop
│   │   ├── home/              # Hero, SocialProof, ImageStoryStack(+Scene/Mobile), Services, Process, FAQ
│   │   ├── sections/          # BookConsultation, Reveal
│   │   ├── ui/                # badge/button/card (shadcn-style) + text-rotate
│   │   ├── ui/ifl/            # Invisible-Flow primitives: Button/Card/Eyebrow/Reveal/Section
│   │   ├── Vapi / calculators / pricing blocks / GDPRModal
│   └── pages/                 # Home, References, PricingPage, Blog, Contact, Projects, ProjectDetail,
│                              # GDPR, services/*, brochures/*
└── docs/audit/                # ← this audit (the only thing created)
```

**Architectural strengths (Fact):**
- Clear separation: `pages/` route entries, `components/home/*` homepage sections, `ui/ifl/*` reusable primitives, `config/*` single-source constants (`CALENDAR_URL`, `EASE`).
- Routes are lazy-loaded except `Home` (eager) — sensible for first paint.
- Motion is centralized and respects reduced-motion; mobile/desktop story variants are mutually exclusive so the heavy 1100vh pinned timeline never mounts on phones.
- Secrets handling for the contact function is correct: Resend key is server-side `process.env` only, never `VITE_*`.
- Design tokens are namespaced under `.variant-c` to avoid collisions — good for introducing 2–3 palette explorations later.

**Architectural weaknesses (Fact):**
- **i18n architecture is not production-grade** (no routing/SEO/persistence). This is the single biggest structural gap for the stated CZ/EN requirement.
- **Two motion packages** (`framer-motion` + `motion`) and **two icon packs** (`lucide-react` + `@tabler/icons-react`) ship together; only one of each is meaningfully needed. Bundle/debt risk.
- **No meta in served HTML per route** — all SEO meta is client-side mutated after hydration (`useDocumentMeta`). For an SPA with no SSR/prerender, crawlers that don't execute JS see only the static `index.html` head (which is stale "AMAI" content).
- **Orphaned Supabase layer** — migrations imply a DB-backed contact store that the live function does not use. Either dead code or an incomplete migration. Needs a decision.
- `index.css` `.prose` hardcodes grays (`#111827`, `#4B5563`) outside the token system — used by the 1,000-line Blog.
- `Blog.tsx` is **1,042 lines** of mostly hardcoded article content — a content-management smell.

---

## Route map (Fact — from `src/App.tsx`)

All routes are **Czech-slug only**. Language is a runtime toggle, not part of the URL.

| Path | Page | Lazy? | In sitemap? | Notes |
|---|---|---|---|---|
| `/` | Home | eager | ✅ (1.0) | Hero + scrollytelling + services + process + FAQ + booking |
| `/reference` | References | ✅ | ✅ (0.8) | Testimonials (some still name "AMAI") |
| `/cenik` | PricingPage | ✅ | ✅ (0.8) | 4 calculators/pricing blocks; **audit, do not change** |
| `/blog` | Blog | ✅ | ✅ (0.7) | 1,042 lines, hardcoded articles |
| `/kontakt` | Contact | ✅ | ✅ (0.7) | Form → Netlify function; team cards |
| `/sluzby/hlasovi-agenti` | VoiceAgents | ✅ | ✅ (0.9) | Secondary offer |
| `/sluzby/automatizace-procesu` | InternalAgents | ✅ | ✅ (0.9) | Secondary offer |
| `/sluzby/tvorba-modernich-webu` | ModernWebDevelopment | ✅ | ✅ (0.9) | **The future PRIMARY offer page** — already premium-leaning copy |
| `/sluzby/emailova-automatizace` | → redirect | n/a | ❌ | `<Navigate>` + `_redirects` 301 to automatizace-procesu |
| `/sluzby/ai-app-development` | AIAppDevelopment | ✅ | ✅ (0.9) | Secondary offer |
| `/projekty` | Projects | ✅ | ✅ (0.7) | Project grid |
| `/projekty/:id` | ProjectDetail | ✅ | ❌ (dynamic) | Detail by id |
| `/brozura-hotely` | BrochureHotely | ✅ | ❌ | Standalone (no navbar/footer) |
| `/brozura-zdravotnictvi` | BrochureZdravotnictvi | ✅ | ❌ | Standalone landing/brochure |
| `/brozura-autoservisy` | BrochureAutoservisy | ✅ | ❌ | Standalone landing/brochure |
| `/gdpr` | GDPR | ✅ | ✅ (0.3) | Legal text |

**No catch-all / 404 route** is defined in the Router. Unknown paths fall through to the Netlify SPA rewrite → `index.html` → React renders the layout with an **empty `<Routes>` outlet** (navbar + footer, blank middle). *Fact.* No explicit `NotFound` page.

**Risk of changing homepage positioning (Fact + Assumption):**
- `/` is the highest-priority indexed URL (sitemap 1.0) and its meta + JSON-LD currently rank for "AI automatizace". Repositioning the visible H1/story toward "premium websites" **without a deliberate SEO plan risks shedding existing automation rankings** (the explicit business constraint). *Fact that the risk exists; Assumption on magnitude — no analytics data available in repo.*
- The pinned story is content-driven from `imageStoryData.ts`; the homepage shell can be repositioned **without touching the motion engine** — the narrative is data, the animation is code. This materially lowers redesign risk.

---

## Current positioning summary (Fact)

- **Primary visible message (homepage Hero):** "Automatizujeme procesy pomocí AI / We automate processes with AI" — automation-first.
- **Eyebrow on Hero:** `AI Automatizace · AMAI` — still the **old brand and old category**.
- **Scrollytelling narrative:** 5 scenes — manual chaos → AI routing → automated execution → connected systems → measurable output. Pure automation story.
- **Services order on site:** voice assistants, process automation, modern web, AI app dev — i.e. **the inverse of the new margin/priority order** (premium web should lead).
- **The one asset already aligned with the new direction:** `/sluzby/tvorba-modernich-webu` (`ModernWebDevelopment.tsx`) already sells "premium UI/UX", "image-led scrollytelling — the same animation quality you see on this site", conversion structure, CZ/EN. This page is the **closest existing seed of the new positioning** and should be mined for copy.

**Where old positioning is still hardcoded (Fact):**
- `index.html`: `<title>`, OG/Twitter title+description, JSON-LD `Organization.name = "AMAI"`, `apple-mobile-web-app-title = AMAI`, `sameAs` LinkedIn/FB/IG point to `amai.*` handles.
- `Home.tsx`, `Contact.tsx`, `PricingPage.tsx`, `Projects.tsx`, `Blog.tsx`, `References.tsx` (×7), `AIAppDevelopment.tsx`, `VoiceAgents.tsx` (×3), `InternalAgents.tsx`, `ModernWebDevelopment.tsx`, `GDPR.tsx`, `Hero.tsx`: page titles / meta / body still reference "AMAI".
- `Footer.tsx`: `mailto:info@amai.cz` (broken — displays `info@automatizace-ai.cz`).

---

## Main findings by audit area

### 1. Architecture & folder structure
Solid, conventional Vite/React structure. Strengths and weaknesses listed above. **Do-not-touch in pass 1:** `netlify/functions/contact.mts`, `src/config/site.ts`, the motion engine (`ImageStoryScene/Stack/Mobile`), `PricingPage` + calculators, `GDPRModal`, `_redirects`. *(confidence: high — these are working, isolated, and high-blast-radius.)*

### 2. Routing & page structure
Clean client-side routing; **no real i18n routing**, no 404 page. `/cenik` and service pages are independent routes — safe to leave untouched while the homepage is reworked. *(Fact.)*

### 3. Positioning & copy
Brand migration is half-done (REVAI in chrome, AMAI in meta/copy). The premium-web story does not exist on the homepage yet. The ModernWebDevelopment page is the best existing copy seed. *(Fact.)*

### 4. Reusable components
Strong reusable layer (`ui/ifl/*`, motion, Reveal, BookConsultation, form). Full keep/adapt/replace/postpone breakdown in `02-reuse-map.md`. *(Fact.)*

### 5. Motion / scroll / animation
**This is the codebase's biggest asset for the redesign.** Centralized `EASE`, `useReducedMotion` honored in 4+ components, desktop/mobile split via `useMediaQuery`, springized scroll progress. Performance risk: the desktop story uses a **1100vh pinned section** with 5 full-viewport crossfading webp layers + spring + parallax — must be perf-measured on mid-range hardware, but it is the kind of "wow" the brief wants. *(Fact.)* Detail in `03`/area-5.

### 6. Styling & tokens
Coherent token system (`.variant-c` in `tokens.css`, mirrored in `tailwind.config.js`). **Can support 2–3 palette explorations** *if* tokens become the single source — but today the palette is **duplicated** in two places (CSS vars + Tailwind config) and some values are hardcoded inline (gradient rgba in Hero/Story, grays in `.prose`). Palette swap is feasible but requires consolidating these first. *(confidence: medium — feasible, needs a tokenization pass.)*

### 7. Forms / Resend / Netlify / booking
One contact form → `/.netlify/functions/contact` → Resend. Honeypot + required-field + email-regex validation server-side. Booking = static `CALENDAR_URL` (Google Calendar appointment schedule). **No "submit your website URL → get a demo" flow exists** — it must be built (new form field + likely a new function + a manual-handling inbox/notification). *(Fact.)* Detail in area-7 / `05`.

### 8. SEO & metadata
Client-side meta mutation only; static `index.html` head is stale "AMAI". Sitemap, robots, canonical, OG, Twitter, JSON-LD all present but **brand-stale**. **No `hreflang`, no per-language URLs.** Repositioning risk to automation SEO is real. *(Fact.)*

### 9. i18n readiness
`t(cs,en)` runtime swap; default `cs`; not persisted; not in URL; not in SEO. Hundreds of inline bilingual string pairs. Current architecture **cannot support clean CZ/EN** for SEO without a routing/metadata layer. *(Fact.)* Recommendation in `04`.

### 10. Performance
No SSR/prerender; large webp assets (story scenes, blog images 100–300 KB each); 1100vh pinned animation; two motion + two icon libraries inflate JS. No analytics/Lighthouse data in repo. Must be measured before production. *(Fact + Assumption on magnitude.)*

### 11. Accessibility & UX
Better than average: `aria-label`/`aria-expanded`/`aria-controls` on nav, focus-visible rings on CTAs, reduced-motion fallbacks, `loading="lazy"`/`decoding="async"` on images. Gaps: form has no inline per-field error messaging or `aria-live` on the status banner; `<a href="#">` social links are disabled-but-focusable; `.prose` hardcoded grays may fail contrast; no skip-link; footer uses `id="blog"` (semantically wrong anchor). *(Fact.)*

### 12. Analytics / Meta Ads / cookie consent
**None implemented** (no GA, no GTM, no Meta Pixel, no consent banner). **But** `index.html` already loads a third-party tracker (`r2.leadsy.ai/tag.js`) unconditionally, while the GDPR text states *"no cookies or analytical tools are used."* That is a **live contradiction / compliance exposure** and will get worse the moment Meta Pixel is added. A Consent-Mode-style banner + tag gating is required before any ad tracking. *(Fact.)*

### 13. Testing / lint / typecheck / build
Scripts exist (`build`, `lint`, `typecheck`, `dev`, `preview`). **No tests exist at all** (no test runner in deps, no `*.test.*`). `node_modules` absent → none could be run in this audit. *(Fact.)*

### 14. Netlify deployment
`netlify.toml` + `_redirects` are coherent. Required env vars (Fact, from function): `RESEND_API_KEY` (mandatory), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (have fallbacks). Resend sending domain must be verified. SPA rewrite is correct. *(Fact.)*

### 15. Technical debt & constraints
Duplicated motion/icon libs, duplicated `BookConsultation` (two files), duplicated `Reveal` (two files), orphaned Supabase, 1,042-line hardcoded Blog, hardcoded Vapi key, hardcoded inline colors, stale brand strings scattered across ~14 files. Full register in `03`, constraints in `04`. *(Fact.)*

---

## Critical risks (top of `03-risk-register.md`)

1. **Repositioning homepage away from "AI automation" without an SEO preservation plan** → loss of existing organic rankings (explicit business constraint). *Severity: high.*
2. **i18n is not real** → committing to CZ/EN with the current toggle architecture produces non-indexable EN and rework later. *Severity: high.*
3. **Brand migration is half-done in SEO-critical places** (titles, JSON-LD, manifest, OG) → REVAI brand looks inconsistent to users and crawlers. *Severity: medium-high.*
4. **Compliance contradiction**: live `leadsy.ai` tracker + GDPR text claiming none; no consent before adding Meta Pixel. *Severity: high (legal).*
5. **No tests + cannot validate build locally** (deps missing) → no safety net for a large redesign. *Severity: medium.*

---

## Recommended next step

1. **Confirm intent & answers** to the blocking questions in `05-open-questions.md` (especially: keep or replace the homepage automation story; real CZ/EN routing yes/no; what the "website URL → demo" flow must actually do).
2. **Stand up the toolchain once, with approval**: `npm install`, then `npm run typecheck && npm run lint && npm run build` to capture a clean baseline before any redesign work (see `04`).
3. **Do the brand/SEO migration deliberately and first** (AMAI→REVAI in meta/JSON-LD/manifest + redirect/canonical strategy) so the repositioning preserves automation equity instead of dropping it.
4. **Reposition the homepage as a content/data change** on top of the existing motion engine; introduce the premium-web story as new scene data + new section order — without rewriting the animation system.

*(confidence: high that this sequencing is lower-risk than a rewrite; trade-off: slower than a greenfield rebuild, but protects working functionality and SEO, which the brief explicitly requires.)*
