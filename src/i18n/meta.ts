import type { Locale } from './locales';
import { findRoute, localeFromPathname, pathForLocale } from './routes';

export const SITE_URL = 'https://automatizace-ai.cz';

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

export interface HreflangAlternate {
  hrefLang: 'cs' | 'en' | 'x-default';
  href: string;
}

/**
 * Reciprocal hreflang set for any mapped path (either locale form), per plan
 * §4.2: cs ↔ en pair, x-default → the bare Czech URL. Returns null for
 * unmapped pages (they emit no hreflang). Consumed client-side now via
 * useDocumentMeta; 3D prerender must emit the same data in served HTML.
 */
export function hreflangAlternatesFor(pathname: string): HreflangAlternate[] | null {
  const entry = findRoute(pathname);
  if (!entry) return null;
  return [
    { hrefLang: 'cs', href: absoluteUrl(entry.cs) },
    { hrefLang: 'en', href: absoluteUrl(entry.en) },
    { hrefLang: 'x-default', href: absoluteUrl(entry.cs) },
  ];
}

/**
 * Self-canonical path for the current locale: CZ pages canonicalize to the
 * bare path, EN pages to their /en path — never cross-locale (§4.2). The
 * `canonical` argument is the page's declared Czech bare path; `pathname` is
 * the current location.
 */
export function canonicalPathFor(canonical: string, pathname: string): string {
  const locale: Locale = localeFromPathname(pathname);
  if (locale === 'en') {
    return pathForLocale(canonical, 'en') ?? pathname;
  }
  return canonical;
}
