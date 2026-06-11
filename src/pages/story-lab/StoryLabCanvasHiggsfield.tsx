/**
 * Phase 4A — Storytelling Variant Lab
 * Branch: exp/story-lab-canvas-higgsfield
 * Route: /__story-lab/canvas-higgsfield
 *
 * Lab page for the canvas-Higgsfield variant. Renders the "Monolith of Strata"
 * cinematic morph sequence (M1–M5) as a scroll-driven stage story using the
 * accepted Higgsfield nano_banana_pro frames (Round 5 of the generation spike).
 *
 * Implementation: layered image crossfades (motion/react opacity, same
 * mechanism as the control/crossfade variant). A true <canvas> raster engine
 * is a Phase 4B hardening step.
 *
 * SEO safety:
 *   - noindex, nofollow injected client-side (route is never prerendered)
 *   - not in ROUTE_MAP, PAGE_META, or sitemap
 *   - served via existing /__story-lab/* SPA rewrite in _redirects
 *   - route exists only on exp/story-lab-canvas-higgsfield branch
 *
 * Lab-only. Must not be referenced from production components or routes.
 */

import { useEffect } from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import CanvasHiggsfieldStory from '../../components/story-lab/CanvasHiggsfieldStory';

export default function StoryLabCanvasHiggsfield() {
  useDocumentMeta({
    title: '[LAB] Canvas-Higgsfield — Phase 4A | story-lab',
    description:
      'Phase 4A storytelling variant lab — canvas-Higgsfield cinematic morph sequence. Noindex lab route.',
  });

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
      {/* Phase 4A evaluation banner — strip when extracting to Phase 4B */}
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
        Phase 4A Lab &nbsp;·&nbsp; exp/story-lab-canvas-higgsfield &nbsp;·&nbsp; DRAFT copy
        &nbsp;·&nbsp; noindex &nbsp;·&nbsp; Higgsfield Monolith of Strata (Round 5)
        &nbsp;·&nbsp; preview only — not production-ready
      </div>
      <CanvasHiggsfieldStory />
    </div>
  );
}
