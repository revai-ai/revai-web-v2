import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { STORY_SCENES_C, type StorySceneC } from './imageStoryData';

/**
 * Mobile-only story experience (below lg).
 *
 * The desktop pinned/crossfade scrollytelling reads awkwardly on narrow
 * screens, so on mobile the same five scenes are rendered as editorial stacked
 * story cards: eyebrow → headline → body → framed image card, on warm paper.
 *
 * No sticky pin, no crossfade, no parallax — only subtle opacity + translateY
 * reveals as each card enters view, disabled under prefers-reduced-motion.
 */
export default function MobileImageStoryStackC() {
  return (
    <section className="variant-c relative z-[1] overflow-x-hidden bg-ifl-canvas">
      {STORY_SCENES_C.map((scene, i) => (
        <MobileStorySceneC key={scene.id} scene={scene} index={i} />
      ))}
    </section>
  );
}

function MobileStorySceneC({ scene, index }: { scene: StorySceneC; index: number }) {
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
        {/* Eyebrow + thin mineral-forest stage line */}
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ifl-signal">
            {t(scene.eyebrow.cs, scene.eyebrow.en)}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-ifl-signal-mid to-transparent" />
        </div>

        {/* Headline — tonal editorial split */}
        <h3 className="mb-3 text-[1.7rem] font-bold leading-[1.04] tracking-[-0.01em] text-ifl-ink">
          {t(scene.headline.cs, scene.headline.en)}{' '}
          <span className="text-ifl-ink-70">{t(scene.headlineAlt.cs, scene.headlineAlt.en)}</span>
        </h3>

        {/* Body copy */}
        <p className="mb-7 text-[0.98rem] leading-relaxed tracking-[0.01em] text-ifl-ink-70">
          {t(scene.body.cs, scene.body.en)}
        </p>

        {/* Framed image card — text never sits over the artwork */}
        <div className="relative">
          {/* Pale offset card behind for quiet depth */}
          <div
            aria-hidden
            className="absolute -bottom-2.5 -right-2.5 h-full w-full rounded-[1.5rem] border border-ifl-border-dim bg-ifl-s1/70"
          />
          {/* Soft radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-[1] opacity-70"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 40%, rgba(79,111,74,0.10) 0%, rgba(79,111,74,0) 70%)',
            }}
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-ifl-border bg-ifl-s1 shadow-[0_18px_40px_-24px_rgba(30,27,22,0.45)]">
            {/* Blurred cover fill — prevents empty edges, keeps composition breathing */}
            <img
              src={scene.image}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-center opacity-50 blur-2xl"
            />
            {/* Foreground contain — full image composition, slightly inset so it reads */}
            <img
              src={scene.image}
              alt=""
              aria-hidden
              draggable={false}
              onError={() => console.warn(`[ImageStory] Missing image asset: ${scene.image}`)}
              className="absolute inset-0 h-full w-full select-none scale-95 object-contain object-center"
            />
            {/* Tiny decorative stage label — non-critical, stays readable on paper scrim */}
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ifl-canvas/85 px-2.5 py-1 backdrop-blur-sm">
              <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-ifl-ink-70">
                {stageNo}
              </span>
            </div>
          </div>
        </div>

        {/* Optional CTA — final scene only; prominent but content-fit, not oversized */}
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
