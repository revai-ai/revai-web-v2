/**
 * Phase 4A — Storytelling Variant Lab
 * Branch: exp/story-lab-canvas-higgsfield
 *
 * Stage data for the canvas-Higgsfield variant.
 *
 * Narrative arc: physically broken website object (M1) → reconstruction begins
 * (M2) → premium structure forms (M3) → systems connecting (M4) → living
 * sales engine (M5).
 *
 * ASSETS: Higgsfield nano_banana_pro "Monolith of Strata" art direction.
 * Compressed webp previews at /story-lab/canvas-higgsfield/m{1-5}.webp.
 * Source PNGs: higgsfield-eval-phase4a/accepted/M{1-5}.png (gitignored).
 *
 * B7 GATE: all copy below is structural DRAFT pending copy owner assignment.
 *          Do not ship to production without B7 sign-off.
 *
 * Lab-only. Must not be imported from any production component.
 */

export interface CanvasHiggsfieldStage {
  id: string;
  moment: number; // 1–5
  image: string;
  eyebrow: string;
  headline: string;
  headlineAlt: string;
  body: string;
  cta?: { href: string; label: string };
}

export const CANVAS_HIGGSFIELD_STAGES: CanvasHiggsfieldStage[] = [
  {
    id: 'hf-broken',
    moment: 1,
    image: '/story-lab/canvas-higgsfield/m1.webp',
    eyebrow: '01 — Before',
    // DRAFT copy — B7 gated
    headline: 'Broken web.',
    headlineAlt: '',
    body: 'A weak website does not just look dated. It leaks trust, attention, and demand.',
  },
  {
    id: 'hf-reconstruct',
    moment: 2,
    image: '/story-lab/canvas-higgsfield/m2.webp',
    eyebrow: '02 — Rebuild',
    // DRAFT copy — B7 gated
    headline: 'Reconstruction',
    headlineAlt: 'begins.',
    body: 'We rebuild the structure before we decorate the surface.',
  },
  {
    id: 'hf-structure',
    moment: 3,
    image: '/story-lab/canvas-higgsfield/m3.webp',
    eyebrow: '03 — Structure',
    // DRAFT copy — B7 gated
    headline: 'The story',
    headlineAlt: 'becomes clear.',
    body: 'Every section earns its place. The visitor knows exactly where they are.',
  },
  {
    id: 'hf-connected',
    moment: 4,
    image: '/story-lab/canvas-higgsfield/m4.webp',
    eyebrow: '04 — Connected',
    // DRAFT copy — B7 gated
    headline: 'System,',
    headlineAlt: 'not brochure.',
    body: 'The website starts behaving like a business system. CRM, booking, demo flow.',
  },
  {
    id: 'hf-engine',
    moment: 5,
    image: '/story-lab/canvas-higgsfield/m5.webp',
    eyebrow: '05 — Engine',
    // DRAFT copy — B7 gated
    headline: 'Sales engine,',
    headlineAlt: 'fully alive.',
    body: 'A premium website attracts, routes, and converts new demand.',
    cta: { href: '/demo', label: 'I want a demo of my website' },
  },
];
