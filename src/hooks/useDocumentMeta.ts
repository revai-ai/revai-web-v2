import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

const SITE_URL = 'https://automatizace-ai.cz';

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

    // Update og:url to canonical
    if (canonical) {
      const fullUrl = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`;
      setMetaContent('meta[property="og:url"]', fullUrl);

      let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.rel = 'canonical';
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.href = fullUrl;
    }
  }, [title, description, ogTitle, ogDescription, canonical]);
}
