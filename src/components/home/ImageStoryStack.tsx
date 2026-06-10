import { useRef } from 'react';
import { useScroll, useSpring, useReducedMotion } from 'motion/react';
import { STORY_SCENES_C } from './imageStoryData';
import { StoryImageLayerC, StoryCaptionC, StaticStorySceneC } from './ImageStoryScene';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import MobileImageStoryStackC from './MobileImageStoryStack';

/**
 * Responsive story switch.
 *
 * Desktop (lg and up): the approved cinematic pinned/crossfade scrollytelling
 * below. Mobile (below lg): editorial stacked story cards. The two are mutually
 * exclusive so the heavy pinned scroll timeline never mounts on narrow screens.
 */
export default function ImageStoryStackC() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isDesktop ? <DesktopImageStoryStackC /> : <MobileImageStoryStackC />;
}

/**
 * One pinned image-led scrollytelling block.
 *
 * All five full-viewport images are stacked absolutely inside a single sticky
 * stage. A single scroll timeline drives every layer — images crossfade, slowly
 * scale and parallax, while the foreground key copy crossfades in step.
 *
 * Left-weighted warm paper scrim keeps the graphite text readable over any
 * image, leaving the detailed right side of each render exposed.
 */
function DesktopImageStoryStackC() {
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

  // Reduced motion: no pin, no crossfade — five readable static image sections.
  if (reduced) {
    return (
      <div className="variant-c relative z-[1]">
        {STORY_SCENES_C.map((scene) => (
          <StaticStorySceneC key={scene.id} scene={scene} />
        ))}
      </div>
    );
  }

  const total = STORY_SCENES_C.length;

  return (
    <section
      ref={wrapRef}
      className="variant-c relative z-[1]"
      style={{ height: '1100vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ifl-canvas">
        {/* Image layers */}
        {STORY_SCENES_C.map((scene, i) => (
          <StoryImageLayerC
            key={scene.id}
            scene={scene}
            index={i}
            total={total}
            progress={progress}
          />
        ))}

        {/* Left-weighted warm paper scrim — graphite text readable, right imagery stays exposed */}
        <div
          className="absolute inset-0 z-[10] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(246,244,239,0.96) 0%, rgba(246,244,239,0.86) 26%, rgba(246,244,239,0.45) 52%, rgba(246,244,239,0.05) 78%, rgba(246,244,239,0) 100%)',
          }}
        />
        {/* Soft top/bottom vignette for premium framing */}
        <div
          className="absolute inset-0 z-[10] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(246,244,239,0.45) 0%, rgba(246,244,239,0) 20%, rgba(246,244,239,0) 80%, rgba(246,244,239,0.55) 100%)',
          }}
        />

        {/* Foreground key copy */}
        <div className="absolute inset-0 z-[20]">
          {STORY_SCENES_C.map((scene, i) => (
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
