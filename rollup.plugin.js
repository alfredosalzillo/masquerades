import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    eslint(),
    resolve(),
    babel({
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
};
