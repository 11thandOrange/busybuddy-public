/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#eef1f2',
        ink: '#0b0b0b',
        muted: '#5b5b5b',
        card: '#ffffff',
        line: '#e6e8ea',
        accent: '#ff6a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Archivo Black"', 'sans-serif'],
      },
      boxShadow: {
        nav: '0 2px 20px rgba(0,0,0,0.04)',
        device: '0 30px 60px rgba(0,0,0,0.25)',
        card: '0 20px 40px rgba(0,0,0,0.08)',
        blurb: '0 8px 20px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
