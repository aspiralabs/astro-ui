const astro = require('./config');
// module.exports = astro({
//     content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.stories.{js,ts,jsx,tsx}'],
//     theme: {
//         colors: {},
//     },
//     variants: {},
//     plugins: [],
// });

module.exports = astro({
    darkMode: 'media',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './modals/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['pretendard', 'sans-serif'],
                heading: ['pretendard'],
                body: ['pretendard'],
            },
            boxShadow: {
                main: '0px 4px 90px rgba(146, 146, 146, 0.3)',
            },
        },
        colors: {
            primary: { DEFAULT: '#28A7B3', hover: '#4DB6C0', active: '#2399A4', disabled: '#A8D5D9' },
            primary_dark: { DEFAULT: '#23242a', text: '#8a8f93' },
            secondary: { DEFAULT: '#1A56A4' },
            accent: { DEFAULT: '#212730' },
            error: { DEFAULT: '#EB5E55' },
            success: { DEFAULT: '#07cdbd' },
            heading: { DEFAULT: '#151D4A', dark: '#ffffff' },
            blue: { DEFAULT: '#2F80ED' },
            body: { DEFAULT: '#888BA1', dark: '#8a8f93' },
            surface: { DEFAULT: '#E7EDF3', text: '#162D5A', hover: '#e4ecf5', yeet: '#f2f1f7' },
            body_bg: { DEFAULT: '#F9F9F9', dark: '#23242a' },
            menu_bg: { DEFAULT: '#FCFCFC', dark: '#1c1d21' },
            card_bg: { DEFAULT: '#FFFFFF', dark: '#2b2c32' },
        },
    },
    plugins: [],
});
