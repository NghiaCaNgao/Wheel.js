const analyze = require('rollup-plugin-analyzer');
const cleanup = require('rollup-plugin-cleanup');
const terser = require('rollup-plugin-terser').terser;
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').default;
const pkg = require('./package.json');

const input = 'src/index.js';
const inputESM = {
    'dist/Wheel.esm': 'src/index.esm.js',
    'dist/helpers.esm': 'src/helpers/index.js'
};

const banner = `/*!
 * Wheel.js v${pkg.version}
 * ${pkg.homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} Wheel.js Contributors
 * Released under the MIT License
 */`;

module.exports = [
    // UMD builds
    // dist/Wheel.min.js
    // dist/Wheel.js
    {
        input,
        plugins: [
            json(),
            resolve(),
            cleanup({
                sourcemap: true
            }),
            analyze({ summaryOnly: true })
        ],
        output: {
            name: 'Wheel',
            file: 'dist/Wheel.js',
            banner,
            format: 'umd',
            indent: false,
        },
    },
    {
        input,
        plugins: [
            json(),
            resolve(),
            terser({
                output: {
                    preamble: banner
                }
            }),
        ],
        output: {
            name: 'Wheel',
            file: 'dist/Wheel.min.js',
            format: 'umd',
            indent: false,
        },
    },

    // ES6 builds (ESM build)
    // dist/Wheel.esm.js
    // helpers/*.js
    {
        input: inputESM,
        plugins: [
            json(),
            resolve(),
            cleanup({
                sourcemap: true
            }),
        ],
        output: {
            dir: './',
            chunkFileNames: 'dist/chunks/[name].js',
            banner,
            format: 'esm',
            indent: false,
        },
    },
];
