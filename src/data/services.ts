import { Phone, BrainCircuit, Globe, Code2, type LucideIcon } from 'lucide-react';

export interface ServiceDefinition {
  slug: string;
  route: string;
  icon: LucideIcon;
  cs: {
    title: string;
    description: string;
    benefits: string[];
  };
  en: {
    title: string;
    description: string;
    benefits: string[];
  };
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: 'hlasovi-agenti',
    route: '/sluzby/hlasovi-agenti',
    icon: Phone,
    cs: {
      title: 'AI hlasový asistent',
      description:
        'Inteligentní hlasový asistent, který vede přirozenou konverzaci a zvládne stovky hovorů současně. Aktivně vyřizuje požadavky, propojuje systémy a šetří čas vašemu týmu i zákazníkům.',
      benefits: ['Příchozí i odchozí hovory', 'Reálné napojení na vaše systémy', 'Dostupnost 24/7'],
    },
    en: {
      title: 'AI voice assistant',
      description:
        'Intelligent voice assistant that conducts natural conversations and handles hundreds of calls simultaneously. Actively processes requests, connects systems, and saves time for your team and customers.',
      benefits: ['Incoming & outgoing calls', 'Real integration with your systems', '24/7 availability'],
    },
  },
  {
    slug: 'automatizace-procesu',
    route: '/sluzby/automatizace-procesu',
    icon: BrainCircuit,
    cs: {
      title: 'Automatizace procesů',
      description:
        'AI vrstva nad vašimi systémy, která automatizuje e-maily, dokumenty, faktury a interní agendu. Propojuje ERP, CRM a účetnictví pro plynulý tok dat.',
      benefits: ['Automatické zpracování', 'Propojení systémů', 'Snížení rutiny'],
    },
    en: {
      title: 'Process automation',
      description:
        'AI layer over your systems that automates emails, documents, invoices and internal agenda. Connects ERP, CRM and accounting for seamless data flow.',
      benefits: ['Automatic processing', 'System integration', 'Routine reduction'],
    },
  },
  {
    slug: 'tvorba-modernich-webu',
    route: '/sluzby/tvorba-modernich-webu',
    icon: Globe,
    cs: {
      title: 'Tvorba moderních webů',
      description:
        'Moderní weby, landing pages a webové prezentace s prémiovým UI/UX, animacemi, přechody a konverzní strukturou.',
      benefits: ['Prémiový UI/UX design', 'Animace a přechody na míru', 'Konverzní struktura webu'],
    },
    en: {
      title: 'Modern Website Development',
      description:
        'Modern websites, landing pages and web presentations with premium UI/UX, motion, transitions and conversion-focused structure.',
      benefits: ['Premium UI/UX design', 'Custom motion and transitions', 'Conversion-focused structure'],
    },
  },
  {
    slug: 'ai-app-development',
    route: '/sluzby/ai-app-development',
    icon: Code2,
    cs: {
      title: 'AI App Development',
      description:
        'Tvoříme chytrá AI řešení na míru vašim potřebám. Od interních nástrojů a automatizačních systémů po komplexní platformy, které propojí vaše procesy do jednoho celku.',
      benefits: ['Na míru vašemu byznysu', 'Integrace s vašimi systémy', 'Škálovatelné řešení'],
    },
    en: {
      title: 'AI App Development',
      description:
        'We create smart AI solutions tailored to your needs. From internal tools and automation systems to comprehensive platforms that connect your processes into one unit.',
      benefits: ['Custom for your business', 'Integration with your systems', 'Scalable solution'],
    },
  },
];
