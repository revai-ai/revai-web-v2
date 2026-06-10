import { Globe, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CALENDAR_URL } from '../config/site';

// Project-tier cards for the "Modern Website Development" service.
// Replaces the former email-volume calculator on the pricing page.
const TIERS = [
  {
    cs: {
      name: 'Landing / prezentační web',
      desc: 'Jednostránkový web nebo malá prezentace — ideální pro kampaně, produkty a ověření nápadu.',
      price: 'od 12 900 Kč',
      scope: ['1–3 sekce / stránky', 'Responzivní design', 'Základní animace', 'Kontaktní formulář'],
    },
    en: {
      name: 'Landing / presentation website',
      desc: 'Single-page site or small presentation — ideal for campaigns, products and validating an idea.',
      price: 'from CZK 12,900',
      scope: ['1–3 sections / pages', 'Responsive design', 'Essential animations', 'Contact form'],
    },
  },
  {
    featured: true,
    cs: {
      name: 'Business web',
      desc: 'Vícestránkový firemní web s blogem, službami a vícejazyčností — kompletní online prezentace.',
      price: 'od 27 900 Kč',
      scope: ['Vícestránková struktura', 'CMS / správa obsahu', 'Vícejazyčnost (CZ/EN)', 'SEO základ a analytika'],
    },
    en: {
      name: 'Business website',
      desc: 'Multi-page company site with blog, services and multilingual support — a complete online presence.',
      price: 'from CZK 27,900',
      scope: ['Multi-page structure', 'CMS / content management', 'Multilingual (CZ/EN)', 'SEO basics & analytics'],
    },
  },
  {
    cs: {
      name: 'Premium motion web',
      desc: 'Web s image-led scrollytellingem a propracovanými animacemi — maximální vizuální dojem.',
      price: 'od 44 900 Kč',
      scope: ['Scroll-driven scény', 'Animace na míru', 'Prémiový UI/UX', 'Optimalizace výkonu'],
    },
    en: {
      name: 'Premium motion website',
      desc: 'Site with image-led scrollytelling and refined animations — maximum visual impact.',
      price: 'from CZK 44,900',
      scope: ['Scroll-driven scenes', 'Custom animations', 'Premium UI/UX', 'Performance optimization'],
    },
  },
];

export default function WebDevelopmentPricing() {
  const { t, language } = useLanguage();

  return (
    <section id="web-development" className="py-20 px-4 sm:px-6 lg:px-8 bg-ifl-canvas">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-ifl-s2 px-4 py-2 rounded-full mb-6">
            <Globe size={16} className="text-ifl-signal" />
            <span className="text-sm font-semibold text-ifl-signal">
              {t('TVORBA MODERNÍCH WEBŮ', 'MODERN WEBSITE DEVELOPMENT')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-ifl-ink tracking-[-0.02em]">
            {t('Projektové balíčky', 'Project tiers')}
          </h2>
          <p className="text-xl text-ifl-ink-70 max-w-3xl mx-auto">
            {t(
              'Vyberte úroveň podle cíle webu. Konečná cena vždy vychází z rozsahu projektu.',
              'Pick a tier based on your goal. The final price always depends on the project scope.',
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const c = tier[language];
            return (
              <div
                key={c.name}
                className={`flex flex-col rounded-2xl p-8 transition-all duration-200 ${
                  tier.featured
                    ? 'bg-ifl-s1 border-2 border-ifl-signal shadow-2xl'
                    : 'bg-ifl-canvas border border-ifl-border shadow-lg hover:shadow-xl hover:border-ifl-signal/50'
                }`}
              >
                <div className="h-7 mb-4">
                  {tier.featured && (
                    <span className="inline-block text-xs font-bold tracking-wide uppercase text-white bg-ifl-signal px-3 py-1 rounded-full">
                      {t('Doporučujeme', 'Recommended')}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-ifl-ink mb-2">{c.name}</h3>
                <p className="text-ifl-ink-70 leading-relaxed mb-6 min-h-[72px]">{c.desc}</p>
                <div className="mb-6">
                  <span className="text-2xl font-bold text-ifl-ink whitespace-nowrap">{c.price}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {c.scope.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-ifl-ink-70">
                      <Check size={18} className="text-ifl-signal shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    tier.featured
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

        <div className="mt-10 text-center">
          <p className="text-sm text-ifl-ink-40 max-w-2xl mx-auto">
            {t(
              'Ceny jsou orientační. Měsíční údržbu lze zahrnout podle dohodnutého rozsahu. Finální cenu potvrdíme po konzultaci a upřesnění zadání.',
              'Prices are indicative. Monthly maintenance can be included depending on the agreed scope. The final price is confirmed after a consultation and specification of the brief.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
