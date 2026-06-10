import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface GDPRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GDPRModal({ isOpen, onClose }: GDPRModalProps) {
  const { language } = useLanguage();

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const content = {
    cs: {
      title: 'Ochrana osobních údajů (GDPR a bezpečnost)',
      closeButton: 'Zavřít',
      lastUpdated: 'Poslední aktualizace: 4. 11. 2025',
    },
    en: {
      title: 'Personal Data Protection (GDPR and Security)',
      closeButton: 'Close',
      lastUpdated: 'Last updated: November 4, 2025',
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gdpr-modal-title"
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 id="gdpr-modal-title" className="text-2xl font-bold text-gray-900">{content[language].title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={content[language].closeButton}
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="px-6 py-8 prose prose-sm max-w-none">
          {language === 'cs' ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mt-0">1. Správci osobních údajů</h2>
              <p className="text-gray-700">Správci osobních údajů jsou:</p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold text-gray-900">Jan Rehberger</p>
                <p className="text-gray-700">IČO: 05013500</p>
                <p className="text-gray-700">Sídlo: Rooseveltova 1085/45, 669 02 Znojmo, Česká republika</p>
                <p className="text-gray-700">E-mail: j.rehberger@automatizace-ai.cz</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold text-gray-900">Dominik Valter</p>
                <p className="text-gray-700">IČO: 08247731</p>
                <p className="text-gray-700">Sídlo: U Brány 456/8, 669 02 Znojmo, Česká republika</p>
                <p className="text-gray-700">E-mail: d.valter@automatizace-ai.cz</p>
              </div>

              <p className="text-gray-700">
                Správci zpracovávají osobní údaje společně a dle dohody mezi nimi v souladu s GDPR a zákonem č. 110/2019 Sb.<br />
                Správci nemají jmenovaného pověřence pro ochranu osobních údajů.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">2. Účely zpracování osobních údajů</h2>
              <p className="text-gray-700">Osobní údaje jsou zpracovávány pouze v nezbytném rozsahu pro tyto účely:</p>
              <ul className="text-gray-700">
                <li>vyřízení poptávky odeslané prostřednictvím kontaktního formuláře,</li>
                <li>domluva schůzky se zájemcem o službu a následná komunikace,</li>
                <li>příprava nabídky, uzavření smlouvy a vystavení faktury,</li>
                <li>zasílání newsletteru (pouze po udělení souhlasu).</li>
              </ul>
              <p className="text-gray-700">Webové stránky jsou prezentativního charakteru a neslouží k přímému uzavírání smluv ani k nákupům.</p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">3. Právní základ zpracování</h2>
              <p className="text-gray-700">Zpracování osobních údajů probíhá na základě:</p>
              <ul className="text-gray-700">
                <li><strong>oprávněného zájmu</strong> správce (komunikace se zájemcem, odpověď na dotaz z formuláře),</li>
                <li><strong>souhlasu</strong> subjektu údajů (v případě odběru newsletteru).</li>
              </ul>
              <p className="text-gray-700">
                Souhlas lze kdykoli odvolat kliknutím na odkaz pro odhlášení v e-mailu nebo zasláním žádosti na kontaktní adresu správce.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">4. Rozsah zpracovávaných údajů</h2>
              <p className="text-gray-700">
                Zpracovávány jsou pouze údaje, které uživatel dobrovolně poskytne prostřednictvím kontaktního formuláře:<br />
                jméno a příjmení, e-mailová adresa, nepovinně telefonní číslo, název firmy a text zprávy.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">5. Příjemci osobních údajů</h2>
              <p className="text-gray-700">
                K osobním údajům mají přístup pouze správci, Jan Rehberger a Dominik Valter.<br />
                Zprávy z kontaktního formuláře jsou doručovány na e-mailové schránky provozované společností <strong>Google (Gmail / Workspace)</strong>, která je v pozici zpracovatele údajů a dodržuje standardní smluvní doložky EU.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">6. Doba uchování osobních údajů</h2>
              <p className="text-gray-700">
                Osobní údaje jsou uchovávány pouze po dobu nezbytně nutnou k vyřízení poptávky a následné komunikace.<br />
                Pokud z kontaktování nevznikne další spolupráce, údaje jsou po ukončení komunikace odstraněny.<br />
                U newsletteru jsou údaje uchovávány do doby, než uživatel svůj souhlas odvolá.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">7. Práva subjektů údajů</h2>
              <p className="text-gray-700">Každá osoba, jejíž údaje jsou zpracovávány, má právo:</p>
              <ul className="text-gray-700">
                <li>na přístup ke svým údajům,</li>
                <li>na opravu nebo výmaz,</li>
                <li>na omezení zpracování, přenositelnost a vznesení námitky,</li>
                <li>podat stížnost u dozorového orgánu (Úřad pro ochranu osobních údajů).</li>
              </ul>
              <p className="text-gray-700">
                Pro uplatnění svých práv nás můžete kontaktovat na e-mailových adresách<br />
                <strong>j.rehberger@automatizace-ai.cz</strong> nebo <strong>d.valter@automatizace-ai.cz</strong>.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">8. Přenos osobních údajů mimo EU</h2>
              <p className="text-gray-700">
                Naše webové stránky jsou hostovány prostřednictvím služby <strong>Netlify (USA)</strong>.<br />
                Přenos dat mimo EU probíhá pouze v nezbytném rozsahu a na základě standardních smluvních doložek schválených Evropskou komisí.<br />
                E-mailová komunikace probíhá přes <strong>Google Workspace (Gmail)</strong>, který rovněž dodržuje GDPR a uplatňuje stejný právní rámec pro přenos dat.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">9. Zabezpečení osobních údajů</h2>
              <p className="text-gray-700">
                Veškeré osobní údaje jsou chráněny pomocí moderních technických a organizačních opatření.<br />
                Web využívá zabezpečené připojení (HTTPS) a přístup k e-mailovým účtům je chráněn silnými hesly a dvoufaktorovým ověřením.<br />
                K údajům mají přístup pouze správci, kteří s nimi nakládají důvěrně a výhradně za účelem, pro který byly poskytnuty.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">10. Cookies a analytické nástroje</h2>
              <p className="text-gray-700">
                V současné době nejsou na těchto webových stránkách používány žádné cookies ani analytické nástroje.<br />
                V případě jejich aktivace bude tato sekce aktualizována v souladu s právními požadavky.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mt-0">1. Data Controllers</h2>
              <p className="text-gray-700">The data controllers are:</p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold text-gray-900">Jan Rehberger</p>
                <p className="text-gray-700">ID: 05013500</p>
                <p className="text-gray-700">Address: Rooseveltova 1085/45, 669 02 Znojmo, Czech Republic</p>
                <p className="text-gray-700">Email: j.rehberger@automatizace-ai.cz</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold text-gray-900">Dominik Valter</p>
                <p className="text-gray-700">ID: 08247731</p>
                <p className="text-gray-700">Address: U Brány 456/8, 669 02 Znojmo, Czech Republic</p>
                <p className="text-gray-700">Email: d.valter@automatizace-ai.cz</p>
              </div>

              <p className="text-gray-700">
                The controllers process personal data jointly and in accordance with GDPR and Act No. 110/2019 Coll.<br />
                The controllers do not have a designated Data Protection Officer.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">2. Purposes of Personal Data Processing</h2>
              <p className="text-gray-700">Personal data is processed only to the extent necessary for these purposes:</p>
              <ul className="text-gray-700">
                <li>processing inquiries submitted through the contact form,</li>
                <li>arranging meetings with interested parties and subsequent communication,</li>
                <li>preparing offers, concluding contracts, and issuing invoices,</li>
                <li>sending newsletters (only with consent).</li>
              </ul>
              <p className="text-gray-700">The website is presentational in nature and does not serve for direct contract conclusion or purchases.</p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">3. Legal Basis for Processing</h2>
              <p className="text-gray-700">Personal data processing is based on:</p>
              <ul className="text-gray-700">
                <li><strong>legitimate interest</strong> of the controller (communication with interested parties, responding to form inquiries),</li>
                <li><strong>consent</strong> of the data subject (in case of newsletter subscription).</li>
              </ul>
              <p className="text-gray-700">
                Consent can be withdrawn at any time by clicking the unsubscribe link in the email or by sending a request to the controller's contact address.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">4. Scope of Processed Data</h2>
              <p className="text-gray-700">
                Only data voluntarily provided by the user through the contact form is processed:<br />
                name and surname, email address, optionally phone number, company name, and message text.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">5. Recipients of Personal Data</h2>
              <p className="text-gray-700">
                Personal data is accessed only by the controllers, Jan Rehberger and Dominik Valter.<br />
                Messages from the contact form are delivered to email accounts operated by <strong>Google (Gmail / Workspace)</strong>, which acts as a data processor and complies with EU standard contractual clauses.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">6. Retention Period of Personal Data</h2>
              <p className="text-gray-700">
                Personal data is retained only for the time necessary to process the inquiry and subsequent communication.<br />
                If no further cooperation arises from the contact, data is deleted after communication ends.<br />
                For newsletters, data is retained until the user withdraws their consent.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">7. Data Subject Rights</h2>
              <p className="text-gray-700">Every person whose data is processed has the right to:</p>
              <ul className="text-gray-700">
                <li>access their data,</li>
                <li>rectification or erasure,</li>
                <li>restriction of processing, portability, and objection,</li>
                <li>file a complaint with the supervisory authority (Office for Personal Data Protection).</li>
              </ul>
              <p className="text-gray-700">
                To exercise your rights, you can contact us at the email addresses<br />
                <strong>j.rehberger@automatizace-ai.cz</strong> or <strong>d.valter@automatizace-ai.cz</strong>.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">8. Transfer of Personal Data Outside the EU</h2>
              <p className="text-gray-700">
                Our website is hosted through <strong>Netlify (USA)</strong>.<br />
                Data transfer outside the EU occurs only to the necessary extent and based on standard contractual clauses approved by the European Commission.<br />
                Email communication runs through <strong>Google Workspace (Gmail)</strong>, which also complies with GDPR and applies the same legal framework for data transfers.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">9. Personal Data Security</h2>
              <p className="text-gray-700">
                All personal data is protected using modern technical and organizational measures.<br />
                The website uses secure connection (HTTPS) and access to email accounts is protected by strong passwords and two-factor authentication.<br />
                Only the controllers have access to the data, and they handle it confidentially and exclusively for the purpose for which it was provided.
              </p>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-xl font-semibold text-gray-900">10. Cookies and Analytical Tools</h2>
              <p className="text-gray-700">
                Currently, no cookies or analytical tools are used on this website.<br />
                If activated, this section will be updated in accordance with legal requirements.
              </p>
            </>
          )}

          <hr className="my-6 border-gray-200" />

          <p className="text-gray-500 text-sm italic">{content[language].lastUpdated}</p>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-ifl-signal text-white font-semibold py-3 px-6 rounded-lg transition-all hover:bg-ifl-signal-dark hover:shadow-lg"
          >
            {content[language].closeButton}
          </button>
        </div>
      </div>
    </div>
  );
}
