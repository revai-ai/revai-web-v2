/**
 * Phase 4A — Storytelling Variant Lab
 * Branch: exp/story-lab-control-crossfade
 *
 * DRAFT scene data for the control/crossfade lab variant.
 *
 * Narrative arc: outdated/broken website → reconstruction → premium layout
 * → connected systems → measurable sales engine + /demo CTA.
 *
 * B7 GATE: all copy below is structural DRAFT pending copy owner assignment.
 *          Do not ship this copy to production without B7 sign-off.
 *
 * ASSETS: reusing /story/c/ automation scenes as temporary placeholders.
 *         Phase 4A scoring requires purpose-shot /story/p/ assets.
 *         Asset replacement is gated on the Higgsfield or stock-photo spike.
 *
 * This file is lab-only. It must not be imported from any production
 * homepage component. It exists only on exp/story-lab-* branches.
 */

import type { StorySceneC } from '../home/imageStoryData';

export const CONTROL_LAB_SCENES: StorySceneC[] = [
  {
    id: 'lab-before',
    // PLACEHOLDER: replace with /story/p/outdated-site.webp (right-weighted, dim/dated)
    image: '/story/c/manual-chaos.webp',
    eyebrow: { cs: '01 — Stagnace', en: '01 — Before' },
    // DRAFT copy — B7 gated
    headline: { cs: 'Váš web stárne', en: 'Your website is ageing' },
    headlineAlt: { cs: 'rychleji než vaše firma.', en: 'faster than your business.' },
    body: {
      cs: '[DRAFT] Zastaralý design, pomalé načítání, žádný příběh. Každý návštěvník, kterého ztratíte, je v číslech neviditelný.',
      en: '[DRAFT] Dated design, slow load, no story. Every visitor you lose is invisible in the numbers.',
    },
  },
  {
    id: 'lab-reconstruct',
    // PLACEHOLDER: replace with /story/p/first-impression.webp (warm light, premium device)
    image: '/story/c/ai-routing.webp',
    eyebrow: { cs: '02 — Rekonstrukce', en: '02 — Rebuild' },
    // DRAFT copy — B7 gated
    headline: { cs: 'Rozhodnutí padne', en: 'The decision is made' },
    headlineAlt: { cs: 'během vteřin.', en: 'in seconds.' },
    body: {
      cs: '[DRAFT] Prémiové rozvržení, typografie s řemeslem, signály důvěry. Návštěvník se rozhoduje okamžitě — design je důvěra.',
      en: '[DRAFT] Premium layout, craft typography, trust signals. A visitor decides in seconds — craft is trust.',
    },
  },
  {
    id: 'lab-story',
    // PLACEHOLDER: replace with /story/p/story-guides.webp (cinematic frames / scroll sequence)
    image: '/story/c/automation-execution.webp',
    eyebrow: { cs: '03 — Příběh', en: '03 — Story' },
    // DRAFT copy — B7 gated
    headline: { cs: 'Stránka, která', en: 'A page that' },
    headlineAlt: { cs: 'vede návštěvníka.', en: 'guides the visitor.' },
    body: {
      cs: '[DRAFT] Scrollytelling provede zákazníka hodnotou krok za krokem — přesně jako sekce, kterou právě čtete.',
      en: '[DRAFT] Scrollytelling walks your customer through value step by step — exactly like the section you\'re reading now.',
    },
  },
  {
    id: 'lab-connected',
    // PLACEHOLDER: replace with /story/p/conversion-structure.webp (ordered layout, single CTA)
    image: '/story/c/systems-connected.webp',
    eyebrow: { cs: '04 — Propojení', en: '04 — Connected' },
    // DRAFT copy — B7 gated
    headline: { cs: 'Struktura, která', en: 'Structure that' },
    headlineAlt: { cs: 'prodává.', en: 'sells.' },
    body: {
      cs: '[DRAFT] CRM, rezervace, demo flow. Stránka jako živý prodejní nástroj — ne brožura, ale stroj.',
      en: '[DRAFT] CRM, booking, demo flow. The site as a live sales instrument — not a brochure, a machine.',
    },
  },
  {
    id: 'lab-engine',
    // PLACEHOLDER: replace with /story/p/sales-engine.webp (warm dashboard, human at ease)
    image: '/story/c/measurable-output.webp',
    eyebrow: { cs: '05 — Motor', en: '05 — Engine' },
    // DRAFT copy — B7 gated
    headline: { cs: 'Z vizitky', en: 'From a business card' },
    headlineAlt: { cs: 'prodejní stroj.', en: 'to a sales engine.' },
    body: {
      cs: '[DRAFT] Poptávky, demo requesty, rezervace. Měřitelná poptávka viditelná od prvního dne.',
      en: '[DRAFT] Enquiries, demo requests, bookings. Measurable demand visible from day one.',
    },
    cta: {
      href: '/demo',
      label: { cs: 'Chci demo svého webu', en: 'I want a demo of my website' },
    },
  },
];
