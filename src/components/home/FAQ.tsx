import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CALENDAR_URL } from '../../config/site';
import { RevealC } from '../sections/Reveal';

const faqs = {
  cs: [
    {
      question: 'Jak dlouho trvá implementace AI automatizace?',
      answer:
        'Doba závisí na rozsahu projektu a integracích, které potřebujeme nastavit. V průměru trvá kompletní nasazení od 4 do 8 týdnů — od úvodní analýzy po spuštění do ostrého provozu.',
    },
    {
      question: 'Potřebuji k tomu technické znalosti?',
      answer:
        'Ne, o technickou stránku se staráme my. Naše AI řešení se napojí na vaše stávající systémy (např. CRM, e-shop, telefonní ústřednu nebo interní databázi) pomocí integrací.',
    },
    {
      question: 'Je to bezpečné? Co se stane s našimi daty?',
      answer:
        'Používáme ověřené a certifikované služby, které splňují evropské standardy ochrany dat a jsou v souladu s GDPR. Data zůstávají v bezpečném prostředí a jsou využívána pouze pro účely fungování vašeho řešení.',
    },
    {
      question: 'Jak probíhá spolupráce a implementace?',
      answer:
        'Začínáme analýzou vašich procesů, poté připravíme návrh řešení a cenovou nabídku. Po schválení nastavíme automatizaci, otestujeme ji a následně dlouhodobě sledujeme výkon i možnosti rozšíření.',
    },
    {
      question: 'Kolik to stojí a jak se cena určuje?',
      answer:
        'Cena se odvíjí od rozsahu projektu a počtu funkcí, které automatizujeme. Vždy připravujeme individuální nabídku. Menší projekty začínají už v řádu několika tisíc korun měsíčně.',
    },
    {
      question: 'Co když nám řešení nebude vyhovovat?',
      answer:
        'Jsme připraveni s vámi upravit řešení podle zpětné vazby. Dáváme důraz na konkrétní výsledky — pokud některé části systému fungují jinak, než očekáváte, upravíme je společně.',
    },
    {
      question: 'Jaké jsou hlavní přínosy pro firmu?',
      answer:
        'Automatizace pomáhá zkrátit reakční dobu, snížit náklady na rutinní obsluhu, zlepšit zákaznickou zkušenost a uvolnit kapacity vašeho týmu pro strategičtější práci.',
    },
  ],
  en: [
    {
      question: 'How long does AI automation implementation take?',
      answer:
        'The time depends on the project scope and integrations we need to set up. On average, complete deployment takes 4 to 8 weeks — from initial analysis to live production launch.',
    },
    {
      question: 'Do I need technical knowledge?',
      answer:
        'No, we handle the technical side. Our AI solutions connect to your existing systems (e.g., CRM, e-shop, phone system, or internal database) through integrations.',
    },
    {
      question: 'Is it safe? What happens to our data?',
      answer:
        "We use verified and certified services that meet European data protection standards and are GDPR compliant. Data remains in a secure environment and is used only for the purpose of your solution's operation.",
    },
    {
      question: 'How does cooperation and implementation work?',
      answer:
        'We start with an analysis of your processes, then prepare a solution proposal and price quote. After approval, we set up the automation, test it, and then continuously monitor performance and expansion opportunities.',
    },
    {
      question: 'How much does it cost and how is the price determined?',
      answer:
        'The price depends on the project scope and number of functions we automate. We always prepare an individual offer. Smaller projects start at several thousand CZK per month.',
    },
    {
      question: "What if the solution doesn't suit us?",
      answer:
        "We are ready to adjust the solution with you based on feedback. We emphasize concrete results — if some parts of the system work differently than expected, we'll adjust them together.",
    },
    {
      question: 'What are the main benefits for the company?',
      answer:
        "Automation helps shorten response time, reduce costs of routine operations, improve customer experience, and free up your team's capacity for more strategic work.",
    },
  ],
};

export default function FAQC() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = faqs[language];

  return (
    <section id="faq" className="variant-c relative bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <RevealC className="mb-16">
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
            {t('Časté otázky', 'FAQ')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em]">
            {t('Často kladené otázky', 'Frequently asked questions')}
          </h2>
        </RevealC>

        <div>
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <RevealC key={i} delay={i * 0.04}>
                <div className="border-t border-ifl-border">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full py-6 flex items-start justify-between gap-6 text-left group focus-visible:outline-2 focus-visible:outline-ifl-signal focus-visible:outline-offset-2"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold text-ifl-ink leading-snug tracking-[-0.005em] group-hover:text-ifl-signal transition-all duration-300 ease-out">
                      {faq.question}
                    </span>
                    <span className="shrink-0 mt-0.5 text-ifl-signal">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-6">
                      <p className="text-ifl-ink-70 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </RevealC>
            );
          })}
          <div className="border-t border-ifl-border" aria-hidden="true" />
        </div>

        <RevealC className="mt-16 text-center" delay={0.1}>
          <p className="text-lg text-ifl-ink-70 mb-6">
            {t('Máte další otázky?', 'Have more questions?')}
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 ease-out active:scale-[0.97]"
          >
            {t('Zeptat se na konzultaci', 'Ask at consultation')}
          </a>
        </RevealC>
      </div>
    </section>
  );
}
