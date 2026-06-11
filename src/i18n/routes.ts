import type { Locale } from './locales';
import { DEFAULT_LOCALE } from './locales';

export type RouteKey =
  | 'home'
  | 'processAutomation'
  | 'voiceAgents'
  | 'aiAppDevelopment'
  | 'modernWeb'
  | 'pricing'
  | 'contact'
  | 'demo'
  | 'projects'
  | 'references'
  | 'blog'
  | 'gdpr';

export interface RouteEntry {
  key: RouteKey;
  /** Canonical bare Czech path (Option A — never prefixed with /cs). */
  cs: string;
  /** Additive English path with English slugs under /en. */
  en: string;
}

/**
 * CZ↔EN slug table (Phase 3 plan §4.1, Option A). Used by routing, the
 * language switcher, client meta (canonical/hreflang) and, in 3D, by the
 * prerender + build-time sitemap.
 */
export const ROUTE_MAP: readonly RouteEntry[] = [
  { key: 'home', cs: '/', en: '/en/' },
  { key: 'processAutomation', cs: '/sluzby/automatizace-procesu', en: '/en/services/process-automation' },
  { key: 'voiceAgents', cs: '/sluzby/hlasovi-agenti', en: '/en/services/voice-assistants' },
  { key: 'aiAppDevelopment', cs: '/sluzby/ai-app-development', en: '/en/services/ai-app-development' },
  { key: 'modernWeb', cs: '/sluzby/tvorba-modernich-webu', en: '/en/services/premium-websites' },
  { key: 'pricing', cs: '/cenik', en: '/en/pricing' },
  { key: 'contact', cs: '/kontakt', en: '/en/contact' },
  { key: 'demo', cs: '/demo', en: '/en/demo' },
  { key: 'projects', cs: '/projekty', en: '/en/projects' },
  { key: 'references', cs: '/reference', en: '/en/references' },
  { key: 'blog', cs: '/blog', en: '/en/blog' },
  { key: 'gdpr', cs: '/gdpr', en: '/en/privacy' },
] as const;

/** Collapse trailing slashes so '/en/' and '/en' compare equal ('/' stays '/'). */
export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** Locale detection from pathname — URL is the source of truth. */
export function localeFromPathname(pathname: string): Locale {
  const p = normalizePath(pathname);
  return p === '/en' || p.startsWith('/en/') ? 'en' : DEFAULT_LOCALE;
}

/** Find the route entry matching a pathname in either locale form. */
export function findRoute(pathname: string): RouteEntry | undefined {
  const p = normalizePath(pathname);
  return ROUTE_MAP.find(
    (entry) => normalizePath(entry.cs) === p || normalizePath(entry.en) === p
  );
}

/**
 * Map a mapped path (given in either locale form) to its counterpart in the
 * target locale. Returns null when the page has no counterpart (e.g.
 * /projekty/:id, brochures) — callers decide the fallback.
 */
export function pathForLocale(pathname: string, target: Locale): string | null {
  const entry = findRoute(pathname);
  return entry ? entry[target] : null;
}

/** Language-switcher target: mapped counterpart, else the target locale's home. */
export function switcherTarget(pathname: string, target: Locale): string {
  return pathForLocale(pathname, target) ?? (target === 'en' ? '/en/' : '/');
}

/**
 * Internal links rendered while browsing the EN tree should stay in the EN
 * tree; unmapped pages keep their bare path.
 */
export function localizedHref(csPath: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return csPath;
  return pathForLocale(csPath, locale) ?? csPath;
}

/**
 * Legacy URLs folded into process automation. Mirrored here so /cs-prefixed
 * hits collapse to the final target in a single hop (no redirect chains).
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/sluzby/emailova-automatizace': '/sluzby/automatizace-procesu',
  '/sluzby/interni-agenti': '/sluzby/automatizace-procesu',
};

/**
 * /cs paths are never canonical (Option A): strip the prefix and resolve any
 * legacy slug so the in-app redirect lands on the final bare path directly.
 */
export function csRedirectTarget(pathname: string): string {
  const p = normalizePath(pathname);
  const stripped = p === '/cs' ? '/' : normalizePath(p.slice('/cs'.length));
  return LEGACY_REDIRECTS[stripped] ?? stripped;
}
