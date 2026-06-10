import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CALENDAR_URL } from '../../config/site';
import { EASE } from '../../config/motion';
import { RevealC } from './Reveal';

// Abstract flow illustration — organic curved paths converging left to right.
// Reflects the "invisible flow" concept: separate streams become one output.
const FLOW_PATHS = [
  'M 30,32 C 80,32 110,80 160,80',
  'M 30,58 C 80,58 110,80 160,80',
  'M 30,84 C 80,84 110,80 160,80',
  'M 30,110 C 80,110 110,80 160,80',
];
const TRUNK_PATH = 'M 160,80 Q 220,80 280,80';

function FlowIllustration() {
  const reduced = useReducedMotion();

  return (
    <svg viewBox="0 0 300 160" fill="none" className="w-full max-w-xs opacity-55" aria-hidden="true">
      {/* Static rails */}
      {FLOW_PATHS.map((d, i) => (
        <path key={`rail-${i}`} d={d} stroke="#D6D1C8" strokeWidth="1" />
      ))}
      <path d={TRUNK_PATH} stroke="#D6D1C8" strokeWidth="2" />

      {/* Animated beams */}
      {FLOW_PATHS.map((d, i) =>
        reduced ? (
          <path key={`beam-${i}`} d={d} stroke="#4F6F4A" strokeWidth="1.5" strokeOpacity="0.5" />
        ) : (
          <motion.path
            key={`beam-${i}`}
            d={d}
            stroke="#4F6F4A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.65 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
          />
        )
      )}

      {reduced ? (
        <path d={TRUNK_PATH} stroke="#4F6F4A" strokeWidth="2.5" strokeOpacity="0.7" />
      ) : (
        <motion.path
          d={TRUNK_PATH}
          stroke="#4F6F4A"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.75 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        />
      )}

      {/* Output node */}
      <circle cx="284" cy="80" r="10" fill="#F6F4EF" stroke="#4F6F4A" strokeWidth="1.5" />
      <text x="284" y="84" textAnchor="middle" fill="#4F6F4A" fontSize="7" fontFamily="ui-monospace,monospace" fontWeight="bold">
        OUT
      </text>

      {/* Stream labels */}
      {['Voice', 'Email', 'Process', 'Docs'].map((label, i) => (
        <text
          key={label}
          x="0"
          y={i * 26 + 36}
          fill="#9A958D"
          fontSize="8"
          fontFamily="ui-monospace,monospace"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function BookConsultationC() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  return (
    <section
      id="book-consultation"
      className="variant-c relative bg-ifl-s2 border-t border-ifl-border py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <RevealC>
              <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-8">
                {t('Konzultace zdarma', 'Free consultation')}
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ifl-ink leading-[0.93] tracking-[-0.02em] mb-8">
                {t('Rezervujte si', 'Book your')}
                <br />
                <span className="text-ifl-signal">{t('konzultaci dnes.', 'consultation today.')}</span>
              </h2>
              <p className="text-xl text-ifl-ink-70 leading-relaxed mb-10 max-w-md tracking-[0.01em]">
                {t(
                  'Vyberte si vhodný termín přímo v našem kalendáři. Konzultace je bezplatná a nezávazná.',
                  'Choose a suitable time directly in our calendar. The consultation is free and non-binding.'
                )}
              </p>

              {reduced ? (
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
                >
                  {t('Rezervovat termín', 'Book appointment')}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              ) : (
                <motion.a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.03, 1] }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
                >
                  {t('Rezervovat termín', 'Book appointment')}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </motion.a>
              )}
            </RevealC>
          </div>

          <div className="flex flex-col gap-10">
            <RevealC delay={0.1}>
              <FlowIllustration />
              <p className="mt-3 text-[10px] font-mono text-ifl-ink-40 tracking-widest uppercase">
                {t('Všechny vstupy → jeden výstup', 'All inputs → one output')}
              </p>
            </RevealC>

            <RevealC delay={0.15}>
              <ul className="space-y-0">
                {[
                  { cs: 'Bez závazku', en: 'No commitment' },
                  { cs: 'Konzultace trvá 30 minut', en: '30-minute consultation' },
                  { cs: 'Konkrétní doporučení pro váš byznys', en: 'Specific recommendations for your business' },
                  { cs: 'Rychlá implementace — výsledky do týdnů', en: 'Fast implementation — results in weeks' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 py-5 border-b border-ifl-border">
                    <span className="w-2 h-2 rounded-full bg-ifl-signal shrink-0" aria-hidden="true" />
                    <span className="text-ifl-ink text-lg">{t(item.cs, item.en)}</span>
                  </li>
                ))}
              </ul>
            </RevealC>
          </div>
        </div>
      </div>
    </section>
  );
}
