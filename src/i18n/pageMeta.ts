import type { Locale } from './locales';
import type { RouteKey } from './routes';

/**
 * Phase 3D — per-route localized title/description for the build-time
 * prerender (served HTML) and the generated sitemap.
 *
 * ⚠️ These strings are byte-copies of the runtime values each page passes to
 * useDocumentMeta (B6 §6.1–6.8 baseline wording + the REVAI brand suffix from
 * 3B — the only permitted delta). Served HTML and post-hydration DOM must stay
 * identical: if a page's useDocumentMeta call changes, this table must change
 * in the same commit (and vice versa). Protected pages (/, /sluzby/*, /cenik,
 * /kontakt) may not be reworded here without a B6-closing approval.
 */
export interface LocalizedPageMeta {
  title: string;
  description: string;
}

export interface PageMetaEntry {
  /** Mirrors the t(cs, en) pair in the page component's useDocumentMeta call. */
  meta: Record<Locale, LocalizedPageMeta>;
  /** Sitemap <priority>, carried over from the hand-maintained sitemap.xml. */
  priority: string;
}

export const PAGE_META: Record<RouteKey, PageMetaEntry> = {
  home: {
    meta: {
      cs: {
        title: 'Automatizace pomocí AI – Řešení na míru | REVAI',
        description:
          'Česká agentura na AI automatizaci. Hlasoví asistenti, automatizace procesů, moderní weby a vývoj AI aplikací pro firmy.',
      },
      en: {
        title: 'AI Automation – Custom Solutions | REVAI',
        description:
          'Czech AI automation agency. Voice assistants, process automation, modern websites and AI app development for businesses.',
      },
    },
    priority: '1.0',
  },
  processAutomation: {
    meta: {
      cs: {
        title: 'Automatizace procesů pomocí AI | REVAI',
        description:
          'Automatizujte opakující se procesy, e-mailovou komunikaci a workflow s AI. Integrace Make, n8n, Zapier a vlastních systémů.',
      },
      en: {
        title: 'AI Process Automation | REVAI',
        description:
          'Automate repetitive processes, email communication and workflows with AI. Integration with Make, n8n, Zapier and custom systems.',
      },
    },
    priority: '0.9',
  },
  voiceAgents: {
    meta: {
      cs: {
        title: 'Hlasoví AI asistenti pro firmy | REVAI',
        description:
          'AI hlasoví asistenti od REVAI automatizují příchozí hovory, objednávky a zákaznický servis 24/7. Integrace s CRM a interními systémy.',
      },
      en: {
        title: 'AI Voice Assistants for Business | REVAI',
        description:
          'AI voice assistants from REVAI automate incoming calls, bookings and customer service 24/7. Integration with CRM and internal systems.',
      },
    },
    priority: '0.9',
  },
  aiAppDevelopment: {
    meta: {
      cs: {
        title: 'Vývoj AI aplikací na míru | REVAI',
        description:
          'Vývoj vlastních AI aplikací, dashboardů a inteligentních systémů. Full-stack řešení s LLM, RAG a agentic workflow pro firmy.',
      },
      en: {
        title: 'Custom AI App Development | REVAI',
        description:
          'Development of custom AI applications, dashboards and intelligent systems. Full-stack solutions with LLM, RAG and agentic workflows for businesses.',
      },
    },
    priority: '0.9',
  },
  modernWeb: {
    meta: {
      cs: {
        title: 'Tvorba moderních webů s AI | REVAI',
        description:
          'Navrhujeme a vyvíjíme moderní weby s integrací AI. React, Vite, Tailwind — rychlé, přístupné a SEO-optimalizované weby na míru.',
      },
      en: {
        title: 'Modern Website Development with AI | REVAI',
        description:
          'We design and develop modern websites with AI integration. React, Vite, Tailwind — fast, accessible and SEO-optimized custom websites.',
      },
    },
    priority: '0.9',
  },
  pricing: {
    meta: {
      cs: {
        title: 'Ceník AI služeb | REVAI',
        description:
          'Transparentní ceník AI automatizace, hlasových asistentů, tvorby webů a vývoje AI aplikací. Kalkulátory pro okamžitý odhad ceny.',
      },
      en: {
        title: 'AI Services Pricing | REVAI',
        description:
          'Transparent pricing for AI automation, voice assistants, website development and AI app development. Calculators for instant price estimates.',
      },
    },
    priority: '0.8',
  },
  contact: {
    meta: {
      cs: {
        title: 'Kontakt | REVAI – AI Automatizace',
        description:
          'Kontaktujte tým REVAI. Odpovíme do 24 hodin. Nabízíme nezávaznou konzultaci AI automatizace pro vaši firmu.',
      },
      en: {
        title: 'Contact | REVAI – AI Automation',
        description:
          'Contact the REVAI team. We respond within 24 hours. We offer a free consultation on AI automation for your business.',
      },
    },
    priority: '0.7',
  },
  projects: {
    meta: {
      cs: {
        title: 'Realizované projekty | REVAI – AI Automatizace',
        description:
          'Prohlédněte si naše realizované projekty v oblasti AI automatizace, hlasových asistentů a vývoje webových aplikací.',
      },
      en: {
        title: 'Completed Projects | REVAI – AI Automation',
        description:
          'Browse our completed projects in AI automation, voice assistants and web application development.',
      },
    },
    priority: '0.7',
  },
  references: {
    meta: {
      cs: {
        title: 'Reference a výsledky | REVAI – AI Automatizace',
        description:
          'Reálné výsledky a case studies našich klientů. Zjistěte, jak AI automatizace pomáhá firmám ušetřit čas a snížit náklady.',
      },
      en: {
        title: 'References & Results | REVAI – AI Automation',
        description:
          'Real results and case studies from our clients. See how AI automation helps businesses save time and reduce costs.',
      },
    },
    priority: '0.8',
  },
  blog: {
    meta: {
      cs: {
        title: 'Blog o AI automatizaci | REVAI',
        description:
          'Sledujte nejnovější trendy v AI, automatizaci procesů a hlasových asistentech. Praktické poznatky od českých odborníků.',
      },
      en: {
        title: 'AI Automation Blog | REVAI',
        description:
          'Follow the latest trends in AI, process automation and voice assistants. Practical insights from Czech experts.',
      },
    },
    priority: '0.7',
  },
  gdpr: {
    meta: {
      cs: {
        title: 'GDPR a ochrana osobních údajů | REVAI',
        description:
          'Transparentní informace o zpracování osobních údajů v souladu s GDPR. Zabezpečení, práva subjektů a kontaktní informace.',
      },
      en: {
        title: 'GDPR & Data Protection | REVAI',
        description:
          'Transparent information on personal data processing in compliance with GDPR. Security, data subject rights and contact details.',
      },
    },
    priority: '0.3',
  },
};

/**
 * 404 page meta (mirrors src/pages/NotFound.tsx). The prerendered 404.html is
 * served for unknown paths in both locales; it ships the Czech (x-default)
 * head — the SPA renders the locale-correct NotFound UI after hydration.
 */
export const NOT_FOUND_META: Record<Locale, LocalizedPageMeta> = {
  cs: {
    title: 'Stránka nenalezena (404) | REVAI',
    description:
      'Tato stránka neexistuje. Pokračujte na hlavní stránku, naše služby nebo kontakt.',
  },
  en: {
    title: 'Page not found (404) | REVAI',
    description:
      'This page does not exist. Continue to the homepage, our services or contact.',
  },
};
