# 02 — Information Architecture (REVAI redesign)

> Planning document. Proposes IA for CZ and EN, homepage section order, service hierarchy, pricing handling, demo-concept placement, and SEO-preservation rules.
> Default i18n strategy assumed: **`/cs` + `/en` subpaths, `cs` default** (decision B2 — confirm before build). Confidence tags throughout.

---

## Guiding principles

1. **Re-rank, don't re-slug.** Existing automation URLs keep their paths to protect SEO (D8/R1). Premium-web becomes primary through prominence and internal linking, not by demoting/renaming automation pages. *(confidence: high)*
2. **One offer leads; three support.** Premium websites is the hero; automation / AI app / voice are credible secondary offers, not buried. *(confidence: high)*
3. **The engine is the proof.** The scrollytelling capability is itself the sales argument for "premium storytelling websites" — show it on the homepage. *(confidence: high)*
4. **Localize URLs, not just strings.** Each language gets its own indexable URL + meta + hreflang. *(confidence: medium — depends on B2)*

---

## Proposed CZ IA (`/cs/...`, also the canonical/default)

> Slugs below keep existing Czech paths where they already rank. New paths are marked **NEW**.

```
/cs/                              Home (premium-web-led storytelling)
/cs/sluzby/                       NEW — services overview/hub (offer hierarchy, internal-link equity)
  /cs/sluzby/tvorba-modernich-webu   Premium websites  ← PROMOTED to primary (existing slug kept)
  /cs/sluzby/automatizace-procesu    Process automation (existing slug, equity preserved)
  /cs/sluzby/ai-app-development       Custom AI apps (existing slug)
  /cs/sluzby/hlasovi-agenti           Voice assistants (existing slug)
/cs/ukazky/                       NEW — demo concepts gallery (luxury brand / SaaS / real estate)
  /cs/ukazky/:concept             NEW — individual demo concept (engine-driven scene set)
/cs/demo/                         NEW — "Submit your website URL → manual demo" landing + form
/cs/projekty/                     Projects / case studies (existing)
  /cs/projekty/:id                Project detail (existing)
/cs/reference/                    References / testimonials (existing)
/cs/cenik/                        Pricing (existing — audit-only, unchanged)
/cs/blog/                         Blog (existing)
/cs/kontakt/                      Contact (existing — inquiry form + booking)
/cs/gdpr/                         Legal (existing — text to be updated when tracking lands)
/cs/brozura-*                     Brochure landers (existing, standalone, untouched)
404                               NEW — proper not-found (audit R12)
```

**Notes (confidence: medium-high):**
- `/cs/sluzby/` hub is **new** — currently services exist only as a navbar dropdown. A hub page concentrates internal-link equity and lets premium-web sit visibly above automation without changing automation slugs.
- `/cs/demo/` is the home of the headline conversion (B5). It can also be a section on `/cs/` — see homepage order — but a dedicated URL is useful for ad landing + tracking.
- Whether demo concepts live under `/cs/ukazky/` or are folded into the premium-web service page is a B-level design call; default is a light gallery that reuses the engine.

---

## Proposed EN IA (`/en/...`)

> Mirror of CZ. **Open question (B2):** keep Czech slugs under `/en/` (operationally simpler, weaker EN keyword targeting) vs. English slugs (better EN SEO, more redirect/hreflang bookkeeping). Default below = **English slugs for EN**, with hreflang pairing each CZ↔EN URL. *(confidence: low — this is a real trade-off, flag for decision.)*

```
/en/                              Home
/en/services/                     Services hub
  /en/services/premium-websites
  /en/services/process-automation
  /en/services/ai-app-development
  /en/services/voice-assistants
/en/showcase/                     Demo concepts gallery
  /en/showcase/:concept
/en/demo/                         Website-URL demo request
/en/projects/  /en/projects/:id
/en/references/
/en/pricing/                      (audit-only, unchanged content)
/en/blog/
/en/contact/
/en/privacy/                      (GDPR/privacy)
```

**Risk if EN uses English slugs (R2-adjacent):** more hreflang/canonical bookkeeping and redirects; get this wrong and you create duplicate-content or orphaned EN pages. If EN keyword volume is low for this business, **reusing CZ slugs under `/en/` is the safer default** — revisit per B2. *(confidence: medium)*

---

## Homepage section order (the core "wow" surface)

Ordered to lead with premium-web, prove capability via motion, then route to the primary conversion. *(confidence: medium — B4/B5 dependent; this is the recommended default.)*

| # | Section | Purpose | Reuse/Build | Notes |
|---|---|---|---|---|
| 1 | **Hero** (premium-web positioning) | New H1: turn an outdated site into a modern sales engine. Primary CTA. | **Adapt** `Hero.tsx` | Fix `AI Automatizace · AMAI` eyebrow → REVAI premium. |
| 2 | **Primary conversion band** (Website-URL demo) | The differentiator, high on the page: paste your URL → demo in hours. | **Build** (new) | Mirrors `/cs/demo/`. Instrument from day one. |
| 3 | **Proof / social proof** | Quiet credibility (clients, results). | **Keep/Adapt** `SocialProof.tsx` | Replace automation-only stats if needed (B4). |
| 4 | **Premium-web storytelling** (pinned scroll) | The signature moment — show, don't tell. **New scene data** (outdated→modern), same engine. | **Adapt** `imageStoryData.ts` + keep engine | New webp renders required (asset spike, `04`). |
| 5 | **Offer hierarchy** | Premium web first; automation/AI-app/voice as credible secondary. | **Adapt** `Services.tsx` | Reorder to match D3. |
| 6 | **Demo concepts teaser** | Range: luxury brand / SaaS / real estate → link to `/ukazky`. | **Build** (light) | Engine-driven scene sets. |
| 7 | **Process** | How an engagement runs. | **Keep** `Process.tsx` | — |
| 8 | **FAQ** | Objection handling + SEO (FAQPage schema). | **Keep** `FAQ.tsx` | Add structured data. |
| 9 | **Secondary conversion** (booking + inquiry) | Consultation + inquiry form entry. | **Keep** `BookConsultation` | Booking = existing `CALENDAR_URL`. |

**Automation chapter (B4):** if "layer" is chosen over "replace", insert a compact automation story between #5 and #6 reusing the *current* scene data — so the existing narrative isn't deleted, just demoted. *(confidence: medium)*

---

## Service page hierarchy

```
Services hub (/sluzby/, /services/)              NEW — overview, ranks the four offers
│
├── Premium websites  (tvorba-modernich-webu)    PRIMARY — promote; absorb "signature web" tier later
│      └─ existing copy already premium-leaning; expand; link to /demo and /ukazky
├── Process automation (automatizace-procesu)    SECONDARY — keep slug + content (SEO equity)
├── AI app development (ai-app-development)       SECONDARY — keep
└── Voice assistants  (hlasovi-agenti)           SECONDARY — keep; Vapi demo button
```

- **Premium websites page** becomes the deepest, most polished service page and the internal-linking center of gravity. *(confidence: high)*
- The three secondary pages are **preserved largely as-is** (content + URL) — re-ranked via nav order and hub prominence, not rewritten. *(confidence: high — directly serves D8)*

---

## Pricing page handling

- **Unchanged in this redesign** (D11). Audit-only. Calculators and `/cenik` content stay. *(confidence: high)*
- Visual reskin only if/when the token system changes — content and numbers untouched. *(confidence: high)*
- **Future (out of scope now):** add a premium "signature web" tier. IA-wise, reserve a slot on the premium-web service page and on `/cenik` so it can be added additively without restructuring. *(confidence: medium)*
- Pricing CTA clicks are a tracked event (see `03`), so the page participates in measurement even while content is frozen.

---

## Demo concept placement (luxury brand / SaaS / real estate)

| Option | Placement | Pros | Cons | Default |
|---|---|---|---|---|
| A | Homepage teaser (#6) + gallery `/ukazky` + per-concept pages | Clear range, ad-landable, reuses engine | Most new pages | **Recommended** |
| B | Folded into the premium-web service page only | Fewer pages | Less prominent; weaker as ad targets | Fallback |
| C | Three standalone microsites | Maximum "wow" each | 3× build/maintenance; rejected in `01` | No |

**Recommendation:** Option A — a light gallery + concept pages, each a **scene-data set on the existing engine**, not bespoke builds. This demonstrates "we build premium storytelling sites" by *being* three of them. *(confidence: medium)*

---

## SEO-preservation notes (serves D8 / R1)

| Rule | Detail | Confidence |
|---|---|---|
| Freeze automation slugs | `/sluzby/automatizace-procesu`, `/ai-app-development`, `/hlasovi-agenti` keep paths + indexable content. | high |
| Keep existing 301 | `emailova-automatizace → automatizace-procesu` stays (link equity). | high |
| Locale routing must not orphan today's URLs | If moving to `/cs/...`, **301 the bare paths → `/cs/...`** (or serve `cs` at root) so current indexed URLs don't 404. Decide with B2. | high |
| Canonicals + hreflang | Every page: self-canonical per locale + reciprocal hreflang `cs`↔`en` + `x-default`. | medium |
| Homepage meta change is phased | Don't swap H1/title/JSON-LD to premium-web wording until the brand migration + redirect map are ready; monitor Search Console. | high |
| Keyword-preservation list (B6) | Obtain the exact must-keep automation terms/pages before any homepage meta change. | high |
| Sitemap | Generate at build; include both locales; drop hand-maintained `lastmod`. | medium |
| Structured data | Keep `Organization` (fix to REVAI), add `Service` per service page, `FAQPage`, `BreadcrumbList`. | medium |
| No noindex traps | Demo/showcase pages should be indexable if they're ad landers; confirm per concept. | medium |

**Hard constraint:** any IA change that alters a currently-indexed URL **requires a 301 map and hreflang update in the same change** — never ship a slug move without it. *(confidence: high)*
