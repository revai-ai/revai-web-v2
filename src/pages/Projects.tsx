import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { projectsData } from '../data/projects';
import BookConsultation from '../components/BookConsultation';

const INITIAL_COUNT = 6;

export default function Projects() {
  const { language, t } = useLanguage();
  useDocumentMeta({
    title: t('Realizované projekty | AMAI – AI Automatizace', 'Completed Projects | AMAI – AI Automation'),
    description: t(
      'Prohlédněte si naše realizované projekty v oblasti AI automatizace, hlasových asistentů a vývoje webových aplikací.',
      'Browse our completed projects in AI automation, voice assistants and web application development.'
    ),
    canonical: '/projekty',
  });
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const projects = projectsData[language];
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <div className="min-h-screen pt-20 bg-ifl-canvas">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest text-ifl-ink-40 uppercase mb-4">
              {t('Naše práce', 'Our Work')}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ifl-ink mb-6">
              {t('PROJEKTY', 'PROJECTS')}
            </h1>
            <p className="text-xl text-ifl-ink-70 max-w-2xl mx-auto leading-relaxed">
              {t(
                'Ukázky reálných řešení, která jsme doručili klientům napříč obory.',
                'A showcase of real solutions we delivered to clients across industries.',
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projekty/${project.id}`}
                className="group bg-ifl-canvas rounded-2xl border border-ifl-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden animate-slide-up"
                style={{ animationDelay: `${(index % INITIAL_COUNT) * 0.07}s` }}
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-ifl-s1 text-ifl-ink-70 group-hover:bg-ifl-signal/10 group-hover:text-ifl-signal transition-all duration-300">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-ifl-ink mb-3 leading-snug line-clamp-3">
                    {project.title}
                  </h2>

                  <p className="text-ifl-ink-70 text-sm leading-relaxed flex-1 line-clamp-3">
                    {project.cardDescription}
                  </p>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-ifl-ink group-hover:gap-3 transition-all duration-300">
                    <span className="text-ifl-signal">{t('Zobrazit projekt', 'View project')}</span>
                    <ArrowRight size={16} className="text-ifl-signal opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                <div className="h-0.5 w-0 group-hover:w-full bg-ifl-signal transition-all duration-500" />
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => setVisibleCount(projects.length)}
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-ifl-border text-ifl-ink-70 font-semibold hover:border-ifl-ink-70 hover:text-ifl-ink hover:shadow-sm transition-all duration-200 group"
              >
                <span>{t('Načíst další projekty', 'Load more projects')}</span>
                <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          )}
        </div>
      </section>

      <BookConsultation />
    </div>
  );
}
