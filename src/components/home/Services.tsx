import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Phone, BrainCircuit, Globe, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { EASE } from '../../config/motion';
import { CALENDAR_URL } from '../../config/site';
import { RevealC } from '../sections/Reveal';

const services = {
  cs: [
    {
      icon: Phone,
      number: '01',
      title: 'AI hlasový asistent',
      description:
        'Inteligentní hlasový asistent, který vede přirozenou konverzaci a zvládne více hovorů současně. Aktivně vyřizuje požadavky, propojuje systémy a šetří čas vašemu týmu i zákazníkům.',
      benefits: ['Příchozí i odchozí hovory', 'Reálné napojení na vaše systémy', 'Dostupnost 24/7'],
      link: '/sluzby/hlasovi-agenti',
    },
    {
      icon: BrainCircuit,
      number: '02',
      title: 'Automatizace procesů',
      description:
        'AI vrstva nad vašimi systémy, která automatizuje e-maily, dokumenty, faktury a interní agendu. Propojuje CRM, účetnictví, interní nástroje, databáze, kalendáře, e-mail a API pro plynulý tok dat.',
      benefits: ['Automatické zpracování', 'Propojení systémů', 'Snížení rutiny'],
      link: '/sluzby/automatizace-procesu',
    },
    {
      icon: Globe,
      number: '03',
      title: 'Tvorba moderních webů',
      description:
        'Moderní weby, landing pages a webové prezentace s prémiovým UI/UX, animacemi, přechody a konverzní strukturou. Weby, které srozumitelně sdělují vaši hodnotu a podporují konverze.',
      benefits: ['Prémiový UI/UX design', 'Animace a přechody na míru', 'Konverzní struktura webu'],
      link: '/sluzby/tvorba-modernich-webu',
    },
    {
      icon: Code2,
      number: '04',
      title: 'AI App Development',
      description:
        'Tvoříme chytrá AI řešení na míru vašim potřebám. Od interních nástrojů a automatizačních systémů po komplexní platformy, které propojí vaše procesy do jednoho celku.',
      benefits: ['Na míru vašemu byznysu', 'Integrace s vašimi systémy', 'Škálovatelné řešení'],
      link: '/sluzby/ai-app-development',
    },
  ],
  en: [
    {
      icon: Phone,
      number: '01',
      title: 'AI voice assistant',
      description:
        'Intelligent voice assistant that conducts natural conversations and handles multiple calls simultaneously. Actively processes requests, connects systems, and saves time for your team and customers.',
      benefits: ['Incoming & outgoing calls', 'Real integration with your systems', '24/7 availability'],
      link: '/sluzby/hlasovi-agenti',
    },
    {
      icon: BrainCircuit,
      number: '02',
      title: 'Process automation',
      description:
        'AI layer over your systems that automates emails, documents, invoices and internal agenda. Connects CRM, accounting, internal tools, databases, calendars, email and APIs for seamless data flow.',
      benefits: ['Automatic processing', 'System integration', 'Routine reduction'],
      link: '/sluzby/automatizace-procesu',
    },
    {
      icon: Globe,
      number: '03',
      title: 'Modern Website Development',
      description:
        'Modern websites, landing pages and web presentations with premium UI/UX, motion, transitions and conversion-focused structure. Sites that clearly communicate your value and support conversion.',
      benefits: ['Premium UI/UX design', 'Custom motion and transitions', 'Conversion-focused structure'],
      link: '/sluzby/tvorba-modernich-webu',
    },
    {
      icon: Code2,
      number: '04',
      title: 'AI App Development',
      description:
        'We create smart AI solutions tailored to your needs. From internal tools and automation systems to comprehensive platforms that connect your processes into one unit.',
      benefits: ['Custom for your business', 'Integration with your systems', 'Scalable solution'],
      link: '/sluzby/ai-app-development',
    },
  ],
};

function ServiceRow({
  service,
  index,
  learnMore,
}: {
  service: (typeof services.cs)[number];
  index: number;
  learnMore: string;
}) {
  const reduced = useReducedMotion();
  const Icon = service.icon;

  return (
    <motion.div
      className="border-t border-ifl-border py-10 grid grid-cols-1 md:grid-cols-[5rem_2fr_2fr_auto] gap-6 md:gap-10 items-start"
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
    >
      <div className="font-mono text-sm text-ifl-ink-40 pt-1">{service.number}</div>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5 rounded-lg border border-ifl-border bg-ifl-canvas">
          <Icon size={16} className="text-ifl-signal" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-ifl-ink mb-2 leading-snug tracking-[-0.01em]">{service.title}</h3>
          <p className="text-ifl-ink-70 leading-relaxed text-sm md:text-base">{service.description}</p>
        </div>
      </div>

      <ul className="space-y-2 pt-1">
        {service.benefits.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-ifl-ink-70">
            <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-ifl-signal shrink-0" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <div className="pt-1">
        <Link
          to={service.link}
          className="inline-flex items-center gap-2 text-sm font-semibold text-ifl-signal border-b border-ifl-signal/30 pb-0.5 hover:border-ifl-signal transition-all duration-300 ease-out whitespace-nowrap group/link font-mono tracking-wide"
        >
          {learnMore}
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesC() {
  const { t, language } = useLanguage();
  const items = services[language];

  return (
    <section id="services" className="variant-c relative bg-ifl-s1 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <RevealC className="mb-16">
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
            {t('Naše nabídka', 'Our offer')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ifl-ink leading-tight tracking-[-0.02em]">
            {t('Naše AI řešení', 'Our AI solutions')}
          </h2>
        </RevealC>

        <div>
          {items.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={i}
              learnMore={t('Zjistit více', 'Learn more')}
            />
          ))}
          <div className="border-t border-ifl-border" aria-hidden="true" />
        </div>

        <RevealC className="mt-14 text-center" delay={0.2}>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 ease-out active:scale-[0.97]"
          >
            {t('Chci si nechat poradit', 'Get advice')}
          </a>
        </RevealC>
      </div>
    </section>
  );
}
