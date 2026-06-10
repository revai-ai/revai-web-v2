// Invisible Flow image-led scrollytelling scene data.
// Images are local-only under /public/story/c. Do not swap for external URLs.

import { CALENDAR_URL } from '../../config/site';

export interface Bilingual {
  cs: string;
  en: string;
}

export interface StoryCta {
  href: string;
  external?: boolean;
  label: Bilingual;
}

export interface StorySceneC {
  id: string;
  /** Local image path under /public. */
  image: string;
  eyebrow: Bilingual;
  /** First headline line (full graphite). */
  headline: Bilingual;
  /** Second headline line (muted graphite) — tonal editorial split. */
  headlineAlt: Bilingual;
  body: Bilingual;
  /** Optional CTA — only the final scene carries one. */
  cta?: StoryCta;
}

export const STORY_SCENES_C: StorySceneC[] = [
  {
    id: 'manual-chaos',
    image: '/story/c/manual-chaos.webp',
    eyebrow: { cs: '01 — Chaos', en: '01 — Chaos' },
    headline: { cs: 'Manuální práce', en: 'Manual work' },
    headlineAlt: { cs: 'zahlcuje váš tým.', en: 'overwhelms your team.' },
    body: {
      cs: 'Fragmentované toky, přerušené procesy, nesetříděné vstupy. Každý den stejná rutina bez výsledku.',
      en: 'Fragmented flows, interrupted processes, unsorted inputs. The same routine every day without results.',
    },
  },
  {
    id: 'ai-routing',
    image: '/story/c/ai-routing.webp',
    eyebrow: { cs: '02 — Třídění', en: '02 — Routing' },
    headline: { cs: 'AI ví, co má', en: 'AI knows what' },
    headlineAlt: { cs: 'přijít dál.', en: 'should happen next.' },
    body: {
      cs: 'Každý vstup je okamžitě pochopen, klasifikován a nasměrován. Nic se neztratí ve frontě.',
      en: 'Every input is instantly understood, classified and routed. Nothing gets lost in the queue.',
    },
  },
  {
    id: 'automation-execution',
    image: '/story/c/automation-execution.webp',
    eyebrow: { cs: '03 — Spuštění', en: '03 — Execution' },
    headline: { cs: 'Úkoly procházejí', en: 'Tasks move through' },
    headlineAlt: { cs: 'automaticky workflow.', en: 'your workflow automatically.' },
    body: {
      cs: 'Jakmile je vstup nasměrován, procesy běží samy. Bez čekání, bez ručního přeposílání.',
      en: 'Once routed, processes run on their own. No waiting, no manual forwarding.',
    },
  },
  {
    id: 'systems-connected',
    image: '/story/c/systems-connected.webp',
    eyebrow: { cs: '04 — Propojení', en: '04 — Connected' },
    headline: { cs: 'Vaše nástroje', en: 'Your tools start' },
    headlineAlt: { cs: 'pracují jako jeden celek.', en: 'working as one system.' },
    body: {
      cs: 'CRM, e-mail, databáze, hlasová AI — propojené do jedné orchestrační vrstvy.',
      en: 'CRM, email, database, voice AI — joined into one orchestration layer.',
    },
  },
  {
    id: 'measurable-output',
    image: '/story/c/measurable-output.webp',
    eyebrow: { cs: '05 — Výstupy', en: '05 — Output' },
    headline: { cs: 'Rutina se mění', en: 'Routine turns into' },
    headlineAlt: { cs: 'v měřitelné výsledky.', en: 'measurable outcomes.' },
    body: {
      cs: 'Ušetřený čas, čistá čísla a přehled, který vidíte od prvního dne.',
      en: 'Saved time, clean numbers, and clarity you can see from day one.',
    },
    cta: {
      href: CALENDAR_URL,
      external: true,
      label: { cs: 'Rezervovat konzultaci', en: 'Book consultation' },
    },
  },
];
