import VoiceAgentCalculator from '../components/VoiceAgentCalculator';
import InternalAgentCalculator from '../components/InternalAgentCalculator';
import WebDevelopmentPricing from '../components/WebDevelopmentPricing';
import AIAppDevelopmentPricing from '../components/AIAppDevelopmentPricing';
import BookConsultation from '../components/BookConsultation';
import { Phone, Bot, Globe, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function PricingPage() {
  const { t } = useLanguage();
  useDocumentMeta({
    title: t('Ceník AI služeb | REVAI', 'AI Services Pricing | REVAI'),
    description: t(
      'Transparentní ceník AI automatizace, hlasových asistentů, tvorby webů a vývoje AI aplikací. Kalkulátory pro okamžitý odhad ceny.',
      'Transparent pricing for AI automation, voice assistants, website development and AI app development. Calculators for instant price estimates.'
    ),
    canonical: '/cenik',
  });
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-ifl-canvas">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ifl-s1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
              {t('CENÍK', 'PRICING')}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-ifl-ink tracking-[-0.02em]">
              {t('Ceník jednotlivých služeb', 'Service Pricing')}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => scrollToSection('voice-agent-calculator')}
              className="bg-ifl-canvas text-ifl-ink px-6 py-6 rounded-2xl font-semibold border border-ifl-border hover:border-ifl-signal hover:bg-ifl-s2 transition-all duration-200 flex flex-col items-center space-y-3 group"
            >
              <div className="bg-ifl-s2 p-3 rounded-xl group-hover:bg-ifl-s3 transition-colors">
                <Phone size={28} className="text-ifl-signal" />
              </div>
              <span className="text-center text-base">{t('HLASOVÝ ASISTENT', 'VOICE ASSISTANT')}</span>
            </button>

            <button
              onClick={() => scrollToSection('internal-agent-calculator')}
              className="bg-ifl-canvas text-ifl-ink px-6 py-6 rounded-2xl font-semibold border border-ifl-border hover:border-ifl-signal hover:bg-ifl-s2 transition-all duration-200 flex flex-col items-center space-y-3 group"
            >
              <div className="bg-ifl-s2 p-3 rounded-xl group-hover:bg-ifl-s3 transition-colors">
                <Bot size={28} className="text-ifl-signal" />
              </div>
              <span className="text-center text-base">{t('AUTOMATIZACE PROCESŮ', 'PROCESS AUTOMATION')}</span>
            </button>

            <button
              onClick={() => scrollToSection('web-development')}
              className="bg-ifl-canvas text-ifl-ink px-6 py-6 rounded-2xl font-semibold border border-ifl-border hover:border-ifl-signal hover:bg-ifl-s2 transition-all duration-200 flex flex-col items-center space-y-3 group"
            >
              <div className="bg-ifl-s2 p-3 rounded-xl group-hover:bg-ifl-s3 transition-colors">
                <Globe size={28} className="text-ifl-signal" />
              </div>
              <span className="text-center text-base">{t('TVORBA MODERNÍCH WEBŮ', 'MODERN WEBSITE DEVELOPMENT')}</span>
            </button>

            <button
              onClick={() => scrollToSection('ai-app-development')}
              className="bg-ifl-canvas text-ifl-ink px-6 py-6 rounded-2xl font-semibold border border-ifl-border hover:border-ifl-signal hover:bg-ifl-s2 transition-all duration-200 flex flex-col items-center space-y-3 group"
            >
              <div className="bg-ifl-s2 p-3 rounded-xl group-hover:bg-ifl-s3 transition-colors">
                <Code size={28} className="text-ifl-signal" />
              </div>
              <span className="text-center text-base">AI APP DEVELOPMENT</span>
            </button>
          </div>
        </div>
      </section>

      <VoiceAgentCalculator />
      <InternalAgentCalculator />
      <WebDevelopmentPricing />
      <AIAppDevelopmentPricing />

      <BookConsultation />
    </div>
  );
}
