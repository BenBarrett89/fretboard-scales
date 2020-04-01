import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { uglify } from "rollup-plugin-uglify"

export default {
  input: 'src/assets/js/page.js',
  output: {
    file: 'dist/assets/js/page.js',
    format: 'cjs'
  },
  plugins: [resolve(), babel(), uglify()],
  treeshake: false
}
