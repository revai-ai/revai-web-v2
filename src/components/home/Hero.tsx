import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CALENDAR_URL } from '../../config/site';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const STATS = [
  { value: '30+', cs: 'Spokojených klientů', en: 'Satisfied clients' },
  { value: '4 000+', cs: 'Hodin ušetřeno měsíčně', en: 'Hours saved monthly' },
  { value: '98 %', cs: 'Míra spokojenosti', en: 'Satisfaction rate' },
  { value: '100 %', cs: 'Individuální přístup', en: 'Individual approach' },
];

export default function HeroC() {
  const { t } = useLanguage();

  return (
    <section className="variant-c relative z-[1] min-h-screen flex flex-col justify-center px-6 lg:px-8 bg-ifl-canvas overflow-hidden">
      {/* Ambient warm sage orb — very faint, right side */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute right-0 top-0 h-full w-[72%]"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 78% 40%, rgba(79,111,74,0.045) 0%, rgba(112,145,92,0.025) 50%, transparent 72%)',
          }}
        />
        <div
          className="absolute right-[10%] top-[15%] w-[26%] aspect-square rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(210,220,185,0.14) 0%, rgba(200,215,175,0.05) 55%, transparent 75%)',
            filter: 'blur(56px)',
          }}
        />
        {/* Warm fade leading into the story below */}
        <div
          className="absolute inset-x-0 bottom-0 h-44"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(237,235,229,0.6) 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full pt-28 pb-16 lg:pt-32 lg:pb-20 relative z-[1]">

        <p className="motion-safe:animate-ifl-fade-in text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-medium font-mono mb-10">
          {t('AI Automatizace · REVAI', 'AI Automation · REVAI')}
        </p>

        <h1 className="motion-safe:animate-ifl-fade-in-1 text-[clamp(2.8rem,6.5vw,5rem)] font-bold text-ifl-ink leading-[0.94] tracking-[-0.02em] mb-8 max-w-3xl">
          {t('Automatizujeme', 'We automate')}
          <br />
          {t('procesy', 'processes')}
          <br />
          <span className="text-ifl-signal">{t('pomocí AI.', 'with AI.')}</span>
        </h1>

        <p className="motion-safe:animate-ifl-fade-in-2 text-lg sm:text-xl text-ifl-ink-70 leading-relaxed max-w-xl mb-12 tracking-[0.01em]">
          {t(
            'Zbavte se rutiny, zrychlete zákaznickou podporu i administrativu a zaměřte se na růst svého byznysu.',
            'Get rid of routine tasks, speed up customer support and administration, and focus on growing your business.',
          )}
        </p>

        <div className="motion-safe:animate-ifl-fade-in-3 flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
          >
            {t('Rezervovat konzultaci', 'Book consultation')}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <button
            onClick={() => scrollTo('services')}
            className="inline-flex items-center justify-center gap-2 border border-ifl-border text-ifl-ink px-8 py-4 rounded-full font-semibold text-base hover:border-ifl-ink-70 hover:bg-ifl-s1 transition-all duration-300 ease-out"
          >
            {t('Naše AI řešení', 'Our AI solutions')}
          </button>
        </div>

        <div className="border-t border-ifl-border pt-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          {STATS.map((stat) => (
            <div key={stat.value}>
              <p className="text-3xl sm:text-4xl font-bold text-ifl-signal tabular-nums mb-1 leading-none font-mono">
                {stat.value}
              </p>
              <p className="text-sm text-ifl-ink-70 mt-1 tracking-[0.01em]">{t(stat.cs, stat.en)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
