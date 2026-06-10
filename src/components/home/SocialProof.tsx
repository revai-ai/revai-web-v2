import { useReducedMotion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { RevealC } from '../sections/Reveal';

const partners = [
  { name: 'OpenAI', logo: '/OpenAI_Logo.svg.png', height: 'h-5' },
  { name: 'Make.com', logo: '/make-logo.png', height: 'h-6' },
  { name: 'n8n', logo: '/n8n.png', height: 'h-5' },
  { name: 'Google Gemini', logo: '/partner-gemini.webp', height: 'h-5' },
  { name: 'Zapier', logo: '/zapier.png', height: 'h-5' },
  { name: 'Google Cloud', logo: '/google-cloud-logo.png', height: 'h-6' },
];

function LogoItem({ partner }: { partner: typeof partners[number] }) {
  return (
    <div className="flex items-center gap-3 px-8 shrink-0">
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        className={`${partner.height} w-auto grayscale opacity-25`}
      />
      <span className="text-ifl-ink-40 font-mono text-xs whitespace-nowrap tracking-wider uppercase">
        {partner.name}
      </span>
    </div>
  );
}

export default function SocialProofC() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  return (
    <section className="variant-c relative bg-ifl-s1 border-t border-ifl-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealC>
          <p className="text-[10px] tracking-[0.28em] uppercase text-ifl-ink-40 font-mono text-center mb-10">
            {t('Pracujeme s ověřenými systémy', 'We work with verified systems')}
          </p>
        </RevealC>

        {reduced ? (
          <RevealC>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
              {partners.map((p) => (
                <LogoItem key={p.name} partner={p} />
              ))}
            </div>
          </RevealC>
        ) : (
          <div className="relative overflow-hidden" aria-hidden="true">
            <div className="flex motion-safe:animate-ea-marquee" style={{ width: 'max-content' }}>
              {[...partners, ...partners].map((p, i) => (
                <LogoItem key={`${p.name}-${i}`} partner={p} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ifl-s1 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ifl-s1 to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
