import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query. Client-only (Vite SPA, no SSR), so the
 * initial value is read synchronously from window.matchMedia — no first-paint
 * flash between mobile/desktop branches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
