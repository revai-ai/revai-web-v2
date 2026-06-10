import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsData } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const projects = projectsData[language];
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projekty" replace />;
  }

  return (
    <div className="min-h-screen pt-20 bg-ifl-canvas">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/projekty"
          className="inline-flex items-center gap-2 text-sm font-medium text-ifl-ink-40 hover:text-ifl-ink transition-colors duration-200 mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          {t('Zpět na projekty', 'Back to projects')}
        </Link>

        <div className="animate-fade-in">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-ifl-s1 text-ifl-ink-70 mb-5">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ifl-ink leading-tight mb-6">
              {project.title}
            </h1>
            <p className="text-lg text-ifl-ink-70 leading-relaxed max-w-2xl">
              {project.cardDescription}
            </p>
          </div>

          <div className="w-full h-px bg-ifl-border mb-12" />

          <div className="space-y-6">
            <div className="bg-ifl-s1 rounded-2xl p-8 border border-ifl-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold text-sm">!</span>
                </div>
                <h2 className="text-xl font-bold text-ifl-ink">{t('Problém', 'Problem')}</h2>
              </div>
              <p className="text-ifl-ink-70 leading-relaxed text-base">
                {project.problem}
              </p>
            </div>

            <div className="bg-ifl-canvas rounded-2xl p-8 border border-ifl-border shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-ifl-signal flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">→</span>
                </div>
                <h2 className="text-xl font-bold text-ifl-ink">{t('Řešení', 'Solution')}</h2>
              </div>
              <p className="text-ifl-ink-70 leading-relaxed text-base mb-6">
                {project.solution}
              </p>
              <ul className="space-y-3">
                {project.solutionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-ifl-signal mt-0.5 flex-shrink-0" />
                    <span className="text-ifl-ink-70 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-ifl-canvas rounded-2xl p-8 border border-ifl-border shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-ifl-s2 flex items-center justify-center flex-shrink-0">
                  <span className="text-ifl-signal font-bold text-sm">✓</span>
                </div>
                <h2 className="text-xl font-bold text-ifl-ink">{t('Výsledek', 'Result')}</h2>
              </div>
              <p className="text-ifl-ink-70 leading-relaxed text-base mb-6">
                {project.result}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.resultPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-ifl-s1 rounded-xl px-4 py-3 border border-ifl-border"
                  >
                    <CheckCircle2 size={16} className="text-ifl-signal flex-shrink-0" />
                    <span className="text-ifl-ink text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-ifl-border bg-ifl-s1 p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-ifl-ink mb-3">
              {t('Chcete podobné řešení?', 'Looking for a similar solution?')}
            </h2>
            <p className="text-ifl-ink-70 mb-8 max-w-lg mx-auto">
              {t(
                'Navrhneme vám ho na míru — bezplatná konzultace bez závazků.',
                "We'll design one tailored to you — free consultation, no commitment.",
              )}
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark hover:shadow-lg transition-all duration-200"
            >
              {t('Nezávazná konzultace', 'Free Consultation')}
              <ArrowLeft size={16} className="rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
