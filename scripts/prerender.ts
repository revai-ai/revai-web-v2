import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { Plugin } from 'vite';
import type { Locale } from '../src/i18n/locales';
import { LOCALES } from '../src/i18n/locales';
import { ROUTE_MAP } from '../src/i18n/routes';
import { absoluteUrl, hreflangAlternatesFor } from '../src/i18n/meta';
import type { HreflangAlternate } from '../src/i18n/meta';
import { NOT_FOUND_META, PAGE_META } from '../src/i18n/pageMeta';

/**
 * Phase 3D — build-time prerender of the marketing route set (plan §5.1
 * option 3: per-route HTML shells with route-correct heads; zero new
 * dependencies). After `vite build` writes dist/, this plugin:
 *
 *  1. copies the untouched SPA shell to dist/spa-shell.html (the rewrite
 *     target for SPA-only routes: /projekty/:id, brochures),
 *  2. writes one HTML file per ROUTE_MAP entry × locale with route-correct
 *     <html lang>, title, meta description, canonical, hreflang cs/en/x-default
 *     and OG/Twitter title/description/url (values from src/i18n/pageMeta.ts —
 *     byte-copies of the runtime useDocumentMeta values, so served HTML and
 *     post-hydration DOM are identical),
 *  3. writes dist/404.html (noindex; Netlify serves it with status 404 via the
 *     final `/* /404.html 404` rule in _redirects),
 *  4. generates dist/sitemap.xml from ROUTE_MAP (canonical bare Czech URLs +
 *     shipped /en URLs; never /cs/*), overwriting the copied hand-maintained
 *     public/sitemap.xml.
 *
 * The body stays the empty SPA root (#root) — content renders client-side
 * exactly as before; only the served head changes (fixes audit R5).
 */

interface HeadValues {
  lang: Locale;
  title: string;
  description: string;
  /** Absolute self-canonical URL; null = emit no canonical (404 page). */
  canonicalUrl: string | null;
  alternates: HreflangAlternate[] | null;
  noindex?: boolean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Replace exactly one match or fail the build — never ship a half-templated head. */
function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string): string {
  if (!pattern.test(html)) {
    throw new Error(`[prerender] expected head pattern not found: ${label}`);
  }
  return html.replace(pattern, replacement);
}

function setMetaContent(
  html: string,
  attr: 'name' | 'property',
  key: string,
  value: string
): string {
  const pattern = new RegExp(`(<meta\\s[^>]*${attr}="${key}"[^>]*content=")[^"]*(")`);
  if (!pattern.test(html)) {
    throw new Error(`[prerender] expected meta tag not found: ${attr}="${key}"`);
  }
  return html.replace(pattern, (_match, before: string, after: string) => {
    return `${before}${escapeHtml(value)}${after}`;
  });
}

function renderHead(template: string, values: HeadValues): string {
  let html = template;

  html = replaceOnce(html, /(<html lang=")[^"]*(")/, `$1${values.lang}$2`, '<html lang>');
  html = replaceOnce(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(values.title)}</title>`,
    '<title>'
  );
  html = setMetaContent(html, 'name', 'description', values.description);
  html = setMetaContent(html, 'property', 'og:title', values.title);
  html = setMetaContent(html, 'property', 'og:description', values.description);
  html = setMetaContent(html, 'name', 'twitter:title', values.title);
  html = setMetaContent(html, 'name', 'twitter:description', values.description);

  const headLinks: string[] = [];
  if (values.canonicalUrl) {
    html = setMetaContent(html, 'property', 'og:url', values.canonicalUrl);
    headLinks.push(`<link rel="canonical" href="${values.canonicalUrl}" />`);
  }
  for (const alternate of values.alternates ?? []) {
    // data-i18n-hreflang marks the links for useDocumentMeta, which clears and
    // re-emits the set on hydration/route change — prevents duplicates and
    // stale pairs after client-side navigation.
    headLinks.push(
      `<link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.href}" data-i18n-hreflang="" />`
    );
  }
  if (values.noindex) {
    headLinks.push('<meta name="robots" content="noindex" />');
  }
  if (headLinks.length > 0) {
    const block = headLinks.map((line) => `    ${line}`).join('\n');
    html = replaceOnce(html, /\n\s*<\/head>/, `\n${block}\n  </head>`, '</head>');
  }
  return html;
}

/** '/'→ index.html, '/en/' → en/index.html, '/cenik' → cenik/index.html … */
function outputFileFor(outDir: string, urlPath: string): string {
  const trimmed = urlPath.replace(/\/+$/, '');
  return trimmed === '' ? join(outDir, 'index.html') : join(outDir, trimmed.slice(1), 'index.html');
}

function writeHtml(filePath: string, html: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, 'utf8');
}

function buildSitemap(): string {
  // Canonical bare Czech URLs first, then the shipped /en URLs. /cs/* paths
  // are redirects (Option A) and are deliberately never listed. lastmod is
  // deliberately omitted (plan §5.4 — no hand-set values).
  const entries = [
    ...ROUTE_MAP.map((entry) => ({ loc: absoluteUrl(entry.cs), priority: PAGE_META[entry.key].priority })),
    ...ROUTE_MAP.map((entry) => ({ loc: absoluteUrl(entry.en), priority: PAGE_META[entry.key].priority })),
  ];
  const body = entries
    .map(({ loc, priority }) =>
      ['  <url>', `    <loc>${loc}</loc>`, `    <priority>${priority}</priority>`, '  </url>'].join('\n')
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function prerenderPlugin(): Plugin {
  let outDir = 'dist';
  let root = process.cwd();

  return {
    name: 'revai-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },
    closeBundle() {
      const distDir = join(root, outDir);
      const template = readFileSync(join(distDir, 'index.html'), 'utf8');

      // 1. Pristine SPA shell for SPA-only routes (rewritten in _redirects).
      writeHtml(join(distDir, 'spa-shell.html'), template);

      // 2. Per-route, per-locale prerendered heads.
      let pageCount = 0;
      for (const entry of ROUTE_MAP) {
        const alternates = hreflangAlternatesFor(entry.cs);
        for (const locale of LOCALES) {
          const path = entry[locale];
          const html = renderHead(template, {
            lang: locale,
            title: PAGE_META[entry.key].meta[locale].title,
            description: PAGE_META[entry.key].meta[locale].description,
            canonicalUrl: absoluteUrl(path),
            alternates,
          });
          writeHtml(outputFileFor(distDir, path), html);
          pageCount += 1;
        }
      }

      // 3. Hard 404 (Czech/x-default head; SPA renders the locale-correct UI).
      const notFoundHtml = renderHead(template, {
        lang: 'cs',
        title: NOT_FOUND_META.cs.title,
        description: NOT_FOUND_META.cs.description,
        canonicalUrl: null,
        alternates: null,
        noindex: true,
      });
      writeHtml(join(distDir, '404.html'), notFoundHtml);

      // 4. Build-time sitemap (overwrites the copied public/sitemap.xml).
      writeFileSync(join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8');

      console.log(
        `[prerender] wrote ${pageCount} route heads (+404.html, spa-shell.html, sitemap.xml) to ${outDir}/`
      );
    },
  };
}
