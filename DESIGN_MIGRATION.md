# Design Migration Checklist

Tracks progress of the Invisible Flow (Variant C) design-system extraction and
promotion to production. Each phase is gated on human approval before the next begins.

---

## Phase 0 — Commit approved Variant C preview
- [x] Build passes (`npm run build`)
- [x] All Variant C files committed (`src/components/variants/c/*`, `src/pages/variants/c/*`, `public/story/c/*`)
- [x] Modified shared files committed (`App.tsx`, `PreviewIndex.tsx`, `tokens.css`, `tailwind.config.js`)
- [x] `/preview/c` renders correctly (visual verified)
- [x] `/` production homepage byte-for-byte unchanged

---

## Phase 1 — Non-breaking design-system extraction
- [x] `src/config/site.ts` — single CALENDAR_URL source of truth
- [x] `src/components/BookConsultation.tsx` imports CALENDAR_URL from config
- [x] `src/components/variants/c/BookConsultationC.tsx` imports CALENDAR_URL from config
- [x] `src/components/variants/c/imageStoryDataC.ts` imports CALENDAR_URL from config
- [x] `src/config/motion.ts` — single EASE constant source of truth
- [x] `RevealC.tsx` imports EASE from config/motion
- [x] `ServicesC.tsx` imports EASE from config/motion
- [x] `BookConsultationC.tsx` imports EASE from config/motion
- [x] `src/components/ui/ifl/Reveal.tsx` — promoted Reveal primitive
- [x] `src/components/ui/ifl/Eyebrow.tsx` — eyebrow text primitive
- [x] `src/components/ui/ifl/Button.tsx` — primary/ghost button primitive
- [x] `src/components/ui/ifl/Section.tsx` — section wrapper primitive
- [x] `src/components/ui/ifl/Card.tsx` — card primitive
- [x] `src/data/services.ts` — single source for service lineup
- [x] `public/story/c/measurable-output.png.png` renamed to `measurable-output.png`
- [x] `imageStoryDataC.ts` reference updated to `measurable-output.png`
- [x] `DESIGN_MIGRATION.md` created
- [x] Build passes after all Phase 1 changes
- [ ] `/preview/c` visually identical to before (screenshot comparison)
- [ ] `/` production homepage confirmed unchanged after Phase 1

---

## Phase 2 — Promote Invisible Flow to production + restyle global chrome
- [x] Promote Variant C homepage to production `/` (`src/pages/Home.tsx` renders the
      Variant C composition; `/preview/c` kept unchanged as reference route)
- [x] Preserve conversion sections on `/`: Hero · SocialProof · ImageStory · Services ·
      Process · FAQ · BookConsultation
- [x] Validate conversion anchors exist on `/`: `#services`, `#faq`, `#book-consultation`
- [x] Preserve CZ/EN support, Google Calendar URL, service links, reduced-motion fallback
- [x] Restyle Navbar (`src/components/Navbar.tsx`) to Invisible Flow palette
      (warm paper, graphite, olive hover/active, rounded CTA — no purple); behavior preserved
- [x] Restyle Footer (`src/components/Footer.tsx`) to warm stone / graphite / olive;
      link groups, contact, legal, company details preserved
- [x] Preview routes `/preview/a`, `/preview/b`, `/preview/c` still render
- [x] Build + lint + typecheck: no new issues introduced by Phase 2
- [x] No horizontal scroll at 1440px; desktop + mobile nav verified

### Phase 2 follow-ups _(optional polish, not blocking)_
- [ ] Swap `RevealC` usages to `src/components/ui/ifl/Reveal`
- [ ] Swap inline eyebrow spans to `<Eyebrow>` primitive
- [ ] Swap inline buttons/anchors to `<Button>` primitive
- [ ] Swap section boilerplate to `<Section>` primitive
- [ ] Promote Variant C section components out of `src/components/variants/c/` to a
      permanent home (e.g. `src/components/home/`) and update `Home.tsx` import (see TODO)
- [ ] Typography scale audit (clamp values, line-height, letter-spacing)
- [ ] Scroll performance audit (passive listeners, will-change, FPS check)

---

## Phase 3 — Replace email automation with modern web service
- [x] New service: **Tvorba moderních webů / Modern Website Development**
      (`slug: tvorba-modernich-webu`, icon `Globe`) added to `src/data/services.ts`
- [x] New service route `/sluzby/tvorba-modernich-webu` → `ModernWebDevelopment` page
- [x] New service page `src/pages/services/ModernWebDevelopment.tsx` (Variant C styling)
- [x] Old route `/sluzby/emailova-automatizace` → 301 redirect to `/sluzby/automatizace-procesu`
      (Netlify `public/_redirects` 301! + client-side `<Navigate replace>` fallback in `App.tsx`)
- [x] Service lineup updated in Navbar, Footer, and homepage `ServicesC` (row #3)
- [x] Email automation folded into Process Automation page (`InternalAgents.tsx`) as a capability
- [x] Pricing page: `EmailAutomationCalculator` replaced with web-dev project-tier cards
      (`WebDevelopmentPricing.tsx` — Landing / Business / Premium motion); quick-nav button updated
- [x] Contact form option `email-automation` → `web-development` (label "Tvorba moderních webů")
- [x] Supabase `send-contact-email`: added `'web-development'` label, kept `'email-automation'` (legacy)
- [x] `public/sitemap.xml` updated to new route
- [x] Build + lint + typecheck: no new issues introduced by Phase 3

### Phase 3 follow-ups _(deferred to Phase 6 cleanup)_
- [ ] `ServicesC.tsx` could consume `SERVICES` from `src/data/services.ts` (single source)
- [ ] `EmailAutomation.tsx` page now unrouted but kept on disk — remove in cleanup
- [ ] `EmailAutomationCalculator.tsx` now unreferenced but kept on disk — remove in cleanup
- [ ] Variant A/B preview `ServicesA/B` still list email automation (preview-only; redirect covers links)

---

## Phase 4 — Visual migration — page-by-page restyle

### Phase 4A — Pricing & Contact ✅ complete
- [x] `src/pages/PricingPage.tsx` — hero section restyled to ifl palette, service selector buttons → olive/paper
- [x] `src/components/VoiceAgentCalculator.tsx` — full ifl restyle (panels, inputs, sliders, price display, CTA)
- [x] `src/components/InternalAgentCalculator.tsx` — full ifl restyle (panels, SLA selector, tier cards, CTA)
- [x] `src/components/WebDevelopmentPricing.tsx` — ifl badge, cards, featured card, CTA
- [x] `src/components/AIAppDevelopmentPricing.tsx` — ifl section bg, cards, icon colors, CTA
- [x] `src/components/BookConsultation.tsx` — ifl section bg, icon, CTA
- [x] `src/pages/Contact.tsx` — hero, team cards, contact info cards, form fields, submit button, GDPR link
- [x] No purple/blue gradient remains on /cenik or /kontakt
- [x] All calculator logic, form integrations, anchors, CZ/EN support preserved

### Phase 4B — Service pages ✅ complete _(superseded by Phase 4C)_
- [x] `src/pages/services/VoiceAgents.tsx` — ifl restyle (warm paper, graphite, olive — no purple)
- [x] `src/pages/services/InternalAgents.tsx` — ifl restyle (comparison table, dept cards, step cards — no purple)
- [x] `src/pages/services/AIAppDevelopment.tsx` — ifl restyle (GlowingEffect grid + RadialOrbitalTimeline preserved)
- [x] `src/pages/services/ModernWebDevelopment.tsx` — already Variant C; no changes needed
> Note: 4B was a recolor only — the old page *structure* remained. Phase 4C rebuilds the three pages structurally.

### Phase 4C — Service-page structural rebuild ✅ complete
Rebuilt the three legacy service pages to match the `ModernWebDevelopment.tsx` reference pattern
(Invisible Flow): left-aligned hero (eyebrow → headline with olive accent phrase → subcopy → CTA pair
→ soft right-side radial), alternating `bg-ifl-s1`/`bg-ifl-canvas` sections at `py-24 lg:py-32`,
`RevealC` scroll motion, premium cards (`border-ifl-border` + `bg-ifl-canvas`, `rounded-xl/2xl`, olive
icon tiles), `border-t` numbered process rows, and the shared `BookConsultationC` final CTA.
- [x] `src/pages/services/VoiceAgents.tsx` — full rebuild. Sections: Hero · What the assistant handles · Why it matters (+ stats) · How implementation works · **Try the assistant (`#try-agent`, Vapi preserved)** · Use cases · `BookConsultationC`. Sentence-case copy (was ALL-CAPS). Dropped the legacy self-animating step observer.
- [x] `src/pages/services/InternalAgents.tsx` — full rebuild. Sections: Hero · What we automate · Typical workflows · How systems connect · Implementation process · Outcomes · `BookConsultationC`. Legacy comparison table removed; email-automation copy kept as a capability.
- [x] `src/pages/services/AIAppDevelopment.tsx` — full rebuild. Sections: Hero · What we build · Use cases · From prototype to production · Integrations & data · Delivery process · `BookConsultationC`. Removed `GlowingEffect` grid + `RadialOrbitalTimeline` (clashed with Invisible Flow); no dashboard-heavy UI.
- [x] `src/components/VapiCallButton.tsx` — "Zavolat AI asistentovi" button moved off the old `gradient-bg` (purple/blue) onto the ifl button system (`bg-ifl-signal` → `hover:bg-ifl-signal-dark`); volume bar + live indicator recolored to olive. Vapi click behavior unchanged.
- [x] `src/pages/services/ModernWebDevelopment.tsx` — reference page; left unchanged.
- [x] No purple/blue gradients remain on any service page (verified: 0 gradient elements at runtime). No horizontal scroll at 1440px. CZ/EN toggle works on all pages. Routes, redirects and integrations untouched.

### Phase 4 audit items _(pending)_
- [ ] Compare every Variant C section against Variant A and production homepage
- [ ] Ensure feature parity (anchors: `#services`, `#faq`, `#book-consultation`)
- [ ] Accessibility audit: heading hierarchy, aria labels, keyboard navigation
- [ ] i18n completeness: every string has both `cs` and `en` values

---

## Phase 5A — Supporting pages restyle ✅ complete
- [x] `src/pages/Projects.tsx` — warm paper bg, graphite text, olive accents, ifl card borders, no purple gradients
- [x] `src/pages/ProjectDetail.tsx` — ifl section cards, olive CTA button, olive checkmarks, no purple gradients
- [x] `src/pages/References.tsx` — ifl canvas/s1 layout, olive stats, olive icon tiles, no purple gradients
- [x] `src/pages/Blog.tsx` — ifl hero, ifl cards, olive read-more, olive close button, no purple gradients in UI
- [x] `src/pages/GDPR.tsx` — warm paper hero (replaces dark gray), ifl section cards, olive accents, olive links, legal copy preserved exactly
- [x] All routes preserved: /projekty, /projekty/:id, /reference, /blog, /gdpr
- [x] All project/reference/blog data and links preserved
- [x] CZ/EN toggle preserved on all pages
- [x] Build + lint + typecheck: no new issues from Phase 5A

---

## Phase 5 — Production routing swap _(pending approval, human gate)_
> Note: `/` already renders the Variant C homepage as of Phase 2 (via `src/pages/Home.tsx`).
> The remaining items below cover archiving the legacy homepage and final smoke testing.
- [ ] Human approves final Variant C design in production
- [ ] Archive legacy homepage components (old `Hero`, `Problems`, `Services`, etc.) — now orphaned
- [ ] Smoke test all anchor links and service routes

---

## Phase 6A — Dead-code cleanup ✅ complete
- [x] Removed `/preview`, `/preview/a`, `/preview/b`, `/preview/c` routes from `App.tsx`
- [x] Deleted `src/pages/PreviewIndex.tsx`
- [x] Deleted `src/pages/variants/a/`, `src/pages/variants/b/`, `src/pages/variants/c/`
- [x] Deleted `src/components/variants/a/`, `src/components/variants/b/`
- [x] Moved all production Variant C section components out of `src/components/variants/c/` to permanent homes:
  - `src/components/sections/Reveal.tsx` (was `RevealC.tsx` — shared by Home + all service pages)
  - `src/components/sections/BookConsultation.tsx` (was `BookConsultationC.tsx` — shared)
  - `src/components/home/Hero.tsx`, `SocialProof.tsx`, `Services.tsx`, `Process.tsx`, `FAQ.tsx`
  - `src/components/home/ImageStoryStack.tsx`, `ImageStoryScene.tsx`, `imageStoryData.ts`
- [x] Deleted `src/components/variants/c/` (now empty after component promotion)
- [x] Updated `src/pages/Home.tsx` imports → `home/` and `sections/`
- [x] Updated service page imports (VoiceAgents, InternalAgents, ModernWebDevelopment, AIAppDevelopment) → `sections/`
- [x] Deleted legacy root components that are now unreferenced:
  - `Hero.tsx`, `SocialProof.tsx`, `Problems.tsx`, `Services.tsx`, `Process.tsx`, `FAQ.tsx`
  - `IntegrationsBeam.tsx`, `EmailAutomationCalculator.tsx`, `AdvancedCapabilities.tsx`
  - `CaseStudy.tsx`, `CallToAction.tsx`, `Features.tsx`, `Pricing.tsx`
- [x] Deleted orphaned UI components: `animated-beam.tsx`, `glowing-effect-card.tsx`,
  `radial-orbital-timeline.tsx`, `feature-section-with-hover-effects.tsx`
- [x] Deleted `src/pages/services/EmailAutomation.tsx` (unrouted since Phase 3; redirect preserved in App.tsx + _redirects)
- [x] Cleaned `src/styles/tokens.css` — removed `.variant-a` and `.variant-b` blocks; kept `.variant-c` (ifl tokens)
- [x] Cleaned `tailwind.config.js` — removed `ea.*` and `lab.*` color palettes and dead keyframes;
  kept `ifl.*`, `ifl-fade-in` animations, and `ea-marquee` (still used by SocialProof marquee)
- [x] Build passes (`npm run build`) — no new errors
- [x] Lint/typecheck — all 15 errors are pre-existing (GDPRModal, Blog, Contact, InternalAgentCalculator, text-rotate, App.tsx future prop)
- [x] All production routes verified: `/`, `/cenik`, `/kontakt`, `/projekty`, `/sluzby/hlasovi-agenti` ✓
- [x] `/preview` routes confirmed dead (no route match)
- [x] Zero console errors introduced

### Phase 6A deferred → Phase 6B
- [x] `gradient-text` class used in ~50 Blog article content strings — replaced with `text-ifl-ink` (also fixed `className=` → `class=` in HTML strings so styles actually apply in browser)
- [x] `gradient-bg` in `GDPRModal.tsx` close button — replaced with `bg-ifl-signal hover:bg-ifl-signal-dark`
- [x] `animate-fade-in`, `animate-slide-up` still used in Blog/Projects/References — kept; keyframes retained in index.css
- [x] Image optimization deferred to Phase 7A

---

## Phase 6B — Legacy gradient content cleanup ✅ complete
- [x] `src/pages/Blog.tsx` — 56 `gradient-text` occurrences in article HTML strings replaced with `text-ifl-ink`; `className=` fixed to `class=` so styles apply when rendered via `dangerouslySetInnerHTML`
- [x] `src/components/GDPRModal.tsx` — close button `gradient-bg` (purple/blue) replaced with `bg-ifl-signal text-white hover:bg-ifl-signal-dark hover:shadow-lg`
- [x] `src/index.css` animation audit:
  - `animate-fade-in` / `@keyframes fadeIn` — KEPT (used: ProjectDetail.tsx, Blog.tsx)
  - `animate-slide-up` / `@keyframes slideUp` — KEPT (used: Projects.tsx, Blog.tsx, References.tsx)
  - `animate-pulse-text` / `@keyframes pulseText` — REMOVED (no production usage)
  - `use-case-card` / `.use-case-card:hover` / `@keyframes cardPulse` — REMOVED (no production usage; contained purple gradient border-image)
  - `benefit-card` / `.benefit-card:hover` — REMOVED (no production usage; contained purple gradient border-image)
  - `animate-infinite-scroll` / `@keyframes infiniteScroll` — REMOVED (no production usage; SocialProof uses `animate-ea-marquee` via tailwind.config.js)
  - `animate-email-flow` / `@keyframes emailFlow` — REMOVED (no production usage; EmailAutomation page deleted in Phase 6A)
  - `gradient-bg` utility class — REMOVED (GDPRModal fixed; no remaining usage)
  - `gradient-text` utility class — REMOVED (Blog.tsx fixed; no remaining usage)
- [x] Image optimization deferred to Phase 7A

---

## Phase 7A — Asset optimization & bundle splitting ✅ complete

### Images converted to WebP
| File | Before | After | Saving |
|------|--------|-------|--------|
| story/c/manual-chaos | 1.6 MB PNG | 56 KB webp | −97% |
| story/c/ai-routing | 1.5 MB PNG | 36 KB webp | −98% |
| story/c/automation-execution | 1.5 MB PNG | 52 KB webp | −97% |
| story/c/systems-connected | 1.8 MB PNG | 68 KB webp | −96% |
| story/c/measurable-output | 1.6 MB PNG | 48 KB webp | −97% |
| dalsi.png (Gemini blog) | 6.1 MB PNG | 300 KB webp | −95% |
| hf_…gpt5.png (GPT-5 blog) | 512 KB PNG | 16 KB webp | −97% |
| Phoenix…Abstraktn.jpg | 1.3 MB jpg | 116 KB webp | −91% |
| Phoenix…dreaml copy.jpg | 1.4 MB jpg | 140 KB webp | −90% |
| Phoenix…AI_work copy.jpg | 1.4 MB jpg | 140 KB webp | −90% |
| Phoenix…stylized copy copy.jpg | 1.3 MB jpg | 136 KB webp | −90% |
| Phoenix…small_ye.jpg | 1.4 MB jpg | 136 KB webp | −90% |
| Phoenix…stylized (1).jpg | 1.5 MB jpg | 172 KB webp | −89% |
| ideogram…portrait.jpg | 392 KB jpg | 16 KB webp | −96% |
| naskok logo.png | 56 KB PNG | 40 KB webp | −29% |
| logobezpozadi.png | 144 KB PNG | 40 KB webp | −72% |
| Google_Gemini…png | 488 KB PNG | 80 KB webp | −84% |
| photo_5798476…y.jpg | 208 KB jpg | 112 KB webp | −46% |
| T1N_4008.jpg | 316 KB jpg | 140 KB webp | −56% |
| 2026-01-30_12.36.33.jpg | 68 KB jpg | 32 KB webp | −53% |

### Filename normalization
- `/naskok logo.png` → `/naskok-logo.webp` (space removed)
- `/2026-01-30_12.36.33.jpg` → `/sima-logo.webp`
- `/ideogram-v3.0_…cle-1.jpg` → `/testimonial-portrait.webp`
- `/photo_5798476033567689545_y.jpg` → `/team-photo-1.webp`
- `/T1N_4008.jpg` → `/team-photo-2.webp`
- `/Google_Gemini_icon_2025.svg.png` → `/partner-gemini.webp`
- `/hf_20260218_…68852.png` → `/blog/gpt-5-enterprise.webp`
- All 8 blog Phoenix images → `/blog/*.webp` with semantic names

### Lazy loading added
- `loading="eager"` on first 3 blog cards (above fold); `loading="lazy"` on cards 4+
- `loading="lazy"` + `decoding="async"` on blog modal image
- `loading="lazy"` + `decoding="async"` on all reference logos and testimonial portraits
- `loading="lazy"` + `decoding="async"` on contact team photos
- `decoding="async"` on Navbar logo (above fold, no lazy)
- `loading="lazy"` + `decoding="async"` on Footer logo

### Bundle / code splitting
- Route-level `React.lazy` for all pages except `Home` (first meaningful paint)
- `Suspense fallback={null}` wrapping all routes (no flash-of-loading-spinner)
- `vite.config.ts` `manualChunks`: `vendor-react`, `vendor-motion`, `vendor-ui`
- Before: 1 chunk at **1,037 kB** (gzip 288 kB), warned > 500 kB
- After: largest chunk **313 kB** (VoiceAgents), no size warning; initial home chunk ~52 kB

### Logo / LFS audit
- `public/logobezpozadi.png` — real 1280×1280 RGBA PNG ✅ (not LFS stub)
- `public/amai-logo.png` — real 1280×1280 RGBA PNG ✅
- Both Navbar and Footer updated to use `logobezpozadi.webp` (40 KB)
- `public/logo-transparent-copy.png`, `logo-transparent.png`, `Logo bez pozadí.png` — these legacy LFS stubs are no longer referenced in any source code; safe to delete in future cleanup

### Validation
- `npm run build` ✅ — no errors, no chunk size warning
- `npm run lint` — 15 pre-existing errors (GDPRModal, InternalAgentCalculator, Blog escape chars, unused categories), 0 new
- `npm run typecheck` — 7 pre-existing errors (App future prop, GDPRModal, Calculator, text-rotate, Contact), 0 new

### Remaining TODOs (Phase 7B or later)
- [ ] Self-hosted Inter font: add woff2 + `@font-face` preload
- [ ] Delete unused originals: `public/Phoenix_*copy*.jpg`, `public/naskok logo.png`, `public/dalsi.png`, `public/hf_…png`, `public/story/` (non-c), stale LFS stubs
- [ ] Add designed OG image (1200×630)
- [ ] Update Footer social links from `href="#"` to real URLs (requires client input)
- [ ] Final Lighthouse audit (Performance ≥ 90, Accessibility ≥ 95)
- [ ] Investigate Contact.tsx chunk size (157 kB — possibly embedded content)

---

## Phase 7B — Final SEO, accessibility, and asset cleanup ✅ (2026-06-08)

### SEO / metadata
- Created `src/hooks/useDocumentMeta.ts` — lightweight hook (no new deps) that updates `document.title`, `meta[description]`, `og:title/description`, `og:url`, and `link[canonical]` per route via `useEffect`
- Added per-route meta to all 12 production routes: `/`, `/cenik`, `/kontakt`, `/blog`, `/reference`, `/gdpr`, `/projekty`, `/sluzby/hlasovi-agenti`, `/sluzby/automatizace-procesu`, `/sluzby/tvorba-modernich-webu`, `/sluzby/ai-app-development`
- Czech-first titles (e.g. "Hlasoví AI asistenti pro firmy | AMAI") with English counterparts via existing `t()` helper
- Updated `index.html` OG/Twitter image from `apple-touch-icon.png` (180×180) to `logobezpozadi.webp` as temporary substitute; TODO for designed 1200×630 asset left in-place

### Sitemap / robots
- `public/sitemap.xml` — added `/sluzby/ai-app-development`, `/projekty`, `/gdpr`; updated `lastmod` dates to 2026-06-08; removed redirect route `/sluzby/emailova-automatizace`
- `public/robots.txt` — unchanged; sitemap reference already present

### Accessibility fixes
- **Navbar:** mobile menu `<button>` gains `aria-label`, `aria-expanded`, `aria-controls="mobile-menu"`; mobile services dropdown button gains `aria-expanded`, `aria-controls="mobile-services-list"`; desktop SERVICES dropdown button gains `aria-haspopup`, `aria-controls="services-dropdown"`; dropdown `<div>` gets `role="menu"`, service links get `role="menuitem"`
- **GDPRModal:** added `role="dialog"`, `aria-modal="true"`, `aria-labelledby="gdpr-modal-title"` to dialog container; `id="gdpr-modal-title"` on title `<h2>`; Escape key handler to close modal
- **Footer:** fixed logo link from `<a href="#">` to `<Link to="/">` (proper SPA navigation); removed empty `<a href="#">` links in copyright row; social icons gain `aria-disabled="true"` + `onClick preventDefault` pending real URLs; added `TODO` comment for client-supplied URLs

### Deleted unused assets (26 files)
Deleted from `public/` root: `Phoenix_10_*` (10 files), `2026-01-30_12.36.33.jpg`, `Google_Gemini_icon_2025.svg.png`, `ideogram-v3.0_*.jpg`, `T1N_4008.jpg`, `photo_5798476033567689545_y.jpg`, `dalsi.png`, `hf_20260218_*.png`, `naskok logo.png`, `logobezpozadi.png`, `favicon copy.png`, `favicon copy.svg`, `Icon.jpeg`

Deleted from `public/story/` (root, not `/c`): `ai-routing.png/webp`, `automation-execution.png/webp`, `manual-chaos.png/webp`, `measurable-output.png/webp`, `systems-connected.png/webp` (10 files — webp versions in story/c remain)

Deleted from `public/story/c/`: `ai-routing.png`, `automation-execution.png`, `manual-chaos.png`, `measurable-output.png`, `systems-connected.png` (5 PNG originals — WebP files remain)

### Contact chunk investigation
- Root cause: `@supabase/supabase-js` is bundled into the Contact chunk (~60 KB compressed). Since Contact is already lazy-loaded, this is acceptable for a secondary route.
- Applied: `GDPRModal` is now `React.lazy()`-imported inside Contact, wrapped in `Suspense`. Loads only when user clicks the GDPR consent link.
- Result: Contact chunk 157.9 kB → 142.9 kB; GDPRModal split to its own 15.6 kB sub-chunk
- **Update (production-prep):** `@supabase/supabase-js` and Web3Forms were removed from the
  contact flow entirely. The form now POSTs to a Netlify Function (`netlify/functions/contact.mts`)
  that sends email via Resend, so the Supabase client is no longer bundled into the Contact chunk.

### Lint / typecheck improvements
- `npm run lint`: 15 errors → **0 errors** (4 pre-existing warnings remain)
  - Fixed: 10× no-useless-escape in Blog.tsx template literals
  - Fixed: unused `categories` const in Blog.tsx
  - Fixed: unused `t` in GDPRModal.tsx
  - Fixed: unused `setAudit` / `setMonitoring` in InternalAgentCalculator.tsx
- `npm run typecheck`: 8 errors → **5 errors** (pre-existing only)
  - Fixed: `Contact.tsx(350)` — `t()` called with 0 args (filled in Czech/EN strings)
  - Fixed: `Blog.tsx` unused `categories` (removed)
  - Remaining pre-existing: `App.tsx` router future prop (react-router TS types mismatch), `InternalAgentCalculator.tsx` SLALevel type, `text-rotate.tsx` Intl.Segmenter

### Validation
- `npm run build` ✅ — no errors, no chunk size warning
- `npm run lint` ✅ — 0 errors, 4 warnings (pre-existing)
- `npm run typecheck` — 5 pre-existing errors, 0 new

### Footer social links
Real social URLs are still `href="#"`. **Client must supply real LinkedIn, Facebook, Instagram URLs.** Interim state: links are visible but `aria-disabled="true"` with `onClick preventDefault`. They do not navigate anywhere.

---

## Remaining post-Phase 7 TODOs
- [ ] **OG image** — design and add `/public/og-image.webp` at 1200×630 (currently uses logo as placeholder)
- [ ] **Footer social URLs** — client to supply LinkedIn, Facebook, Instagram profile URLs
- [ ] **Premium accent colour** — replace ifl-signal olive with final brand colour once approved
- [ ] **Logo recolour / REVAI wordmark** — pending brand decision
- [ ] **Self-hosted Inter woff2** — add `@font-face` + preload hero weight
- [ ] **Lighthouse audit** — target Performance ≥ 90, Accessibility ≥ 95
