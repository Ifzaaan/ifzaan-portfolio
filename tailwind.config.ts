import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0C0C',
        'ink-2': '#141514',
        bone: '#F3EEE4',
        'bone-dim': '#A9A296',
        brass: '#B8874A',
        'brass-soft': 'rgba(184,135,74,0.14)',
        teal: '#3E7A70',
        ivory: '#F8F4EC',
        plum: '#6B4A5E',
        'plum-soft': 'rgba(107,74,94,0.08)',
        charcoal: '#050505',
        offWhite: '#f4f4f0',
        plumDark: '#4a3342',
        gold: '#C8A96A',
        goldLight: '#e0c992',
        darkGray: '#0f0f0f',
        mediumGray: '#1a1a1a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        arabic: ['var(--font-arabic)', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
export default config;