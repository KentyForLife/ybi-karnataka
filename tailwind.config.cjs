module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand orange palette (used to replace green theme)
        brand: {
          50: '#fff6ef',
          100: '#fff0df',
          200: '#ffd7a8',
          300: '#ffbd78',
          400: '#ff9a4a',
          500: '#ff8a3d',
          600: '#ff6f1f',
          700: '#cc5919',
          800: '#993f12',
          900: '#66280b'
        }
      },
      // Modern animations
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 111, 31, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 111, 31, 0.8)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        bounce: 'bounce 2s infinite',
        glow: 'glow 2s ease-in-out infinite'
      },
      boxShadow: {
        'brand': '0 20px 25px -5px rgba(255, 111, 31, 0.2)',
        'brand-lg': '0 25px 50px -12px rgba(255, 111, 31, 0.25)'
      }
    },
  },
  plugins: [],
}
