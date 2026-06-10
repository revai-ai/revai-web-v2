# 05 — Technical Architecture Proposal (REVAI redesign)

> Planning document. Recommends the target technical architecture, justified against the audit. Bias: **keep the stack, fix the gaps.** Confidence tags throughout.
> This proposes; it does not implement. Several items depend on blocking decisions in `01` (B2 i18n, B3 prerender, B9 storage).

---

## Recommended frontend architecture

**Keep Vite + React 18 + TypeScript + Tailwind** (D10). The audit found the structure sound; the problems are *content, i18n, SEO, and brand migration*, not the framework. A rewrite would re-introduce the exact SEO migration risk we're trying to avoid. *(confidence: high)*

Target shape (evolution of the current tree, from `docs/audit/02`):

```
src/
├── i18n/            NEW   routing helpers, cs/en dictionaries, hreflang + per-locale meta
├── components/
│   ├── story/       MOVED engine (generalized ImageStoryScene/Stack/Mobile) + scene-data sets
│   ├── sections/    premium homepage sections (Hero, DemoBand, OfferGrid, Proof, FAQ…)
│   ├── ui/ifl/      KEEP  design primitives (the backbone)
│   └── forms/       NEW   shared field/validation primitives (Contact + DemoRequest)
├── config/          site.ts (booking), motion.ts, + analytics/consent config (later)
└── content/         NEW   blog + case studies as data/MD (de-hardcode Blog.tsx)

netlify/functions/
├── contact.mts      KEEP
├── demo-request.mts NEW   website-URL demo capture → notify (+ optional store)
└── capi.mts         LATER server-side Meta Conversions API (Phase 6)
```

**Principles (confidence: high):**
- **Engine vs. content split.** The "wow" comes from reusing one strong motion engine across data-driven stories — not N bespoke animations. Lean into the split that already exists.
- **Tokens as single source.** Collapse the duplicated palette (CSS vars in `tokens.css` ↔ Tailwind config) into one source so the 2–3 palette directions (D14) are a token swap, not a find-and-replace across hardcoded gradient rgba / `.prose` grays.
- **No new inline `t('cs','en')`.** New copy goes through dictionaries (see i18n) to avoid doubling rework.
- **Don't over-engineer.** No state-management library, no design-system package, no monorepo. The app is small; keep it small.

**Dependency hygiene (Phase 2/3, needs the "may change deps" approval):** standardize on **one** motion library (`motion` vs `framer-motion`) and **one** icon set (`lucide` vs `@tabler`) after a usage audit; remove the loser. Move the hardcoded Vapi key to env. *(confidence: medium — clear win, but requires approval and a usage check)*

---

## i18n strategy

Current state is a façade (audit R2): in-memory toggle, no localized routes, no hreflang, not in served HTML.

**Recommendation (default, B2):** **`/cs` + `/en` URL subpaths on one Netlify site**, `cs` as default/canonical.

| Element | Approach | Confidence |
|---|---|---|
| Routing | Locale-prefixed routes; `cs` may also serve at root with 301 from bare paths → `/cs/...` to protect indexed URLs. | medium |
| Strings | `cs.ts` / `en.ts` dictionaries; migrate inline pairs incrementally, author new copy here. | high |
| Metadata | Per-locale title/description/OG; `<html lang>` set per route. | high |
| hreflang | Reciprocal `cs`↔`en` + `x-default` on every page. | medium |
| Persistence | Language from URL (source of truth) + localStorage hint for first visit. | medium |
| Canonicals | Self-canonical per locale URL (no cross-locale canonicalization). | high |

**Trade-off:** subpaths add routing/redirect/sitemap plumbing vs. the current toggle, but it's the only option that makes EN genuinely indexable (the requirement). **Open sub-question (low confidence):** whether `/en/` reuses Czech slugs (simpler, weaker EN keywords) or English slugs (better EN SEO, more bookkeeping) — see `02`, decide per EN keyword value.

---

## SEO / prerender recommendation

The core defect: **no SSR/prerender**, so crawlers that don't execute JS see only the static `index.html` head — which today is stale "AMAI" (R4/R5), and tomorrow won't carry per-locale meta.

**Recommendation:** **Prerender (SSG) the marketing routes** at build time (e.g. a Vite-compatible prerender/SSG approach) so each route + locale ships real HTML with correct REVAI + localized meta. Keep SPA hydration for interactive bits. *(confidence: medium-high)*

- **Why not full SSR/Next migration:** doubles risk mid-reposition (R1+R5 together) for benefit prerender largely delivers. Revisit only if prerender proves insufficient (e.g. heavy dynamic personalization, which this marketing site doesn't have). *(confidence: medium)*
- **Must-do regardless of prerender:**
  - Per-route + per-locale `<title>`, description, canonical, OG, hreflang in the served HTML.
  - **Generate `sitemap.xml` at build** (both locales) instead of hand-maintaining it.
  - Add `Service`/`FAQPage`/`BreadcrumbList` structured data; fix `Organization` to REVAI.
  - **Phase the homepage meta change** + obtain the keyword-preservation list (B6) before swapping automation wording — this is the single biggest SEO risk (R1).
- **404:** add a real not-found route (audit R12).

---

## Netlify constraints

(From audit area-14 / `04`.) *(confidence: high unless noted)*

- **Env vars** in the target site: `RESEND_API_KEY` (mandatory), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, plus new vars for `demo-request` (recipient inbox) and later CAPI (`META_PIXEL_ID`, `META_CAPI_TOKEN`). Never expose secrets as `VITE_*`.
- **Resend sending domain must be verified** or mail fails/spams (R17).
- **`_redirects` ordering:** SPA fallback (`/* → /index.html 200`) **stays last**; locale 301s and the existing `emailova-automatizace` 301 go above it. With prerender, ensure rewrites don't shadow prerendered HTML.
- **Add a `_headers` file** (none today): CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`. **CSP must allowlist** Vapi widget, any analytics/CMP/Meta origins, and (if kept) leadsy — get this right or third-party scripts break. *(confidence: medium — CSP is fiddly)*
- **Functions runtime:** `.mts` ESM using global `fetch`/`Response`; confirm the target site's Node runtime supports it.
- **This is a copied repo (R20/B1):** confirm the production source of truth before any deploy.

---

## Form / function architecture

- **Keep `contact.mts`** as the reference pattern (server-side env, honeypot, validation, Resend). *(confidence: high)*
- **New `demo-request.mts`** (the headline conversion): validate URL format + email + required + honeypot + basic rate limit; **notify a monitored inbox** via Resend with a distinct subject; **optional** persist to a store (B9/F — default email-only). **Do not auto-fetch the submitted URL server-side** in phase 1 (SSRF/abuse; it's manual anyway). *(confidence: high)*
- **Shared validation primitives** in `src/components/forms/` so Contact and DemoRequest don't duplicate logic. *(confidence: medium)*
- **Client UX:** inline validation + `aria-live` status (fixes R14) for both forms. *(confidence: high)*
- **CAPI seam:** structure `demo-request`/`contact` so a server-side Meta event can be emitted later from the same handler with a shared `event_id`. *(confidence: medium)*

---

## Consent / tracking architecture

(Designed now, implemented Phase 6 — never before consent. Fixes R3.) *(confidence: high on shape)*

```
CMP (default-deny)  →  Consent state  →  Tag gate
                                          ├─ GA4 (analytics category)
                                          ├─ Meta Pixel (marketing category)
                                          ├─ leadsy.ai (decide: keep+gate or remove)
                                          └─ Server CAPI (capi.mts) reads consent signal
```

- **Default-deny / Consent Mode v2 style:** zero non-essential tags fire pre-consent.
- **Granular categories** (essential / analytics / marketing) for EU/CZ defensibility.
- **Pixel + CAPI deduped** via shared `event_id`.
- **Update the GDPR text** the moment any tag is added (the "no cookies/analytics" claim becomes false).
- **Resolve the existing leadsy tracker** (R3): gate it behind consent or remove it — it currently runs unconditionally.

---

## What to keep / adapt / postpone

(Condensed from `docs/audit/02`; the source of truth for component-level detail.)

**Keep (use largely as-is):** motion engine (`ImageStoryScene/Stack/Mobile`), `useMediaQuery`, reduced-motion patterns, `ui/ifl/*`, `config/site.ts` + `config/motion.ts`, `contact.mts`, token system (after de-dup), GDPRModal (text update pending). *(confidence: high)*

**Adapt:** `Hero` (premium copy, fix eyebrow), `Services` (reorder per D3), `imageStoryData` (new premium narrative), `ModernWebDevelopment` (promote toward primary), `Navbar`/`Footer` (fix `mailto:info@amai.cz`, `id="blog"`, placeholder socials, address conflict; wire real i18n), `Contact` (a11y + REVAI copy), `useDocumentMeta` (per-locale meta), `References` (de-AMAI). *(confidence: high)*

**Replace/Build:** homepage composition (`Home.tsx`), static `index.html` head, demo-request flow (new), services hub page (new), 404 (new), blog content layer (de-hardcode — or postpone). *(confidence: high for the first four; medium for blog)*

**Postpone (don't touch in early passes):** `/cenik` + calculators (D11), Vapi button (move key later), brochure pages, Supabase migrations (decision pending — B9/G), Projects/ProjectDetail, non-ifl `ui/*` + `text-rotate` (usage-audit before consolidating). *(confidence: high)*

---

## Explicit non-goals (anti-over-engineering)

- No global state library, no SSR framework migration, no monorepo, no design-system npm package, no CMS platform (data/MD is enough for this content volume), no headless-everything. The site is small; the architecture should stay proportional to it. *(confidence: high)*
- No dynamic multi-agent workflows in the build. Reconsider only for an independent pre-launch cross-check (Phase 7), with approval. *(confidence: high)*
