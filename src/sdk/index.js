
//统一加载接口的 js SDK
const modulesFiles = require.context("./modules/", true, /\.js$/);

const sdk = modulesFiles.keys().reduce((modules, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  const moduleName = Object.keys(value)[0];
  modules[moduleName] = value[moduleName];
  return modules;
}, {});
export default sdk;

////可在main.js中配置此代码
////导入sdk
// import sdk from './sdk'
// Vue.prototype.sdk = sdk
