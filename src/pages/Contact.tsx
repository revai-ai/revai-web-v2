import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const GDPRModal = lazy(() => import('../components/GDPRModal'));

export default function Contact() {
  const [copiedText, setCopiedText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  useDocumentMeta({
    title: t('Kontakt | REVAI – AI Automatizace', 'Contact | REVAI – AI Automation'),
    description: t(
      'Kontaktujte tým REVAI. Odpovíme do 24 hodin. Nabízíme nezávaznou konzultaci AI automatizace pro vaši firmu.',
      'Contact the REVAI team. We respond within 24 hours. We offer a free consultation on AI automation for your business.'
    ),
    canonical: '/kontakt',
  });
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _honeypot: '' }),
      });

      if (!response.ok) {
        throw new Error('Email sending failed');
      }

      setSubmitStatus({
        type: 'success',
        message: t(
          'Zpráva byla úspěšně odeslána! Ozveme se vám co nejdříve.',
          'Message sent successfully! We will get back to you as soon as possible.'
        ),
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: t(
          'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu nebo nás kontaktujte přímo.',
          'Failed to send message. Please try again or contact us directly.'
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-ifl-canvas">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ifl-s1">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium mb-4">
            {t('KONTAKT', 'CONTACT')}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ifl-ink mb-6 tracking-[-0.02em]">
            {t('Kontaktujte nás', 'Contact Us')}
          </h1>
          <p className="text-xl text-ifl-ink-70 mb-8">
            {t('JSME TU PRO VÁS - ODPOVÍME DO 24 HODIN', 'WE ARE HERE FOR YOU - WE RESPOND WITHIN 24 HOURS')}
          </p>
          <a
            href="#contact-form"
            className="inline-block bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
            onClick={(e) => {
              e.preventDefault();
              const formElement = document.getElementById('contact-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            {t('NAPIŠTE NÁM', 'WRITE TO US')}
          </a>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ifl-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-ifl-ink mb-4 tracking-[-0.02em]">
              {t('NÁŠ TÝM', 'OUR TEAM')}
            </h2>
            <p className="text-lg text-ifl-ink-70">
              {t('', '')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-ifl-s1 rounded-2xl border border-ifl-border p-8 hover:border-ifl-signal/50 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-ifl-signal shadow-lg">
                  <img
                    src="/team-photo-1.webp"
                    alt="Jan Rehberger"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-ifl-ink mb-2">Jan Rehberger</h3>
                <p className="text-lg text-ifl-signal font-semibold mb-6">Technical support & AI Automation</p>

                <div className="space-y-4">
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard('+420608024655', 'jan-phone')}
                      className="w-full flex items-center justify-center space-x-3 p-4 bg-ifl-canvas rounded-xl border border-ifl-border hover:bg-ifl-s2 hover:border-ifl-signal/50 transition-colors group cursor-pointer"
                      aria-label={t('Zkopírovat telefonní číslo', 'Copy phone number')}
                    >
                      <Phone className="text-ifl-signal group-hover:scale-110 transition-transform" size={20} />
                      <span className="text-ifl-ink font-medium">+420 608 024 655</span>
                    </button>
                    {copiedText === 'jan-phone' && (
                      <div className="absolute -top-2 right-2 bg-ifl-signal text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-bounce">
                        {t('Zkopírováno!', 'Copied!')}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard('j.rehberger@automatizace-ai.cz', 'jan-email')}
                      className="w-full flex items-center justify-center space-x-2 p-4 bg-ifl-canvas rounded-xl border border-ifl-border hover:bg-ifl-s2 hover:border-ifl-signal/50 transition-colors group cursor-pointer"
                      aria-label={t('Zkopírovat email', 'Copy email')}
                    >
                      <Mail className="text-ifl-signal group-hover:scale-110 transition-transform flex-shrink-0" size={18} />
                      <span className="text-ifl-ink font-medium text-sm break-words">j.rehberger@automatizace-ai.cz</span>
                    </button>
                    {copiedText === 'jan-email' && (
                      <div className="absolute -top-2 right-2 bg-ifl-signal text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-bounce">
                        {t('Zkopírováno!', 'Copied!')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-ifl-s1 rounded-2xl border border-ifl-border p-8 hover:border-ifl-signal/50 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-ifl-signal shadow-lg">
                  <img
                    src="/team-photo-2.webp"
                    alt="Dominik Valter"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-ifl-ink mb-2">Dominik Valter</h3>
                <p className="text-lg text-ifl-signal font-semibold mb-6">Sales Representative & AI Automation</p>

                <div className="space-y-4">
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard('+420776433955', 'dominik-phone')}
                      className="w-full flex items-center justify-center space-x-3 p-4 bg-ifl-canvas rounded-xl border border-ifl-border hover:bg-ifl-s2 hover:border-ifl-signal/50 transition-colors group cursor-pointer"
                      aria-label={t('Zkopírovat telefonní číslo', 'Copy phone number')}
                    >
                      <Phone className="text-ifl-signal group-hover:scale-110 transition-transform" size={20} />
                      <span className="text-ifl-ink font-medium">+420 776 433 955</span>
                    </button>
                    {copiedText === 'dominik-phone' && (
                      <div className="absolute -top-2 right-2 bg-ifl-signal text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-bounce">
                        {t('Zkopírováno!', 'Copied!')}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard('d.valter@automatizace-ai.cz', 'dominik-email')}
                      className="w-full flex items-center justify-center space-x-2 p-4 bg-ifl-canvas rounded-xl border border-ifl-border hover:bg-ifl-s2 hover:border-ifl-signal/50 transition-colors group cursor-pointer"
                      aria-label={t('Zkopírovat email', 'Copy email')}
                    >
                      <Mail className="text-ifl-signal group-hover:scale-110 transition-transform flex-shrink-0" size={18} />
                      <span className="text-ifl-ink font-medium text-sm break-words">d.valter@automatizace-ai.cz</span>
                    </button>
                    {copiedText === 'dominik-email' && (
                      <div className="absolute -top-2 right-2 bg-ifl-signal text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-bounce">
                        {t('Zkopírováno!', 'Copied!')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-ifl-s1">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-ifl-ink tracking-[-0.02em]">
                {t('KONTAKTNÍ INFORMACE', 'CONTACT INFORMATION')}
              </h2>
              <p className="text-lg text-ifl-ink-70 mb-8">
                {t(
                  'RÁDI SI S VÁMI SJEDNÁME NEZÁVAZNOU SCHŮZKU A POMŮŽEME VÁM NAJÍT IDEÁLNÍ ŘEŠENÍ PRO VAŠE PODNIKÁNÍ',
                  'WE WILL BE HAPPY TO ARRANGE A NON-BINDING MEETING WITH YOU AND HELP YOU FIND THE IDEAL SOLUTION FOR YOUR BUSINESS'
                )}
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-ifl-canvas rounded-xl border border-ifl-border relative">
                  <div className="w-12 h-12 rounded-lg bg-ifl-signal flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ifl-ink mb-1">EMAIL</h3>
                    <button
                      onClick={() => copyToClipboard('info@automatizace-ai.cz', 'info-email')}
                      className="text-ifl-signal hover:text-ifl-signal-dark font-medium cursor-pointer"
                      aria-label={t('Zkopírovat email', 'Copy email')}
                    >
                      info@automatizace-ai.cz
                    </button>
                    <p className="text-sm text-ifl-ink-70 mt-1">{t('Odpovídáme do 24 hodin', 'We respond within 24 hours')}</p>
                  </div>
                  {copiedText === 'info-email' && (
                    <div className="absolute -top-2 right-2 bg-ifl-signal text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-bounce">
                      {t('Zkopírováno!', 'Copied!')}
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-4 p-6 bg-ifl-canvas rounded-xl border border-ifl-border relative">
                  <div className="w-12 h-12 rounded-lg bg-ifl-signal flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ifl-ink mb-1">{t('TELEFON', 'PHONE')}</h3>
                    <button
                      onClick={() => copyToClipboard('+420608024655', 'info-phone')}
                      className="text-ifl-signal hover:text-ifl-signal-dark font-medium cursor-pointer"
                      aria-label={t('Zkopírovat telefonní číslo', 'Copy phone number')}
                    >
                      +420 608 024 655
                    </button>
                    <p className="text-sm text-ifl-ink-70 mt-1">{t('Po-Pá: 9:00 - 18:00', 'Mon-Fri: 9:00 AM - 6:00 PM')}</p>
                  </div>
                  {copiedText === 'info-phone' && (
                    <div className="absolute -top-2 right-2 bg-ifl-signal text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-bounce">
                      {t('Zkopírováno!', 'Copied!')}
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-4 p-6 bg-ifl-canvas rounded-xl border border-ifl-border">
                  <div className="w-12 h-12 rounded-lg bg-ifl-signal flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ifl-ink mb-1">{t('ADRESA', 'ADDRESS')}</h3>
                    <p className="text-ifl-ink-70">
                      nám. Svobody 210/18<br />
                      669 02 Znojmo 2<br />
                      {t('Česká republika', 'Czech Republic')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-ifl-canvas rounded-xl border border-ifl-border">
                  <div className="w-12 h-12 rounded-lg bg-ifl-signal flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ifl-ink mb-1">{t('PRACOVNÍ DOBA', 'WORKING HOURS')}</h3>
                    <p className="text-ifl-ink-70">
                      {t('Pondělí - Pátek: 9:00 - 18:00', 'Monday - Friday: 9:00 AM - 6:00 PM')}<br />
                      {t('Sobota - Neděle: Dle předchozí domluvy', 'Saturday - Sunday: By appointment')}<br />
                      {t('Podpora 24/7 pro klienty', '24/7 support for clients')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-ifl-canvas rounded-xl border border-ifl-border">
                <h3 className="font-bold text-ifl-ink mb-2">{t('RYCHLÁ ODPOVĚĎ NA VAŠE DOTAZY', 'QUICK ANSWER TO YOUR QUESTIONS')}</h3>
                <p className="text-ifl-ink-70 text-sm mb-4">
                  {t(
                    'Máte rychlý dotaz? Použijte náš kontaktní formulář a odpovíme do 24 hodin.',
                    'Have a quick question? Use our contact form and we will respond within 24 hours.'
                  )}
                </p>
                <button
                  onClick={() => {
                    const formElement = document.getElementById('contact-form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="bg-ifl-signal text-white px-6 py-3 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 w-full"
                >
                  {t('REZERVOVAT KONZULTACI', 'BOOK CONSULTATION')}
                </button>
              </div>
            </div>

            <div id="contact-form" className="bg-ifl-canvas rounded-2xl border border-ifl-border p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6 text-ifl-ink tracking-[-0.02em]">
                {t('NAPIŠTE NÁM', 'WRITE TO US')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                    {t('Jméno a příjmení *', 'Full name *')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-ifl-border bg-ifl-s1 text-ifl-ink focus:border-ifl-signal focus:outline-none transition-colors placeholder:text-ifl-ink-40"
                    placeholder={t('Jan Novák', 'John Doe')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-ifl-border bg-ifl-s1 text-ifl-ink focus:border-ifl-signal focus:outline-none transition-colors placeholder:text-ifl-ink-40"
                    placeholder={t('jan@firma.cz', 'john@company.com')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                    {t('Telefon', 'Phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-ifl-border bg-ifl-s1 text-ifl-ink focus:border-ifl-signal focus:outline-none transition-colors placeholder:text-ifl-ink-40"
                    placeholder="+420 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                    {t('Název firmy', 'Company name')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-ifl-border bg-ifl-s1 text-ifl-ink focus:border-ifl-signal focus:outline-none transition-colors placeholder:text-ifl-ink-40"
                    placeholder={t('Moje firma s.r.o.', 'My Company Ltd.')}
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                    {t('Jaká služba Vás zajímá? *', 'Which service are you interested in? *')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-ifl-border bg-ifl-s1 text-ifl-ink focus:border-ifl-signal focus:outline-none transition-colors"
                  >
                    <option value="">{t('Vyberte službu', 'Select service')}</option>
                    <option value="voice-agents">{t('Hlasoví asistenti', 'Voice assistants')}</option>
                    <option value="internal-agents">{t('Automatizace procesů', 'Process automation')}</option>
                    <option value="web-development">{t('Tvorba moderních webů', 'Modern Website Development')}</option>
                    <option value="ai-app-dev">AI App Development</option>
                    <option value="consultation">{t('Konzultace', 'Consultation')}</option>
                    <option value="other">{t('Jiné', 'Other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-ifl-ink-70 mb-2">
                    {t('Zpráva *', 'Message *')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-ifl-border bg-ifl-s1 text-ifl-ink focus:border-ifl-signal focus:outline-none transition-colors resize-none placeholder:text-ifl-ink-40"
                    placeholder={t('Popište nám vaše potřeby a cíle...', 'Describe your needs and goals...')}
                  ></textarea>
                </div>

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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>{isSubmitting ? t('Odesílání...', 'Sending...') : t('ODESLAT ZPRÁVU', 'SEND MESSAGE')}</span>
                  <Send size={20} />
                </button>

                <p className="text-sm text-ifl-ink-40 text-center">
                  {t('Odesláním formuláře souhlasíte se', 'By submitting the form, you agree to')}{' '}
                  <button
                    type="button"
                    onClick={() => setIsGDPRModalOpen(true)}
                    className="text-ifl-signal hover:text-ifl-signal-dark underline"
                  >
                    {t('zpracováním osobních údajů', 'personal data processing')}
                  </button>
                </p>
              </form>
            </div>
          </div>
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
