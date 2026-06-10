// Variant C service page — "AI hlasový asistent" / "AI Voice Assistant".
// Built in the Invisible Flow visual system (warm paper, graphite, olive signal).
// Light motion only (RevealC); preserves the Vapi try-the-assistant flow (#try-agent)
// and the shared consultation CTA (BookConsultationC, CALENDAR_URL config).
import '../../styles/tokens.css';
import { Link } from 'react-router-dom';
import {
  Phone,
  Bot,
  Plug,
  Headphones,
  Layers,
  FileText,
  Mic,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { RevealC } from '../../components/sections/Reveal';
import BookConsultationC from '../../components/sections/BookConsultation';
import VapiCallButton from '../../components/VapiCallButton';
import { CALENDAR_URL } from '../../config/site';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const WHAT_IT_HANDLES = [
  {
    icon: Bot,
    cs: { title: 'Přirozená konverzace', body: 'Pokročilé zpracování jazyka zajišťuje plynulou, lidsky znějící komunikaci — žádné robotické menu.' },
    en: { title: 'Natural conversation', body: 'Advanced language processing delivers smooth, human-sounding communication — no robotic phone menus.' },
  },
  {
    icon: Headphones,
    cs: { title: 'Zákaznická podpora', body: 'Odpoví na časté dotazy, vyřeší běžné požadavky a v případě potřeby plynule přepojí na živého operátora.' },
    en: { title: 'Customer support', body: 'Answers FAQs, resolves common requests and seamlessly transfers to a live operator when needed.' },
  },
  {
    icon: Layers,
    cs: { title: 'Více hovorů současně', body: 'Odbaví desítky hovorů najednou — bez čekání ve frontě a bez přetížení vašeho týmu.' },
    en: { title: 'Concurrent calls', body: 'Handles dozens of calls at once — no waiting queues and no overloading your team.' },
  },
  {
    icon: Plug,
    cs: { title: 'Integrace se systémy', body: 'Propojí se s nástroji, které už používáte — rezervační systémy, CRM nebo kalendář.' },
    en: { title: 'System integration', body: 'Connects to the tools you already use — booking systems, CRM or your calendar.' },
  },
  {
    icon: FileText,
    cs: { title: 'Přepis a sumarizace', body: 'Každý hovor je přepsán a shrnut — výstupy snadno dohledáte nebo použijete pro reporting.' },
    en: { title: 'Transcription & summary', body: 'Every call is transcribed and summarised — outputs are easy to find or use for reporting.' },
  },
  {
    icon: Mic,
    cs: { title: 'Personalizace hlasu', body: 'Vyberte mužský nebo ženský hlas a přizpůsobte tón komunikace značce vaší firmy.' },
    en: { title: 'Voice personalization', body: 'Choose a male or female voice and match the tone of communication to your brand.' },
  },
];

const WHY_IT_MATTERS = [
  {
    icon: Clock,
    cs: { title: 'Dostupnost 24/7', body: 'Vaši zákazníci se dovolají kdykoliv — i mimo pracovní dobu, o víkendech a svátcích.' },
    en: { title: '24/7 availability', body: 'Your customers can reach you anytime — outside business hours, on weekends and holidays.' },
  },
  {
    icon: DollarSign,
    cs: { title: 'Nižší náklady', body: 'Nevytváříme jen systém — vytváříme vašeho nového AI zaměstnance. Méně rutiny, výrazná úspora času.' },
    en: { title: 'Lower costs', body: "We don't just build a system — we build your new AI employee. Less routine, significant time savings." },
  },
  {
    icon: TrendingUp,
    cs: { title: 'Vývoj a inovace', body: 'Sledujeme trendy, ladíme modely a dodáváme funkce, které vám drží konkurenční náskok.' },
    en: { title: 'Development & innovation', body: 'We track trends, fine-tune models and ship features that keep you ahead of the competition.' },
  },
];

const STATS = [
  { value: '24/7', cs: 'Zákazníci se dovolají kdykoliv', en: 'Customers reach you anytime' },
  { value: '60 %', cs: 'Úspora nákladů — méně rutiny', en: 'Cost savings — less routine' },
  { value: '10+', cs: 'Hovorů současně', en: 'Concurrent calls' },
];

const PROCESS = [
  {
    cs: { title: 'Konzultace', body: 'Probereme vaše potřeby, styl agenta a funkce — definujeme přesný use-case.' },
    en: { title: 'Consultation', body: 'We discuss your needs, agent style and features — we define the exact use case.' },
  },
  {
    cs: { title: 'Vývoj', body: 'Dle vašeho zadání vytvoříme hlasového asistenta a doladíme detaily.' },
    en: { title: 'Development', body: 'We build the voice assistant to your specification and fine-tune the details.' },
  },
  {
    cs: { title: 'Testování', body: 'Společně otestujeme agenta tak, abyste byli s výslednou podobou maximálně spokojeni.' },
    en: { title: 'Testing', body: 'We test the agent together so you are fully satisfied with the final result.' },
  },
  {
    cs: { title: 'Ostré spuštění', body: 'Nasadíme agenta, optimalizujeme, dodáváme pravidelné reporty a rozšiřujeme funkce.' },
    en: { title: 'Live launch', body: 'We deploy the agent, optimise, deliver regular reports and expand features.' },
  },
];

const USE_CASES = [
  { cs: { title: 'Restaurace', body: 'Příjem objednávek po telefonu, kontrola dostupnosti a potvrzení doručení — zvládne i špičky.' }, en: { title: 'Restaurants', body: 'Phone orders, availability checks and delivery confirmation — handles peak times with ease.' } },
  { cs: { title: 'Ordinace a kliniky', body: 'Plánování návštěv, potvrzování termínů a odpovědi na časté dotazy pacientů, 24/7.' }, en: { title: 'Medical offices & clinics', body: 'Appointment scheduling, confirmations and answers to common patient questions, 24/7.' } },
  { cs: { title: 'E-commerce a podpora', body: 'Sledování zásilek, reklamace a dotazy o produktech — rychlé odpovědi zvyšují konverze.' }, en: { title: 'E-commerce & support', body: 'Shipment tracking, complaints and product questions — fast answers lift conversion.' } },
  { cs: { title: 'Reality', body: 'Kvalifikace poptávek, rezervace prohlídek a přepojení na makléře — rychlejší reakce na leady.' }, en: { title: 'Real estate', body: 'Lead qualification, viewing bookings and transfer to an agent — faster response to leads.' } },
  { cs: { title: 'Fitness a wellness', body: 'Rezervace lekcí, správa členství a dotazy o dostupnosti — volající nikdy nečeká.' }, en: { title: 'Fitness & wellness', body: 'Class booking, membership management and availability questions — callers never wait.' } },
  { cs: { title: 'Hotely a ubytování', body: 'Rezervace pokojů, potvrzení pobytu a změny termínů — napojení na rezervační systém či CRM.' }, en: { title: 'Hotels & accommodation', body: 'Room bookings, stay confirmations and date changes — integrated with your booking system or CRM.' } },
];

export default function VoiceAgents() {
  const { t, language } = useLanguage();
  useDocumentMeta({
    title: t('Hlasoví AI asistenti pro firmy | AMAI', 'AI Voice Assistants for Business | AMAI'),
    description: t(
      'AI hlasoví asistenti od AMAI automatizují příchozí hovory, objednávky a zákaznický servis 24/7. Integrace s CRM a interními systémy.',
      'AI voice assistants from AMAI automate incoming calls, bookings and customer service 24/7. Integration with CRM and internal systems.'
    ),
    canonical: '/sluzby/hlasovi-agenti',
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
              <Phone size={14} />
              {t('AI hlasový asistent', 'AI voice assistant')}
            </p>
            <h1 className="text-[clamp(2.6rem,6vw,4.75rem)] font-bold text-ifl-ink leading-[0.95] tracking-[-0.02em] mb-8 max-w-3xl">
              {t('Hlasový asistent, který', 'A voice assistant that')}
              <br />
              <span className="text-ifl-signal">{t('zvládne každý hovor.', 'handles every call.')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-ifl-ink-70 leading-relaxed max-w-xl mb-12 tracking-[0.01em]">
              {t(
                'Inteligentní hlasový asistent, který vede přirozenou konverzaci a zvládne stovky hovorů současně. Vyřizuje požadavky, propojuje systémy a šetří čas vašemu týmu i zákazníkům.',
                'An intelligent voice assistant that holds natural conversations and handles hundreds of calls at once. It processes requests, connects systems and saves time for your team and customers.',
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('try-agent')}
                className="inline-flex items-center justify-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
              >
                {t('Vyzkoušet asistenta', 'Try the assistant')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
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

      {/* What the assistant handles */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Co asistent zvládne', 'What the assistant handles')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Klíčové funkce hlasového asistenta', 'Key capabilities of the voice assistant')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_IT_HANDLES.map((item, i) => {
              const Icon = item.icon;
              const c = item[language];
              return (
                <RevealC key={c.title} delay={i * 0.06}>
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
              {t('Dostupnost, úspora a náskok v jednom', 'Availability, savings and an edge in one')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <RevealC key={stat.value} delay={i * 0.08}>
                <div className="h-full border border-ifl-border bg-ifl-s1 rounded-2xl p-8 text-center">
                  <div className="text-4xl font-bold text-ifl-ink mb-2 tracking-[-0.02em]">{stat.value}</div>
                  <p className="text-ifl-ink-70 text-sm">{t(stat.cs, stat.en)}</p>
                </div>
              </RevealC>
            ))}
          </div>
        </div>
      </section>

      {/* How implementation works */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Jak to probíhá', 'The process')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em]">
              {t('Od konzultace ke spuštění', 'From consultation to launch')}
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

      {/* Try the assistant — preserves the Vapi call flow */}
      <section id="try-agent" className="bg-ifl-canvas py-24 lg:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealC>
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Vyzkoušejte naživo', 'Try it live')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] mb-5">
              {t('Promluvte si s naším asistentem', 'Talk to our assistant')}
            </h2>
            <p className="text-lg text-ifl-ink-70 leading-relaxed max-w-xl mx-auto mb-12">
              {t(
                'Zavolejte si s naším AI hlasovým asistentem — stačí stisknout tlačítko níže.',
                'Have a call with our AI voice assistant — just press the button below.',
              )}
            </p>
          </RevealC>
          <RevealC delay={0.1}>
            <div className="border border-ifl-border bg-ifl-s1 rounded-3xl p-10 sm:p-12 flex flex-col items-center">
              <VapiCallButton />
              <p className="text-sm text-ifl-ink-40 mt-8 max-w-md">
                {t(
                  'Tip: Hovory probíhají přes webový prohlížeč. Ujistěte se, že máte povolený přístup k mikrofonu.',
                  'Tip: Calls run through your web browser. Make sure microphone access is enabled.',
                )}
              </p>
            </div>
          </RevealC>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Případy využití', 'Use cases')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Přizpůsobí se jakémukoliv oboru', 'Adapts to any type of business')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USE_CASES.map((item, i) => {
              const c = item[language];
              return (
                <RevealC key={c.title} delay={i * 0.06}>
                  <div className="h-full border border-ifl-border bg-ifl-canvas rounded-2xl p-8">
                    <CheckCircle size={22} className="text-ifl-signal mb-5" />
                    <h3 className="text-lg font-bold text-ifl-ink mb-3 leading-snug tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-ifl-ink-70 leading-relaxed text-sm">{c.body}</p>
                  </div>
                </RevealC>
              );
            })}
          </div>
          <RevealC className="mt-12">
            <div className="border border-ifl-border bg-ifl-canvas rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-ifl-ink mb-2 tracking-[-0.01em]">
                  {t('Nenašli jste svůj obor?', "Didn't find your industry?")}
                </h3>
                <p className="text-ifl-ink-70 leading-relaxed max-w-xl">
                  {t(
                    'Naši AI hlasoví asistenti se přizpůsobí jakémukoliv typu podnikání — probereme to na konzultaci.',
                    'Our AI voice assistants adapt to any type of business — let’s discuss it in a consultation.',
                  )}
                </p>
              </div>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-ifl-signal text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
              >
                {t('Spojit se s námi', 'Get in touch')}
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
