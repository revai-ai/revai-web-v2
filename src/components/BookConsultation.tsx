import { Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CALENDAR_URL } from '../config/site';

export default function BookConsultation() {
  const { t } = useLanguage();

  return (
    <section id="book-consultation" className="py-16 px-4 sm:px-6 lg:px-8 bg-ifl-s1">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ifl-ink mb-4 tracking-[-0.02em]">
            {t('REZERVOVAT KONZULTACI', 'BOOK CONSULTATION')}
          </h2>
          <p className="text-lg text-ifl-ink-70 max-w-2xl mx-auto mb-8">
            {t(
              'Vyberte si vhodný termín pro bezplatnou konzultaci přímo v našem kalendáři',
              'Choose a suitable time for a free consultation directly in our calendar'
            )}
          </p>
        </div>
        <div className="bg-ifl-canvas rounded-2xl border border-ifl-border p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-ifl-signal flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-white" size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-ifl-ink">
              {t('ONLINE REZERVACE', 'ONLINE BOOKING')}
            </h3>
            <p className="text-ifl-ink-70 mb-6">
              {t(
                'Klikněte na tlačítko níže pro otevření Google Calendar a rezervaci termínu',
                'Click the button below to open Google Calendar and book an appointment'
              )}
            </p>
          </div>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-3 bg-ifl-signal text-white px-8 py-4 rounded-full font-semibold hover:bg-ifl-signal-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
          >
            <Calendar size={24} />
            <span>{t('REZERVOVAT TERMÍN', 'BOOK APPOINTMENT')}</span>
          </a>
          <p className="text-sm text-ifl-ink-40 mt-6">
            {t(
              'Otevře se nové okno s Google Calendar kde si můžete vybrat volný termín',
              'A new window will open with Google Calendar where you can choose an available time'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
