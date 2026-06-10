// Variant C service page — "Vývoj AI aplikací" / "AI App Development".
// Built in the Invisible Flow visual system (warm paper, graphite, olive signal).
// Light motion only (RevealC); shared consultation CTA (BookConsultationC, CALENDAR_URL).
import '../../styles/tokens.css';
import { Link } from 'react-router-dom';
import {
  Code2,
  Layers,
  Brain,
  Workflow,
  LayoutDashboard,
  Plug,
  ShieldCheck,
  Database,
  Rocket,
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
    icon: Brain,
    cs: { title: 'Inteligentní nástroje', body: 'AI aplikace, které myslí spolu s vámi — od zpracování dat po rozhodovací logiku v rutinních krocích.' },
    en: { title: 'Intelligent tools', body: 'AI applications that think with you — from data processing to decision logic in routine steps.' },
  },
  {
    icon: Workflow,
    cs: { title: 'Propojení systémů', body: 'AI rozhoduje, co se má stát dál — schválí požadavek, vyhodnotí obsah nebo předá data dalšímu systému.' },
    en: { title: 'Connected systems', body: 'AI decides what happens next — approves a request, evaluates content or passes data onward.' },
  },
  {
    icon: LayoutDashboard,
    cs: { title: 'Aplikace nad daty', body: 'Různé zdroje, API a firemní nástroje sjednotíme do jednoho prostředí, které data propojí a zobrazí.' },
    en: { title: 'Apps on top of data', body: 'We unify sources, APIs and company tools into one environment that connects and surfaces your data.' },
  },
  {
    icon: Layers,
    cs: { title: 'Zjednodušení práce', body: 'Od chytrých formulářů po asistenty, kteří pomáhají při rozhodování i každodenní komunikaci.' },
    en: { title: 'Simpler workflows', body: 'From smart forms to assistants that help with decisions and everyday communication.' },
  },
];

const USE_CASES = [
  { cs: { title: 'Interní AI nástroje', body: 'Aplikace na míru pro váš tým — zpracování dat, vyhledávání a rozhodovací podpora na jednom místě.' }, en: { title: 'Internal AI tools', body: 'Custom apps for your team — data processing, search and decision support in one place.' } },
  { cs: { title: 'AI asistenti a chatboti', body: 'Konverzační rozhraní nad vašimi daty a procesy, dostupné zákazníkům i zaměstnancům.' }, en: { title: 'AI assistants & chatbots', body: 'Conversational interfaces over your data and processes, available to customers and staff.' } },
  { cs: { title: 'Zpracování dokumentů', body: 'Vytěžování, klasifikace a sumarizace dokumentů s ověřeným výstupem do vašich systémů.' }, en: { title: 'Document processing', body: 'Extraction, classification and summarisation of documents with verified output into your systems.' } },
  { cs: { title: 'Datové aplikace a dashboardy', body: 'Přehledy a aplikace, které propojí roztříštěná data a převedou je do akčních rozhodnutí.' }, en: { title: 'Data apps & dashboards', body: 'Overviews and apps that connect fragmented data and turn it into actionable decisions.' } },
];

const INTEGRATIONS = [
  {
    icon: Plug,
    cs: { title: 'Integrace s vašimi systémy', body: 'Napojíme aplikaci na nástroje, které už používáte — přes API, webhooky a stávající úložiště.' },
    en: { title: 'Integration with your systems', body: 'We connect the app to the tools you already use — via APIs, webhooks and existing storage.' },
  },
  {
    icon: Database,
    cs: { title: 'Práce s vašimi daty', body: 'AI integruje různé zdroje informací do jednoho prostředí a pracuje s aktuálními daty.' },
    en: { title: 'Working with your data', body: 'AI integrates multiple information sources into one environment and works with current data.' },
  },
  {
    icon: ShieldCheck,
    cs: { title: 'Bezpečné zacházení s daty', body: 'Respektujeme oprávnění, soukromí a interní politiky — bezpečnost je součástí návrhu.' },
    en: { title: 'Safe data handling', body: 'We respect permissions, privacy and internal policies — security is part of the design.' },
  },
];

const PROCESS = [
  {
    cs: { title: 'Plánování', body: 'Definujeme cíl, uživatele a datové zdroje a vytvoříme první návrh funkcí a scénářů.' },
    en: { title: 'Planning', body: 'We define the goal, users and data sources and draft the first set of features and scenarios.' },
  },
  {
    cs: { title: 'Návrh a prototyp', body: 'Navrhneme UX/UI a uživatelský tok, postavíme prototyp a integrujeme AI modely.' },
    en: { title: 'Design & prototype', body: 'We design UX/UI and the user flow, build a prototype and integrate AI models.' },
  },
  {
    cs: { title: 'Vývoj a testování', body: 'Doladíme funkce s největší hodnotou a otestujeme přesnost modelu i reakce AI.' },
    en: { title: 'Build & testing', body: 'We refine the highest-value features and test model accuracy and AI responses.' },
  },
  {
    cs: { title: 'Nasazení a péče', body: 'Aplikaci nasadíme, sledujeme výkon a poskytujeme průběžnou podporu a optimalizaci.' },
    en: { title: 'Launch & care', body: 'We deploy the app, monitor performance and provide ongoing support and optimisation.' },
  },
];

const PROTOTYPE_TO_PRODUCTION = [
  { cs: 'Rychlý prototyp, který ověří hodnotu dřív, než investujete do plné verze.', en: 'A fast prototype that proves value before you invest in the full build.' },
  { cs: 'Postupné rozšiřování funkcí podle reálné zpětné vazby uživatelů.', en: 'Gradual feature expansion based on real user feedback.' },
  { cs: 'Čistý, udržovatelný kód a architektura připravená na růst.', en: 'Clean, maintainable code and an architecture ready to scale.' },
  { cs: 'Plynulý přechod z prototypu do produkčního provozu bez přepisování.', en: 'A smooth move from prototype to production without rewrites.' },
];

export default function AIAppDevelopment() {
  const { t, language } = useLanguage();
  useDocumentMeta({
    title: t('Vývoj AI aplikací na míru | AMAI', 'Custom AI App Development | AMAI'),
    description: t(
      'Vývoj vlastních AI aplikací, dashboardů a inteligentních systémů. Full-stack řešení s LLM, RAG a agentic workflow pro firmy.',
      'Development of custom AI applications, dashboards and intelligent systems. Full-stack solutions with LLM, RAG and agentic workflows for businesses.'
    ),
    canonical: '/sluzby/ai-app-development',
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
              <Code2 size={14} />
              {t('Vývoj AI aplikací', 'AI app development')}
            </p>
            <h1 className="text-[clamp(2.6rem,6vw,4.75rem)] font-bold text-ifl-ink leading-[0.95] tracking-[-0.02em] mb-8 max-w-3xl">
              {t('Custom AI aplikace', 'Custom AI applications')}
              <br />
              <span className="text-ifl-signal">{t('postavené na míru.', 'built around you.')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-ifl-ink-70 leading-relaxed max-w-xl mb-12 tracking-[0.01em]">
              {t(
                'Potřebujete unikátní AI aplikaci? Navrhneme a postavíme řešení na míru — od prototypu k produkci, propojené s vašimi systémy a daty.',
                'Need a unique AI application? We design and build a tailored solution — from prototype to production, connected to your systems and data.',
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
              >
                {t('Promluvme si o projektu', "Let's talk about your project")}
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
              {t('AI aplikace, které řeší skutečné problémy', 'AI applications that solve real problems')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHAT_WE_BUILD.map((item, i) => {
              const Icon = item.icon;
              const c = item[language];
              return (
                <RevealC key={c.title} delay={i * 0.06}>
                  <div className="h-full border border-ifl-border bg-ifl-canvas rounded-2xl p-8">
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

      {/* Use cases */}
      <section className="bg-ifl-canvas py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Případy využití', 'Use cases')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Kde dává custom AI smysl', 'Where custom AI makes sense')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((item, i) => {
              const c = item[language];
              return (
                <RevealC key={c.title} delay={i * 0.06}>
                  <div className="h-full border border-ifl-border bg-ifl-canvas rounded-2xl p-8">
                    <Check size={20} className="text-ifl-signal mb-5" />
                    <h3 className="text-lg font-bold text-ifl-ink mb-3 leading-snug tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-ifl-ink-70 leading-relaxed text-sm">{c.body}</p>
                  </div>
                </RevealC>
              );
            })}
          </div>
        </div>
      </section>

      {/* From prototype to production */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <RevealC>
              <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
                {t('Od prototypu k produkci', 'From prototype to production')}
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] mb-6">
                {t('Ověřte hodnotu dřív, než investujete', 'Prove the value before you invest')}
              </h2>
              <p className="text-lg text-ifl-ink-70 leading-relaxed max-w-xl">
                {t(
                  'Začínáme rychlým prototypem, který ukáže směr a hodnotu. Funkce rozšiřujeme postupně podle reálné zpětné vazby — bez přepisování a se škálovatelnou architekturou.',
                  'We start with a fast prototype that shows direction and value. Features grow gradually based on real feedback — no rewrites and a scalable architecture.',
                )}
              </p>
            </RevealC>
            <RevealC delay={0.1}>
              <ul className="space-y-0">
                {PROTOTYPE_TO_PRODUCTION.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 py-5 border-b border-ifl-border">
                    <Check size={18} className="text-ifl-signal shrink-0 mt-1" />
                    <span className="text-ifl-ink leading-relaxed">{t(item.cs, item.en)}</span>
                  </li>
                ))}
              </ul>
            </RevealC>
          </div>
        </div>
      </section>

      {/* Integrations and data */}
      <section className="bg-ifl-canvas py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Integrace a data', 'Integrations & data')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Propojené, aktuální a bezpečné', 'Connected, current and secure')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {INTEGRATIONS.map((item, i) => {
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

      {/* Delivery process */}
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
          <RevealC className="mt-12">
            <div className="border border-ifl-border bg-ifl-canvas rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg border border-ifl-border bg-ifl-s1">
                  <Rocket size={18} className="text-ifl-signal" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ifl-ink mb-2 tracking-[-0.01em]">
                    {t('Máte nápad na AI aplikaci?', 'Have an idea for an AI app?')}
                  </h3>
                  <p className="text-ifl-ink-70 leading-relaxed max-w-xl">
                    {t(
                      'Probereme cíl, data a první funkce na nezávazné konzultaci.',
                      'Let’s discuss the goal, the data and the first features in a free consultation.',
                    )}
                  </p>
                </div>
              </div>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-ifl-signal text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
              >
                {t('Promluvme si', "Let's talk")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </RevealC>
        </div>
      </section>

      {/* CTA — reuses the shared consultation block (CALENDAR_URL config) */}
      <BookConsultationC />
    </div>
  );
}
