// Variant C service page — "Automatizace procesů" / "Process Automation".
// Built in the Invisible Flow visual system (warm paper, graphite, olive signal).
// Light motion only (RevealC); shared consultation CTA (BookConsultationC, CALENDAR_URL).
import '../../styles/tokens.css';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  FileText,
  Mail,
  Database,
  ShieldCheck,
  BookOpen,
  BarChart3,
  Plug,
  Workflow,
  Clock,
  TrendingUp,
  Search,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { RevealC } from '../../components/sections/Reveal';
import BookConsultationC from '../../components/sections/BookConsultation';
import { CALENDAR_URL } from '../../config/site';

const WHAT_WE_AUTOMATE = [
  {
    icon: FileText,
    cs: { title: 'Zpracování dokumentace', body: 'Dokumenty jsou automaticky čteny, tříděny a připraveny k použití napříč systémy.' },
    en: { title: 'Document processing', body: 'Documents are automatically read, sorted and prepared for use across your systems.' },
  },
  {
    icon: Mail,
    cs: { title: 'E-mailová a interní komunikace', body: 'AI třídí zprávy podle priority, připravuje odpovědi a zakládá úkoly podle interních pravidel.' },
    en: { title: 'Email & internal communication', body: 'AI sorts messages by priority, drafts responses and creates tasks according to your internal rules.' },
  },
  {
    icon: Database,
    cs: { title: 'Onboarding a změnová agenda', body: 'Automatické předání informací, kontrola podkladů a spuštění navazujících workflow.' },
    en: { title: 'Onboarding & change agenda', body: 'Automatic handover of information, document checks and the launch of follow-up workflows.' },
  },
  {
    icon: ShieldCheck,
    cs: { title: 'Kontrola a compliance', body: 'Automatická validace dat a postupů podle nastavených pravidel a interních politik.' },
    en: { title: 'Control & compliance', body: 'Automatic validation of data and procedures against your rules and internal policies.' },
  },
  {
    icon: BarChart3,
    cs: { title: 'Podpora rozhodování', body: 'Automatická příprava reportů a podkladů, aby tým rozhodoval na základě aktuálních dat.' },
    en: { title: 'Decision support', body: 'Automatic preparation of reports and materials so your team decides on current data.' },
  },
  {
    icon: BookOpen,
    cs: { title: 'Centralizace know-how', body: 'Firemní znalosti jsou systematicky využívány napříč procesy — nic se neztratí.' },
    en: { title: 'Centralised know-how', body: 'Company knowledge is used systematically across processes — nothing gets lost.' },
  },
];

const WORKFLOWS = [
  { cs: { title: 'HR a personální agenda', body: 'Automatizace nástupů, změn zaměstnanců a kontroly personálních podkladů.' }, en: { title: 'HR & personnel', body: 'Automating onboarding, employee changes and checks of personnel documents.' } },
  { cs: { title: 'Obchod a nabídky', body: 'Příprava cenových nabídek a práce s produktovými daty a podklady.' }, en: { title: 'Sales & quotations', body: 'Preparing price quotes and working with product data and materials.' } },
  { cs: { title: 'IT a technická agenda', body: 'Zpracování technické dokumentace a správa změnových požadavků.' }, en: { title: 'IT & technical', body: 'Processing technical documentation and managing change requests.' } },
  { cs: { title: 'Právní a compliance', body: 'Vytěžování smluv, kontrola podmínek a příprava právních podkladů.' }, en: { title: 'Legal & compliance', body: 'Extracting contracts, checking terms and preparing legal materials.' } },
  { cs: { title: 'Management a reporting', body: 'Příprava reportů, sledování KPI a přehled procesního výkonu.' }, en: { title: 'Management & reporting', body: 'Preparing reports, tracking KPIs and an overview of process performance.' } },
  { cs: { title: 'Interní procesní podpora', body: 'Zpracování požadavků a příprava odpovědí podle interních pravidel.' }, en: { title: 'Internal process support', body: 'Processing requests and preparing responses according to internal rules.' } },
];

const HOW_IT_CONNECTS = [
  {
    icon: Plug,
    cs: { title: 'Napojení na vaše systémy', body: 'AI pracuje nad nástroji, které už používáte — přes API, integrace a stávající úložiště dat.' },
    en: { title: 'Connects to your systems', body: 'AI works on top of the tools you already use — via APIs, integrations and existing data stores.' },
  },
  {
    icon: Workflow,
    cs: { title: 'Jeden tok, jeden výstup', body: 'Roztroušené kroky se spojí do jednoho automatizovaného workflow s ověřeným výstupem.' },
    en: { title: 'One flow, one output', body: 'Scattered steps merge into a single automated workflow with a verified output.' },
  },
  {
    icon: ShieldCheck,
    cs: { title: 'Respektuje vaše procesy', body: 'Automatizace dodržuje oprávnění, interní politiky a logiku, kterou už máte zavedenou.' },
    en: { title: 'Respects your processes', body: 'Automation honours permissions, internal policies and the logic you already have in place.' },
  },
];

const PROCESS = [
  {
    cs: { title: 'Analýza procesů', body: 'Zanalyzujeme interní workflow, najdeme automatizovatelné kroky a definujeme cílový stav.' },
    en: { title: 'Process analysis', body: 'We analyse internal workflows, identify automatable steps and define the target state.' },
  },
  {
    cs: { title: 'Návrh a konfigurace', body: 'Navrhneme AI workflow, nastavíme pravidla, napojíme systémy a připravíme automatizace.' },
    en: { title: 'Design & configuration', body: 'We design the AI workflow, set up rules, connect systems and prepare the automation.' },
  },
  {
    cs: { title: 'Pilotní provoz', body: 'Ověříme automatizaci na reálných datech a doladíme výjimky a pravidla.' },
    en: { title: 'Pilot operation', body: 'We verify the automation on real data and fine-tune exceptions and rules.' },
  },
  {
    cs: { title: 'Nasazení a optimalizace', body: 'Nasadíme do ostrého provozu, sledujeme výkon a postupně rozšiřujeme další procesy.' },
    en: { title: 'Deployment & optimisation', body: 'We go live, monitor performance and gradually expand to further processes.' },
  },
];

const OUTCOMES = [
  { icon: Clock, cs: 'Méně rutinní administrativy a více času na hodnotnou práci.', en: 'Less routine admin and more time for valuable work.' },
  { icon: Search, cs: 'Konec ručního hledání — ověřený výstup přijde sám.', en: 'No more manual searching — the verified output comes to you.' },
  { icon: ShieldCheck, cs: 'Procesy běží podle pravidel, oprávnění a compliance.', en: 'Processes run by your rules, permissions and compliance.' },
  { icon: TrendingUp, cs: 'Systém pracuje s aktuálními daty a stále se zlepšuje.', en: 'The system works with current data and keeps improving.' },
];

export default function InternalAgents() {
  const { t, language } = useLanguage();
  useDocumentMeta({
    title: t('Automatizace procesů pomocí AI | REVAI', 'AI Process Automation | REVAI'),
    description: t(
      'Automatizujte opakující se procesy, e-mailovou komunikaci a workflow s AI. Integrace Make, n8n, Zapier a vlastních systémů.',
      'Automate repetitive processes, email communication and workflows with AI. Integration with Make, n8n, Zapier and custom systems.'
    ),
    canonical: '/sluzby/automatizace-procesu',
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
              <BrainCircuit size={14} />
              {t('Automatizace procesů', 'Process automation')}
            </p>
            <h1 className="text-[clamp(2.6rem,6vw,4.75rem)] font-bold text-ifl-ink leading-[0.95] tracking-[-0.02em] mb-8 max-w-3xl">
              {t('Interní workflow, které', 'Internal workflows that')}
              <br />
              <span className="text-ifl-signal">{t('běží samy za vás.', 'run themselves.')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-ifl-ink-70 leading-relaxed max-w-xl mb-12 tracking-[0.01em]">
              {t(
                'AI workflow nad vašimi systémy — automaticky zpracuje e-maily a dokumenty, sníží rutinní administrativu a propojí nástroje, které už používáte.',
                'AI workflows on top of your systems — automatically processing emails and documents, cutting routine admin and connecting the tools you already use.',
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

      {/* What we automate */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Co automatizujeme', 'What we automate')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Kde automatizace přináší největší úsporu', 'Where automation saves the most')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_WE_AUTOMATE.map((item, i) => {
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

      {/* Typical workflows */}
      <section className="bg-ifl-canvas py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Typická workflow', 'Typical workflows')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Automatizace pro každé oddělení', 'Automation for every department')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKFLOWS.map((item, i) => {
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

      {/* How systems connect */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Jak se systémy propojí', 'How systems connect')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Vrstva nad vaší stávající infrastrukturou', 'A layer over your existing infrastructure')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {HOW_IT_CONNECTS.map((item, i) => {
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

      {/* Implementation process */}
      <section className="bg-ifl-canvas py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Jak to probíhá', 'The process')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em]">
              {t('Od analýzy k nasazení', 'From analysis to deployment')}
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

      {/* Outcomes */}
      <section className="bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealC className="mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('Výsledky', 'Outcomes')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em] max-w-2xl">
              {t('Co tím získáte', 'What you gain')}
            </h2>
          </RevealC>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OUTCOMES.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealC key={item.en} delay={i * 0.06}>
                  <div className="h-full flex items-start gap-4 border border-ifl-border bg-ifl-canvas rounded-2xl p-8">
                    <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg border border-ifl-border bg-ifl-s1">
                      <Icon size={18} className="text-ifl-signal" />
                    </div>
                    <p className="text-ifl-ink leading-relaxed pt-1.5">{t(item.cs, item.en)}</p>
                  </div>
                </RevealC>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — reuses the shared consultation block (CALENDAR_URL config) */}
      <BookConsultationC />
    </div>
  );
}
