/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fire-orange': '#f97316',
        'fire-red': '#ef4444',
        'roast-purple': '#a855f7',
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(to right, #f97316, #ef4444)',
        'roast-gradient': 'linear-gradient(to bottom right, #fed7aa, #fecaca, #fbcfe8)',
        'flame-gradient': 'linear-gradient(45deg, #ff6b35, #f7931e, #ffaa00, #ff6b35)',
      },
      animation: {
        'flame-flicker': 'flame-flicker 2s ease-in-out infinite',
        'roast-loading': 'roast-loading 1s ease-in-out infinite',
        'fire-gradient': 'fire-gradient 3s ease infinite',
      },
      keyframes: {
        'flame-flicker': {
          '0%, 100%': { transform: 'rotate(-2deg) scale(1)' },
          '25%': { transform: 'rotate(2deg) scale(1.05)' },
          '50%': { transform: 'rotate(-1deg) scale(0.95)' },
          '75%': { transform: 'rotate(1deg) scale(1.02)' },
        },
        'roast-loading': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'fire-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'fire': '0 10px 40px rgba(249, 115, 22, 0.3)',
      },
    },
  },
  plugins: [],
}
