/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bis: {
          blue: '#0284c7',
          darkBlue: '#0c2340',
          navy: '#0f172a',
          accent: '#0284c7',
          emerald: '#059669',
          amber: '#d97706',
          slate: '#f8fafc',
          border: '#e2e8f0',
          card: '#ffffff',
          darkBg: '#090d16',
          darkCard: '#111827'
        },
        sketch: {
          bg: '#faf8fd',
          surface: '#ffffff',
          dark: '#18181b',
          fuchsia: '#d946ef',
          purple: '#a855f7',
          border: 'rgba(0, 0, 0, 0.06)',
          textMuted: '#64748b'
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        editorial: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'sketch-glow': '0 0 0 1.5px rgba(236, 72, 153, 0.45), 0 0 24px -2px rgba(217, 70, 239, 0.35)',
        'sketch-card': '0 20px 45px -12px rgba(120, 80, 180, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'sketch-float': '0 30px 60px -15px rgba(70, 40, 120, 0.12), 0 12px 24px -10px rgba(0, 0, 0, 0.05)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
