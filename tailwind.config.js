/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#f8fafc","100":"#f1f5f9","200":"#e2e8f0","300":"#cbd5e1","400":"#94a3b8","500":"#64748b","600":"#475569","700":"#334155","800":"#1e293b","900":"#0f172a","950":"#020617"}
      },
      keyframes: {
        motion: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(3px)' },
        },
        roadAnimation: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-350px)' },
        },
      },
      animation: {
        motion: 'motion 1s linear infinite',
        road: 'roadAnimation 1.4s linear infinite',
      },
    },
    fontFamily: {
      'body': [
        'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 
        'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 
        'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 
        'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 
        'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [],
}