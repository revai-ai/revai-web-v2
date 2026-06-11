/**
 * Phase 4A — Storytelling Variant Lab
 * Branch: exp/story-lab-canvas-higgsfield
 *
 * Canvas-Higgsfield story component.
 *
 * Implementation note: this preview uses layered image crossfades (opacity via
 * motion/react, same pattern as the control/crossfade variant) rather than a
 * true <canvas> raster engine. A canvas frame-draw engine is a Phase 4B
 * hardening step if this variant wins the scorecard.
 *
 * The Higgsfield "Monolith of Strata" frames are designed with:
 *   - Left 35–40%: empty warm-paper void (the natural copy zone)
 *   - Right 60–65%: the dimensional cinematic object
 * The production scrim gradient covers the left portion identically to the
 * existing ImageStoryStack engine so copy reads cleanly over it.
 *
 * Lab-only. Must not be imported from production homepage components.
 */

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { CANVAS_HIGGSFIELD_STAGES } from './canvasHiggsfieldStages';
import type { CanvasHiggsfieldStage } from './canvasHiggsfieldStages';

// Hold and transition timing — identical to the production engine.
// Each hold phase is 14% of total progress; each transition crossfade is 8%.
const TIMING: Array<[number, number, number, number]> = [
  [0.00, 0.00, 0.14, 0.22],
  [0.14, 0.22, 0.36, 0.44],
  [0.36, 0.44, 0.58, 0.66],
  [0.58, 0.66, 0.80, 0.88],
  [0.80, 0.88, 1.00, 1.00],
];

export default function CanvasHiggsfieldStory() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isDesktop ? <DesktopStack /> : <MobileStack />;
}

// ─── Desktop ─────────────────────────────────────────────────────────────────

function DesktopStack() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 32,
    restDelta: 0.0005,
  });

  if (reduced) {
    return (
      <section className="bg-ifl-canvas">
        {CANVAS_HIGGSFIELD_STAGES.map((stage) => (
          <StaticStage key={stage.id} stage={stage} />
        ))}
      </section>
    );
  }

  const total = CANVAS_HIGGSFIELD_STAGES.length;

  return (
    <section
      ref={wrapRef}
      className="relative z-[1]"
      style={{ height: '1100vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ifl-canvas">
        {/* Image layers — all stacked, opacity controlled by scroll */}
        {CANVAS_HIGGSFIELD_STAGES.map((stage, i) => (
          <ImageLayer
            key={stage.id}
            stage={stage}
            index={i}
            total={total}
            progress={progress}
          />
        ))}

        {/* Left-weighted warm-paper scrim — lets copy read over the image's own quiet zone */}
        <div
          aria-hidden
          className="absolute inset-0 z-[10] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(246,244,239,0.97) 0%, rgba(246,244,239,0.88) 26%, rgba(246,244,239,0.50) 52%, rgba(246,244,239,0.06) 78%, rgba(246,244,239,0) 100%)',
          }}
        />
        {/* Top/bottom vignette */}
        <div
          aria-hidden
          className="absolute inset-0 z-[10] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(246,244,239,0.45) 0%, rgba(246,244,239,0) 20%, rgba(246,244,239,0) 80%, rgba(246,244,239,0.55) 100%)',
          }}
        />

        {/* Copy captions — overlaid on the left portion */}
        <div className="absolute inset-0 z-[20]">
          {CANVAS_HIGGSFIELD_STAGES.map((stage, i) => (
            <Caption
              key={stage.id}
              stage={stage}
              index={i}
              total={total}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Image layer ─────────────────────────────────────────────────────────────

interface LayerProps {
  stage: CanvasHiggsfieldStage;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ImageLayer({ stage, index, total, progress }: LayerProps) {
  const [fi, hi, ho, fo] = TIMING[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opInput = isFirst ? [0, ho, fo] : isLast ? [fi, hi, 1] : [fi, hi, ho, fo];
  const opOutput = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, opInput, opOutput);

  const motionStart = isFirst ? 0 : fi;
  const motionEnd = isLast ? 1 : fo;

  // Layer A: blurred cover fill — prevents edge gaps, gives depth
  const bgScale = useTransform(progress, [motionStart, motionEnd], [1.10, 1.03]);
  const bgY = useTransform(progress, [motionStart, motionEnd], ['2%', '-2%']);

  // Layer B: foreground contain — preserves composition, gentle drift
  const fgScale = useTransform(progress, [motionStart, motionEnd], [1.01, 0.99]);
  const fgY = useTransform(progress, [motionStart, motionEnd], ['1.2%', '-1.2%']);

  return (
    <motion.div className="absolute inset-0" style={{ opacity, zIndex: index }}>
      {/* Layer A — blurred backdrop */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ scale: bgScale, y: bgY }}
      >
        <img
          src={stage.image}
          alt=""
          aria-hidden
          draggable={false}
          className="h-full w-full select-none object-cover object-center blur-2xl opacity-60 scale-110"
        />
      </motion.div>

      {/* Layer B — foreground image, contained to preserve composition */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: fgScale, y: fgY }}
      >
        <img
          src={stage.image}
          alt=""
          aria-hidden
          draggable={false}
          className="h-full w-full select-none object-contain object-center"
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Caption ─────────────────────────────────────────────────────────────────

interface CaptionProps {
  stage: CanvasHiggsfieldStage;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Caption({ stage, index, total, progress }: CaptionProps) {
  const [fi, hi, ho, fo] = TIMING[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opInput = isFirst ? [0, ho, fo] : isLast ? [fi, hi, 1] : [fi, hi, ho, fo];
  const opOutput = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, opInput, opOutput);

  const yInput = isFirst ? [0, ho, fo] : isLast ? [fi, hi, 1] : [fi, hi, ho, fo];
  const yOutput = isFirst ? ['0px', '0px', '-20px'] : isLast ? ['20px', '0px', '0px'] : ['20px', '0px', '0px', '-20px'];
  const y = useTransform(progress, yInput, yOutput);

  const stageNo = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ opacity, zIndex: index }}
    >
      <motion.div
        className="w-full max-w-[44%] pl-10 pr-6 xl:pl-16 xl:max-w-[38%]"
        style={{ y }}
      >
        {/* Stage number + eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ifl-ink-40">
            {stageNo}
          </span>
          <span className="h-px w-8 bg-ifl-signal-mid" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ifl-signal">
            {stage.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h2 className="mb-4 text-[2.2rem] font-bold leading-[1.04] tracking-[-0.015em] text-ifl-ink xl:text-[2.6rem]">
          {stage.headline}{' '}
          {stage.headlineAlt && (
            <span className="text-ifl-ink-70">{stage.headlineAlt}</span>
          )}
        </h2>

        {/* Body */}
        <p className="mb-8 max-w-[32ch] text-[1rem] leading-relaxed tracking-[0.01em] text-ifl-ink-70 xl:text-[1.05rem]">
          {stage.body}
        </p>

        {/* CTA — only on final stage */}
        {stage.cta && (
          <a
            href={stage.cta.href}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ifl-signal px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 ease-out hover:bg-ifl-signal-dark active:scale-[0.97]"
          >
            {stage.cta.label}
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Static reduced-motion stage ─────────────────────────────────────────────

function StaticStage({ stage }: { stage: CanvasHiggsfieldStage }) {
  const stageNo = String(stage.moment).padStart(2, '0');
  return (
    <article className="relative h-screen overflow-hidden bg-ifl-canvas">
      {/* Background image */}
      <img
        src={stage.image}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-contain object-center opacity-70"
      />
      {/* Scrim */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(246,244,239,0.97) 0%, rgba(246,244,239,0.88) 30%, rgba(246,244,239,0.50) 55%, rgba(246,244,239,0.05) 80%, rgba(246,244,239,0) 100%)',
        }}
      />
      {/* Copy */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-[44%] pl-10 pr-6 xl:pl-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ifl-ink-40">
              {stageNo}
            </span>
            <span className="h-px w-8 bg-ifl-signal-mid" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ifl-signal">
              {stage.eyebrow}
            </span>
          </div>
          <h2 className="mb-4 text-[2.2rem] font-bold leading-[1.04] tracking-[-0.015em] text-ifl-ink xl:text-[2.6rem]">
            {stage.headline}{' '}
            {stage.headlineAlt && (
              <span className="text-ifl-ink-70">{stage.headlineAlt}</span>
            )}
          </h2>
          <p className="mb-8 max-w-[32ch] text-[1rem] leading-relaxed tracking-[0.01em] text-ifl-ink-70">
            {stage.body}
          </p>
          {stage.cta && (
            <a
              href={stage.cta.href}
              className="inline-flex items-center gap-2.5 rounded-full bg-ifl-signal px-6 py-3.5 text-[0.95rem] font-semibold text-white"
            >
              {stage.cta.label}
              <ArrowRight size={17} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Mobile stack ─────────────────────────────────────────────────────────────

function MobileStack() {
  return (
    <section className="relative z-[1] overflow-x-hidden bg-ifl-canvas">
      {CANVAS_HIGGSFIELD_STAGES.map((stage, i) => (
        <MobileStage key={stage.id} stage={stage} index={i} />
      ))}
    </section>
  );
}

function MobileStage({ stage, index }: { stage: CanvasHiggsfieldStage; index: number }) {
  const reduced = useReducedMotion();
  const stageNo = String(index + 1).padStart(2, '0');

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12% 0px -12% 0px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <article className="relative px-5 py-10 first:pt-12 last:pb-14">
      <motion.div {...reveal} className="mx-auto w-full max-w-md">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ifl-signal">
            {stage.eyebrow}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-ifl-signal-mid to-transparent" />
        </div>

        <h3 className="mb-3 text-[1.7rem] font-bold leading-[1.04] tracking-[-0.01em] text-ifl-ink">
          {stage.headline}{' '}
          {stage.headlineAlt && (
            <span className="text-ifl-ink-70">{stage.headlineAlt}</span>
          )}
        </h3>

        <p className="mb-7 text-[0.98rem] leading-relaxed tracking-[0.01em] text-ifl-ink-70">
          {stage.body}
        </p>

        {/* Image card */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -bottom-2.5 -right-2.5 h-full w-full rounded-[1.5rem] border border-ifl-border-dim bg-ifl-s1/70"
          />
          <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-ifl-border bg-ifl-s1 shadow-[0_18px_40px_-24px_rgba(30,27,22,0.45)]">
            <img
              src={stage.image}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-center opacity-40 blur-xl"
            />
            <img
              src={stage.image}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-contain object-center"
            />
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ifl-canvas/85 px-2.5 py-1 backdrop-blur-sm">
              <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-ifl-ink-70">
                {stageNo}
              </span>
            </div>
          </div>
        </div>

        {stage.cta && (
          <a
            href={stage.cta.href}
            className="group mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-ifl-signal px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 ease-out hover:bg-ifl-signal-dark active:scale-[0.97]"
          >
            {stage.cta.label}
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        )}
      </motion.div>
    </article>
  );
}
