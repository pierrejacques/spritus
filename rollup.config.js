import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'test/circular-sprite.ts',
    output: {
        format: 'umd',
        name: 'test',
        file: 'dist/spritus-test.umd.js',
    },
    plugins: [
        typescript(),
    ],
};
