import rollupTypescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import del from 'rollup-plugin-delete'
import copy from 'rollup-plugin-copy'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import lernaPlugin from './plugin/rollup-lerna-plugin'
import pkg from './package.json'

// 默认引入的包
const dependencies = ({ devDependencies }) => Object.keys(devDependencies || {})
const pkgdependencies = dependencies(pkg)

// 当前lerna执行文件路径
const PWD = process.env.PWD
const pwdList = PWD.split('/')
const packageName = pwdList[pwdList.length - 1]

// rollup执行文件配置
const rollupConfig = {
  input: './src/index.ts', // 入口
  output: {
    file: './lib/index.js',
    format: 'es',
    sourcemap: true,
    plugins: [
      terser()
    ],
    banner: '/* You can see me: https://github.com/tguzi */',
  },
  watch: {
    include: 'src/**/*.ts',
    exclude: 'node_modules/**'
  },
  external: id => pkgdependencies.includes(id), // 指出应将哪些模块视为外部模块
  // plugins 需要注意引用顺序
  plugins: [
    del({
      targets: ['lib/*', 'types/*'],
    }),
    json(), // 读取json插件
    postcss({
      plugins: [
        autoprefixer(), // css3属性加前缀
        cssnano(), // css压缩
      ],
      modules: false,
      extensions: ['.scss', '.css'],
    }), // css预处理
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
    // 自定义lerna的插件 - 注意，此插件会修改packages/下每个包的package.json配置文件
    lernaPlugin(),
    // rollup编译typescript
    rollupTypescript({
      clean: true, // 清除原先的声明
      check: true,
      useTsconfigDeclarationDir: true, // 使用tsconfig的输出路径，而不是rollup的output
    }),
    // 把声明文件copy到对应的目录
    copy({
      targets: [
        { src: `../../types/${packageName}/src/**/*`, dest: 'types' },
      ],
    }),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        '.js',
        '.ts',
        '.tsx'
      ],
    }),
  ],
}

export default rollupConfig