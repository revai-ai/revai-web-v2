import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, canonicalPathFor, hreflangAlternatesFor } from '../i18n/meta';

interface DocumentMeta {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  /** The page's canonical Czech bare path; EN routes self-canonicalize via the route map. */
  canonical?: string;
}

const HREFLANG_ATTR = 'data-i18n-hreflang';

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
}

export function useDocumentMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  canonical,
}: DocumentMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDesc = ogDescription ?? description ?? '';

    if (description) {
      setMetaContent('meta[name="description"]', description);
    }
    setMetaContent('meta[property="og:title"]', resolvedOgTitle);
    setMetaContent('meta[name="twitter:title"]', resolvedOgTitle);
    if (resolvedOgDesc) {
      setMetaContent('meta[property="og:description"]', resolvedOgDesc);
      setMetaContent('meta[name="twitter:description"]', resolvedOgDesc);
    }

    // Client-side hreflang (3D moves this into served/prerendered HTML).
    // Cleared unconditionally so unmapped pages don't keep stale links.
    document
      .querySelectorAll(`link[${HREFLANG_ATTR}]`)
      .forEach((el) => el.remove());

    // Update og:url + canonical — locale-aware: never cross-locale (§4.2)
    if (canonical) {
      const selfCanonical = canonicalPathFor(canonical, pathname);
      const fullUrl = absoluteUrl(selfCanonical);
      setMetaContent('meta[property="og:url"]', fullUrl);

      let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.rel = 'canonical';
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.href = fullUrl;

      const alternates = hreflangAlternatesFor(canonical);
      if (alternates) {
        for (const { hrefLang, href } of alternates) {
          const link = document.createElement('link');
          link.rel = 'alternate';
          link.hreflang = hrefLang;
          link.href = href;
          link.setAttribute(HREFLANG_ATTR, '');
          document.head.appendChild(link);
        }
      }
    }
  }, [title, description, ogTitle, ogDescription, canonical, pathname]);
}
