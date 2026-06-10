import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  const footerSections = {
    cs: [
      {
        title: 'SLUŽBY',
        links: [
          { name: 'Hlasoví asistenti', href: '/sluzby/hlasovi-agenti' },
          { name: 'Automatizace procesů', href: '/sluzby/automatizace-procesu' },
          { name: 'Tvorba moderních webů', href: '/sluzby/tvorba-modernich-webu' },
          { name: 'AI APP Development', href: '/sluzby/ai-app-development' },
        ],
      },
      {
        title: 'SPOLEČNOST',
        links: [
          { name: 'Reference', href: '/reference' },
          { name: 'Ceník', href: '/cenik' },
          { name: 'Blog', href: '/blog' },
          { name: 'Kontakt', href: '/kontakt' },
        ],
      },
      {
        title: 'PRÁVNÍ',
        links: [
          { name: 'GDPR + Bezpečnost', href: '/gdpr' },
        ],
      },
    ],
    en: [
      {
        title: 'SERVICES',
        links: [
          { name: 'Voice Assistants', href: '/sluzby/hlasovi-agenti' },
          { name: 'Process Automation', href: '/sluzby/automatizace-procesu' },
          { name: 'Modern Website Development', href: '/sluzby/tvorba-modernich-webu' },
          { name: 'AI APP Development', href: '/sluzby/ai-app-development' },
        ],
      },
      {
        title: 'COMPANY',
        links: [
          { name: 'References', href: '/reference' },
          { name: 'Pricing', href: '/cenik' },
          { name: 'Blog', href: '/blog' },
          { name: 'Contact', href: '/kontakt' },
        ],
      },
      {
        title: 'LEGAL',
        links: [
          { name: 'GDPR + Security', href: '/gdpr' },
        ],
      },
    ],
  };

  const currentSections = footerSections[language];

  return (
    <footer className="variant-c bg-ifl-s3 text-ifl-ink-70 border-t border-ifl-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4" aria-label="REVAI">
                <img
                  src="/logo-revai-forest-lift.webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 object-contain"
                />
                <span className="text-ifl-ink font-medium text-xl tracking-[0.14em] leading-none select-none">
                  REVAI
                </span>
              </Link>
              <p className="text-ifl-ink-70 mb-6 max-w-sm leading-relaxed">
                {t(
                  'Česká agentura na AI automatizaci - pomáháme firmám zvýšit efektivitu interních procesů',
                  'Czech AI automation agency - we help companies increase the efficiency of internal processes'
                )}
              </p>

              <div className="space-y-3 mb-6">
                <a href="mailto:info@automatizace-ai.cz" className="flex items-center space-x-3 text-ifl-ink-70 hover:text-ifl-signal transition-colors">
                  <Mail size={18} />
                  <span>info@automatizace-ai.cz</span>
                </a>
                <a href="tel:+420123456789" className="flex items-center space-x-3 text-ifl-ink-70 hover:text-ifl-signal transition-colors">
                  <Phone size={18} />
                  <span>+420 608 024 655</span>
                </a>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/110111764/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-ifl-canvas border border-ifl-border flex items-center justify-center text-ifl-ink-70 hover:bg-ifl-signal hover:text-white hover:border-ifl-signal transition-colors duration-200"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/revai_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-ifl-canvas border border-ifl-border flex items-center justify-center text-ifl-ink-70 hover:bg-ifl-signal hover:text-white hover:border-ifl-signal transition-colors duration-200"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {currentSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-ifl-ink font-semibold text-xs tracking-[0.18em] uppercase mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div className="border-t border-ifl-border mt-12 pt-8">
          <div className="text-center">
            <p className="text-ifl-ink-40 text-xs">
              {t('IČO: 05013500 | nám. Svobody 210/18, 669 02 Znojmo 2, Česko', 'ID: 05013500 | nám. Svobody 210/18, 669 02 Znojmo 2, Czech Republic')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
