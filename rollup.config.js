import path from 'path'
import rollupTypescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const paths = {
  input: path.join(__dirname, '/lib/index.ts'),
  output: path.join(__dirname, '/dist'),
}

// 默认引入的包
const dependencies = ({ devDependencies }) => Object.keys(devDependencies || {})
const pkgdependencies = dependencies(pkg)

// rollup 配置项
const rollupConfig = {
  input: './lib/index.ts', // 入口
  output: [
    // 输出 commonjs 规范的代码
    {
      file: pkg.cjs,
      format: 'cjs',
      sourcemap: true,
      name: pkg.name,
    },
    // 输出 es 规范的代码
    {
      file: pkg.es,
      format: 'es',
      sourcemap: true,
      name: pkg.name,
    },
  ],
  external: id => pkgdependencies.includes(id), // 指出应将哪些模块视为外部模块
  // plugins 需要注意引用顺序
  plugins: [
    json(), // 读取json插件
    // 验证导入的文件
    eslint({
      throwOnError: true, // lint 结果有错误将会抛出异常
      throwOnWarning: true,
      include: ['lib/**/*.ts'],
      exclude: ['node_modules/**', 'dist/**', 'es/**', '*.js'],
    }),
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),
    // 配合 commnjs 解析第三方模块
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
      ],
    }),
    terser(), // 压缩代码
  ],
}

export default rollupConfig