/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#fafafa',
        detail: '#d4d4d4',
        metallic: '#1a1a1a',
      },
      maxWidth: {
        '70ch': '70ch',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        space: ['var(--font-space)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}


