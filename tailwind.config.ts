import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './node_modules/lucide-react/dist/**/*.d.ts',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          mint: '#34D1BF',
          navy: '#052A49',
          gold: '#F7C800',
        },
        'text-dark': '#4B5563',
        'text-muted': '#9BA5B4',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(3, 7, 18, 0.8), rgba(3, 7, 18, 0.4))',
      },
    },
  },
  plugins: [],
};

export default config;
