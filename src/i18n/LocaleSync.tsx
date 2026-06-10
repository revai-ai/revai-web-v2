import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LANG_STORAGE_KEY } from './locales';
import { localeFromPathname, switcherTarget } from './routes';

/**
 * URL is the locale source of truth (B2): keeps LanguageContext and
 * <html lang> in step with the current route, and applies the localStorage
 * first-visit hint on the root only.
 *
 * Note for 3D: <html lang> is corrected client-side here; the static
 * index.html still ships lang="cs". Prerender must emit the right lang per
 * route in served HTML.
 */
export default function LocaleSync() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const hintChecked = useRef(false);

  // First-visit hint: a previously chosen EN preference moves '/' to '/en/'
  // client-side, once per page load. Crawlers and first-time visitors are
  // unaffected — '/' keeps serving the Czech homepage with status 200.
  useEffect(() => {
    if (hintChecked.current) return;
    hintChecked.current = true;
    if (pathname !== '/') return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    } catch {
      // localStorage unavailable (private mode) — no hint
    }
    if (stored === 'en') {
      navigate(switcherTarget(pathname, 'en'), { replace: true });
    }
  }, [pathname, navigate]);

  useEffect(() => {
    const locale = localeFromPathname(pathname);
    if (locale !== language) {
      setLanguage(locale);
    }
    document.documentElement.lang = locale;
  }, [pathname, language, setLanguage]);

  return null;
}
