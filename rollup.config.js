import rollupTypescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import del from 'rollup-plugin-delete'
import copy from 'rollup-plugin-copy'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'
import lernaPlugin from './plugin/rollup-lerna-plugin'
import pkg from './package.json'

const paths = {
  input: './src/index.ts',
  output: './lib/index.js',
}

// 默认引入的包
const dependencies = ({ devDependencies }) => Object.keys(devDependencies || {})
const pkgdependencies = dependencies(pkg)

const rollupConfig = {
  input: paths.input, // 入口
  output: {
    file: paths.output,
    format: 'es',
    sourcemap: true,
    banner: '/* https://github.com/tguzi */',
  },
  watch: {
    include: 'src/**/*.ts',
    exclude: 'node_modules/**'
  },
  external: id => pkgdependencies.includes(id), // 指出应将哪些模块视为外部模块
  // plugins 需要注意引用顺序
  plugins: [
    del({
      targets: ['lib/*'],
    }),
    lernaPlugin(), // 自定义lerna的插件
    json(), // 读取json插件
    // 验证导入的文件
    eslint({
      throwOnError: true, // lint 结果有错误将会抛出异常
      throwOnWarning: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'dist/**', 'lib/**', 'es/**', '*.js'],
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
    rollupTypescript({
      clean: true,
      check: true,
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true, // 使用tsconfig的输出路径，而不是rollup的output
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist/public' },
        { src: ['assets/fonts/arial.woff', 'assets/fonts/arial.woff2'], dest: 'dist/public/fonts' },
        { src: 'assets/images/**/*', dest: 'dist/public/images' }
      ]
    }),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        '.js',
        '.ts',
      ],
    }),
    terser(), // 压缩代码
  ],
}

export default rollupConfig