# 05 — Open Questions (REVAI redesign)

> Audit-only. These are decisions the audit cannot make from the code alone.
> Questions marked **★ BLOCKING** should be answered before implementation begins (they change architecture, SEO, or scope).
> Where useful, the audit's default recommendation is noted (with confidence) so a non-answer still has a sensible fallback.

---

## Business questions

1. **★ Homepage story: replace or layer?** The current homepage narrative ("manual chaos → AI automation → measurable output") is the *old* positioning. Do we replace it with a premium-website story, or keep automation as a secondary chapter on the same page? *Default rec: lead with premium-web story, keep a short automation chapter (confidence: medium).*
2. **★ SEO equity vs. repositioning:** How much automation-keyword ranking are we willing to risk for the premium-web pivot? Is there Search Console / analytics data we can see to size R1? *(No analytics exist in the repo.)*
3. **Primary conversion priority:** Of the three (book consultation / inquiry form / website-URL demo), which is THE hero CTA on the new homepage? *Default rec: the website-URL demo, as the differentiator (confidence: low — business call).*
4. **Premium "signature web" tier:** What is it, what does it include, and where does it sit relative to existing `/cenik` packages? (Pricing is audit-only now, but the tier's scope affects IA.)
5. **Brand handles & legal identity:** The footer/JSON-LD reference `amai.*` socials and `info@amai.cz`. What are the real REVAI social URLs, support email, and is the legal entity / IČO 05013500 unchanged? Address is inconsistent (Contact: Znojmo; Footer: Praha) — which is correct?
6. **Is leadsy.ai (Instantly) tracking intentional and to be kept?** It's loaded today with no consent.

---

## Design questions

7. **★ Brand palette direction:** The brief says palette is intentionally open (2–3 directions to explore later). Do we (a) keep the current "Invisible Flow" warm-paper/olive as one candidate, and (b) build the token system to swap palettes cleanly first? *Default rec: yes to both; consolidate duplicated tokens before exploring (confidence: high).*
8. **Typography system:** Currently Inter only (system fallback). Premium positioning often wants a distinctive display/serif pairing. Introduce a brand typeface? (Affects perf budget + licensing.)
9. **The three demo concepts** (luxury personal brand / interactive SaaS landing / premium real estate): are these (a) live interactive demos built on the scroll engine, (b) case-study pages, or (c) just visuals? *Default rec: data-driven scene sets on the existing engine (confidence: medium).*
10. **Motion intensity vs. mobile smoothness:** How far do we push the "wow" on the 1100vh pinned story before it hurts mid-range mobile? Need a target device + perf budget.
11. **Dark mode / multiple themes:** In scope? (Tokens could support it, but it's extra surface.)

---

## Technical questions

12. **★ Source of truth:** This is a *copied* repo (per environment). Which repository/Netlify site is production, and how do we reconcile changes back? *(R20.)*
13. **★ SSR / prerender:** Are we willing to add prerendering/SSG (or migrate framework) so SEO meta + localized content are in the served HTML? Or stay client-only and accept the SEO limitation? *Default rec: prerender marketing routes (confidence: medium-high).*
14. **★ i18n URL strategy:** `/cs` + `/en` subpaths, subdomains, or separate domains? Determines routing, sitemap, hreflang, canonicals. *Default rec: subpaths on one Netlify site (confidence: medium).*
15. **Dependency cleanup:** OK to standardize on one motion library (`motion` vs `framer-motion`) and one icon set (`lucide` vs `@tabler`) after a usage audit? (Needs the "may we change deps" approval.)
16. **Supabase:** Wire it up as the lead/demo-request store (the migrations already define `contact_messages`), or remove it? *Default rec: use it for the demo-request pipeline (confidence: low — depends on automation roadmap).*
17. **Vapi key:** Move the hardcoded public key to env? Is the current Vapi assistant still active/desired?
18. **Testing:** What minimum coverage is acceptable (smoke/route render + form-function tests)? Who maintains it?

---

## Content questions

19. **★ New premium copy (CZ + EN):** Who writes it, and is it authored directly in both languages (so we don't retrofit EN)? This blocks the homepage rebuild.
20. **Blog (1,042 lines hardcoded):** Migrate to a CMS/MD content model, freeze as-is, or prune? Are these AI-news articles part of the SEO strategy or filler?
21. **Testimonials/References:** Several quote "AMAI" by name. Can we rewrite/re-attribute them as REVAI, and do we have client permission?
22. **Proof points:** Hero stats ("30+ clients", "4,000+ hours saved", "98% satisfaction") — are these still accurate for REVAI's premium-web positioning, or automation-era numbers?
23. **Story imagery:** New premium-web scene renders need to be produced for `/public/story/` (the engine expects local webp). Who produces them?

---

## Analytics questions

24. **★ Event taxonomy sign-off:** Confirm the conversion events to track (from the brief): consultation-booking click, inquiry-form start, inquiry-form submit, website-URL-demo submit, pricing-CTA click, demo-section engagement. Any others (scroll-depth on story, language switch, phone/email copy clicks)?
25. **Platforms:** GA4 + Meta Pixel + Meta Conversions API — all three? Server-side tagging (Netlify function) for CAPI?
26. **Consent model:** Opt-in banner (EU default) with granular categories, or simple accept/reject? Which CMP (build vs. buy)?
27. **Attribution for the manual demo:** Since the demo is human-fulfilled in phase 1, how do we tie a closed demo back to the ad click (offline conversion upload)?

---

## SEO questions

28. **★ Keyword preservation list:** Which exact automation keywords/pages must NOT lose ranking? (Needed to design the repositioning safely — R1.)
29. **AMAI→REVAI brand transition:** Is there an existing redirect/brand-change SEO plan (old brand mentions, backlinks, GMB/Maps listing)?
30. **Per-language meta + hreflang:** Confirm we want both languages indexed (vs. EN as a courtesy-only toggle). Affects sitemap + canonicals.
31. **Structured data:** Beyond `Organization`, do we want `Service`, `FAQPage`, `BreadcrumbList`, `LocalBusiness` for the premium positioning?

---

## Questions that MUST be answered before implementation (consolidated ★)

- **Business:** #1 homepage story strategy; #2 SEO-equity risk appetite; #3 hero conversion.
- **Design:** #7 palette/token approach.
- **Technical:** #12 production source of truth; #13 SSR/prerender; #14 i18n URL strategy.
- **Content:** #19 who authors CZ+EN copy.
- **Analytics:** #24 event taxonomy.
- **SEO:** #28 keyword preservation list.

Answering these seven-area set unblocks a concrete, low-regret implementation plan. Everything else can be sequenced into phases without stalling the start.
