const astro = require('./config');
module.exports = astro({
    content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.stories.{js,ts,jsx,tsx}'],
    theme: {
        colors: {},
    },
    variants: {},
    plugins: [],
});
