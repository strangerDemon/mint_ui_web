/*
 * arcgis 文件加载
 * 
 * 
*/

import { dojoRequire } from 'esri-loader';

export default Vue => {
  Object.defineProperties(Vue.prototype, {
    dojoRequire: { get: () => dojoRequire }
  })
}
