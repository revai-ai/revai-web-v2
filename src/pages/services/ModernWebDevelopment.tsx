// Variant C service page — "Tvorba moderních webů" / "Modern Website Development".
// Built in the Invisible Flow visual system (warm paper, graphite, olive signal).
// Light motion only (RevealC); CTA reuses BookConsultationC (shared CALENDAR_URL config).
import '../../styles/tokens.css';
import { Link } from 'react-router-dom';
import {
  Globe,
  LayoutTemplate,
  Sparkles,
  Gauge,
  MousePointerClick,
  Wrench,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { RevealC } from '../../components/sections/Reveal';
import BookConsultationC from '../../components/sections/BookConsultation';
import { CALENDAR_URL } from '../../config/site';

const WHAT_WE_BUILD = [
  {
    icon: MousePointerClick,
    cs: { title: 'Konverzní landing pages', body: 'Stránky postavené kolem jediného cíle — kampaně, produkty a registrace s jasnou strukturou, která vede k akci.' },
    en: { title: 'Conversion landing pages', body: 'Pages built around a single goal — campaigns, products and sign-ups with a clear structure that drives action.' },
  },
  {
    icon: Globe,
    cs: { title: 'Firemní weby a prezentace', body: 'Reprezentativní weby, které budují důvěru — prémiový vzhled, čitelná architektura informací a vícejazyčnost.' },
    en: { title: 'Business websites & presentations', body: 'Representative sites that build trust — premium look, readable information architecture and multilingual support.' },
  },
  {
    icon: Sparkles,
    cs: { title: 'Image-led scrollytelling', body: 'Příběh značky vyprávěný obrazem a pohybem — stejná kvalita animací jako na tomto webu.' },
    en: { title: 'Image-led scrollytelling', body: 'A brand story told through imagery and motion — the same animation quality you see on this site.' },
  },
];

const WHY_IT_MATTERS = [
  {
    icon: LayoutTemplate,
    cs: { title: 'Prémiový UI/UX design', body: 'Každý detail je navržený — typografie, rytmus, kontrast i mikrointerakce. Web, který působí draze.' },
    en: { title: 'Premium UI/UX design', body: 'Every detail is designed — typography, rhythm, contrast and micro-interactions. A site that feels premium.' },
  },
  {
    icon: Gauge,
    cs: { title: 'Výkon a udržitelnost', body: 'Rychlé načítání, čistý kód a struktura, kterou lze snadno rozšiřovat a spravovat i po předání.' },
    en: { title: 'Performance & maintainability', body: 'Fast loading, clean code and a structure that is easy to extend and maintain long after handover.' },
  },
  {
    icon: MousePointerClick,
    cs: { title: 'Konverzní struktura', body: 'Obsah a CTA poskládané tak, aby návštěvníka přirozeně vedly k poptávce nebo rezervaci.' },
    en: { title: 'Conversion-focused structure', body: 'Content and CTAs arranged to naturally guide visitors toward an enquiry or a booking.' },
  },
];

const PROCESS = [
  {
    cs: { title: 'Strategie a obsah', body: 'Vyjasníme cíl webu, cílovou skupinu a strukturu obsahu.' },
    en: { title: 'Strategy & content', body: 'We clarify the goal of the site, the audience and the content structure.' },
  },
  {
    cs: { title: 'Design UI/UX', body: 'Navrhneme vizuál, typografii a pohyb v duchu vaší značky.' },
    en: { title: 'UI/UX design', body: 'We design the visuals, typography and motion in the spirit of your brand.' },
  },
  {
    cs: { title: 'Implementace', body: 'Web postavíme čistě, responzivně a s ohledem na výkon.' },
    en: { title: 'Implementation', body: 'We build the site cleanly, responsively and with performance in mind.' },
  },
  {
    cs: { title: 'Spuštění a péče', body: 'Nasadíme, otestujeme a předáme web připravený růst.' },
    en: { title: 'Launch & care', body: 'We deploy, test and hand over a site that is ready to grow.' },
  },
];

const TIERS = [
  {
    cs: { name: 'Landing / prezentační web', scope: 'Jednostránkový web nebo malá prezentace — ideální pro kampaně, produkty a ověření nápadu.' },
    en: { name: 'Landing / presentation website', scope: 'Single-page site or small presentation — ideal for campaigns, products and validating an idea.' },
    features: {
      cs: ['1–3 sekce / stránky', 'Responzivní design', 'Základní animace', 'Kontaktní formulář'],
      en: ['1–3 sections / pages', 'Responsive design', 'Essential animations', 'Contact form'],
    },
  },
  {
    cs: { name: 'Business web', scope: 'Vícestránkový firemní web s blogem, službami a vícejazyčností — kompletní online prezentace.' },
    en: { name: 'Business website', scope: 'Multi-page company site with blog, services and multilingual support — a complete online presence.' },
    features: {
      cs: ['Vícestránková struktura', 'CMS / správa obsahu', 'Vícejazyčnost (CZ/EN)', 'SEO základ a analytika'],
      en: ['Multi-page structure', 'CMS / content management', 'Multilingual (CZ/EN)', 'SEO basics & analytics'],
    },
    featured: true,
  },
  {
    cs: { name: 'Premium motion web', scope: 'Web s image-led scrollytellingem a propracovanými animacemi — maximální vizuální dojem.' },
    en: { name: 'Premium motion website', scope: 'Site with image-led scrollytelling and refined animations — maximum visual impact.' },
    features: {
      cs: ['Scroll-driven scény', 'Animace na míru', 'Prémiový UI/UX', 'Optimalizace výkonu'],
      en: ['Scroll-driven scenes', 'Custom animations', 'Premium UI/UX', 'Performance optimization'],
    },
  },
];

export default function ModernWebDevelopment() {
  const { t, language } = useLanguage();
  useDocumentMeta({
    title: t('Tvorba moderních webů s AI | AMAI', 'Modern Website Development with AI | AMAI'),
    description: t(
      'Navrhujeme a vyvíjíme moderní weby s integrací AI. React, Vite, Tailwind — rychlé, přístupné a SEO-optimalizované weby na míru.',
      'We design and develop modern websites with AI integration. React, Vite, Tailwind — fast, accessible and SEO-optimized custom websites.'
    ),
    canonical: '/sluzby/tvorba-modernich-webu',
  });

  return (
    <div className="variant-c relative bg-ifl-canvas">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute right-0 top-0 h-full w-[70%]"
            style={{
              background:
                'radial-gradient(ellipse 60% 55% at 78% 38%, rgba(79,111,74,0.05) 0%, rgba(112,145,92,0.025) 50%, transparent 72%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-[1]">
          <RevealC>
            <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-8">
              <Globe size={14} />
              {t('Tvorba moderních webů', 'Modern Website Development')}
            </p>
            <h1 className="text-[clamp(2.6rem,6vw,4.75rem)] font-bold text-ifl-ink leading-[0.95] tracking-[-0.02em] mb-8 max-w-3xl">
              {t('Weby, která mají', 'Websites that create')}
              <br />
              <span className="text-ifl-signal">{t('hodnotu.', 'real value.')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-ifl-ink-70 leading-relaxed max-w-xl mb-12 tracking-[0.01em]">
              {t(
                'Moderní weby, landing pages a webové prezentace s prémiovým UI/UX, animacemi, přechody a konverzní strukturou.',
                'Modern websites, landing pages and web presentations with premium UI/UX, motion, transitions and conversion-focused structure.',
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
              >
                {t('Nezávazná konzultace', 'Free consultation')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <Link
                to="/cenik"
                className="inline-flex items-center justify-center gap-2 border border-ifl-border text-ifl-ink px-8 py-4 rounded-full font-semibold text-base hover:border-ifl-ink-70 hover:bg-ifl-s1 transition-all duration-300 ease-out"
              >
                {t('Prohlédnout ceník', 'View pricing')}
              </Link>
            </div>
          </RevealC>
        </div>
      </section>

      {/* What we build */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Co stavíme', 'What we build')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Od landing page po prémiový motion web', 'From landing pages to premium motion sites')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHAT_WE_BUILD.map((item, i) => {
              const Icon = item.icon;
              const c = item[language];
              return (
                <RevealC key={c.title} delay={i * 0.08}>
                  <div className="h-full border border-ifl-border bg-ifl-canvas rounded-xl p-8">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-ifl-border bg-ifl-s1 mb-6">
                      <Icon size={20} className="text-ifl-signal" />
                    </div>
                    <h3 className="text-xl font-bold text-ifl-ink mb-3 leading-snug tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-ifl-ink-70 leading-relaxed text-sm md:text-base">{c.body}</p>
                  </div>
                </RevealC>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-ifl-canvas py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Proč na tom záleží', 'Why it matters')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Design, výkon a konverze v jednom', 'Design, performance and conversion in one')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {WHY_IT_MATTERS.map((item, i) => {
              const Icon = item.icon;
              const c = item[language];
              return (
                <RevealC key={c.title} delay={i * 0.08}>
                  <Icon size={24} className="text-ifl-signal mb-5" />
                  <h3 className="text-xl font-bold text-ifl-ink mb-3 leading-snug tracking-[-0.01em]">{c.title}</h3>
                  <p className="text-ifl-ink-70 leading-relaxed">{c.body}</p>
                </RevealC>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Jak to probíhá', 'The process')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em]">
              {t('Od nápadu ke spuštění', 'From idea to launch')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {PROCESS.map((step, i) => {
              const c = step[language];
              return (
                <RevealC key={c.title} delay={i * 0.07}>
                  <div className="border-t border-ifl-border pt-6">
                    <span className="font-mono text-sm text-ifl-ink-40">0{i + 1}</span>
                    <h3 className="text-lg font-bold text-ifl-ink mt-3 mb-2 leading-snug">{c.title}</h3>
                    <p className="text-ifl-ink-70 leading-relaxed text-sm">{c.body}</p>
                  </div>
                </RevealC>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project tiers */}
      <section className="bg-ifl-canvas py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Typické projekty', 'Typical projects')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em]">
              {t('Vyberte úroveň podle cíle', 'Pick a tier for your goal')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {TIERS.map((tier, i) => {
              const c = tier[language];
              const feats = tier.features[language];
              return (
                <RevealC key={c.name} delay={i * 0.08} className="h-full">
                  <div
                    className={`h-full flex flex-col rounded-2xl p-8 border ${
                      tier.featured
                        ? 'border-ifl-signal bg-ifl-s1 shadow-sm'
                        : 'border-ifl-border bg-ifl-canvas'
                    }`}
                  >
                    {tier.featured && (
                      <span className="self-start mb-4 inline-flex items-center text-[10px] tracking-[0.2em] uppercase font-mono font-medium text-white bg-ifl-signal px-3 py-1 rounded-full">
                        {t('Nejoblíbenější', 'Most popular')}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-ifl-ink mb-3 leading-snug tracking-[-0.01em]">{c.name}</h3>
                    <p className="text-ifl-ink-70 leading-relaxed text-sm mb-6">{c.scope}</p>
                    <ul className="space-y-3 mb-8">
                      {feats.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-ifl-ink">
                          <Check size={16} className="text-ifl-signal shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ease-out active:scale-[0.97] ${
                        tier.featured
                          ? 'bg-ifl-signal text-white hover:bg-ifl-signal-dark group'
                          : 'border border-ifl-border text-ifl-ink hover:border-ifl-ink-70 hover:bg-ifl-s1'
                      }`}
                    >
                      {t('Nezávazná konzultace', 'Free consultation')}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </RevealC>
              );
            })}
          </div>
          <RevealC className="mt-10">
            <p className="flex items-center gap-2 text-sm text-ifl-ink-40">
              <Wrench size={14} />
              {t(
                'Konečná cena vždy vychází z rozsahu a cílů projektu — probereme je na konzultaci.',
                'The final price always depends on the scope and goals of the project — we discuss them in a consultation.',
              )}
            </p>
          </RevealC>
        </div>
      </section>

      {/* CTA — reuses the shared consultation block (CALENDAR_URL config) */}
      <BookConsultationC />
    </div>
  );
}
