import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/**/*.blade.php', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                customYellow: '#FFBD59',
                customBlack: '#222222',
                customWhite: '#FAFBFE',
            },
        },
    },
    plugins: [forms, typography],
};
