/**
 * Phase 4A — Storytelling Variant Lab
 * Branch: exp/story-lab-control-crossfade
 * Route: /__story-lab/control
 *
 * Lab page for the control/crossfade variant. Renders the existing five-scene
 * crossfade engine with Phase 4A scene data as the evaluation baseline.
 *
 * SEO safety:
 *   - noindex, nofollow injected client-side (route is not prerendered)
 *   - not in ROUTE_MAP, PAGE_META, or sitemap
 *   - route exists only on this experiment branch
 *
 * Lab-only. Must not be referenced from production components or routes.
 */

import { useEffect } from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import ControlStoryStack from '../../components/story-lab/ControlStoryStack';

export default function StoryLabControl() {
  useDocumentMeta({
    title: '[LAB] Control — Crossfade — Phase 4A | story-lab',
    description:
      'Phase 4A storytelling variant lab — control/crossfade baseline. Noindex lab route.',
  });

  // Inject noindex, nofollow. This route is never prerendered so the tag is
  // not in the served HTML shell — client-side injection is the only option
  // for an SPA-shell-served lab route. The robots tag is restored on unmount
  // in case of same-session navigation away from the lab route.
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prev = meta?.content ?? '';
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';
    return () => {
      if (meta) meta.content = prev;
    };
  }, []);

  return (
    <div>
      {/* Phase 4A evaluation banner — visible in local/preview only.
          Strip when extracting to Phase 4B production. */}
      <div
        style={{
          background: '#1a1a2e',
          color: '#94a3b8',
          padding: '6px 16px',
          fontSize: '11px',
          fontFamily: 'monospace',
          textAlign: 'center',
          letterSpacing: '0.05em',
        }}
      >
        Phase 4A Lab &nbsp;·&nbsp; exp/story-lab-control-crossfade &nbsp;·&nbsp; DRAFT copy
        &nbsp;·&nbsp; noindex &nbsp;·&nbsp; placeholder assets from /story/c/
      </div>
      <ControlStoryStack />
    </div>
  );
}
