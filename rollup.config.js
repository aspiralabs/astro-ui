import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                dir: 'build',
                format: 'esm',
                sourcemap: true,
            },
        ],
        external: ['react', 'react-dom', 'tailwindcss'],

        plugins: [
            cleaner({ targets: ['./build'] }),
            resolve(),
            commonjs(),
            terser(),
            typescript({ exclude: ['**/*.stories.tsx', '**/*.test.tsx'] }),
        ],
    },
    {
        input: 'config.js',
        output: [
            {
                file: 'build/config.js',
                format: 'cjs',
            },
        ],
    },
];
