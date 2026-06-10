import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CALENDAR_URL } from '../config/site';

const serviceLinks = {
  cs: [
    { name: 'HLASOVÍ ASISTENTI', href: '/sluzby/hlasovi-agenti' },
    { name: 'AUTOMATIZACE PROCESŮ', href: '/sluzby/automatizace-procesu' },
    { name: 'TVORBA MODERNÍCH WEBŮ', href: '/sluzby/tvorba-modernich-webu' },
    { name: 'AI APP DEVELOPMENT', href: '/sluzby/ai-app-development' },
  ],
  en: [
    { name: 'VOICE ASSISTANTS', href: '/sluzby/hlasovi-agenti' },
    { name: 'PROCESS AUTOMATION', href: '/sluzby/automatizace-procesu' },
    { name: 'MODERN WEBSITE DEVELOPMENT', href: '/sluzby/tvorba-modernich-webu' },
    { name: 'AI APP DEVELOPMENT', href: '/sluzby/ai-app-development' },
  ],
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const currentServiceLinks = serviceLinks[language];

  return (
    <nav className="variant-c fixed top-0 left-0 right-0 z-50 bg-ifl-canvas/90 backdrop-blur-md border-b border-ifl-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5" aria-label="REVAI">
              <img
                src="/logo-revai-forest-lift.webp"
                alt=""
                aria-hidden="true"
                decoding="async"
                className="h-10 w-auto"
              />
              <span className="text-ifl-ink font-medium text-lg tracking-[0.14em] leading-none select-none">
                REVAI
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-sm font-medium text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="services-dropdown"
              >
                <span>{t('SLUŽBY', 'SERVICES')}</span>
                <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div id="services-dropdown" role="menu" className="absolute top-full left-0 mt-2 w-64 bg-ifl-canvas rounded-lg shadow-lg border border-ifl-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {currentServiceLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    role="menuitem"
                    className="block px-4 py-3 text-sm text-ifl-ink-70 hover:bg-ifl-s1 hover:text-ifl-signal transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/projekty"
              className="text-sm font-medium text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200"
            >
              {t('PROJEKTY', 'PROJECTS')}
            </Link>

            <Link
              to="/cenik"
              className="text-sm font-medium text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200"
            >
              {t('CENÍK', 'PRICING')}
            </Link>

            <Link
              to="/blog"
              className="text-sm font-medium text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200"
            >
              BLOG
            </Link>

            <Link
              to="/kontakt"
              className="text-sm font-medium text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200"
            >
              {t('KONTAKT', 'CONTACT')}
            </Link>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('cs')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === 'cs'
                    ? 'bg-ifl-signal text-white'
                    : 'text-ifl-ink-70 hover:bg-ifl-s1'
                }`}
              >
                CZ
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-ifl-signal text-white'
                    : 'text-ifl-ink-70 hover:bg-ifl-s1'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ifl-signal text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-ifl-signal-dark transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ifl-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ifl-canvas"
            >
              {t('NEZÁVAZNÁ KONZULTACE', 'FREE CONSULTATION')}
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-ifl-ink"
            aria-label={t('Otevřít navigaci', 'Open navigation')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-ifl-canvas border-t border-ifl-border">
          <div className="px-4 py-4 space-y-3">
            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200 font-medium py-2"
                aria-expanded={isMobileServicesOpen}
                aria-controls="mobile-services-list"
              >
                <span>{t('SLUŽBY', 'SERVICES')}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileServicesOpen && (
                <div id="mobile-services-list" className="pl-4 mt-2 space-y-2">
                  {currentServiceLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block text-sm text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/projekty"
              className="block text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('PROJEKTY', 'PROJECTS')}
            </Link>

            <Link
              to="/cenik"
              className="block text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('CENÍK', 'PRICING')}
            </Link>

            <Link
              to="/blog"
              className="block text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </Link>

            <Link
              to="/kontakt"
              className="block text-ifl-ink-70 hover:text-ifl-signal transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('KONTAKT', 'CONTACT')}
            </Link>

            <div className="flex items-center gap-2 py-2">
              <button
                onClick={() => setLanguage('cs')}
                className={`flex-1 px-3 py-2 rounded-full font-medium transition-colors ${
                  language === 'cs'
                    ? 'bg-ifl-signal text-white'
                    : 'text-ifl-ink-70 bg-ifl-s1'
                }`}
              >
                CZ
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 px-3 py-2 rounded-full font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-ifl-signal text-white'
                    : 'text-ifl-ink-70 bg-ifl-s1'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-ifl-signal text-white px-6 py-3 rounded-full font-semibold mt-4 text-center hover:bg-ifl-signal-dark transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ifl-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ifl-canvas"
            >
              {t('NEZÁVAZNÁ KONZULTACE', 'FREE CONSULTATION')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
