import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Workflow,
  PanelsTopLeft,
  AppWindow,
  AudioLines,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CALENDAR_URL } from '../../config/site';
import { EASE } from '../../config/motion';

/**
 * After the pinned transformation: the offer presented as modules of the
 * system the visitor just watched assemble, one graphite proof band for
 * contrast, and the closing CTA. Continuity over novelty — same tokens,
 * same serif voice, same sage rail language.
 */

interface ModuleDef {
  tag: string;
  icon: LucideIcon;
  title: string;
  body: string;
  note?: string;
}

const MODULES: ModuleDef[] = [
  {
    tag: 'Module 01',
    icon: Workflow,
    title: 'AI process automation',
    body: 'The busywork — intake, follow-ups, handoffs, reporting — runs itself. Your team keeps the judgment calls.',
  },
  {
    tag: 'Module 02',
    icon: PanelsTopLeft,
    title: 'Premium storytelling websites',
    body: 'A site that sells the way you would tell it in the room — and feeds every lead straight into the system.',
    note: 'You are scrolling one right now.',
  },
  {
    tag: 'Module 03',
    icon: AppWindow,
    title: 'Custom AI apps',
    body: 'When off-the-shelf stops fitting, we build the missing piece — quoting tools, client portals, internal copilots.',
  },
  {
    tag: 'Module 04',
    icon: AudioLines,
    title: 'AI voice assistants',
    body: 'Every call answered in your voice, booked into your calendar, logged into your pipeline. Around the clock.',
  },
];

const STATS = [
  { value: '30+', label: 'businesses running on REVAI systems' },
  { value: '4 000+', label: 'hours of manual work automated monthly' },
  { value: '98 %', label: 'of clients stay after the first year' },
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function AfterScene() {
  return (
    <>
      {/* ——— offer: modules of the same system ——— */}
      <section className="relative z-[1] bg-gradient-to-b from-ifl-canvas to-ifl-s1 px-6 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ifl-signal">
              What this becomes for you
            </p>
            <h2 className="sl-serif mb-5 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06] tracking-[-0.015em] text-ifl-ink">
              One system.{' '}
              <em className="italic text-ifl-signal">Four ways in.</em>
            </h2>
            <p className="text-base leading-relaxed text-ifl-ink-70 sm:text-lg">
              Every engagement plugs into the same operating core. Start where
              it hurts most — expand when you are ready.
            </p>
          </Reveal>

          <div className="relative">
            {/* the shared rail the modules dock onto */}
            <div
              className="absolute inset-x-8 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-ifl-signal-mid to-transparent lg:block"
              aria-hidden
            />
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {MODULES.map((mod, i) => (
                <Reveal key={mod.tag} delay={i * 0.08}>
                  <article className="group flex h-full flex-col rounded-2xl border border-ifl-border/70 bg-white/70 p-6 shadow-[0_18px_45px_-28px_rgba(30,27,22,0.35)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-ifl-signal/50 hover:shadow-[0_28px_60px_-28px_rgba(79,111,74,0.4)]">
                    <div className="mb-6 flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ifl-ink-40">
                        {mod.tag}
                      </p>
                      <span className="h-1.5 w-1.5 rounded-full bg-ifl-signal-mid transition-colors duration-500 group-hover:bg-ifl-signal" />
                    </div>
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-ifl-signal-tint text-ifl-signal">
                      <mod.icon size={18} strokeWidth={2} />
                    </div>
                    <h3 className="mb-2.5 text-lg font-semibold leading-snug text-ifl-ink">
                      {mod.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ifl-ink-70">
                      {mod.body}
                    </p>
                    {mod.note && (
                      <p className="sl-serif mt-4 text-sm italic text-ifl-signal">
                        {mod.note}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— proof: one graphite band of refined contrast ——— */}
      <section className="bg-ifl-ink px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-ifl-signal-mid">
              Why teams stay
            </p>
            <blockquote className="sl-serif mx-auto mb-14 max-w-3xl text-[clamp(1.7rem,4vw,3rem)] leading-[1.18] text-ifl-canvas">
              “We don’t sell software. We rebuild{' '}
              <em className="italic text-ifl-signal-mid">
                how a business flows.
              </em>
              ”
            </blockquote>
          </Reveal>
          <div className="grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 0.1}>
                <p className="mb-2 font-mono text-4xl font-bold tabular-nums leading-none text-ifl-signal-mid sm:text-5xl">
                  {stat.value}
                </p>
                <p className="text-sm leading-relaxed text-ifl-canvas/60">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— closing CTA ——— */}
      <section className="relative z-[1] overflow-hidden bg-ifl-canvas px-6 py-28 text-center lg:py-40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(210,220,185,0.35) 0%, rgba(234,240,230,0.15) 55%, transparent 75%)',
          }}
          aria-hidden
        />
        <Reveal className="relative mx-auto max-w-2xl">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ifl-signal">
            The next 20 minutes
          </p>
          <h2 className="sl-serif mb-6 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.015em] text-ifl-ink">
            See your business{' '}
            <em className="italic text-ifl-signal">in order.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-ifl-ink-70 sm:text-lg">
            Bring your messiest process. In twenty minutes we will show you
            what it looks like connected — your workflows, not a slide deck.
          </p>
          <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ifl-signal px-8 py-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-ifl-signal-dark active:scale-[0.97]"
            >
              Request a demo
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ifl-border px-8 py-4 text-base font-semibold text-ifl-ink transition-all duration-300 ease-out hover:border-ifl-ink-70 hover:bg-ifl-s1"
            >
              Book a consultation
            </a>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ifl-ink-40">
            No commitment — you leave with a map either way.
          </p>
        </Reveal>
      </section>
    </>
  );
}
