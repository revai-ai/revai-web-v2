import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const References = lazy(() => import('./pages/References'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
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

const BROCHURE_PATHS = ['/brozura-hotely', '/brozura-zdravotnictvi', '/brozura-autoservisy'];

function AppLayout() {
  const location = useLocation();
  const isBrochure = BROCHURE_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {!isBrochure && <Navbar />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reference" element={<References />} />
          <Route path="/cenik" element={<PricingPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/kontakt" element={<Contact />} />
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
          {/* Phase 3A: catch-all for unmatched client-side routes (fixes R12 soft 404) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isBrochure && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;
