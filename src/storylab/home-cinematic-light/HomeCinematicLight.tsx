import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CALENDAR_URL } from '../../config/site';
import CinematicScene from './CinematicScene';
import AfterScene from './AfterScene';
import './cinematic.css';

/**
 * Story Lab — /__story-lab/home-cinematic-light
 *
 * Branch-only creative prototype (exp/home-cinematic-light-one-shot).
 * Never indexed, never in the sitemap, never merged to main as-is.
 * One continuous scroll-driven world: business chaos assembling itself
 * into a calm AI-powered operating system.
 */
export default function HomeCinematicLight() {
  useEffect(() => {
    document.title = 'REVAI — Story Lab · Cinematic Light';
    // Lab routes are never indexed (Phase 4A §3). Removed on unmount so the
    // robots directive cannot leak into production routes via SPA navigation.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  return (
    <div className="variant-c min-h-screen bg-ifl-canvas text-ifl-ink antialiased">
      <LabHeader />
      <CinematicScene />
      <AfterScene />
      <footer className="border-t border-ifl-border-dim bg-ifl-canvas px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm font-semibold tracking-tight text-ifl-ink">
            REVAI
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ifl-ink-40">
            Story Lab prototype · internal R&D · noindex
          </p>
        </div>
      </footer>
    </div>
  );
}

function LabHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ifl-border-dim/60 bg-ifl-canvas/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-ifl-ink">
            REVAI
          </span>
          <span className="rounded-full border border-ifl-border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ifl-ink-40">
            Story Lab
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-ifl-ink-70 transition-colors duration-300 hover:text-ifl-ink sm:block"
          >
            Book a consultation
          </a>
          <Link
            to="/demo"
            className="inline-flex items-center justify-center rounded-full bg-ifl-signal px-5 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-ifl-signal-dark active:scale-[0.97]"
          >
            Request a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
