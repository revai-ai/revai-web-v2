import { useState, lazy, Suspense } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PAGE_META } from '../i18n/pageMeta';
import { isValidEmail, normalizeWebsiteUrl } from '../components/forms/validation';

const GDPRModal = lazy(() => import('../components/GDPRModal'));

/* Phase 3E — website-URL demo request (B5 headline conversion; plan §6).
   Minimal /demo page; the full conversion-band design is Phase 4 work.
   Copy lives in a per-locale dictionary object (B7 — no new inline t() pairs);
   document meta is read straight from PAGE_META so the served (prerendered)
   head and the hydrated head cannot drift. */

const copy = {
  cs: {
    eyebrow: 'DEMO',
    title: 'Demo vašeho webu zdarma',
    subtitle:
      'Vložte adresu svého současného webu a my vám připravíme nezávaznou ukázku, jak může vypadat. Ozveme se do několika hodin v rámci pracovní doby.',
    formHeading: 'POŽÁDAT O DEMO',
    websiteLabel: 'Adresa vašeho webu *',
    websitePlaceholder: 'www.vase-firma.cz',
    websiteError: 'Zadejte platnou adresu webu (např. www.vase-firma.cz).',
    nameLabel: 'Jméno a příjmení *',
    namePlaceholder: 'Jan Novák',
    nameError: 'Zadejte své jméno.',
    emailLabel: 'Email *',
    emailPlaceholder: 'jan@firma.cz',
    emailError: 'Zadejte platnou emailovou adresu.',
    companyLabel: 'Název firmy',
    companyPlaceholder: 'Moje firma s.r.o.',
    notesLabel: 'Poznámka',
    notesPlaceholder: 'Co vás na současném webu trápí? Co od nového očekáváte?',
    consentPrefix: 'Souhlasím se',
    consentLink: 'zpracováním osobních údajů',
    consentError: 'Pro odeslání je potřeba souhlas se zpracováním osobních údajů.',
    submit: 'ODESLAT ŽÁDOST O DEMO',
    submitting: 'Odesílání...',
    success: 'Děkujeme! Vaši žádost jsme přijali — demo vám pošleme do několika hodin v rámci pracovní doby.',
    error: 'Nepodařilo se odeslat žádost. Zkuste to prosím znovu nebo nám napište na info@automatizace-ai.cz.',
  },
  en: {
    eyebrow: 'DEMO',
    title: 'A free demo of your website',
    subtitle:
      'Enter the address of your current website and we will prepare a no-obligation preview of how it could look. We respond within a few hours during business hours.',
    formHeading: 'REQUEST A DEMO',
    websiteLabel: 'Your website address *',
    websitePlaceholder: 'www.your-company.com',
    websiteError: 'Enter a valid website address (e.g. www.your-company.com).',
    nameLabel: 'Full name *',
    namePlaceholder: 'John Doe',
    nameError: 'Enter your name.',
    emailLabel: 'Email *',
    emailPlaceholder: 'john@company.com',
    emailError: 'Enter a valid email address.',
    companyLabel: 'Company name',
    companyPlaceholder: 'My Company Ltd.',
    notesLabel: 'Notes',
    notesPlaceholder: 'What bothers you about your current website? What do you expect from the new one?',
    consentPrefix: 'I agree to the',
    consentLink: 'processing of personal data',
    consentError: 'Consent to personal data processing is required to submit.',
    submit: 'SEND DEMO REQUEST',
    submitting: 'Sending...',
    success: 'Thank you! We received your request — we will send your demo within a few hours during business hours.',
    error: 'Failed to send the request. Please try again or write to us at info@automatizace-ai.cz.',
  },
};

type FieldErrors = Partial<Record<'website' | 'name' | 'email' | 'consent', string>>;

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-ifl-border bg-ifl-s1 text-ifl-ink focus:border-ifl-signal focus:outline-none transition-colors placeholder:text-ifl-ink-40';
const errorInputClass = inputClass.replace('border-ifl-border', 'border-red-500');

export default function DemoRequest() {
  const { language } = useLanguage();
  const meta = PAGE_META.demo.meta[language];
  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    canonical: '/demo',
  });

  const c = copy[language];

  const [formData, setFormData] = useState({
    website: '',
    name: '',
    email: '',
    company: '',
    notes: '',
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name in fieldErrors) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
    }
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!normalizeWebsiteUrl(formData.website)) errors.website = c.websiteError;
    if (!formData.name.trim()) errors.name = c.nameError;
    if (!isValidEmail(formData.email)) errors.email = c.emailError;
    if (!consent) errors.consent = c.consentError;
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    const errors = validate();
    if (Object.values(errors).some(Boolean)) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          consent,
          locale: language,
          _honeypot: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error(`demo-request responded ${response.status}`);
      }

      setSubmitStatus({ type: 'success', message: c.success });
      setFormData({ website: '', name: '', email: '', company: '', notes: '' });
      setConsent(false);
    } catch (error) {
      console.error('Error submitting demo request:', error);
      setSubmitStatus({ type: 'error', message: c.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-ifl-canvas">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ifl-s1">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
            {c.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ifl-ink mb-6 tracking-[-0.02em]">
            {c.title}
          </h1>
          <p className="text-xl text-ifl-ink-70">{c.subtitle}</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-ifl-canvas rounded-2xl border border-ifl-border p-8">
          <h2 className="text-2xl font-bold mb-6 text-ifl-ink tracking-[-0.02em]">{c.formHeading}</h2>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="website" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                {c.websiteLabel}
              </label>
              <input
                type="url"
                id="website"
                name="website"
                required
                value={formData.website}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.website)}
                aria-describedby={fieldErrors.website ? 'website-error' : undefined}
                className={fieldErrors.website ? errorInputClass : inputClass}
                placeholder={c.websitePlaceholder}
              />
              {fieldErrors.website && (
                <p id="website-error" className="mt-2 text-sm text-red-700">
                  {fieldErrors.website}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                {c.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                className={fieldErrors.name ? errorInputClass : inputClass}
                placeholder={c.namePlaceholder}
              />
              {fieldErrors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-700">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                {c.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                className={fieldErrors.email ? errorInputClass : inputClass}
                placeholder={c.emailPlaceholder}
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-700">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                {c.companyLabel}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={inputClass}
                placeholder={c.companyPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                {c.notesLabel}
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder={c.notesPlaceholder}
              ></textarea>
            </div>

            {/* Honeypot — visually hidden from people, present for bots. */}
            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="demo-website-confirm">Leave this field empty</label>
              <input
                type="text"
                id="demo-website-confirm"
                name="_honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (fieldErrors.consent) setFieldErrors({ ...fieldErrors, consent: undefined });
                  }}
                  aria-invalid={Boolean(fieldErrors.consent)}
                  aria-describedby={fieldErrors.consent ? 'consent-error' : undefined}
                  className="mt-1 h-4 w-4 rounded border-ifl-border text-ifl-signal focus:ring-ifl-signal"
                />
                <label htmlFor="consent" className="text-sm text-ifl-ink-70">
                  {c.consentPrefix}{' '}
                  <button
                    type="button"
                    onClick={() => setIsGDPRModalOpen(true)}
                    className="text-ifl-signal hover:text-ifl-signal-dark underline"
                  >
                    {c.consentLink}
                  </button>{' '}
                  *
                </label>
              </div>
              {fieldErrors.consent && (
                <p id="consent-error" className="mt-2 text-sm text-red-700">
                  {fieldErrors.consent}
                </p>
              )}
            </div>

            <div aria-live="polite">
              {submitStatus && (
                <div
                  className={`p-4 rounded-lg border ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-red-50 border-red-500 text-red-800'
                  }`}
                >
                  <p className="font-semibold">{submitStatus.message}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span>{isSubmitting ? c.submitting : c.submit}</span>
              <Send size={20} />
            </button>
          </form>
        </div>
      </section>

      {isGDPRModalOpen && (
        <Suspense fallback={null}>
          <GDPRModal isOpen={isGDPRModalOpen} onClose={() => setIsGDPRModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
