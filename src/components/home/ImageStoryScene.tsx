import { motion, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { StorySceneC } from './imageStoryData';

interface LayerProps {
  scene: StorySceneC;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

// Identical timing to Variant B — same premium unhurried hold phases.
// Hold phases are 0.14 each, transitions 0.08 wide.
const TIMING: Array<[number, number, number, number]> = [
  [0.00, 0.00, 0.14, 0.22], // Scene 1 — hold 0.00–0.14, transition 0.14–0.22
  [0.14, 0.22, 0.36, 0.44], // Scene 2 — hold 0.22–0.36, transition 0.36–0.44
  [0.36, 0.44, 0.58, 0.66], // Scene 3 — hold 0.44–0.58, transition 0.58–0.66
  [0.58, 0.66, 0.80, 0.88], // Scene 4 — hold 0.66–0.80, transition 0.80–0.88
  [0.80, 0.88, 1.00, 1.00], // Scene 5 — hold 0.88–1.00
];

/**
 * One full-viewport image layer — two-layer composition.
 *
 * Layer A (blurred cover fill): object-cover, scaled up slightly more than the
 * viewport, blurred softly. Prevents any empty edge gaps when Layer B is contained.
 * Gets slightly more parallax/scale movement so the background feels alive.
 *
 * Layer B (foreground contain): object-contain, shows the full original image
 * composition including any natural negative space. Drifts gently — subtly alive
 * but never distracting from the text.
 */
export function StoryImageLayerC({ scene, index, total, progress }: LayerProps) {
  const [fi, hi, ho, fo] = TIMING[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Opacity: crossfades across the hold + transition windows.
  const opInput = isFirst
    ? [0, ho, fo]
    : isLast
      ? [fi, hi, 1]
      : [fi, hi, ho, fo];
  const opOutput = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, opInput, opOutput);

  const motionStart = isFirst ? 0 : fi;
  const motionEnd = isLast ? 1 : fo;

  // Layer A — more drift so the blurred backdrop feels alive.
  const bgScale = useTransform(progress, [motionStart, motionEnd], [1.10, 1.03]);
  const bgY = useTransform(progress, [motionStart, motionEnd], ['2%', '-2%']);

  // Layer B — gentle drift, shows full image without aggressive crop.
  const fgScale = useTransform(progress, [motionStart, motionEnd], [1.01, 0.99]);
  const fgY = useTransform(progress, [motionStart, motionEnd], ['1.2%', '-1.2%']);

  return (
    <motion.div className="absolute inset-0" style={{ opacity, zIndex: index }}>
      {/* Layer A — blurred cover fill; oversized so scaled motion never reveals edges */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: bgScale, y: bgY }}
        aria-hidden
      >
        <img
          src={scene.image}
          alt=""
          aria-hidden
          draggable={false}
          className="w-full h-full object-cover object-center select-none blur-2xl opacity-60"
        />
      </motion.div>

      {/* Layer B — foreground contain; shows the full image composition */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: fgScale, y: fgY }}
      >
        <img
          src={scene.image}
          alt=""
          aria-hidden
          draggable={false}
          onError={() => console.warn(`[ImageStory] Missing image asset: ${scene.image}`)}
          className="w-full h-full object-contain select-none"
          style={{ objectPosition: 'center' }}
        />
      </motion.div>
    </motion.div>
  );
}

/** Foreground key copy — crossfades with a small vertical settle. Timing unchanged. */
export function StoryCaptionC({ scene, index, total, progress }: LayerProps) {
  const { t } = useLanguage();
  const [fi, hi, ho, fo] = TIMING[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opInput = isFirst
    ? [0, ho, fo]
    : isLast
      ? [fi, hi, 1]
      : [fi, hi, ho, fo];
  const opOutput = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, opInput, opOutput);

  const yStart = isFirst ? 0 : fi;
  const yEnd = Math.min(hi + 0.05, ho);
  const y = useTransform(progress, [yStart, yEnd], [16, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center pointer-events-none"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
        <motion.div style={{ y }} className="max-w-[600px] pointer-events-auto">
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-6">
            {t(scene.eyebrow.cs, scene.eyebrow.en)}
          </p>
          <div className="text-[clamp(2rem,4.5vw,3.6rem)] font-bold text-ifl-ink leading-[0.96] tracking-[-0.01em] mb-5">
            {t(scene.headline.cs, scene.headline.en)}
            <br />
            <span className="text-ifl-ink-70">{t(scene.headlineAlt.cs, scene.headlineAlt.en)}</span>
          </div>
          <p className="text-base sm:text-lg text-ifl-ink-70 leading-relaxed max-w-[440px] tracking-[0.01em]">
            {t(scene.body.cs, scene.body.en)}
          </p>
          {scene.cta && (
            <a
              href={scene.cta.href}
              target={scene.cta.external ? '_blank' : undefined}
              rel={scene.cta.external ? 'noopener noreferrer' : undefined}
              className="mt-8 inline-flex items-center gap-3 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
            >
              {t(scene.cta.label.cs, scene.cta.label.en)}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Static (reduced-motion) single scene — no pin, no crossfade, no parallax.
 * Two-layer composition so the full image is visible without motion.
 */
export function StaticStorySceneC({ scene }: { scene: StorySceneC }) {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ifl-canvas">
      {/* Layer A — blurred cover fill */}
      <div className="absolute inset-0 scale-[1.06]" aria-hidden>
        <img
          src={scene.image}
          alt=""
          aria-hidden
          draggable={false}
          className="w-full h-full object-cover object-center select-none blur-2xl opacity-60"
        />
      </div>
      {/* Layer B — foreground contain; full image composition */}
      <div className="absolute inset-0">
        <img
          src={scene.image}
          alt=""
          aria-hidden
          draggable={false}
          onError={() => console.warn(`[ImageStory] Missing image asset: ${scene.image}`)}
          className="w-full h-full object-contain select-none"
          style={{ objectPosition: 'center' }}
        />
      </div>
      {/* Left-weighted scrim for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(246,244,239,0.96) 0%, rgba(246,244,239,0.86) 28%, rgba(246,244,239,0.45) 54%, rgba(246,244,239,0.05) 80%, rgba(246,244,239,0) 100%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10">
        <div className="max-w-[600px]">
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-6">
            {t(scene.eyebrow.cs, scene.eyebrow.en)}
          </p>
          <div className="text-[clamp(2rem,4.5vw,3.6rem)] font-bold text-ifl-ink leading-[0.96] tracking-[-0.01em] mb-5">
            {t(scene.headline.cs, scene.headline.en)}
            <br />
            <span className="text-ifl-ink-70">{t(scene.headlineAlt.cs, scene.headlineAlt.en)}</span>
          </div>
          <p className="text-base sm:text-lg text-ifl-ink-70 leading-relaxed max-w-[440px] tracking-[0.01em]">
            {t(scene.body.cs, scene.body.en)}
          </p>
          {scene.cta && (
            <a
              href={scene.cta.href}
              target={scene.cta.external ? '_blank' : undefined}
              rel={scene.cta.external ? 'noopener noreferrer' : undefined}
              className="mt-8 inline-flex items-center gap-3 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-ifl-signal-dark transition-all duration-300 ease-out group active:scale-[0.97]"
            >
              {t(scene.cta.label.cs, scene.cta.label.en)}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
