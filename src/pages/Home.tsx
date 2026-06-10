import '../styles/tokens.css';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import HeroC from '../components/home/Hero';
import SocialProofC from '../components/home/SocialProof';
import ImageStoryStackC from '../components/home/ImageStoryStack';
import ServicesC from '../components/home/Services';
import ProcessC from '../components/home/Process';
import FAQC from '../components/home/FAQ';
import BookConsultationC from '../components/sections/BookConsultation';

export default function Home() {
  const { t } = useLanguage();
  useDocumentMeta({
    title: t(
      'Automatizace pomocí AI – Řešení na míru | AMAI',
      'AI Automation – Custom Solutions | AMAI'
    ),
    description: t(
      'Česká agentura na AI automatizaci. Hlasoví asistenti, automatizace procesů, moderní weby a vývoj AI aplikací pro firmy.',
      'Czech AI automation agency. Voice assistants, process automation, modern websites and AI app development for businesses.'
    ),
    canonical: '/',
  });
  return (
    <div className="variant-c relative">
      {/* Editorial hero — normal flow */}
      <HeroC />

      {/* Verified-systems proof — quiet, near the top */}
      <SocialProofC />

      {/* Image-led pinned scrollytelling — five full-viewport scenes crossfade on scroll */}
      <ImageStoryStackC />

      {/* Normal-flow lower sections */}
      <div className="relative z-[1] bg-ifl-canvas">
        <ServicesC />
        <ProcessC />
        <FAQC />
        <BookConsultationC />
      </div>
    </div>
  );
}
