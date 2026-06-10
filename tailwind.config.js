/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Invisible Flow
        ifl: {
          canvas: '#F6F4EF',
          s1: '#EDEBE5',
          s2: '#E3DFD7',
          s3: '#D6D1C8',
          border: '#CCC8BF',
          'border-dim': '#DAD6CE',
          ink: '#1E1B16',
          'ink-70': '#56524C',
          'ink-40': '#9A958D',
          'ink-15': '#EDEBE5',
          signal: '#4F6F4A',
          'signal-dark': '#385337',
          'signal-tint': '#EAF0E6',
          'signal-mid': '#CBD8C7',
        },
      },
      keyframes: {
        // Invisible Flow keyframes
        'ifl-fade-in': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Marquee (used by SocialProof)
        'ea-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        // Invisible Flow
        'ifl-fade-in': 'ifl-fade-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ifl-fade-in-1': 'ifl-fade-in 0.75s 0.12s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ifl-fade-in-2': 'ifl-fade-in 0.75s 0.24s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ifl-fade-in-3': 'ifl-fade-in 0.75s 0.40s cubic-bezier(0.16, 1, 0.3, 1) both',
        // Marquee (used by SocialProof)
        'ea-marquee': 'ea-marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
