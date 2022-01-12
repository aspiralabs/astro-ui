const astro = require('./config');
module.exports = astro({
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            primary: { DEFAULT: '#4299E1', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
            secondary: { DEFAULT: '#344E5c', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
            success: { DEFAULT: '#4ab19d', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
            warning: { DEFAULT: '#efc958', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
            danger: { DEFAULT: '#ef3d59', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
            gray: { DEFAULT: '#ecf2f6', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#2d3748' },
            title: { DEFAULT: '#2d3748', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
            body: { DEFAULT: '#718096', hover: '#3182CE', active: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
        },
    },
    variants: {},
    plugins: [],
});
