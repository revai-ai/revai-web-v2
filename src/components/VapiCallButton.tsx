import { useState, useEffect } from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { useLanguage } from '../contexts/LanguageContext';

const VAPI_PUBLIC_KEY = '59a57321-445a-407b-8834-a80789a334e2';
const ASSISTANT_ID_CS = '80fb484c-48ab-4acc-90ad-905f298526e9';
const ASSISTANT_ID_EN = 'a9a9070c-db9c-419f-98ba-ecd558828f0d';

export default function VapiCallButton() {
  const { language, t } = useLanguage();
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setIsCallActive(true);
      console.log('Hovor spuštěn');
    });

    vapiInstance.on('call-end', () => {
      setIsCallActive(false);
      setVolumeLevel(0);
      console.log('Hovor ukončen');
    });

    vapiInstance.on('speech-start', () => {
      console.log('Řeč zahájena');
    });

    vapiInstance.on('speech-end', () => {
      console.log('Řeč ukončena');
    });

    vapiInstance.on('volume-level', (volume) => {
      setVolumeLevel(volume);
    });

    vapiInstance.on('message', (message) => {
      console.log('Zpráva:', message);
    });

    vapiInstance.on('error', (error) => {
      console.error('Chyba:', error);
    });

    return () => {
      vapiInstance.stop();
    };
  }, []);

  const handleCallToggle = () => {
    if (!vapi) return;

    if (isCallActive) {
      vapi.stop();
    } else {
      const assistantId = language === 'cs' ? ASSISTANT_ID_CS : ASSISTANT_ID_EN;
      vapi.start(assistantId);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={handleCallToggle}
        className={`
          relative group
          ${isCallActive
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-ifl-signal text-white hover:bg-ifl-signal-dark'
          }
          px-10 py-6 rounded-full font-bold text-lg
          transition-all duration-300 ease-out
          hover:shadow-lg hover:scale-[1.02] active:scale-[0.97]
          flex items-center space-x-3
        `}
      >
        {isCallActive ? (
          <>
            <PhoneOff size={28} className="animate-pulse" />
            <span>{t('UKONČIT HOVOR', 'END CALL')}</span>
          </>
        ) : (
          <>
            <Phone size={28} />
            <span>{t('ZAVOLAT AI ASISTENTOVI', 'CALL AI ASSISTANT')}</span>
          </>
        )}
      </button>

      {isCallActive && (
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-ifl-signal rounded-full animate-pulse"></div>
            <span className="text-ifl-ink-70 font-medium">{t('Hovor probíhá...', 'Call in progress...')}</span>
          </div>

          <div className="w-64 h-2 bg-ifl-s2 rounded-full overflow-hidden">
            <div
              className="h-full bg-ifl-signal transition-all duration-100"
              style={{ width: `${Math.min(volumeLevel * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
