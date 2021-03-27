import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  external: ['react'],
  output: [
    {
      file: 'lib/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'lib/bundle.esm.js',
      format: 'esm'
    },
    {
      file: 'lib/bundle.umd.js',
      format: 'umd',
      name: 'ReactAnimatedHearts',
      globals: {
        react: 'React'
      }
    }
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true
    }),
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    commonjs(),
    production && terser()
  ]
}
