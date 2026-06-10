import { Lightbulb, Settings, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


export default function AIAppDevelopmentPricing() {
  const { t } = useLanguage();

  const projectTypes = [
    {
      icon: Lightbulb,
      titleCs: 'MVP / Startovní projekt',
      titleEn: 'MVP / Starter Project',
      subtitleCs: 'Ideální pro první verzi Vašeho nápadu',
      subtitleEn: 'Perfect for the first version of your idea',
      descriptionCs: 'Rychlý vývoj jednoduché AI aplikace nebo prototypu pro ověření konceptu. Zahrnuje základní logiku, API integraci a testovací prostředí.',
      descriptionEn: 'Rapid development of a simple AI application or prototype for concept validation. Includes basic logic, API integration, and testing environment.',
      priceNoteCs: 'Cena dle rozsahu projektu – stanovujeme po krátké konzultaci.',
      priceNoteEn: 'Price based on project scope – determined after a brief consultation.',
    },
    {
      icon: Settings,
      titleCs: 'Pokročilá AI aplikace',
      titleEn: 'Advanced AI Application',
      subtitleCs: 'Kompletní řešení propojené s Vašimi systémy',
      subtitleEn: 'Complete solution integrated with your systems',
      descriptionCs: 'Vývoj robustní aplikace s uživatelským rozhraním, RAG komponenty, datovými integracemi a administrací. Ideální pro firmy, které chtějí AI zapojit do každodenních procesů.',
      descriptionEn: 'Development of a robust application with user interface, RAG components, data integrations, and administration. Ideal for companies wanting to integrate AI into daily processes.',
      priceNoteCs: 'Cena dle rozsahu projektu – individuální návrh po úvodním jednání.',
      priceNoteEn: 'Price based on project scope – custom proposal after initial meeting.',
    },
    {
      icon: Building2,
      titleCs: 'Enterprise řešení',
      titleEn: 'Enterprise Solution',
      subtitleCs: 'Komplexní vývoj pro velké organizace',
      subtitleEn: 'Comprehensive development for large organizations',
      descriptionCs: 'Škálovatelná AI řešení s důrazem na bezpečnost, výkon a integrace do interní infrastruktury. Zahrnuje custom backend, SSO, více modulů, monitoring a reporting.',
      descriptionEn: 'Scalable AI solutions with emphasis on security, performance, and integration into internal infrastructure. Includes custom backend, SSO, multiple modules, monitoring, and reporting.',
      priceNoteCs: 'Cena dle rozsahu projektu – připravujeme nabídku na míru po analýze potřeb.',
      priceNoteEn: 'Price based on project scope – we prepare a custom offer after needs analysis.',
    }
  ];

  return (
    <section id="ai-app-development" className="py-20 px-4 sm:px-6 lg:px-8 bg-ifl-s1">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ifl-ink mb-4 tracking-[-0.02em]">
            AI APP DEVELOPMENT
          </h2>
          <p className="text-xl text-ifl-ink-70 mb-4 max-w-3xl mx-auto">
            {t('Od nápadu po plně funkční AI aplikaci – na míru Vašim datům, procesům i cílům', 'From idea to fully functional AI application – tailored to your data, processes, and goals')}
          </p>
          <p className="text-lg text-ifl-ink-40 max-w-3xl mx-auto">
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {projectTypes.map((project, index) => (
            <div
              key={index}
              className="bg-ifl-canvas rounded-2xl border border-ifl-border p-6 hover:border-ifl-signal/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-ifl-signal mb-4">
                <project.icon size={40} strokeWidth={1.5} />
              </div>

              <div className="text-sm font-semibold text-ifl-signal mb-2 uppercase font-mono tracking-wide">
                {t(project.titleCs, project.titleEn)}
              </div>

              <h4 className="text-xl font-bold text-ifl-ink mb-4">
                {t(project.subtitleCs, project.subtitleEn)}
              </h4>

              <p className="text-sm text-ifl-ink-70 mb-6 leading-relaxed min-h-[120px]">
                {t(project.descriptionCs, project.descriptionEn)}
              </p>

              <div className="border-t border-ifl-border pt-4">
                <p className="text-sm text-ifl-ink-70 font-medium">
                  {t(project.priceNoteCs, project.priceNoteEn)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#book-consultation"
            className="bg-ifl-signal text-white px-8 py-4 rounded-full font-bold text-center hover:bg-ifl-signal-dark transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] uppercase inline-block"
          >
            {t('Získat přesnou kalkulaci', 'Get exact calculation')}
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-ifl-ink-40 max-w-3xl mx-auto">
            {t('Každý AI projekt je unikátní. Po krátké konzultaci vám připravíme návrh řešení, harmonogram a cenový odhad – zcela nezávazně.', 'Every AI project is unique. After a brief consultation, we will prepare a solution proposal, timeline, and cost estimate – completely non-binding.')}
          </p>
        </div>
      </div>
    </section>
  );
}
