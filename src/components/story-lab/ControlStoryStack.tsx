/**
 * Phase 4A — Storytelling Variant Lab
 * Branch: exp/story-lab-control-crossfade
 *
 * Control variant: the existing five-scene crossfade engine, unchanged, fed
 * Phase 4A scene data. This is the baseline every other lab variant must beat.
 *
 * Engine components (StoryImageLayerC, StoryCaptionC, StaticStorySceneC) are
 * imported read-only from the production engine — no edits to those files.
 * The mobile card stack is replicated here with Phase 4A data since
 * MobileImageStoryStackC is hardcoded to the automation scene set.
 *
 * Lab-only. Must not be imported from production homepage components.
 */

import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  StoryImageLayerC,
  StoryCaptionC,
  StaticStorySceneC,
} from '../home/ImageStoryScene';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLanguage } from '../../contexts/LanguageContext';
import { CONTROL_LAB_SCENES } from './controlSceneData';
import type { StorySceneC } from '../home/imageStoryData';

export default function ControlStoryStack() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isDesktop ? <DesktopControlStack /> : <MobileControlStack />;
}

function DesktopControlStack() {
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
      <div className="variant-c relative z-[1]">
        {CONTROL_LAB_SCENES.map((scene) => (
          <StaticStorySceneC key={scene.id} scene={scene} />
        ))}
      </div>
    );
  }

  const total = CONTROL_LAB_SCENES.length;

  return (
    <section
      ref={wrapRef}
      className="variant-c relative z-[1]"
      style={{ height: '1100vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ifl-canvas">
        {CONTROL_LAB_SCENES.map((scene, i) => (
          <StoryImageLayerC
            key={scene.id}
            scene={scene}
            index={i}
            total={total}
            progress={progress}
          />
        ))}

        {/* Left-weighted warm paper scrim — identical to production engine */}
        <div
          className="absolute inset-0 z-[10] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(246,244,239,0.96) 0%, rgba(246,244,239,0.86) 26%, rgba(246,244,239,0.45) 52%, rgba(246,244,239,0.05) 78%, rgba(246,244,239,0) 100%)',
          }}
        />
        {/* Soft top/bottom vignette — identical to production engine */}
        <div
          className="absolute inset-0 z-[10] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(246,244,239,0.45) 0%, rgba(246,244,239,0) 20%, rgba(246,244,239,0) 80%, rgba(246,244,239,0.55) 100%)',
          }}
        />

        <div className="absolute inset-0 z-[20]">
          {CONTROL_LAB_SCENES.map((scene, i) => (
            <StoryCaptionC
              key={scene.id}
              scene={scene}
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

function MobileControlStack() {
  return (
    <section className="variant-c relative z-[1] overflow-x-hidden bg-ifl-canvas">
      {CONTROL_LAB_SCENES.map((scene, i) => (
        <MobileControlScene key={scene.id} scene={scene} index={i} />
      ))}
    </section>
  );
}

function MobileControlScene({ scene, index }: { scene: StorySceneC; index: number }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12% 0px -12% 0px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      };

  const stageNo = String(index + 1).padStart(2, '0');

  return (
    <article className="relative px-5 py-10 first:pt-12 last:pb-14">
      <motion.div {...reveal} className="mx-auto w-full max-w-md">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ifl-signal">
            {t(scene.eyebrow.cs, scene.eyebrow.en)}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-ifl-signal-mid to-transparent" />
        </div>

        <h3 className="mb-3 text-[1.7rem] font-bold leading-[1.04] tracking-[-0.01em] text-ifl-ink">
          {t(scene.headline.cs, scene.headline.en)}{' '}
          <span className="text-ifl-ink-70">{t(scene.headlineAlt.cs, scene.headlineAlt.en)}</span>
        </h3>

        <p className="mb-7 text-[0.98rem] leading-relaxed tracking-[0.01em] text-ifl-ink-70">
          {t(scene.body.cs, scene.body.en)}
        </p>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -bottom-2.5 -right-2.5 h-full w-full rounded-[1.5rem] border border-ifl-border-dim bg-ifl-s1/70"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-[1] opacity-70"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 40%, rgba(79,111,74,0.10) 0%, rgba(79,111,74,0) 70%)',
            }}
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-ifl-border bg-ifl-s1 shadow-[0_18px_40px_-24px_rgba(30,27,22,0.45)]">
            <img
              src={scene.image}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-center opacity-50 blur-2xl"
            />
            <img
              src={scene.image}
              alt=""
              aria-hidden
              draggable={false}
              onError={() => console.warn(`[ControlStoryStack] Missing image: ${scene.image}`)}
              className="absolute inset-0 h-full w-full select-none scale-95 object-contain object-center"
            />
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ifl-canvas/85 px-2.5 py-1 backdrop-blur-sm">
              <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-ifl-ink-70">
                {stageNo}
              </span>
            </div>
          </div>
        </div>

        {scene.cta && (
          <a
            href={scene.cta.href}
            target={scene.cta.external ? '_blank' : undefined}
            rel={scene.cta.external ? 'noopener noreferrer' : undefined}
            className="group mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-ifl-signal px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 ease-out hover:bg-ifl-signal-dark active:scale-[0.97]"
          >
            {t(scene.cta.label.cs, scene.cta.label.en)}
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
