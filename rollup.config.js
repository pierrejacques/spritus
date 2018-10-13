import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'test/index.ts',
    output: {
        format: 'umd',
        name: 'test',
        file: 'dist/index.umd.js',
    },
    plugins: [
        typescript(),
    ],
};
