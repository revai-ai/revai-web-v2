# 02 — Reuse Map (REVAI redesign)

> Audit-only. Nothing is deleted or refactored here — this is a classification + a proposed target architecture.
> Categories: **Keep** (use largely as-is), **Adapt** (reuse with edits), **Replace** (rebuild for the new direction), **Postpone** (leave untouched in pass 1; revisit later).
> Each row notes the reason and the trade-off. Confidence tags reflect how sure the classification is.

---

## Components to KEEP

These are working, isolated, on-brand for the visual system, and reusable across the redesign.

| Component | Path | Why keep | Confidence |
|---|---|---|---|
| Motion engine (desktop pinned story) | `components/home/ImageStoryStack.tsx`, `ImageStoryScene.tsx` | Best asset in the repo. Pinned crossfade + spring + parallax + reduced-motion fallback. The *narrative* is data (`imageStoryData.ts`), so the engine survives a repositioning. | high |
| Mobile story | `components/home/MobileImageStoryStack.tsx` | Separate lightweight stacked-card variant; keeps the heavy timeline off phones. | high |
| `useMediaQuery` | `hooks/useMediaQuery.ts` | Drives the desktop/mobile motion split. Generic, correct. | high |
| `useReducedMotion` usage pattern | across `Services/SocialProof/ifl/Reveal/Mobile…` | Accessibility-correct motion gating already wired. | high |
| `ui/ifl/*` primitives | `Button, Card, Eyebrow, Reveal, Section` | Small, token-driven, composable. The backbone for new premium sections. | high |
| Shared motion constant | `config/motion.ts` (`EASE`) | Single easing source. | high |
| Booking config | `config/site.ts` (`CALENDAR_URL`) | Single source for the Google Calendar CTA; referenced everywhere. | high |
| Contact serverless function | `netlify/functions/contact.mts` | Correct secret handling, honeypot, validation. Reuse as the base for the new demo-request function. | high |
| Token system | `styles/tokens.css` + `tailwind.config.js` colors | Coherent palette; namespaced under `.variant-c`. Foundation for palette explorations (after de-duplication). | medium |
| GDPR modal | `components/GDPRModal.tsx` | Legal content reusable — **but its "no cookies/analytics" text must be updated** when tracking lands (see Adapt). | medium |

---

## Components to ADAPT

Reusable shapes, but content/structure must change for REVAI premium positioning.

| Component | Path | What to change | Trade-off | Confidence |
|---|---|---|---|---|
| Hero | `components/home/Hero.tsx` | New H1/eyebrow/subhead toward premium websites; fix `AI Automatizace · AMAI` eyebrow; STATS may need new proof points. Layout/animation reusable. | Rewriting hero copy risks the automation SEO signal on `/` — coordinate with SEO plan. | high |
| Services section | `components/home/Services.tsx` | Reorder to lead with premium websites; demote automation/voice/AI-app to secondary. | Reorder is low-risk; new copy needs CZ/EN. | high |
| Story scene data | `components/home/imageStoryData.ts` | Replace the "manual chaos→automation" narrative with the premium-website transformation story (outdated site → modern sales engine). New webp renders under `/public/story/`. | New imagery is the main cost; engine unchanged. | high |
| ModernWebDevelopment page | `pages/services/ModernWebDevelopment.tsx` | **Promote toward primary.** Already sells premium UI/UX, scrollytelling, conversion structure. Mine its copy for the homepage; expand into the "signature web" tier. | Currently framed as one service among four; needs elevation without orphaning the others. | high |
| Navbar | `components/Navbar.tsx` | Reorder service dropdown (web first); wire CZ/EN to real i18n once it exists; keep a11y attributes. | Language buttons currently flip in-memory state only. | high |
| Footer | `components/Footer.tsx` | **Fix `mailto:info@amai.cz` → real domain**; fix `id="blog"` anchor; add real social URLs (currently `href="#"`); reconcile address (Znojmo vs. footer "Praha"). | Small but user-visible defects; quick wins. | high |
| Contact form | `pages/Contact.tsx` | Add inline validation + `aria-live` status; reconcile "AMAI" copy; reuse for inquiry conversion events later. | 496 lines, lots of inline strings — verbose to edit. | medium |
| `useDocumentMeta` | `hooks/useDocumentMeta.ts` | Extend to set OG image/locale per route and (ideally) `hreflang`; today it only sets title/desc/canonical/og:url. | Real fix is SSR/prerender; this hook is a client-side stopgap. | medium |
| References / testimonials | `pages/References.tsx` | Replace "AMAI" mentions (×7); keep structure; add web-project testimonials. | Some testimonials name AMAI in quoted text — rewrite carefully. | medium |

---

## Components to REPLACE (rebuild for new direction)

| Component | Path | Why replace | Confidence |
|---|---|---|---|
| Homepage narrative/section order | `pages/Home.tsx` (composition) | The *story* is the wrong story. Recompose around premium websites as the hero offer; this is a composition rewrite, not an engine rewrite. | high |
| Static `<head>` metadata | `index.html` | Stale AMAI title/OG/Twitter/JSON-LD/manifest title. Must be rebuilt for REVAI + premium positioning + likely per-language. | high |
| Blog content layer | `pages/Blog.tsx` (1,042 lines hardcoded) | Hardcoded articles don't scale and bloat the route bundle. Replace with a data/MD-driven approach (or postpone — see below). | medium |
| Demo-request flow | *(does not exist)* | The "submit your current website URL → manual demo in hours" conversion must be built net-new: form field + function + notification/inbox + later automation hook. | high |

---

## Components to POSTPONE (do not touch in pass 1)

Leave working/isolated/high-blast-radius things alone until the foundation is set.

| Item | Path | Why postpone | Confidence |
|---|---|---|---|
| Pricing page + 4 calculators | `pages/PricingPage.tsx`, `VoiceAgentCalculator`, `InternalAgentCalculator`, `WebDevelopmentPricing`, `AIAppDevelopmentPricing` | Brief says **audit, don't change** pricing. Self-contained; future premium tier is additive. | high |
| Vapi voice button | `components/VapiCallButton.tsx` | Works; but **hardcoded public key** should be moved to env later. Secondary offer. | medium |
| Brochure pages | `pages/brochures/*` | Standalone landing pages (no navbar/footer); independent of homepage redesign. | high |
| Supabase migrations | `supabase/migrations/*` | Orphaned (no code uses `contact_messages`). Decide later: wire up or remove. Don't delete in audit. | medium |
| Projects / ProjectDetail | `pages/Projects.tsx`, `ProjectDetail.tsx` | Reusable for premium case studies later; not on the critical path now. | medium |
| `ui/*` (non-ifl) shadcn primitives + `text-rotate` | `components/ui/badge|button|card|text-rotate` | May be partly unused vs. `ui/ifl/*`. Audit usage before consolidating; don't churn now. | low |

---

## Suggested future component architecture

A pragmatic target that **builds on what exists** rather than greenfield:

```
src/
├── i18n/                          # NEW — real localization layer
│   ├── routing                    # /cs/* and /en/* (or domain/subpath strategy)
│   ├── dictionaries (cs.ts/en.ts) # replace inline t('cs','en') over time
│   └── seo (hreflang, per-lang meta, per-lang OG)
├── components/
│   ├── story/                     # promoted from home/ — the reusable motion engine
│   │   ├── ScrollStory (engine)   # = current ImageStoryScene/Stack/Mobile, generalized
│   │   └── scenes/                # data-driven scene sets (premium-web, automation, …)
│   ├── sections/                  # premium homepage sections (Hero, OfferGrid, DemoRequest, Proof, FAQ)
│   ├── ui/ifl/                    # keep as the design-primitive library
│   └── forms/                     # Contact + DemoRequest (shared field/validation primitives)
├── config/                        # site.ts (booking), motion.ts, + NEW analytics/consent config
└── content/                       # blog + case studies as data/MD (de-hardcode Blog.tsx)

netlify/functions/
├── contact.mts                    # keep
└── demo-request.mts               # NEW — receives website URL, notifies team, (later) triggers automation
```

Principles:
- **Engine vs. content split** is already the right instinct here — lean into it. The premium "wow" comes from reusing one strong motion engine across multiple data-driven stories, not from N bespoke animations.
- **Tokens as single source.** Collapse the duplicated palette (CSS vars ↔ Tailwind config) so 2–3 brand directions are a token swap, not a find-and-replace.
- **i18n before copy.** Don't write the new premium copy as more inline `t('cs','en')` pairs — that doubles the rework when real i18n lands.

*(confidence: medium — directionally sound; exact i18n strategy depends on answers in `05`.)*

---

## Notes for the premium storytelling website direction

- **You already have the hardest part built.** The pinned crossfade story with reduced-motion + mobile fallbacks is exactly the "premium storytelling" capability the new positioning sells — and `ModernWebDevelopment.tsx` literally advertises "the same animation quality you see on this site." Reuse it as the proof, not just the pitch.
- **The three demo concepts** (luxury personal brand / interactive SaaS landing / premium real estate) map naturally onto **scene-data sets driving the same engine** — a strong, low-risk way to show range without building three separate sites.
- **The new primary CTA** ("submit your website URL → manual demo in hours") has **no home in the current components.** Treat it as a first-class new section + function, and design its conversion events from day one (see `05` analytics questions) even though tracking ships later.
- **Protect automation equity.** The automation/voice/AI-app pages are real SEO assets. Keep them as strong secondary routes; the redesign should *re-rank* them, not bury or break their URLs.
- **De-risk the palette explorations now** by consolidating tokens — otherwise each of the 2–3 directions becomes a manual sweep across hardcoded colors in Hero gradients, story scrims, and `.prose`.
