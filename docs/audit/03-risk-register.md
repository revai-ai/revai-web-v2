# 03 — Risk Register (REVAI redesign)

> Audit-only. Risks are observed from the code or are reasoned consequences of the stated plan.
> Severity: low / medium / high / critical. Likelihood: low / medium / high.
> "Owner/Phase" is a suggestion, not an assignment. "Must-fix before implementation" = must be resolved (or a conscious decision recorded) before the redesign build starts.

Each risk is marked **[Fact]** (observed) or **[Assumption]** (inferred, needs data).

---

## Risk table

| # | Risk | Area | Severity | Likelihood | Impact | Mitigation | Owner / Phase | Must-fix before impl? |
|---|---|---|---|---|---|---|---|---|
| R1 | Repositioning homepage from "AI automation" to "premium websites" drops existing organic rankings | SEO / Positioning | **high** | medium | Loss of inbound leads from automation keywords (explicit business constraint not to destroy this) | Keep automation service pages strong + indexed; preserve their URLs/canonicals; phase homepage H1/meta change; add 301s only where slugs change; monitor Search Console before/after **[Assumption: magnitude — no analytics in repo]** | SEO / Phase 0 | **Yes** |
| R2 | "CZ/EN" is a runtime string toggle, not real i18n (no localized routes, no hreflang, not persisted, not in served HTML) | i18n / SEO | **high** | high | EN content is effectively non-indexable; committing to current architecture forces a later rewrite of all copy | Decide i18n strategy (path `/cs` `/en` vs. domain) before writing new copy; build dictionaries + hreflang; avoid adding more inline `t('cs','en')` pairs **[Fact]** | Frontend+SEO / Phase 0 | **Yes** |
| R3 | Live third-party tracker (`r2.leadsy.ai/tag.js` in `index.html`) runs with no consent, while GDPR page states "no cookies or analytical tools are used" | Compliance / Analytics | **high** | high | Legal/GDPR exposure (contradiction is already live); worsens when Meta Pixel added | Gate all trackers behind a consent banner (Consent Mode style); update GDPR text; decide if leadsy stays **[Fact]** | Legal+Frontend / Phase 0 | **Yes** |
| R4 | Brand migration half-done: titles, OG/Twitter, JSON-LD `Organization.name`, manifest title, `sameAs` handles all still "AMAI" | Branding / SEO | medium-high | high (already true) | REVAI looks inconsistent to users and crawlers; weak brand SERP; broken social links | Deliberate AMAI→REVAI sweep across `index.html` + 14 source files + manifest + JSON-LD; update social handles or remove **[Fact]** | Content+Frontend / Phase 1 | **Yes** |
| R5 | No SSR/prerender; all SEO meta is client-mutated after hydration; static head is stale | SEO / Perf | medium-high | high | JS-less crawlers see stale AMAI head; weaker indexing of new positioning | Add prerendering/SSG for marketing routes (e.g. prerender plugin or migrate framework) OR at minimum keep static head accurate per deploy **[Fact]** | Architecture / Phase 1 | No (but strongly recommended) |
| R6 | No automated tests anywhere; `node_modules` absent so build/lint/typecheck couldn't even be validated in audit | Testing / Build | medium | high | Large redesign with no safety net; regressions ship silently | `npm install` + capture clean baseline; add minimal smoke/route/render tests + form-function test before redesign **[Fact]** | Frontend / Phase 0 | No (but recommended before large changes) |
| R7 | "Submit website URL → manual demo in hours" flow does not exist | Forms / Conversion | high | high (it's a primary conversion) | The brief's headline conversion has no implementation; risk of ad-hoc, untracked build | Design net-new: form field + `demo-request` function + team notification/inbox + dedupe/spam guard; instrument events from day one **[Fact]** | Frontend+Backend / Phase 1 | **Yes (design)**; build in impl |
| R8 | Desktop pinned story = 1100vh + 5 full-viewport webp layers + spring + parallax | Performance / Motion | medium | medium | Jank/scroll-stutter on mid/low-end devices; high paint cost; battery | Measure (Lighthouse/real device); cap layer count; preload/decode story webp; consider `content-visibility`; keep reduced-motion path **[Fact engine; Assumption perf magnitude]** | Frontend / Phase 2 | No |
| R9 | Two motion libs (`framer-motion`+`motion`) and two icon packs (`lucide`+`@tabler`) shipped together | Perf / Debt | medium | high (already true) | Larger JS bundle; duplicated semantics; confusion | Standardize on one motion package and one icon set; remove the other after usage audit **[Fact]** | Frontend / Phase 2 | No |
| R10 | Orphaned Supabase migrations (`contact_messages`) with no code using them; contact uses Resend only | Data / Debt | medium | medium | Dead infra implies a half-built feature; confusion about where leads are stored | Decide: wire Supabase as lead store (useful for demo-request pipeline) or remove migrations; document the choice **[Fact]** | Backend / Phase 1 | No (decide early) |
| R11 | Hardcoded Vapi public key in `VapiCallButton.tsx`; hardcoded leadsy `data-pid` in `index.html` | Security / Config | low-medium | high (already true) | Keys in VCS; harder rotation; environment coupling | Move to env/config; rotate if sensitive (Vapi public key is client-exposed by design, lower risk) **[Fact]** | Frontend / Phase 2 | No |
| R12 | No 404 / catch-all route; unknown paths render empty layout (navbar+footer, blank middle) | UX / Routing | low-medium | medium | Poor UX + bad for SEO crawl of dead links | Add a `NotFound` route with 200→ proper handling and helpful links **[Fact]** | Frontend / Phase 1 | No |
| R13 | Footer defects: broken `mailto:info@amai.cz`, placeholder `href="#"` socials, `id="blog"` on `<footer>`, address inconsistency (Znojmo vs "Praha"/"Prague") | UX / Correctness | low-medium | high (already true) | Broken contact path; misleading anchors; address mismatch erodes trust | Fix mailto domain; real social URLs or remove; remove stray `id`; reconcile address with Contact page **[Fact]** | Content+Frontend / Phase 1 | No (quick wins) |
| R14 | Contact form lacks inline per-field validation + `aria-live` on status; only server-side validation | A11y / UX | low-medium | medium | Screen-reader users miss success/error; weaker UX on errors | Add client validation + `aria-live="polite"` status region; keep server validation **[Fact]** | Frontend / Phase 2 | No |
| R15 | `.prose` (Blog) hardcodes grays outside token system; possible contrast issues | A11y / Styling | low | medium | Contrast failures; palette explorations won't reach blog text | Tokenize `.prose`; verify WCAG AA contrast **[Fact color hardcode; Assumption contrast]** | Frontend / Phase 2 | No |
| R16 | `Blog.tsx` = 1,042 lines of hardcoded article content in a route bundle | Debt / Perf | low-medium | high (already true) | Heavy route chunk; unmaintainable content; no CMS | Move articles to data/MD; lazy per-article **[Fact]** | Frontend / Phase 2 | No |
| R17 | Resend sending domain/env not verifiable from repo (`RESEND_API_KEY`, from/to addresses) | Deployment | medium | medium | Form silently fails in prod if domain unverified or key missing | Verify Resend domain; confirm Netlify env vars set in target site; add a deploy smoke test of the function **[Fact env names; Assumption prod state]** | DevOps / Phase 0 | **Yes (verify)** |
| R18 | Meta Ads tracking + Conversions API not present; conversion events undefined | Analytics | medium | high | Can't measure ad ROI at launch; retrofitting events is costlier | Define event taxonomy now (see `05`); implement consent-gated Pixel + CAPI in a dedicated phase **[Fact]** | Marketing+Frontend / Phase 3 | No (but define early) |
| R19 | Sitemap omits dynamic/brochure routes and is manually maintained (`lastmod` hand-set) | SEO | low | medium | Stale sitemap as routes change during redesign | Generate sitemap at build; include/exclude deliberately; refresh per deploy **[Fact]** | Frontend / Phase 2 | No |
| R20 | Single repo is a *copy*, not production; risk of auditing/changing the wrong tree | Process | medium | medium | Work done here may diverge from the real production repo | Confirm which repo is source of truth before implementation; reconcile **[Fact: env says copied repo]** | Owner / Phase 0 | **Yes (confirm)** |

---

## Must-fix-before-implementation shortlist

These should be resolved or have a recorded decision **before** redesign coding begins:

- **R1** SEO preservation plan for the repositioning.
- **R2** Real CZ/EN strategy decided (before writing new copy).
- **R3** Consent/tracking + GDPR text contradiction resolved.
- **R4** AMAI→REVAI migration plan (brand + SEO surfaces).
- **R7** Demo-request flow designed (build can follow).
- **R17** Resend/env verified in the target Netlify site.
- **R20** Confirm this is (or is reconciled with) the production source of truth.

*(confidence: high on the list composition; the magnitude of R1/R5/R8 is Assumption-level until analytics + a real build/Lighthouse run exist.)*
