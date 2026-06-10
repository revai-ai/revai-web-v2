import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CALENDAR_URL } from '../../config/site';
import { RevealC } from '../sections/Reveal';

const steps = {
  cs: [
    {
      number: '01',
      title: 'Analýza & konzultace',
      description:
        'Probereme vaše potřeby a zjistíme, kde má automatizace největší přínos. Na základě zjištění připravíme návrh řešení i cenovou kalkulaci.',
      duration: '1–2 dny',
      deliverables: ['Analýza procesů', 'Návrh řešení', 'Cenová nabídka'],
    },
    {
      number: '02',
      title: 'Implementace řešení',
      description:
        'Na základě schváleného návrhu nastavíme řešení podle vašich potřeb. Propojíme je s vašimi systémy a zajistíme, aby vše fungovalo.',
      duration: '2–4 týdny',
      deliverables: ['Vývoj', 'Integrace systémů', 'Plně funkční AI systém'],
    },
    {
      number: '03',
      title: 'Optimalizace & růst',
      description:
        'Po nasazení sledujeme výkon a ladíme procesy. Pomáháme vám automatizaci dále rozšiřovat a zefektivňovat.',
      duration: 'Průběžně',
      deliverables: ['Měsíční reporty', 'Technická podpora', 'Rozšíření funkcí'],
    },
  ],
  en: [
    {
      number: '01',
      title: 'Analysis & consultation',
      description:
        'We discuss your needs and identify where automation brings the greatest benefit. Based on findings, we prepare a solution proposal and price calculation.',
      duration: '1–2 days',
      deliverables: ['Process analysis', 'Solution proposal', 'Price quote'],
    },
    {
      number: '02',
      title: 'Solution implementation',
      description:
        'Based on the approved proposal, we set up the solution according to your needs. We connect it with your systems and ensure everything works.',
      duration: '2–4 weeks',
      deliverables: ['Development', 'System integration', 'Fully functional AI system'],
    },
    {
      number: '03',
      title: 'Optimization & growth',
      description:
        'After deployment, we monitor performance and fine-tune processes. We help you further expand and streamline automation.',
      duration: 'Ongoing',
      deliverables: ['Monthly reports', 'Technical support', 'Feature expansion'],
    },
  ],
};

const STEP_RANGES: [number, number][] = [
  [0.0, 0.35],
  [0.30, 0.65],
  [0.60, 0.95],
];

function ProcessStep({
  step,
  index,
  scrollProgress,
}: {
  step: (typeof steps.cs)[number];
  index: number;
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const [s0, s1] = STEP_RANGES[index];

  const nodeOpacityMv = useTransform(scrollProgress, [s0, s1], [0.25, 1]);
  const nodeFillMv = useTransform(scrollProgress, [s0, s1], ['#D6D1C8', '#4F6F4A']);
  const connectorDashMv = useTransform(scrollProgress, [s0, Math.min(s1, 0.95)], [32, 0]);

  const nodeOpacity = reduced ? 1 : nodeOpacityMv;
  const nodeFill = reduced ? '#4F6F4A' : nodeFillMv;
  const connectorDash = reduced ? 0 : connectorDashMv;
  const isLast = index === 2;

  return (
    <div className="relative">
      {/* Vertical connector to next step */}
      {!isLast && (
        <div className="hidden md:block absolute left-[calc(2.5rem-1px)] top-full z-10" aria-hidden="true">
          <svg width="2" height="48" viewBox="0 0 2 48" fill="none">
            <line x1="1" y1="0" x2="1" y2="48" stroke="#D6D1C8" strokeWidth="1" />
            {!reduced && (
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="48"
                stroke="#4F6F4A"
                strokeWidth="1.5"
                strokeDasharray="48"
                style={{ strokeDashoffset: connectorDash }}
              />
            )}
          </svg>
        </div>
      )}

      <div className="border-t border-ifl-border py-10 grid grid-cols-1 md:grid-cols-[5rem_2fr_1fr_1fr] gap-6 md:gap-10 items-start">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0 mt-1">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <motion.circle
                cx="10"
                cy="10"
                r="8"
                stroke="#4F6F4A"
                strokeWidth="1.5"
                style={{ fill: nodeFill, opacity: nodeOpacity }}
              />
            </svg>
          </div>
          <span className="font-mono text-sm text-ifl-ink-40 pt-0.5">{step.number}</span>
        </div>

        <div>
          <motion.h3
            className="text-2xl font-bold text-ifl-ink mb-3 leading-snug tracking-[-0.01em]"
            style={reduced ? {} : { opacity: nodeOpacity }}
          >
            {step.title}
          </motion.h3>
          <p className="text-ifl-ink-70 leading-relaxed">{step.description}</p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-ifl-signal font-mono font-medium mb-2">
            {t('Délka', 'Duration')}
          </p>
          <p className="font-semibold text-ifl-ink">{step.duration}</p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-ifl-signal font-mono font-medium mb-2">
            {t('Výstupy', 'Deliverables')}
          </p>
          <ul className="space-y-1.5">
            {step.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-ifl-ink-70">
                <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-ifl-signal shrink-0" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ProcessC() {
  const { t, language } = useLanguage();
  const items = steps[language];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 55%'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      className="variant-c relative bg-ifl-canvas border-t border-ifl-border py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <RevealC className="mb-16">
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
            {t('Jak to probíhá', 'How it works')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
            {t(
              'Od prvního kontaktu po plně funkční automatizaci',
              'From first contact to fully functional automation'
            )}
          </h2>
        </RevealC>

        <div>
          {items.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={i}
              scrollProgress={smoothProgress}
            />
          ))}
          <div className="border-t border-ifl-border" aria-hidden="true" />
        </div>

        <RevealC className="mt-14 text-center" delay={0.1}>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 ease-out active:scale-[0.97]"
          >
            {t('Rezervovat konzultaci', 'Book consultation')}
          </a>
        </RevealC>
      </div>
    </section>
  );
}
