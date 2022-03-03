const deepMerge = require('deepmerge');

// =============================================================================
// CONSTS
// =============================================================================
// Standard Colors
const baseColors = {
    primary: { DEFAULT: '#4299E1', light: '#3182CE', dark: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
    secondary: { DEFAULT: '#9381FF', light: '#7a63ff', dark: '#4d38c7', disabled: '#c4bee6', text: '#fff' },
    danger: { DEFAULT: '#FE4A49', light: '#db2a2a', dark: '#a12727', disabled: '#FE7171', text: '#fff' },
    warning: { DEFAULT: '#f5aa31', light: '#ffa617', dark: '#804f00', disabled: '#fac878', text: '#fff' },
    success: { DEFAULT: '#26bf82', light: '#05ad6a', dark: '#00693f', disabled: '#71bfa0', text: '#fff' },
    info: { DEFAULT: '#d2d6d9', light: '#aaafb3', dark: '#60666b', disabled: '#ebf2f7', text: '#fff' },
    surface: { DEFAULT: '#f0f3f5', light: '#dce2e6', dark: '#d5dee3', disabled: '#ebeced', text: '#fff' },
    heading: { DEFAULT: '#2d3748', light: '#3182CE', dark: '#2B6CB0', disabled: '#63B3ED' },
    body: { DEFAULT: '#646C7D', light: '#767e91', dark: '#646C7D', disabled: '#63B3ED' },
    white: '#fff',
    black: '#000',
};

const baseConfig = {
    darkMode: 'class',
    theme: {
        colors: baseColors,
    },
    variants: {
        extend: {
            backgroundOpacity: ['responsive', 'hover', 'focus', 'dark'],
            backgroundColor: ['responsive', 'hover', 'focus', 'active', 'odd', 'dark', 'checked', 'disabled', 'active'],
            display: ['responsive', 'dark'],
            textColor: ['responsive', 'focus', 'focus-within', 'hover', 'active', 'dark'],
            placeholderColor: ['responsive', 'focus', 'dark'],
            borderColor: ['responsive', 'hover', 'focus', 'dark', 'checked'],
            divideColor: ['responsive', 'dark'],
            boxShadow: ['responsive', 'hover', 'focus', 'dark'],
            margin: ['responsive', 'last'],
            borderWidth: ['hover', 'focus'],
            display: ['group-hover'],
        },
    },
};

// =============================================================================
// FUNCTIONS
// =============================================================================

function arrayMergeFn(destinationArray, sourceArray) {
    return destinationArray.concat(sourceArray).reduce((acc, cur) => {
        if (acc.includes(cur)) return acc;
        return [...acc, cur];
    }, []);
}

// =============================================================================
// WRAPPER
// =============================================================================

/**
 * Merge Windmill and Tailwind CSS configurations
 * @param {object} tailwindConfig - Tailwind config object
 * @return {object} new config object
 */
function wrapper(tailwindConfig) {
    console.log('injecting and merging tailwinds config...');

    // Get All Colors from user and base
    let colorKeys = [...Object.keys(tailwindConfig.theme.colors), ...Object.keys(baseConfig.theme.colors)];

    // Create Safelist
    let safelist = colorKeys.map(key => {
        return {
            pattern: new RegExp(`(bg|text|border)-${key}`),
            variants: ['hover', 'focus', 'checked'],
        };
    });

    baseConfig.safelist = safelist;

    let content;
    if (Array.isArray(tailwindConfig.content)) {
        content = {
            content: [
                ...tailwindConfig.content,
                './.yalc/@astro/react/build/**/*.{js,ts,jsx,tsx}',
                './node_modules/@aspiralabs/astro-ui/build/**/*.{js,ts,jsx,tsx}',
            ],
        };
    } else {
        content = tailwindConfig.content;
    }

    const merge = deepMerge({ ...tailwindConfig, content }, baseConfig, { arrayMerge: arrayMergeFn });
    console.log(merge);
    return merge;
}

module.exports = wrapper;
