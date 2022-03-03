const astro = require('./config');
module.exports = astro({
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {},
    },
    variants: {},
    plugins: [],
});
