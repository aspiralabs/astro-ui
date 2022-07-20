// =============================================================================
// CONSTS
// =============================================================================

const baseConfig = {
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                cursor: 'cursor .5s linear infinite alternate',
            },
            keyframes: {
                cursor: {
                    '0%, 40%': { opacity: 1 },
                    '60%, 100%': { opacity: 0 },
                },
            },
            shadow: {
                main: '0px 4px 90px rgba(146, 146, 146, 0.3)',
            },
        },
        colors: {
            primary: { DEFAULT: '#4299E1', light: '#3182CE', dark: '#2B6CB0', disabled: '#63B3ED', text: '#fff' },
            secondary: { DEFAULT: '#9381FF', light: '#7a63ff', dark: '#4d38c7', disabled: '#c4bee6', text: '#fff' },
            error: { DEFAULT: '#FE4A49', light: '#db2a2a', dark: '#a12727', disabled: '#FE7171', text: '#fff' },
            warning: { DEFAULT: '#f5aa31', light: '#ffa617', dark: '#804f00', disabled: '#fac878', text: '#fff' },
            success: { DEFAULT: '#26bf82', light: '#05ad6a', dark: '#00693f', disabled: '#71bfa0', text: '#fff' },
            info: { DEFAULT: '#d2d6d9', light: '#aaafb3', dark: '#60666b', disabled: '#ebf2f7', text: '#fff' },
            surface: { DEFAULT: '#f0f3f5', light: '#dce2e6', dark: '#d5dee3', disabled: '#fafbfc', text: '#2d3748' },
            heading: { DEFAULT: '#2d3748', light: '#3182CE', dark: '#2B6CB0', disabled: '#63B3ED' },
            body: { DEFAULT: '#646C7D', light: '#767e91', dark: '#646C7D', disabled: '#63B3ED' },
            white: '#fff',
            black: '#000',
            cursor: '#2d3748',
        },
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

/*
    Recursively merge properties and return new object
    obj1 &lt;- obj2 [ &lt;- ... ]
*/
function merge() {
    var dst = {},
        src,
        p,
        args = [].splice.call(arguments, 0);
    while (args.length > 0) {
        src = args.splice(0, 1)[0];
        if (toString.call(src) == '[object Object]') {
            for (p in src) {
                if (src.hasOwnProperty(p)) {
                    if (toString.call(src[p]) == '[object Object]') {
                        dst[p] = merge(dst[p] || {}, src[p]);
                    } else {
                        dst[p] = src[p];
                    }
                }
            }
        }
    }

    return dst;
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
    console.log('Setting Up Tailwinds Config');

    // Get All Colors from user and base
    let colorKeys = [
        ...new Set([...Object.keys(tailwindConfig.theme.colors), ...Object.keys(baseConfig.theme.colors)]),
    ];

    // Create Safelist
    let safelist = colorKeys.map(key => {
        return {
            pattern: new RegExp(`(bg|text|border)-${key}`),
            variants: ['hover', 'focus', 'checked'],
        };
    });

    baseConfig.safelist = safelist;

    // Content can be an array of strings or a single string
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

    const final = merge(baseConfig, { ...tailwindConfig, content });
    return final;
}

module.exports = wrapper;
