import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    babel({
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
};
