import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Process automation is presented as three implementation packages
// (one-time price + monthly management). The former parameter calculator
// was retired from /cenik in favour of these clear package cards.

export default function InternalAgentCalculator() {
  const { t } = useLanguage();

  return (
    <section id="internal-agent-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-ifl-canvas">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ifl-ink mb-4 tracking-[-0.02em]">
            {t('AUTOMATIZACE PROCESŮ', 'PROCESS AUTOMATION')}
          </h2>
          <p className="text-lg text-ifl-ink-70 max-w-3xl mx-auto mb-6">
            {t(
              'Jednorázová implementace a měsíční správa. Ceny jsou orientační — přesný rozsah i finální cenu potvrdíme po úvodní konzultaci.',
              'One-time implementation and monthly management. Prices are indicative — the exact scope and final price are confirmed after an initial consultation.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-ifl-ink-70">
            <span className="flex items-center gap-2">
              <Check className="text-ifl-signal" size={16} />
              {t('Úspora času', 'Time savings')}
            </span>
            <span className="flex items-center gap-2">
              <Check className="text-ifl-signal" size={16} />
              {t('Propojení systémů', 'System integration')}
            </span>
            <span className="flex items-center gap-2">
              <Check className="text-ifl-signal" size={16} />
              {t('Bezpečný přístup', 'Secure access')}
            </span>
            <span className="flex items-center gap-2">
              <Check className="text-ifl-signal" size={16} />
              {t('Neustálé zlepšování', 'Continuous improvement')}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8 items-stretch">
          <div className="flex flex-col bg-ifl-canvas rounded-2xl border border-ifl-border shadow-lg hover:shadow-xl hover:border-ifl-signal/50 p-6 transition-all duration-200">
            <div className="h-7 mb-2" />
            <div className="text-sm font-semibold text-ifl-signal font-mono tracking-wide mb-2">STARTER</div>
            <h4 className="text-xl font-bold text-ifl-ink mb-3">{t('Startovní automatizace', 'Starter automation')}</h4>
            <ul className="text-sm text-ifl-ink-70 space-y-2 mb-4 min-h-[120px]">
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                {t('1–2 automatizace', '1–2 automations')}
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                {t('Základní integrace', 'Essential integrations')}
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                Standard SLA
              </li>
            </ul>
            <div className="border-t border-ifl-border pt-4 mt-auto">
              <div className="text-2xl font-bold text-ifl-ink whitespace-nowrap">{t('od 23 900 Kč', 'from CZK 23,900')}</div>
              <div className="text-sm text-ifl-ink-40 mb-2">{t('jednorázově', 'one-time')}</div>
              <div className="text-sm font-semibold text-ifl-signal">{t('Správa od 2 150 Kč / měsíc', 'Management from CZK 2,150 / month')}</div>
            </div>
          </div>

          <div className="flex flex-col bg-ifl-s1 rounded-2xl border-2 border-ifl-signal shadow-2xl p-6 transition-all duration-200">
            <div className="h-7 mb-2">
              <span className="inline-block text-xs font-bold tracking-wide uppercase text-white bg-ifl-signal px-3 py-1 rounded-full">
                {t('Doporučujeme', 'Recommended')}
              </span>
            </div>
            <div className="text-sm font-semibold text-ifl-signal font-mono tracking-wide mb-2">BUSINESS</div>
            <h4 className="text-xl font-bold text-ifl-ink mb-3">{t('Business automatizace', 'Business automation')}</h4>
            <ul className="text-sm text-ifl-ink-70 space-y-2 mb-4 min-h-[120px]">
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                {t('Více automatizací a integrací', 'Multiple automations and integrations')}
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                Premium SLA
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                {t('Monitoring a reporting', 'Monitoring and reporting')}
              </li>
            </ul>
            <div className="border-t border-ifl-border pt-4 mt-auto">
              <div className="text-2xl font-bold text-ifl-ink whitespace-nowrap">{t('od 39 900 Kč', 'from CZK 39,900')}</div>
              <div className="text-sm text-ifl-ink-70 mb-2">{t('jednorázově', 'one-time')}</div>
              <div className="text-sm font-semibold text-ifl-signal">{t('Správa od 3 590 Kč / měsíc', 'Management from CZK 3,590 / month')}</div>
            </div>
          </div>

          <div className="flex flex-col bg-ifl-canvas rounded-2xl border border-ifl-border shadow-lg hover:shadow-xl hover:border-ifl-signal/50 p-6 transition-all duration-200">
            <div className="h-7 mb-2" />
            <div className="text-sm font-semibold text-ifl-signal font-mono tracking-wide mb-2">{t('NA MÍRU', 'CUSTOM')}</div>
            <h4 className="text-xl font-bold text-ifl-ink mb-3">{t('Automatizační systém na míru', 'Custom automation system')}</h4>
            <ul className="text-sm text-ifl-ink-70 space-y-2 mb-4 min-h-[120px]">
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                {t('Komplexní procesy a více systémů', 'Complex processes and multiple systems')}
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                24/7 SLA
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-ifl-signal mr-2 mt-0.5 flex-shrink-0" />
                {t('On-prem možnost', 'On-prem option')}
              </li>
            </ul>
            <div className="border-t border-ifl-border pt-4 mt-auto">
              <div className="text-2xl font-bold text-ifl-ink whitespace-nowrap">{t('od 88 900 Kč', 'from CZK 88,900')}</div>
              <div className="text-sm text-ifl-ink-40 mb-2">{t('jednorázově', 'one-time')}</div>
              <div className="text-sm font-semibold text-ifl-signal">{t('Správa od 7 900 Kč / měsíc', 'Management from CZK 7,900 / month')}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-ifl-ink-40 max-w-2xl mx-auto">
            {t(
              'Ceny jsou orientační a závisí na konkrétním řešení a rozsahu funkcí. Přesný rozsah i finální cenu potvrdíme po úvodní konzultaci.',
              'Prices are indicative and depend on the specific solution and scope of functions. The exact scope and final price are confirmed after an initial consultation.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
