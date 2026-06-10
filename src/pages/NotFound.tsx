import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFound() {
  const { language } = useLanguage();
  useDocumentMeta({
    title: language === 'cs' ? 'Stránka nenalezena (404) | REVAI' : 'Page not found (404) | REVAI',
    description:
      language === 'cs'
        ? 'Tato stránka neexistuje. Pokračujte na hlavní stránku, naše služby nebo kontakt.'
        : 'This page does not exist. Continue to the homepage, our services or contact.',
  });

  const copy = {
    cs: {
      code: '404',
      title: 'Stránka nenalezena',
      description: 'Stránka, kterou hledáte, neexistuje nebo byla přesunuta.',
      home: 'Hlavní stránka',
      services: 'Automatizace procesů',
      contact: 'Kontakt',
    },
    en: {
      code: '404',
      title: 'Page not found',
      description: 'The page you are looking for does not exist or has been moved.',
      home: 'Homepage',
      services: 'Process automation',
      contact: 'Contact',
    },
  };

  const c = copy[language];

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-32">
      <div className="max-w-xl text-center">
        <p className="text-ifl-signal font-semibold mb-4" aria-hidden="true">
          {c.code}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ifl-ink mb-4">{c.title}</h1>
        <p className="text-ifl-ink-70 mb-10">{c.description}</p>
        <nav aria-label={c.title} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-ifl-signal text-white font-semibold px-6 py-3 rounded-xl hover:bg-ifl-signal-dark transition-colors"
          >
            {c.home}
          </Link>
          <Link
            to="/sluzby/automatizace-procesu"
            className="border border-ifl-border text-ifl-ink font-semibold px-6 py-3 rounded-xl hover:bg-ifl-s1 transition-colors"
          >
            {c.services}
          </Link>
          <Link
            to="/kontakt"
            className="border border-ifl-border text-ifl-ink font-semibold px-6 py-3 rounded-xl hover:bg-ifl-s1 transition-colors"
          >
            {c.contact}
          </Link>
        </nav>
      </div>
    </main>
  );
}
