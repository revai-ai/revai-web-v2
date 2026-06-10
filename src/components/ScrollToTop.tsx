import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * This component automatically scrolls the window to the top whenever the route changes.
 * It uses React Router's useLocation hook to detect route changes and useEffect to
 * perform the scroll action.
 *
 * Usage: Place this component inside <Router> in App.tsx
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [pathname]);

  return null;
}
