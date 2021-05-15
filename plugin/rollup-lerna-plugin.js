// "main": "dist/index.js",
//   "module": "es/index.js",
//     "directories": {
//   "lib": "lib",
//     "test": "__tests__"
// },
// "files": [
//   "lib",
//   "es",
//   "dist",
//   "@types"
// ],
//   "types": "@types/lib/index.d.ts",
//     "publishConfig": {
//   "registry": "http://xnpm.ximalaya.com/"
// },


// function writePackageJson(cbDataPackage, wholeVersion) {
//   // 方法1： 重写package.json文件
//   console.log('----------------------4. 开始修改package.json文件')
//   cbDataPackage.version = wholeVersion
//   fs.writeFile('./package.json', JSON.stringify(cbDataPackage), function (err) {
//     if (err) console.error(err);
//     console.log('----------------------修改package.json文件完毕，version修改为：', cbDataPackage.version)
//   });
// }

// 重写package.json文件
function reWritePackageJson() {
  return new Promise((resolve, reject) => {

  })
}

// lerna在rollup中的插件
function rollupLernaPlugin(options = {}) {
  return {
    name: "rollup-lerna-plugin",
    load() {
      // 修改对应的package.json配置
      console.log('11', process.env.PWD)
    }
  }
}

export default rollupLernaPlugin
