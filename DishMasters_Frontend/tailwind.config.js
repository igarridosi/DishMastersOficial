// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'DishColor': 'hsl(36, 100%, 67%)',
        'dishyColor':'#ffbd59',
        
      }
    },
  },
  plugins: [
    require('tailwindcss-motion', '@iconify/tailwind')
  ],
};
