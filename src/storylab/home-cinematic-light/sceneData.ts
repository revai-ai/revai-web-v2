import type { LucideIcon } from 'lucide-react';
import {
  Mail,
  MessageCircle,
  Phone,
  Globe,
  StickyNote,
  FileSpreadsheet,
  ClipboardCheck,
  RefreshCw,
  Sparkles,
  UserPlus,
  FileText,
  Calendar,
  Receipt,
  BarChart3,
} from 'lucide-react';

/**
 * Story Lab — "home-cinematic-light" scene data.
 *
 * One continuous world: every chip exists from frame one in a chaotic pose
 * and ends docked into the INTAKE → REVAI CORE → OUTCOMES lattice. The same
 * object transforms meaning (chaosStatus → calmStatus) instead of being
 * swapped out — that in-place transformation IS the story.
 */

/** lane 0 = intake, 1 = REVAI core, 2 = outcomes */
export type Lane = 0 | 1 | 2;

export interface ChipDef {
  id: string;
  icon: LucideIcon;
  label: string;
  /** status line while the world is still chaos */
  chaosStatus: string;
  /** status line once the chip docks into the system */
  calmStatus: string;
  /** scattered pose — x in vw, y in vh, r in deg, depth 0 far … 2 near */
  chaos: { x: number; y: number; r: number; depth: 0 | 1 | 2 };
  lane: Lane;
  /** docked vertical position (vh) in the desktop lattice */
  latticeY: number;
  /** order in which the signal thread calms this chip (visual left→right sweep) */
  calmOrder: number;
  /** included in the compact (mobile) scene */
  mobile?: boolean;
  /** docked vertical position (vh) in the compact lattice */
  latticeYMobile?: number;
}

export const LANE_X: [number, number, number] = [17, 50, 83];
export const LANE_X_COMPACT: [number, number, number] = [17, 50, 83];

export const LANE_LABELS = ['Intake', 'REVAI Core', 'Outcomes'];

export const CHIPS: ChipDef[] = [
  // ——— intake lane ———
  {
    id: 'inbox',
    icon: Mail,
    label: 'Inbox',
    chaosStatus: '47 unread',
    calmStatus: 'auto-triaged',
    chaos: { x: 12, y: 18, r: -8, depth: 2 },
    lane: 0,
    latticeY: 28,
    calmOrder: 2,
    mobile: true,
    latticeYMobile: 30,
  },
  {
    id: 'dms',
    icon: MessageCircle,
    label: 'DMs & chat',
    chaosStatus: '3 apps, no owner',
    calmStatus: 'one stream',
    chaos: { x: 30, y: 12, r: 6, depth: 1 },
    lane: 0,
    latticeY: 39.5,
    calmOrder: 4,
    mobile: true,
    latticeYMobile: 44,
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    chaosStatus: '2 missed today',
    calmStatus: 'AI answers 24/7',
    chaos: { x: 55, y: 9, r: -5, depth: 2 },
    lane: 0,
    latticeY: 51,
    calmOrder: 7,
    mobile: true,
    latticeYMobile: 58,
  },
  {
    id: 'webform',
    icon: Globe,
    label: 'Website',
    chaosStatus: 'forms → nowhere',
    calmStatus: 'straight to pipeline',
    chaos: { x: 78, y: 14, r: 9, depth: 1 },
    lane: 0,
    latticeY: 62.5,
    calmOrder: 10,
  },
  {
    id: 'notes',
    icon: StickyNote,
    label: 'Sticky notes',
    chaosStatus: '“call him back??”',
    calmStatus: 'captured & assigned',
    chaos: { x: 90, y: 30, r: -7, depth: 0 },
    lane: 0,
    latticeY: 74,
    calmOrder: 13,
  },
  // ——— REVAI core lane ———
  {
    id: 'triage',
    icon: Sparkles,
    label: 'Triage',
    chaosStatus: 'whoever sees it first',
    calmStatus: 'AI reads & routes',
    chaos: { x: 38, y: 86, r: -6, depth: 2 },
    lane: 1,
    latticeY: 31,
    calmOrder: 5,
    mobile: true,
    latticeYMobile: 36,
  },
  {
    id: 'spreadsheet',
    icon: FileSpreadsheet,
    label: 'Spreadsheet',
    chaosStatus: 'v14_FINAL_final',
    calmStatus: 'one source of truth',
    chaos: { x: 86, y: 55, r: 7, depth: 2 },
    lane: 1,
    latticeY: 45,
    calmOrder: 12,
    mobile: true,
    latticeYMobile: 54,
  },
  {
    id: 'approvals',
    icon: ClipboardCheck,
    label: 'Approvals',
    chaosStatus: 'waiting on Martin',
    calmStatus: 'routed & visible',
    chaos: { x: 80, y: 76, r: -9, depth: 1 },
    lane: 1,
    latticeY: 59,
    calmOrder: 11,
  },
  {
    id: 'rework',
    icon: RefreshCw,
    label: 'Re-typing',
    chaosStatus: '2 h every morning',
    calmStatus: 'runs itself at 06:00',
    chaos: { x: 62, y: 84, r: 5, depth: 0 },
    lane: 1,
    latticeY: 73,
    calmOrder: 8,
  },
  // ——— outcomes lane ———
  {
    id: 'lead',
    icon: UserPlus,
    label: 'New lead',
    chaosStatus: 'no reply · day 3',
    calmStatus: 'replied in 54 s',
    chaos: { x: 17, y: 80, r: 8, depth: 1 },
    lane: 2,
    latticeY: 28,
    calmOrder: 3,
    mobile: true,
    latticeYMobile: 30,
  },
  {
    id: 'quote',
    icon: FileText,
    label: 'Quote #218',
    chaosStatus: 'still in drafts',
    calmStatus: 'sent & tracked',
    chaos: { x: 6, y: 60, r: -10, depth: 0 },
    lane: 2,
    latticeY: 39.5,
    calmOrder: 0,
  },
  {
    id: 'booking',
    icon: Calendar,
    label: 'Booking',
    chaosStatus: 'double-booked',
    calmStatus: 'confirmed & synced',
    chaos: { x: 8, y: 38, r: 6, depth: 1 },
    lane: 2,
    latticeY: 51,
    calmOrder: 1,
    mobile: true,
    latticeYMobile: 44,
  },
  {
    id: 'invoice',
    icon: Receipt,
    label: 'Invoice',
    chaosStatus: 'overdue, unnoticed',
    calmStatus: 'paid & reconciled',
    chaos: { x: 68, y: 30, r: -12, depth: 0 },
    lane: 2,
    latticeY: 62.5,
    calmOrder: 9,
    mobile: true,
    latticeYMobile: 58,
  },
  {
    id: 'report',
    icon: BarChart3,
    label: 'The numbers',
    chaosStatus: 'gut feeling',
    calmStatus: 'live dashboard',
    chaos: { x: 42, y: 26, r: 4, depth: 0 },
    lane: 2,
    latticeY: 74,
    calmOrder: 6,
  },
];

/* ——— narrative ——— */

export const HERO_COPY = {
  eyebrow: 'REVAI · AI systems for business',
  /** headline rendered in the component so the accent span can be styled */
  titleA: 'Your business runs in',
  titleAccent: 'a dozen places',
  titleB: 'at once.',
  sub: 'Email, spreadsheets, DMs, missed calls, sticky notes — it all works, until it doesn’t. Scroll, and watch the same chaos become one calm system.',
  cue: 'Scroll to bring order',
};

export interface ActCaption {
  id: string;
  index: string;
  title: string;
  body: string;
  /** progress window: fade in between in[0]–in[1] */
  in: [number, number];
  /** progress window: fade out between out[0]–out[1] */
  out: [number, number];
}

export const ACT_CAPTIONS: ActCaption[] = [
  {
    id: 'scatter',
    index: 'Act I — The scatter',
    title: 'Every request finds you a different way. None of them wait.',
    body: 'Leads cool off in unread threads. Approvals stall in someone’s inbox. The spreadsheet has four versions — and every one of them is “final”.',
    in: [0.16, 0.21],
    out: [0.32, 0.36],
  },
  {
    id: 'signal',
    index: 'Act II — The signal',
    title: 'Then one quiet thread starts listening.',
    body: 'REVAI plugs into the places where work already happens. Nothing to migrate, nothing to retype. Every channel it touches goes calm — and stays heard.',
    in: [0.39, 0.44],
    out: [0.54, 0.58],
  },
  {
    id: 'system',
    index: 'Act III — The system',
    title: 'The same pieces. Finally in formation.',
    body: 'Every request lands in one stream. AI reads it, routes it, drafts the reply, books the call. Approvals move without being chased.',
    in: [0.61, 0.66],
    out: [0.76, 0.795],
  },
];

export const FINALE_COPY = {
  eyebrow: 'REVAI OS — all channels connected',
  titleA: 'Everything now works',
  titleAccent: 'together.',
  sub: 'Not a nicer website — an operating system for your demand. Intake, decisions, follow-through: one flow you can finally see.',
  primaryCta: 'Request a demo',
  secondaryCta: 'Book a consultation',
};

export interface RailAct {
  label: string;
  at: number;
}

export const RAIL_ACTS: RailAct[] = [
  { label: 'Open', at: 0 },
  { label: 'The scatter', at: 0.16 },
  { label: 'The signal', at: 0.38 },
  { label: 'The system', at: 0.58 },
  { label: 'Clarity', at: 0.8 },
];

/** signal thread — winds through the scattered field (0–100 scene space) */
export const THREAD_PATH =
  'M -4 58 C 12 30, 26 78, 42 52 C 52 36, 58 26, 70 34 C 84 44, 90 60, 104 50';
