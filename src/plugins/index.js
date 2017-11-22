/**
 * Vue 使用的插件
 */

import axios from './axios'
import esri from './esri'
import element from './element'
// import services from './services'
// import nprogress from './nprogress'
// import authorize from './authorize'

export default {
  install(Vue) {
    axios(Vue)
    esri(Vue)
    element(Vue)
    // services(Vue)
    // nprogress(Vue)
    // authorize(Vue)
  }
}
