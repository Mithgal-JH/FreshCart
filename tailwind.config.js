/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // ... أي إضافات سابقة مثل fontFamily تبقى كما هي
      
      // -->> أضف هذا الجزء الجديد <<--
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
      // -->> نهاية الجزء الجديد <<--
    },
  },
  plugins: [],
}