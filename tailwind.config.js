/** @type {import('tailwindcss').Config} */

// SERWA Professional brand colors (from client specification):
// Primary: #f5f3f1 (ivory)
// Secondary: #2F304D (navy blue)
// Accent: #FA198B (pink)
// Gold: #F9DC5C (accent highlight)

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SERWA brand palette
        serwa: {
          primary: '#f5f3f1',   // Ivory - primary background
          secondary: '#2F304D', // Navy - text, headers
          accent: '#FA198B',    // Pink - CTAs, highlights
          gold: '#F9DC5C',     // Gold - accents, badges
        },
      },
      fontFamily: {
        serwa: ['Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'], // BIOTOP-inspired elegant typography
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
