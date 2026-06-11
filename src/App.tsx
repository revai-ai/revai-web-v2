import { lazy, Suspense } from 'react';
import type { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LocaleSync from './i18n/LocaleSync';
import { ROUTE_MAP, normalizePath, csRedirectTarget } from './i18n/routes';
import type { RouteKey } from './i18n/routes';
import Home from './pages/Home';

const References = lazy(() => import('./pages/References'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const DemoRequest = lazy(() => import('./pages/DemoRequest'));
const VoiceAgents = lazy(() => import('./pages/services/VoiceAgents'));
const InternalAgents = lazy(() => import('./pages/services/InternalAgents'));
const ModernWebDevelopment = lazy(() => import('./pages/services/ModernWebDevelopment'));
const AIAppDevelopment = lazy(() => import('./pages/services/AIAppDevelopment'));
const BrochureHotely = lazy(() => import('./pages/brochures/BrochureHotely'));
const BrochureZdravotnictvi = lazy(() => import('./pages/brochures/BrochureZdravotnictvi'));
const BrochureAutoservisy = lazy(() => import('./pages/brochures/BrochureAutoservisy'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const GDPR = lazy(() => import('./pages/GDPR'));
const NotFound = lazy(() => import('./pages/NotFound'));
/* Story Lab (branch-only, Phase 4A §3): noindex prototype, never merged to main */
const HomeCinematicLightLab = lazy(
  () => import('./storylab/home-cinematic-light/HomeCinematicLight'),
);

const BROCHURE_PATHS = ['/brozura-hotely', '/brozura-zdravotnictvi', '/brozura-autoservisy'];

/* Phase 3C: /en tree renders the same components — copy localizes via the
   existing language system, with the locale driven by the URL (LocaleSync). */
const EN_ROUTE_ELEMENTS: Record<RouteKey, ReactElement> = {
  home: <Home />,
  processAutomation: <InternalAgents />,
  voiceAgents: <VoiceAgents />,
  aiAppDevelopment: <AIAppDevelopment />,
  modernWeb: <ModernWebDevelopment />,
  pricing: <PricingPage />,
  contact: <Contact />,
  demo: <DemoRequest />,
  projects: <Projects />,
  references: <References />,
  blog: <Blog />,
  gdpr: <GDPR />,
};

/* Phase 3C: /cs paths are never canonical (Option A) — in-app mirror of the
   _redirects 301s; resolves legacy slugs directly so no hop chains form. */
function CsRedirect() {
  const location = useLocation();
  return <Navigate to={csRedirectTarget(location.pathname)} replace />;
}

function AppLayout() {
  const location = useLocation();
  const isBrochure = BROCHURE_PATHS.includes(location.pathname);
  /* Story Lab routes are standalone cinematic surfaces — no site chrome */
  const isStoryLab = location.pathname.startsWith('/__story-lab');

  return (
    <div className="min-h-screen bg-white">
      {!isBrochure && !isStoryLab && <Navbar />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reference" element={<References />} />
          <Route path="/cenik" element={<PricingPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/kontakt" element={<Contact />} />
          {/* Phase 3E: website-URL demo request (B5 headline conversion) */}
          <Route path="/demo" element={<DemoRequest />} />
          <Route path="/sluzby/hlasovi-agenti" element={<VoiceAgents />} />
          <Route path="/sluzby/automatizace-procesu" element={<InternalAgents />} />
          <Route path="/sluzby/tvorba-modernich-webu" element={<ModernWebDevelopment />} />
          {/* Phase 3: email automation folded into process automation — old route redirects */}
          <Route
            path="/sluzby/emailova-automatizace"
            element={<Navigate to="/sluzby/automatizace-procesu" replace />}
          />
          {/* Phase 3A: legacy internal-agents URL folded into process automation (B6 §6.4) */}
          <Route
            path="/sluzby/interni-agenti"
            element={<Navigate to="/sluzby/automatizace-procesu" replace />}
          />
          <Route path="/sluzby/ai-app-development" element={<AIAppDevelopment />} />
          <Route path="/projekty" element={<Projects />} />
          <Route path="/projekty/:id" element={<ProjectDetail />} />
          <Route path="/brozura-hotely" element={<BrochureHotely />} />
          <Route path="/brozura-zdravotnictvi" element={<BrochureZdravotnictvi />} />
          <Route path="/brozura-autoservisy" element={<BrochureAutoservisy />} />
          <Route path="/gdpr" element={<GDPR />} />
          {/* Story Lab (branch-only): not in ROUTE_MAP/PAGE_META, emits noindex itself */}
          <Route
            path="/__story-lab/home-cinematic-light"
            element={<HomeCinematicLightLab />}
          />
          {/* Phase 3C: additive /en tree with English slugs (B2; plan §4.1 Option A) */}
          {ROUTE_MAP.map((entry) => (
            <Route
              key={`en-${entry.key}`}
              path={normalizePath(entry.en)}
              element={EN_ROUTE_ELEMENTS[entry.key]}
            />
          ))}
          {/* Phase 3C: /cs mirrors redirect to canonical bare Czech paths (Option A) */}
          <Route path="/cs" element={<CsRedirect />} />
          <Route path="/cs/*" element={<CsRedirect />} />
          {/* Phase 3A: catch-all for unmatched client-side routes (fixes R12 soft 404) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isBrochure && !isStoryLab && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <LocaleSync />
      <AppLayout />
    </Router>
  );
}

export default App;
