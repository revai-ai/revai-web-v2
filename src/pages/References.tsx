import { Quote, TrendingUp, Clock, DollarSign, Users, Star } from 'lucide-react';
import BookConsultation from '../components/BookConsultation';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function References() {
  const { t } = useLanguage();
  useDocumentMeta({
    title: t('Reference a výsledky | REVAI – AI Automatizace', 'References & Results | REVAI – AI Automation'),
    description: t(
      'Reálné výsledky a case studies našich klientů. Zjistěte, jak AI automatizace pomáhá firmám ušetřit čas a snížit náklady.',
      'Real results and case studies from our clients. See how AI automation helps businesses save time and reduce costs.'
    ),
    canonical: '/reference',
  });

  const caseStudies = [
    {
      company: 'AGE CENTRUM',
      industry: t('Ambulantní zdravotnické zařízení v Olomouci', 'Outpatient healthcare facility in Olomouc'),
      logo: 'EK',
      logoSrc: '/age-centrum-logo.png',
      testimonial: t(
        'Na recepci jsme zvažovali, jestli přijmout novou posilu, nebo zkusit AI asistenta. Dnes nám AI Voice Agent od REVAI odbaví přes 850+ hovorů měsíčně — objednávky léků, dotazy pacientů i nové registrace. Sestřička má více času na péči o pacienty a provoz recepce je plynulejší.',
        'At the reception, we were considering whether to hire a new person or try an AI assistant. Today, the AI Voice Agent from REVAI handles over 850+ calls per month — medication orders, patient inquiries, and new registrations. The nurse has more time for patient care and reception operations run more smoothly.'
      ),
      person: 'Mgr. Jakub MALOTA, MBA',
      position: t('Ředitel, Jednatel', 'Director, Managing Director'),
      image: '/testimonial-portrait.webp',
      results: [
        { icon: Clock, value: '95%', label: t('POČET ZPRACOVANÝCH POŽADAVKŮ', 'NUMBER OF PROCESSED REQUESTS'), detail: t('95% hovorů vyřešeno bez nutnosti přepojení', '95% of calls resolved without need for transfer') },
        { icon: DollarSign, value: '30h+', label: t('ÚSPORA LIDSKÉ PRÁCE', 'HUMAN LABOR SAVINGS'), detail: t('Desítky hodin rutinní práce měsíčně převedeny na automatizaci', 'Dozens of hours of routine work per month converted to automation') },
        { icon: TrendingUp, value: '3s', label: t('PRŮMĚRNÁ DOBA ODEZVY', 'AVERAGE RESPONSE TIME'), detail: t('Průměrná reakce do 3 sekund', 'Average response within 3 seconds') },
        { icon: Star, value: '99,9%', label: t('DOSTUPNOST', 'AVAILABILITY'), detail: t('99,9% provozní dostupnost', '99.9% operational availability') },
      ],
    },
    {
      company: 'NÁSKOK',
      industry: t('Regenerační studio', 'Regeneration studio'),
      logo: 'TS',
      logoSrc: '/naskok-logo.webp',
      testimonial: t(
        'Chatbot od REVAI nám pomáhá zrychlit komunikaci se zákazníky – odpovídá na časté dotazy ohledně konkrétních služeb a informací. Zákazníci dostanou odpověď během pár sekund. ',
        'The chatbot from REVAI helps us speed up communication with customers – it answers frequent questions about specific services and information. Customers get a response within seconds.'
      ),
      person: 'Ing. Štěpán Wagner Ph.D.',
      position: t('Jednatel', 'Managing Director'),
      image: '/testimonial-portrait.webp',
      results: [
        { icon: Clock, value: '70%', label: t('DOTAZŮ VYŘEŠÍ CHATBOT SAMOSTATNĚ', 'QUERIES SOLVED BY CHATBOT INDEPENDENTLY'), detail: t('Nejčastější otázky o službách a termínech zvládne okamžitě', 'Most common questions about services and appointments handled instantly') },
        { icon: DollarSign, value: '3s', label: t('ODPOVĚĎ BĚHEM 3s', 'RESPONSE WITHIN 3s'), detail: t('Zákazníci získají informace bez čekání', 'Customers get information without waiting') },
        { icon: Users, value: '24/7', label: t('DOSTUPNOST', 'AVAILABILITY'), detail: t('Chatbot funguje i mimo otevírací dobu', 'Chatbot works even outside opening hours') },
      ],
    },
    {
      company: 'ŠIMA MASÁŽE',
      industry: t('Masáže Znojmo', 'Massage Znojmo'),
      logo: 'SM',
      logoSrc: '/sima-logo.webp',
      testimonial: t(
        'Poptával jsem jednoduchou automatizaci, která mi pomůže zajistit přísun nových klientů. Řešení, které dříve trvalo přes půl roku, mi kluci z REVAI dodali během pár dní. Díky!',
        'I was looking for a simple automation to help me secure a steady stream of new clients. What previously took over half a year, the guys at REVAI delivered in just a few days. Thanks!'
      ),
      person: 'Šimon Machala',
      position: t('Masér', 'Masseur'),
      image: '/testimonial-portrait.webp',
      results: [
        { icon: TrendingUp, value: '100%', label: t('PŘÍSTUP', 'APPROACH'), detail: t('Analýza zadání a rychlost tvorby automatizace', 'Task analysis and speed of automation development') },
      ],
    },
    {
      company: 'ROYAL BEROUN GOLF CLUB',
      industry: t('Golfový klub v ČR', 'Golf club in Czech Republic'),
      logo: 'MM',
      logoSrc: '/berounlogo.png',
      testimonial: t(
        'Chtěli jsme, aby se náš tým mohl více věnovat hostům a méně rutinním hovorům. AI hlasový asistent od REVAI dnes zajišťuje rezervace hotelu i golfu a odpovídá na časté dotazy. Recepce funguje hladce a hosté se dovolají rychleji.',
        'We wanted our team to focus more on our guests and less on routine phone calls. Today, the AI voice assistant from REVAI handles hotel and golf reservations and answers frequently asked questions. Our reception runs smoothly, and guests get through faster.'
      ),
      person: 'Vojtěch Matějček',
      position: t('Prokurista', 'Authorized Representative'),
      image: '/testimonial-portrait.webp',
      results: [
        { icon: TrendingUp, value: '93%', label: t('POČET ZPRACOVANÝCH POŽADAVKŮ', 'NUMBER OF PROCESSED REQUESTS'), detail: t('93% dotazů vyřešeno okamžitě', '93% of queries resolved instantly') },
        { icon: Clock, value: '40h', label: t('ÚSPORA LIDSKÉ PRÁCE', 'HUMAN LABOR SAVINGS'), detail: t('Desítky hodin rutinní práce měsíčně převedeny na automatizaci', 'Dozens of hours of routine work per month converted to automation') },
        { icon: Users, value: '3s', label: t('PRŮMĚRNÁ DOBA ODEZVY', 'AVERAGE RESPONSE TIME'), detail: t('Průměrná doba reakce do 3s', 'Average response time within 3s') },
        { icon: Star, value: '2', label: t('JAZYKY', 'LANGUAGES'), detail: t('Asistent mluví plynule v českém i anglickém jazyce', 'Assistant speaks fluently in Czech and English') },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-ifl-canvas">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ifl-ink mb-6">
              {t('REFERENCE NAŠICH KLIENTŮ', 'OUR CLIENT REFERENCES')}
            </h1>
            <p className="text-xl text-ifl-ink-70 max-w-3xl mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-ifl-signal mb-2">20+</p>
              <p className="text-ifl-ink-70 text-sm sm:text-base">{t('SPOKOJENÝCH KLIENTŮ', 'SATISFIED CLIENTS')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-ifl-signal mb-2">3.000+</p>
              <p className="text-ifl-ink-70 text-sm sm:text-base">{t('HODIN UŠETŘENO MĚSÍČNĚ', 'HOURS SAVED MONTHLY')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-ifl-signal mb-2">98%</p>
              <p className="text-ifl-ink-70 text-sm sm:text-base">{t('MÍRA SPOKOJENOSTI', 'SATISFACTION RATE')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-ifl-signal mb-2">100%</p>
              <p className="text-ifl-ink-70 text-sm sm:text-base">{t('INDIVIDUÁLNÍ PŘÍSTUP', 'INDIVIDUAL APPROACH')}</p>
            </div>
          </div>

          <div className="space-y-10">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-ifl-canvas rounded-2xl overflow-hidden shadow-sm border border-ifl-border animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-ifl-s1">
                    <div className="mb-6">
                      <div className="flex items-center space-x-4 mb-6">
                        {study.logoSrc ? (
                          <div className="w-16 h-16 rounded-full bg-ifl-canvas flex items-center justify-center border border-ifl-border overflow-hidden">
                            <img
                              src={study.logoSrc}
                              alt={`${study.company} Logo`}
                              loading="lazy"
                              decoding="async"
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-ifl-signal flex items-center justify-center text-white font-bold text-xl">
                            {study.logo}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-xl text-ifl-ink">{study.company}</p>
                          <p className="text-ifl-ink-70">{study.industry}</p>
                        </div>
                      </div>
                    </div>

                    <Quote className="text-ifl-signal opacity-30 mb-4" size={48} />

                    <blockquote className="text-base sm:text-lg text-ifl-ink-70 leading-relaxed mb-6 sm:mb-8 italic">
                      "{study.testimonial}"
                    </blockquote>

                    <div className="flex items-center space-x-4">
                      <img
                        src={study.image}
                        alt={study.person}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-ifl-border shadow-sm flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-ifl-ink">{study.person}</p>
                        <p className="text-ifl-ink-70 text-sm break-words">{study.position}, {study.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-ifl-canvas p-6 sm:p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-ifl-border">
                    <h3 className="text-2xl font-bold text-ifl-ink mb-8">{t('Měřitelné výsledky', 'Measurable results')}</h3>

                    <div className="space-y-6">
                      {study.results.map((result, idx) => {
                        const Icon = result.icon;
                        return (
                          <div key={idx} className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-ifl-s2 flex items-center justify-center flex-shrink-0">
                              <Icon className="text-ifl-signal" size={24} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline space-x-2 mb-1">
                                <span className="text-3xl font-bold text-ifl-signal">{result.value}</span>
                              </div>
                              <p className="text-ifl-ink font-semibold">{result.label}</p>
                              <p className="text-ifl-ink-70 text-sm">{result.detail}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BookConsultation />
    </div>
  );
}
