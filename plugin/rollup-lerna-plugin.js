import fs from 'fs'

// 重写package.json文件
function reWritePackageJson() {
  const packagePath = `${process.env.PWD}/package.json`
  const packageJson = require(packagePath)
  packageJson.main = 'lib/index.js'
  packageJson.types = 'types/index.d.ts'
  packageJson.files = ['lib', 'types']
  const err = fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
  if (err) {
    console.log('修改文件失败: ', err)
  }
}

// lerna在rollup中的插件
function rollupLernaPlugin() {
  return {
    name: "rollup-lerna-plugin",
    load() {
      // 修改对应的package.json配置
      reWritePackageJson()
    }
  }
}

export default rollupLernaPlugin
