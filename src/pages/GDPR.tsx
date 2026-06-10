import { Shield, Lock, Eye, UserCheck, Clock, Globe, Mail, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const sectionIconMap = [Shield, Eye, Lock, UserCheck, Globe, Clock, AlertCircle, Globe, Lock, Shield];

export default function GDPR() {
  const { language } = useLanguage();
  useDocumentMeta({
    title: language === 'cs'
      ? 'GDPR a ochrana osobních údajů | AMAI'
      : 'GDPR & Data Protection | AMAI',
    description: language === 'cs'
      ? 'Transparentní informace o zpracování osobních údajů v souladu s GDPR. Zabezpečení, práva subjektů a kontaktní informace.'
      : 'Transparent information on personal data processing in compliance with GDPR. Security, data subject rights and contact details.',
    canonical: '/gdpr',
  });

  const meta = {
    cs: {
      badge: 'Ochrana osobních údajů',
      title: 'GDPR',
      subtitle: 'a bezpečnost',
      description: 'Transparentní informace o tom, jak zpracováváme a chráníme vaše osobní údaje v souladu s nařízením GDPR.',
      lastUpdated: 'Poslední aktualizace: 4. 11. 2025',
      backHome: 'Zpět na hlavní stránku',
    },
    en: {
      badge: 'Personal Data Protection',
      title: 'GDPR',
      subtitle: '& Security',
      description: 'Transparent information on how we process and protect your personal data in compliance with GDPR.',
      lastUpdated: 'Last updated: November 4, 2025',
      backHome: 'Back to homepage',
    },
  };

  const sections = {
    cs: [
      {
        number: '01',
        title: 'Správci osobních údajů',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-6">Správci osobních údajů jsou:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-ifl-s1 border border-ifl-border rounded-xl p-5">
                <p className="font-semibold text-ifl-ink mb-2">Jan Rehberger</p>
                <p className="text-ifl-ink-70 text-sm">IČO: 05013500</p>
                <p className="text-ifl-ink-70 text-sm">Rooseveltova 1085/45, 669 02 Znojmo, ČR</p>
                <a href="mailto:j.rehberger@automatizace-ai.cz" className="text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline mt-1 block">
                  j.rehberger@automatizace-ai.cz
                </a>
              </div>
              <div className="bg-ifl-s1 border border-ifl-border rounded-xl p-5">
                <p className="font-semibold text-ifl-ink mb-2">Dominik Valter</p>
                <p className="text-ifl-ink-70 text-sm">IČO: 08247731</p>
                <p className="text-ifl-ink-70 text-sm">U Brány 456/8, 669 02 Znojmo, ČR</p>
                <a href="mailto:d.valter@automatizace-ai.cz" className="text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline mt-1 block">
                  d.valter@automatizace-ai.cz
                </a>
              </div>
            </div>
            <p className="text-ifl-ink-70">
              Správci zpracovávají osobní údaje společně a dle dohody mezi nimi v souladu s GDPR a zákonem č. 110/2019 Sb. Správci nemají jmenovaného pověřence pro ochranu osobních údajů.
            </p>
          </>
        ),
      },
      {
        number: '02',
        title: 'Účely zpracování osobních údajů',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-4">Osobní údaje jsou zpracovávány pouze v nezbytném rozsahu pro tyto účely:</p>
            <ul className="space-y-3">
              {[
                'Vyřízení poptávky odeslané prostřednictvím kontaktního formuláře',
                'Domluva schůzky se zájemcem o službu a následná komunikace',
                'Příprava nabídky, uzavření smlouvy a vystavení faktury',
                'Zasílání newsletteru (pouze po udělení souhlasu)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ifl-signal mt-2 flex-shrink-0" />
                  <span className="text-ifl-ink-70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-ifl-ink-70 mt-4">
              Webové stránky jsou prezentativního charakteru a neslouží k přímému uzavírání smluv ani k nákupům.
            </p>
          </>
        ),
      },
      {
        number: '03',
        title: 'Právní základ zpracování',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-4">Zpracování osobních údajů probíhá na základě:</p>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 bg-ifl-s1 border border-ifl-border rounded-xl p-4">
                <Lock className="w-5 h-5 text-ifl-signal mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-ifl-ink">Oprávněného zájmu</span>
                  <p className="text-ifl-ink-70 text-sm mt-1">komunikace se zájemcem, odpověď na dotaz z formuláře</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-ifl-s1 border border-ifl-border rounded-xl p-4">
                <UserCheck className="w-5 h-5 text-ifl-signal mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-ifl-ink">Souhlasu</span>
                  <p className="text-ifl-ink-70 text-sm mt-1">v případě odběru newsletteru</p>
                </div>
              </div>
            </div>
            <p className="text-ifl-ink-70">
              Souhlas lze kdykoli odvolat kliknutím na odkaz pro odhlášení v e-mailu nebo zasláním žádosti na kontaktní adresu správce.
            </p>
          </>
        ),
      },
      {
        number: '04',
        title: 'Rozsah zpracovávaných údajů',
        content: (
          <p className="text-ifl-ink-70">
            Zpracovávány jsou pouze údaje, které uživatel dobrovolně poskytne prostřednictvím kontaktního formuláře: jméno a příjmení, e-mailová adresa, nepovinně telefonní číslo, název firmy a text zprávy.
          </p>
        ),
      },
      {
        number: '05',
        title: 'Příjemci osobních údajů',
        content: (
          <p className="text-ifl-ink-70">
            K osobním údajům mají přístup pouze správci, Jan Rehberger a Dominik Valter. Zprávy z kontaktního formuláře jsou doručovány na e-mailové schránky provozované společností <strong className="text-ifl-ink">Google (Gmail / Workspace)</strong>, která je v pozici zpracovatele údajů a dodržuje standardní smluvní doložky EU.
          </p>
        ),
      },
      {
        number: '06',
        title: 'Doba uchování osobních údajů',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-3">
              Osobní údaje jsou uchovávány pouze po dobu nezbytně nutnou k vyřízení poptávky a následné komunikace.
            </p>
            <p className="text-ifl-ink-70 mb-3">
              Pokud z kontaktování nevznikne další spolupráce, údaje jsou po ukončení komunikace odstraněny.
            </p>
            <p className="text-ifl-ink-70">
              U newsletteru jsou údaje uchovávány do doby, než uživatel svůj souhlas odvolá.
            </p>
          </>
        ),
      },
      {
        number: '07',
        title: 'Práva subjektů údajů',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-4">Každá osoba, jejíž údaje jsou zpracovávány, má právo:</p>
            <ul className="space-y-3 mb-6">
              {[
                'Na přístup ke svým údajům',
                'Na opravu nebo výmaz',
                'Na omezení zpracování, přenositelnost a vznesení námitky',
                'Podat stížnost u dozorového orgánu (Úřad pro ochranu osobních údajů)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ifl-signal mt-2 flex-shrink-0" />
                  <span className="text-ifl-ink-70">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-ifl-s1 border border-ifl-border rounded-xl p-5">
              <p className="text-ifl-ink-70 text-sm mb-2">Pro uplatnění svých práv nás kontaktujte na:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="mailto:j.rehberger@automatizace-ai.cz" className="flex items-center gap-2 text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline">
                  <Mail className="w-4 h-4" />
                  j.rehberger@automatizace-ai.cz
                </a>
                <a href="mailto:d.valter@automatizace-ai.cz" className="flex items-center gap-2 text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline">
                  <Mail className="w-4 h-4" />
                  d.valter@automatizace-ai.cz
                </a>
              </div>
            </div>
          </>
        ),
      },
      {
        number: '08',
        title: 'Přenos osobních údajů mimo EU',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-3">
              Naše webové stránky jsou hostovány prostřednictvím služby <strong className="text-ifl-ink">Netlify (USA)</strong>. Přenos dat mimo EU probíhá pouze v nezbytném rozsahu a na základě standardních smluvních doložek schválených Evropskou komisí.
            </p>
            <p className="text-ifl-ink-70">
              E-mailová komunikace probíhá přes <strong className="text-ifl-ink">Google Workspace (Gmail)</strong>, který rovněž dodržuje GDPR a uplatňuje stejný právní rámec pro přenos dat.
            </p>
          </>
        ),
      },
      {
        number: '09',
        title: 'Zabezpečení osobních údajů',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-3">
              Veškeré osobní údaje jsou chráněny pomocí moderních technických a organizačních opatření.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {[
                { label: 'HTTPS', desc: 'Zabezpečené šifrované připojení' },
                { label: '2FA', desc: 'Dvoufaktorové ověření e-mailů' },
                { label: 'Minimální přístup', desc: 'Pouze správci s oprávněním' },
              ].map((item) => (
                <div key={item.label} className="bg-ifl-s2 border border-ifl-border rounded-xl p-4 text-center">
                  <p className="font-bold text-ifl-signal text-lg">{item.label}</p>
                  <p className="text-ifl-ink-70 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        number: '10',
        title: 'Cookies a analytické nástroje',
        content: (
          <p className="text-ifl-ink-70">
            V současné době nejsou na těchto webových stránkách používány žádné cookies ani analytické nástroje. V případě jejich aktivace bude tato sekce aktualizována v souladu s právními požadavky.
          </p>
        ),
      },
    ],
    en: [
      {
        number: '01',
        title: 'Data Controllers',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-6">The data controllers are:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-ifl-s1 border border-ifl-border rounded-xl p-5">
                <p className="font-semibold text-ifl-ink mb-2">Jan Rehberger</p>
                <p className="text-ifl-ink-70 text-sm">ID: 05013500</p>
                <p className="text-ifl-ink-70 text-sm">Rooseveltova 1085/45, 669 02 Znojmo, Czech Republic</p>
                <a href="mailto:j.rehberger@automatizace-ai.cz" className="text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline mt-1 block">
                  j.rehberger@automatizace-ai.cz
                </a>
              </div>
              <div className="bg-ifl-s1 border border-ifl-border rounded-xl p-5">
                <p className="font-semibold text-ifl-ink mb-2">Dominik Valter</p>
                <p className="text-ifl-ink-70 text-sm">ID: 08247731</p>
                <p className="text-ifl-ink-70 text-sm">U Brány 456/8, 669 02 Znojmo, Czech Republic</p>
                <a href="mailto:d.valter@automatizace-ai.cz" className="text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline mt-1 block">
                  d.valter@automatizace-ai.cz
                </a>
              </div>
            </div>
            <p className="text-ifl-ink-70">
              The controllers process personal data jointly and in accordance with GDPR and Act No. 110/2019 Coll. The controllers do not have a designated Data Protection Officer.
            </p>
          </>
        ),
      },
      {
        number: '02',
        title: 'Purposes of Personal Data Processing',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-4">Personal data is processed only to the extent necessary for these purposes:</p>
            <ul className="space-y-3">
              {[
                'Processing inquiries submitted through the contact form',
                'Arranging meetings with interested parties and subsequent communication',
                'Preparing offers, concluding contracts, and issuing invoices',
                'Sending newsletters (only with consent)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ifl-signal mt-2 flex-shrink-0" />
                  <span className="text-ifl-ink-70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-ifl-ink-70 mt-4">
              The website is presentational in nature and does not serve for direct contract conclusion or purchases.
            </p>
          </>
        ),
      },
      {
        number: '03',
        title: 'Legal Basis for Processing',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-4">Personal data processing is based on:</p>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 bg-ifl-s1 border border-ifl-border rounded-xl p-4">
                <Lock className="w-5 h-5 text-ifl-signal mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-ifl-ink">Legitimate interest</span>
                  <p className="text-ifl-ink-70 text-sm mt-1">communication with interested parties, responding to form inquiries</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-ifl-s1 border border-ifl-border rounded-xl p-4">
                <UserCheck className="w-5 h-5 text-ifl-signal mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-ifl-ink">Consent</span>
                  <p className="text-ifl-ink-70 text-sm mt-1">in case of newsletter subscription</p>
                </div>
              </div>
            </div>
            <p className="text-ifl-ink-70">
              Consent can be withdrawn at any time by clicking the unsubscribe link in the email or by sending a request to the controller's contact address.
            </p>
          </>
        ),
      },
      {
        number: '04',
        title: 'Scope of Processed Data',
        content: (
          <p className="text-ifl-ink-70">
            Only data voluntarily provided by the user through the contact form is processed: name and surname, email address, optionally phone number, company name, and message text.
          </p>
        ),
      },
      {
        number: '05',
        title: 'Recipients of Personal Data',
        content: (
          <p className="text-ifl-ink-70">
            Personal data is accessed only by the controllers, Jan Rehberger and Dominik Valter. Messages from the contact form are delivered to email accounts operated by <strong className="text-ifl-ink">Google (Gmail / Workspace)</strong>, which acts as a data processor and complies with EU standard contractual clauses.
          </p>
        ),
      },
      {
        number: '06',
        title: 'Retention Period of Personal Data',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-3">
              Personal data is retained only for the time necessary to process the inquiry and subsequent communication.
            </p>
            <p className="text-ifl-ink-70 mb-3">
              If no further cooperation arises from the contact, data is deleted after communication ends.
            </p>
            <p className="text-ifl-ink-70">
              For newsletters, data is retained until the user withdraws their consent.
            </p>
          </>
        ),
      },
      {
        number: '07',
        title: 'Data Subject Rights',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-4">Every person whose data is processed has the right to:</p>
            <ul className="space-y-3 mb-6">
              {[
                'Access their data',
                'Rectification or erasure',
                'Restriction of processing, portability, and objection',
                'File a complaint with the supervisory authority (Office for Personal Data Protection)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ifl-signal mt-2 flex-shrink-0" />
                  <span className="text-ifl-ink-70">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-ifl-s1 border border-ifl-border rounded-xl p-5">
              <p className="text-ifl-ink-70 text-sm mb-2">To exercise your rights, contact us at:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="mailto:j.rehberger@automatizace-ai.cz" className="flex items-center gap-2 text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline">
                  <Mail className="w-4 h-4" />
                  j.rehberger@automatizace-ai.cz
                </a>
                <a href="mailto:d.valter@automatizace-ai.cz" className="flex items-center gap-2 text-ifl-signal text-sm hover:text-ifl-signal-dark hover:underline">
                  <Mail className="w-4 h-4" />
                  d.valter@automatizace-ai.cz
                </a>
              </div>
            </div>
          </>
        ),
      },
      {
        number: '08',
        title: 'Transfer of Personal Data Outside the EU',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-3">
              Our website is hosted through <strong className="text-ifl-ink">Netlify (USA)</strong>. Data transfer outside the EU occurs only to the necessary extent and based on standard contractual clauses approved by the European Commission.
            </p>
            <p className="text-ifl-ink-70">
              Email communication runs through <strong className="text-ifl-ink">Google Workspace (Gmail)</strong>, which also complies with GDPR and applies the same legal framework for data transfers.
            </p>
          </>
        ),
      },
      {
        number: '09',
        title: 'Personal Data Security',
        content: (
          <>
            <p className="text-ifl-ink-70 mb-3">
              All personal data is protected using modern technical and organizational measures.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {[
                { label: 'HTTPS', desc: 'Secure encrypted connection' },
                { label: '2FA', desc: 'Two-factor email authentication' },
                { label: 'Minimal access', desc: 'Controllers only with authorization' },
              ].map((item) => (
                <div key={item.label} className="bg-ifl-s2 border border-ifl-border rounded-xl p-4 text-center">
                  <p className="font-bold text-ifl-signal text-lg">{item.label}</p>
                  <p className="text-ifl-ink-70 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        number: '10',
        title: 'Cookies and Analytical Tools',
        content: (
          <p className="text-ifl-ink-70">
            Currently, no cookies or analytical tools are used on this website. If activated, this section will be updated in accordance with legal requirements.
          </p>
        ),
      },
    ],
  };

  const currentMeta = meta[language];
  const currentSections = sections[language];

  return (
    <div className="min-h-screen bg-ifl-canvas">
      {/* Hero */}
      <section className="bg-ifl-s1 border-b border-ifl-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 bg-ifl-signal/10 border border-ifl-signal/20 text-ifl-signal text-sm font-medium px-4 py-1.5 rounded-full">
              <Shield className="w-4 h-4" />
              {currentMeta.badge}
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-ifl-ink mb-4 leading-tight">
            {currentMeta.title}{' '}
            <span className="text-ifl-signal">
              {currentMeta.subtitle}
            </span>
          </h1>
          <p className="text-ifl-ink-70 text-lg sm:text-xl max-w-2xl leading-relaxed">
            {currentMeta.description}
          </p>
          <p className="text-ifl-ink-40 text-sm mt-6 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {currentMeta.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-6">
          {currentSections.map((section, index) => {
            const Icon = sectionIconMap[index] ?? Shield;
            return (
              <div
                key={section.number}
                className="group bg-ifl-canvas border border-ifl-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ifl-s1 flex items-center justify-center group-hover:bg-ifl-s2 transition-colors">
                    <Icon className="w-5 h-5 text-ifl-signal" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-ifl-signal uppercase tracking-widest">{section.number}</span>
                    <h2 className="text-xl font-bold text-ifl-ink leading-snug">{section.title}</h2>
                  </div>
                </div>
                <div className="pl-14">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-14 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-ifl-ink-40 hover:text-ifl-ink transition-colors text-sm font-medium"
          >
            <span className="text-lg">&larr;</span>
            {currentMeta.backHome}
          </Link>
        </div>
      </section>
    </div>
  );
}
