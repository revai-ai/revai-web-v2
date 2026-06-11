import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CALENDAR_URL } from '../../config/site';
import { CHIPS, HERO_COPY, ACT_CAPTIONS, FINALE_COPY } from './sceneData';

/**
 * Reduced-motion fallback: the full narrative as a static editorial page —
 * hero, a before/after panel pair showing the same fragments in both states,
 * the three act captions, and the finale with CTAs. No pin, no timeline.
 */
export default function ReducedScene() {
  const sample = CHIPS.filter((c) => c.mobile);

  return (
    <section className="relative z-[1] bg-ifl-canvas px-6 pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-5xl">
        {/* hero */}
        <div className="mb-20 text-center">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-ifl-signal">
            {HERO_COPY.eyebrow}
          </p>
          <h1 className="sl-serif mx-auto mb-6 max-w-3xl text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.05] tracking-[-0.015em] text-ifl-ink">
            {HERO_COPY.titleA}{' '}
            <em className="italic text-ifl-signal">{HERO_COPY.titleAccent}</em>{' '}
            {HERO_COPY.titleB}
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-ifl-ink-70">
            {HERO_COPY.sub}
          </p>
        </div>

        {/* before / after */}
        <div className="mb-20 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-ifl-border/70 bg-white/55 p-6">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-ifl-ink-40">
              Before — the scatter
            </p>
            <ul className="space-y-3">
              {sample.map((chip) => (
                <li key={chip.id} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ifl-s1 text-ifl-ink-70">
                    <chip.icon size={15} strokeWidth={2} />
                  </span>
                  <span className="text-[13px] font-medium text-ifl-ink">
                    {chip.label}
                  </span>
                  <span className="ml-auto truncate text-[11px] text-ifl-ink-40">
                    {chip.chaosStatus}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center text-ifl-signal lg:flex-col">
            <ArrowRight size={22} className="rotate-90 lg:rotate-0" />
          </div>
          <div className="rounded-2xl border border-ifl-signal/40 bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgba(79,111,74,0.35)]">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-ifl-signal">
              After — the system
            </p>
            <ul className="space-y-3">
              {sample.map((chip) => (
                <li key={chip.id} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ifl-signal-tint text-ifl-signal">
                    <chip.icon size={15} strokeWidth={2} />
                  </span>
                  <span className="text-[13px] font-medium text-ifl-ink">
                    {chip.label}
                  </span>
                  <span className="ml-auto truncate text-[11px] text-ifl-signal">
                    {chip.calmStatus}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* acts */}
        <div className="mb-20 space-y-14">
          {ACT_CAPTIONS.map((act) => (
            <div key={act.id} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ifl-signal">
                {act.index}
              </p>
              <h2 className="sl-serif mb-3 text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] text-ifl-ink">
                {act.title}
              </h2>
              <p className="text-base leading-relaxed text-ifl-ink-70">{act.body}</p>
            </div>
          ))}
        </div>

        {/* finale */}
        <div className="text-center">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ifl-signal">
            {FINALE_COPY.eyebrow}
          </p>
          <h2 className="sl-serif mb-6 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] text-ifl-ink">
            {FINALE_COPY.titleA}{' '}
            <em className="italic text-ifl-signal">{FINALE_COPY.titleAccent}</em>
          </h2>
          <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-ifl-ink-70">
            {FINALE_COPY.sub}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ifl-signal px-8 py-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-ifl-signal-dark"
            >
              {FINALE_COPY.primaryCta}
              <ArrowRight size={18} />
            </Link>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ifl-border px-8 py-4 text-base font-semibold text-ifl-ink transition-all duration-300 ease-out hover:border-ifl-ink-70 hover:bg-ifl-s1"
            >
              {FINALE_COPY.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
