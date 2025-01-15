import { defineConfig } from 'tailwindcss';
import forms from '@tailwindcss/forms'; // Example plugin
import typography from '@tailwindcss/typography';

export default defineConfig({
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
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
});
