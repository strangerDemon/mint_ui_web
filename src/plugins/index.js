/**
 * Vue 使用的插件
 */

import axios from './axios'
// import services from './services'
// import nprogress from './nprogress'
// import authorize from './authorize'

export default {
  install(Vue) {
    axios(Vue)
    // services(Vue)
    // nprogress(Vue)
    // authorize(Vue)
  }
}
