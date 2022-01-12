const deepMerge = require('deepmerge');

const colors = {
    transparent: 'transparent',
    white: '#ffffff',
    black: '#000000',
};

const windmillConfig = {
    darkMode: 'class',
    theme: {
        colors,
    },
    variants: {
        backgroundOpacity: ['responsive', 'hover', 'focus', 'dark'],
        backgroundColor: ['responsive', 'hover', 'focus', 'active', 'odd', 'dark'],
        display: ['responsive', 'dark'],
        textColor: ['responsive', 'focus', 'focus-within', 'hover', 'active', 'dark'],
        placeholderColor: ['responsive', 'focus', 'dark'],
        borderColor: ['responsive', 'hover', 'focus', 'dark'],
        divideColor: ['responsive', 'dark'],
        boxShadow: ['responsive', 'hover', 'focus', 'dark'],
        margin: ['responsive', 'last'],
    },
};

function arrayMergeFn(destinationArray, sourceArray) {
    return destinationArray.concat(sourceArray).reduce((acc, cur) => {
        if (acc.includes(cur)) return acc;
        return [...acc, cur];
    }, []);
}

/**
 * Merge Windmill and Tailwind CSS configurations
 * @param {object} tailwindConfig - Tailwind config object
 * @return {object} new config object
 */
function wrapper(tailwindConfig) {
    let colorKeys = Object.keys(tailwindConfig.theme.colors);
    let safelist = colorKeys.map(key => {
        return {
            pattern: new RegExp(`(bg|text|border)-${key}`),
            variants: ['hover', 'focus'],
        };
    });

    windmillConfig.safelist = safelist;

    let content;
    if (Array.isArray(tailwindConfig.content)) {
        content = {
            content: tailwindConfig.content,
        };
    } else {
        content = tailwindConfig.content;
    }
    return deepMerge({ ...tailwindConfig, content }, windmillConfig, { arrayMerge: arrayMergeFn });
}

module.exports = wrapper;
