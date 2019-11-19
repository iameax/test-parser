import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: { file: 'lib/index.js', format: 'cjs', indent: false },
    plugins: [
      nodeResolve(),
      typescript()
    ]
  },
  // ES
  {
    input: 'src/index.ts',
    output: { file: 'es/index.js', format: 'es', indent: false },
    plugins: [
      nodeResolve(),
      typescript()
    ]
  },
  // ES for Browsers
  {
    input: 'src/index.ts',
    output: { file: 'es/index.mjs', format: 'es', indent: false },
    plugins: [
      nodeResolve(),
      typescript(),
    ]
  },
  // UMD
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'Test Parser',
      indent: false
    },
    plugins: [
      nodeResolve(),
      typescript(),
    ]
  },
]