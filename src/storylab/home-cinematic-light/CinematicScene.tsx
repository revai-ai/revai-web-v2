import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  cubicBezier,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { CALENDAR_URL } from '../../config/site';
import { EASE } from '../../config/motion';
import {
  CHIPS,
  LANE_X,
  LANE_X_COMPACT,
  LANE_LABELS,
  HERO_COPY,
  ACT_CAPTIONS,
  FINALE_COPY,
  RAIL_ACTS,
  THREAD_PATH,
} from './sceneData';
import type { ActCaption, ChipDef } from './sceneData';
import ReducedScene from './ReducedScene';

/**
 * One pinned cinematic world (~780vh of scroll).
 *
 * Every layer — scattered work fragments, lighting, the signal thread, the
 * lattice, captions and the finale — lives inside a single sticky stage and
 * is driven by one spring-smoothed scroll timeline. Nothing is swapped or
 * sectioned: the same chips that open the page in chaos end it docked into
 * the INTAKE → REVAI CORE → OUTCOMES system.
 */

const SCENE_EASE = cubicBezier(0.16, 1, 0.3, 1);

const clampNum = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const latticeYFor = (chip: ChipDef, compact: boolean) =>
  compact ? (chip.latticeYMobile ?? chip.latticeY) : chip.latticeY;

export default function CinematicScene() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (reduced) return <ReducedScene />;
  return <PinnedScene compact={!isDesktop} />;
}

function PinnedScene({ compact }: { compact: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 30,
    restDelta: 0.0005,
  });

  const chips = compact ? CHIPS.filter((c) => c.mobile) : CHIPS;

  /* camera: gentle push into the chaos, settle, then pull back for the finale */
  const fieldScale = useTransform(
    progress,
    [0, 0.34, 0.6, 0.8, 0.92],
    [1, 1.06, 1, 1, compact ? 0.8 : 0.85],
    { ease: SCENE_EASE },
  );
  const fieldY = useTransform(
    progress,
    [0.8, 0.92],
    ['0vh', compact ? '16vh' : '10vh'],
    { ease: SCENE_EASE },
  );
  /* compact finale: the copy stack needs most of the frame — ghost the lattice */
  const fieldOpacity = useTransform(progress, [0.8, 0.92], [1, compact ? 0.5 : 1]);

  /* lighting: restless multi-spot chaos light → one calm centered glow */
  const chaosLights = useTransform(progress, [0.42, 0.62], [1, 0]);
  const orderGlow = useTransform(progress, [0.58, 0.8], [0, 1]);

  /* hero copy: the camera scrolls straight through it */
  const heroOpacity = useTransform(progress, [0.07, 0.14], [1, 0]);
  const heroY = useTransform(progress, [0.07, 0.14], ['0vh', '-6vh']);
  const heroBlur = useTransform(progress, [0.07, 0.14], ['blur(0px)', 'blur(6px)']);

  /* the signal thread */
  const threadLength = useTransform(progress, [0.37, 0.56], [0, 1]);
  const threadOpacity = useTransform(
    progress,
    [0.36, 0.4, 0.58, 0.66],
    [0, 1, 1, 0],
  );

  /* lower-third caption scrim (acts I–III) */
  const scrimOpacity = useTransform(
    progress,
    [0.15, 0.2, 0.78, 0.82],
    [0, 1, 1, 0],
  );

  /* lane headers appear as the lattice forms */
  const laneOpacity = useTransform(progress, [0.68, 0.74], [0, 1]);
  const laneY = useTransform(progress, [0.68, 0.74], ['1.5vh', '0vh']);

  /* finale */
  const finaleOpacity = useTransform(progress, [0.82, 0.9], [0, 1]);
  const finaleY = useTransform(progress, [0.82, 0.91], ['4vh', '0vh'], {
    ease: SCENE_EASE,
  });
  const finaleEvents = useTransform(progress, (v) =>
    v > 0.84 ? ('auto' as const) : ('none' as const),
  );
  const flowOpacity = useTransform(progress, [0.78, 0.86], [0, 0.55]);

  const laneX = compact ? LANE_X_COMPACT : LANE_X;
  const connectors = buildConnectors(chips, laneX, compact);

  return (
    <section
      ref={wrapRef}
      className="relative z-[1]"
      style={{ height: compact ? '560vh' : '780vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ifl-canvas">
        {/* ——— lighting ——— */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: chaosLights }}
          aria-hidden
        >
          <div
            className="sl-drift-a absolute -left-[8%] top-[6%] w-[44%] aspect-square rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(214,209,200,0.5) 0%, rgba(214,209,200,0.16) 55%, transparent 75%)',
              filter: 'blur(50px)',
            }}
          />
          <div
            className="sl-drift-b absolute right-[2%] top-[28%] w-[38%] aspect-square rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(227,223,215,0.6) 0%, rgba(227,223,215,0.2) 55%, transparent 75%)',
              filter: 'blur(46px)',
            }}
          />
          <div
            className="sl-drift-a absolute left-[28%] bottom-[2%] w-[40%] aspect-square rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(204,200,191,0.42) 0%, rgba(204,200,191,0.14) 55%, transparent 75%)',
              filter: 'blur(54px)',
              animationDelay: '-7s',
            }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: orderGlow }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 48% at 50% 44%, rgba(210,220,185,0.4) 0%, rgba(234,240,230,0.18) 55%, transparent 75%)',
            }}
          />
        </motion.div>

        {/* ——— the world: chips + thread + lattice, one camera group ——— */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: fieldScale,
            y: fieldY,
            opacity: fieldOpacity,
            transformOrigin: '50% 62%',
          }}
        >
          {/* lattice connectors (drawn beneath the chips) */}
          <svg
            className="absolute inset-0 z-[1] h-full w-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {connectors.map((d, i) => (
              <ConnectorPath
                key={d}
                d={d}
                index={i}
                total={connectors.length}
                progress={progress}
                flowOpacity={flowOpacity}
              />
            ))}
          </svg>

          {/* lane headers */}
          {LANE_LABELS.map((label, i) => (
            <motion.div
              key={label}
              className="absolute z-[5] -translate-x-1/2 text-center pointer-events-none"
              style={{
                left: `${laneX[i]}vw`,
                top: compact ? '16vh' : '19vh',
                opacity: laneOpacity,
                y: laneY,
              }}
            >
              <p className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-ifl-signal whitespace-nowrap">
                {label}
              </p>
              <span className="mt-2 block h-3 w-px mx-auto bg-ifl-signal-mid" />
            </motion.div>
          ))}

          {/* the signal thread — woven between depth layers */}
          <svg
            className="absolute inset-0 z-[3] h-full w-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* user-unit strokes: non-scaling-stroke breaks pathLength dash math */}
            <motion.path
              d={THREAD_PATH}
              fill="none"
              stroke="#4F6F4A"
              strokeWidth={0.5}
              strokeLinecap="round"
              style={{
                pathLength: threadLength,
                opacity: threadOpacity,
                filter: 'blur(4px)',
              }}
            />
            <motion.path
              d={THREAD_PATH}
              fill="none"
              stroke="#4F6F4A"
              strokeWidth={0.16}
              strokeLinecap="round"
              style={{ pathLength: threadLength, opacity: threadOpacity }}
            />
          </svg>

          {/* work fragments */}
          {chips.map((chip, i) => (
            <SceneChip
              key={chip.id}
              chip={chip}
              index={i}
              total={chips.length}
              progress={progress}
              compact={compact}
              laneX={laneX}
            />
          ))}
        </motion.div>

        {/* ——— vignette + grain ——— */}
        <div
          className="absolute inset-0 z-[6] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 58%, rgba(30,27,22,0.05) 100%)',
          }}
          aria-hidden
        />

        {/* ——— hero (act 0) ——— */}
        <motion.div
          className="absolute inset-0 z-[8] flex items-center justify-center px-6 pointer-events-none"
          style={{ opacity: heroOpacity, y: heroY, filter: heroBlur }}
        >
          <div className="max-w-4xl text-center">
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.32em] text-ifl-signal mb-7"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            >
              {HERO_COPY.eyebrow}
            </motion.p>
            <motion.h1
              className="sl-serif text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.04] tracking-[-0.015em] text-ifl-ink mb-7"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
            >
              {HERO_COPY.titleA}{' '}
              <em className="italic text-ifl-signal">{HERO_COPY.titleAccent}</em>{' '}
              {HERO_COPY.titleB}
            </motion.h1>
            <motion.p
              className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-ifl-ink-70 mb-12"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.42, ease: EASE }}
            >
              {HERO_COPY.sub}
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ifl-ink-40">
                {HERO_COPY.cue}
              </span>
              <span className="sl-cue block h-12 w-px bg-ifl-ink-40" />
            </motion.div>
          </div>
        </motion.div>

        {/* ——— lower-third caption scrim + act captions ——— */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[9] h-[40%] pointer-events-none"
          style={{
            opacity: scrimOpacity,
            background:
              'linear-gradient(to top, rgba(246,244,239,0.94) 0%, rgba(246,244,239,0.6) 55%, transparent 100%)',
          }}
          aria-hidden
        />
        {ACT_CAPTIONS.map((act) => (
          <Caption key={act.id} act={act} progress={progress} />
        ))}

        {/* ——— finale ——— */}
        <motion.div
          className={`absolute inset-x-0 top-0 z-[19] pointer-events-none ${
            compact ? 'h-[80%]' : 'h-[66%]'
          }`}
          style={{
            opacity: finaleOpacity,
            background:
              'linear-gradient(to bottom, rgba(246,244,239,0.98) 0%, rgba(246,244,239,0.9) 52%, transparent 100%)',
          }}
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 z-[20] flex flex-col items-center px-6"
          style={{ opacity: finaleOpacity, y: finaleY, pointerEvents: finaleEvents }}
        >
          <div className="mt-[10vh] lg:mt-[9vh] max-w-3xl text-center">
            <p className="mb-6 flex items-center justify-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-ifl-signal">
              <span className="sl-pulse inline-block h-1.5 w-1.5 rounded-full bg-ifl-signal" />
              {FINALE_COPY.eyebrow}
            </p>
            <h2 className="sl-serif text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.05] tracking-[-0.015em] text-ifl-ink mb-6">
              {FINALE_COPY.titleA}{' '}
              <em className="italic text-ifl-signal">{FINALE_COPY.titleAccent}</em>
            </h2>
            <p className="mx-auto mb-9 max-w-xl text-base sm:text-lg leading-relaxed text-ifl-ink-70">
              {FINALE_COPY.sub}
            </p>
            <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ifl-signal px-8 py-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-ifl-signal-dark active:scale-[0.97]"
              >
                {FINALE_COPY.primaryCta}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ifl-border bg-ifl-canvas/70 px-8 py-4 text-base font-semibold text-ifl-ink transition-all duration-300 ease-out hover:border-ifl-ink-70 hover:bg-ifl-s1"
              >
                {FINALE_COPY.secondaryCta}
              </a>
            </div>
            <FinaleStatusRow />
          </div>
        </motion.div>

        {/* ——— progress rail ——— */}
        {!compact && <ProgressRail progress={progress} />}

        {/* ——— film grain ——— */}
        <div
          className="sl-grain absolute inset-0 z-[40] pointer-events-none opacity-[0.05]"
          aria-hidden
        />
      </div>
    </section>
  );
}

/* ————————————————— chips ————————————————— */

interface SceneChipProps {
  chip: ChipDef;
  index: number;
  total: number;
  progress: MotionValue<number>;
  compact: boolean;
  laneX: [number, number, number];
}

const DEPTH_SCALE = [0.85, 0.95, 1.04] as const;
const DEPTH_BLUR = [2.6, 1.3, 0] as const;
const DEPTH_Z = ['z-[2]', 'z-[3]', 'z-[4]'] as const;

function SceneChip({ chip, index, total, progress, compact, laneX }: SceneChipProps) {
  const cx = compact ? clampNum(chip.chaos.x, 14, 86) : chip.chaos.x;
  const cy = chip.chaos.y;
  const targetX = laneX[chip.lane];
  const targetY = latticeYFor(chip, compact);

  /* the thread sweeps left→right calming chips; later they glide into formation */
  const calmStart = 0.38 + (chip.calmOrder / total) * 0.16;
  const calmEnd = calmStart + 0.05;
  const moveStart = 0.58 + (index / total) * 0.1;
  const moveEnd = moveStart + 0.12;

  const depthScale = DEPTH_SCALE[chip.chaos.depth];
  const depthBlur = DEPTH_BLUR[chip.chaos.depth];

  const x = useTransform(
    progress,
    [0, moveStart, moveEnd],
    [`${cx}vw`, `${cx}vw`, `${targetX}vw`],
    { ease: SCENE_EASE },
  );
  const y = useTransform(
    progress,
    [0, moveStart, moveEnd],
    [`${cy}vh`, `${cy}vh`, `${targetY}vh`],
    { ease: SCENE_EASE },
  );
  const rotate = useTransform(
    progress,
    [0, calmStart, calmEnd],
    [chip.chaos.r, chip.chaos.r, 0],
    { ease: SCENE_EASE },
  );
  const scale = useTransform(
    progress,
    [0, calmStart, calmEnd],
    [depthScale, depthScale, compact ? 0.95 : 1],
  );
  const filter = useTransform(progress, [0, calmStart, calmEnd], [
    `blur(${depthBlur}px)`,
    `blur(${depthBlur}px)`,
    'blur(0px)',
  ]);
  const ringOpacity = useTransform(progress, [calmStart, calmEnd], [0, 1]);
  const chaosStatusOpacity = useTransform(
    progress,
    [moveStart + 0.05, moveStart + 0.1],
    [1, 0],
  );
  const calmStatusOpacity = useTransform(
    progress,
    [moveStart + 0.05, moveStart + 0.1],
    [0, 1],
  );
  const iconBg = useTransform(progress, [calmStart, calmEnd], ['#EDEBE5', '#EAF0E6']);
  const iconColor = useTransform(progress, [calmStart, calmEnd], ['#56524C', '#4F6F4A']);

  const Icon = chip.icon;

  return (
    <div
      className={`absolute left-0 top-0 ${DEPTH_Z[chip.chaos.depth]} -translate-x-1/2 -translate-y-1/2`}
    >
      <motion.div
        style={{ x, y, rotate, scale, filter, willChange: 'transform, filter' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.06 * index, ease: EASE }}
      >
        <div
          className="sl-float"
          style={
            {
              '--sl-dur': `${5 + (index % 5)}s`,
              '--sl-delay': `${-index * 0.7}s`,
            } as CSSProperties
          }
        >
          <div
            className={`relative flex items-center rounded-xl border border-ifl-border/70 bg-white/60 backdrop-blur-sm shadow-[0_14px_40px_-18px_rgba(30,27,22,0.3)] ${
              compact ? 'w-[7.5rem] gap-1.5 p-2' : 'w-44 gap-2.5 p-3'
            }`}
          >
            <motion.div
              className={`flex shrink-0 items-center justify-center rounded-lg ${
                compact ? 'h-6 w-6' : 'h-8 w-8'
              }`}
              style={{ backgroundColor: iconBg, color: iconColor }}
            >
              <Icon size={compact ? 12 : 15} strokeWidth={2} />
            </motion.div>
            <div className="min-w-0 flex-1">
              <p
                className={`truncate font-medium text-ifl-ink ${
                  compact ? 'text-[10px]' : 'text-[13px]'
                }`}
              >
                {chip.label}
              </p>
              <div className="relative">
                <motion.p
                  className={`truncate text-ifl-ink-40 ${
                    compact ? 'text-[9px]' : 'text-[11px]'
                  }`}
                  style={{ opacity: chaosStatusOpacity }}
                >
                  {chip.chaosStatus}
                </motion.p>
                <motion.p
                  className={`absolute inset-0 truncate text-ifl-signal ${
                    compact ? 'text-[9px]' : 'text-[11px]'
                  }`}
                  style={{ opacity: calmStatusOpacity }}
                >
                  {chip.calmStatus}
                </motion.p>
              </div>
            </div>
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-[13px] border border-ifl-signal/45"
              style={{
                opacity: ringOpacity,
                boxShadow: '0 0 24px rgba(79,111,74,0.18)',
              }}
              aria-hidden
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ————————————————— connectors ————————————————— */

function buildConnectors(
  chips: ChipDef[],
  laneX: [number, number, number],
  compact: boolean,
): string[] {
  const byLane = (lane: number) =>
    chips
      .filter((c) => c.lane === lane)
      .sort((a, b) => latticeYFor(a, compact) - latticeYFor(b, compact));
  const intake = byLane(0);
  const core = byLane(1);
  const out = byLane(2);
  const hw = compact ? 10 : 4; // connector endpoint offset from lane center (vw-ish units)

  const curve = (xa: number, ya: number, xb: number, yb: number) =>
    `M ${xa} ${ya} C ${xa + (xb - xa) * 0.45} ${ya}, ${xb - (xb - xa) * 0.45} ${yb}, ${xb} ${yb}`;

  const paths: string[] = [];
  intake.forEach((c, i) => {
    const target = core[Math.min(i, core.length - 1)];
    paths.push(
      curve(
        laneX[0] + hw,
        latticeYFor(c, compact),
        laneX[1] - hw,
        latticeYFor(target, compact),
      ),
    );
  });
  out.forEach((c, i) => {
    const source = core[Math.min(i, core.length - 1)];
    paths.push(
      curve(
        laneX[1] + hw,
        latticeYFor(source, compact),
        laneX[2] - hw,
        latticeYFor(c, compact),
      ),
    );
  });
  return paths;
}

interface ConnectorPathProps {
  d: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  flowOpacity: MotionValue<number>;
}

function ConnectorPath({ d, index, total, progress, flowOpacity }: ConnectorPathProps) {
  const start = 0.66 + (index / total) * 0.12;
  const pathLength = useTransform(progress, [start, start + 0.09], [0, 1], {
    ease: SCENE_EASE,
  });
  const opacity = useTransform(progress, [start, start + 0.04], [0, 0.85]);

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="#CBD8C7"
        strokeWidth={0.14}
        strokeLinecap="round"
        style={{ pathLength, opacity }}
      />
      <motion.path
        className="sl-flow"
        d={d}
        fill="none"
        stroke="#4F6F4A"
        strokeWidth={0.18}
        strokeLinecap="round"
        style={{ opacity: flowOpacity }}
      />
    </g>
  );
}

/* ————————————————— captions ————————————————— */

function Caption({ act, progress }: { act: ActCaption; progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [act.in[0], act.in[1], act.out[0], act.out[1]],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [act.in[0], act.in[1]], ['2.5vh', '0vh'], {
    ease: SCENE_EASE,
  });

  return (
    <motion.div
      className="absolute inset-x-0 bottom-[6vh] lg:bottom-[7vh] z-[10] px-6 text-center pointer-events-none"
      style={{ opacity, y }}
    >
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ifl-signal">
        {act.index}
      </p>
      <h2 className="sl-serif mx-auto mb-4 max-w-3xl text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-ifl-ink">
        {act.title}
      </h2>
      <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-ifl-ink-70">
        {act.body}
      </p>
    </motion.div>
  );
}

/* ————————————————— finale status row ————————————————— */

function FinaleStatusRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-ifl-ink-40">
      <span>
        <span className="text-ifl-ink">12 places</span> → 1 system
      </span>
      <span className="text-ifl-border" aria-hidden>
        ·
      </span>
      <span>&lt; 1 min first response</span>
      <span className="text-ifl-border" aria-hidden>
        ·
      </span>
      <span>0 leads dropped</span>
    </div>
  );
}

/* ————————————————— progress rail ————————————————— */

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => {
    let idx = 0;
    for (let i = 0; i < RAIL_ACTS.length; i++) {
      if (v >= RAIL_ACTS[i].at) idx = i;
    }
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <div
      className="absolute right-7 top-1/2 z-[30] hidden -translate-y-1/2 items-center gap-3 lg:flex"
      style={{ height: '42vh' }}
      aria-hidden
    >
      <span
        key={active}
        className="sl-label-in font-mono text-[9px] uppercase tracking-[0.22em] text-ifl-ink-40 [writing-mode:vertical-rl]"
      >
        {RAIL_ACTS[active].label}
      </span>
      <div className="relative h-full w-px bg-ifl-border">
        <motion.div
          className="absolute inset-x-0 top-0 h-full w-px origin-top bg-ifl-signal"
          style={{ scaleY: progress }}
        />
        {RAIL_ACTS.map((act, i) => (
          <span
            key={act.label}
            className={`absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500 ${
              i <= active
                ? 'border-ifl-signal bg-ifl-signal'
                : 'border-ifl-border bg-ifl-canvas'
            }`}
            style={{ top: `${act.at * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
