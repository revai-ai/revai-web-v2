import { Phone, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CALENDAR_URL } from '../config/site';

// Voice assistants are offered as monthly-only packages.
// The former one-time implementation calculator was retired in favour of
// three clear tiers; the middle tier is highlighted as the balanced choice.
const PACKAGES = [
  {
    cs: {
      name: 'Basic',
      price: 'od 3 900 Kč',
      period: '/ měsíc',
      desc: 'Jednoduchý asistent pro FAQ a základní příjem hovorů.',
      features: [
        'Jednoduchý hlasový asistent',
        'Odpovědi ze znalostní databáze',
        'Jeden jazyk',
        'Vhodné pro FAQ a jednoduchý příjem hovorů',
        'Základní měsíční správa a podpora',
      ],
    },
    en: {
      name: 'Basic',
      price: 'from CZK 3,900',
      period: '/ month',
      desc: 'A simple assistant for FAQs and basic call intake.',
      features: [
        'Simple voice assistant',
        'Answers from a knowledge base',
        'One language',
        'Ideal for FAQs and simple intake',
        'Basic monthly management and support',
      ],
    },
  },
  {
    featured: true,
    cs: {
      name: 'Business',
      price: 'od 7 900 Kč',
      period: '/ měsíc',
      desc: 'Pokročilejší scénáře hovorů s napojením na vaše systémy.',
      features: [
        'Až 2 integrace (API, kalendář, rezervace, interní systém)',
        'Dva jazyky',
        'Pokročilejší scénáře hovorů',
        'Vyšší úroveň SLA podpory',
        'Měsíční správa a optimalizace',
      ],
    },
    en: {
      name: 'Business',
      price: 'from CZK 7,900',
      period: '/ month',
      desc: 'More advanced call flows connected to your systems.',
      features: [
        'Up to 2 integrations (API, calendar, booking, internal system)',
        'Two languages',
        'More advanced call flows',
        'Higher level of SLA support',
        'Monthly management and optimization',
      ],
    },
  },
  {
    cs: {
      name: 'Premium',
      price: 'od 15 900 Kč',
      period: '/ měsíc',
      desc: 'Pro vyšší objem hovorů a víceprocesní nasazení.',
      features: [
        'Až 4 integrace',
        'Napojení na CRM',
        'Až 5 jazyků',
        'Pokročilá workflow',
        'Prioritní SLA a podpora',
      ],
    },
    en: {
      name: 'Premium',
      price: 'from CZK 15,900',
      period: '/ month',
      desc: 'For higher call volume and multi-process deployment.',
      features: [
        'Up to 4 integrations',
        'CRM connection',
        'Up to 5 languages',
        'Advanced workflows',
        'Priority SLA and support',
      ],
    },
  },
];

export default function VoiceAgentCalculator() {
  const { t, language } = useLanguage();

  return (
    <section id="voice-agent-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-ifl-s1">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-ifl-s2 px-4 py-2 rounded-full mb-6">
            <Phone size={16} className="text-ifl-signal" />
            <span className="text-sm font-semibold text-ifl-signal">
              {t('HLASOVÝ ASISTENT', 'VOICE ASSISTANT')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-ifl-ink tracking-[-0.02em]">
            {t('Měsíční balíčky', 'Monthly packages')}
          </h2>
          <p className="text-lg text-ifl-ink-70 max-w-3xl mx-auto">
            {t(
              'Hlasové asistenty nabízíme jako měsíční balíčky. Ceny jsou orientační — finální cenu potvrdíme po úvodní konzultaci a upřesnění rozsahu.',
              'Voice assistants are offered as monthly packages. Prices are indicative — the final price is confirmed after an initial consultation and scope specification.'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const c = pkg[language];
            return (
              <div
                key={c.name}
                className={`flex flex-col rounded-2xl p-8 transition-all duration-200 ${
                  pkg.featured
                    ? 'bg-ifl-canvas border-2 border-ifl-signal shadow-2xl'
                    : 'bg-ifl-canvas border border-ifl-border shadow-lg hover:shadow-xl hover:border-ifl-signal/50'
                }`}
              >
                <div className="h-7 mb-4">
                  {pkg.featured && (
                    <span className="inline-block text-xs font-bold tracking-wide uppercase text-white bg-ifl-signal px-3 py-1 rounded-full">
                      {t('Doporučujeme', 'Recommended')}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-ifl-ink mb-2">{c.name}</h3>
                <p className="text-ifl-ink-70 leading-relaxed mb-6 min-h-[48px]">{c.desc}</p>

                <div className="mb-6 md:whitespace-nowrap">
                  <span className="text-2xl font-bold text-ifl-ink whitespace-nowrap">{c.price}</span>{' '}
                  <span className="text-ifl-ink-40 whitespace-nowrap">{c.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-ifl-ink-70">
                      <Check size={18} className="text-ifl-signal shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    pkg.featured
                      ? 'bg-ifl-signal text-white hover:bg-ifl-signal-dark active:scale-[0.97]'
                      : 'bg-ifl-canvas border border-ifl-border text-ifl-ink hover:border-ifl-signal hover:bg-ifl-s1'
                  }`}
                >
                  <span>{t('Nezávazná konzultace', 'Free consultation')}</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-10 max-w-3xl mx-auto rounded-2xl bg-ifl-s2 border border-ifl-border p-6">
          <p className="text-sm text-ifl-ink-70 leading-relaxed">
            {t(
              'Provozní náklady na samotné hovory nejsou součástí měsíčního balíčku. Cena za minutu provozu se obvykle pohybuje přibližně mezi 3–6 Kč/min v závislosti na využití, nastavení modelu a hlasu a nákladech poskytovatelů. Jde o orientační odhad, nikoliv garantovanou cenu.',
              'Operating usage costs for the calls themselves are not included in the monthly package. The per-minute operating cost usually ranges around CZK 3–6/min depending on usage, model and voice setup, and provider costs. This is an estimate, not a guaranteed price.'
            )}
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-ifl-ink-40 max-w-2xl mx-auto">
            {t(
              'Ceny jsou orientační a závisí na konkrétním řešení a rozsahu funkcí. Finální cenovou nabídku Vám připravíme po úvodní schůzce.',
              'Prices are indicative and depend on the specific solution and scope of features. We will prepare a final price quote after the initial meeting.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
