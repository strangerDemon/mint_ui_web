/**
 * Custom axios instance
 * > - [Axios的配置](https://blog.ygxdxx.com/2017/01/29/Axios-Config/)
 * > - [Vuex2和Axios的开发](https://blog.ygxdxx.com/2017/02/01/Vuex2&Axios-Develop/)
 * > - [Axios全攻略](https://blog.ygxdxx.com/2017/02/27/Axios-Strategy/)
 * > - [Vue 全家桶 + axios 前端实现登录拦截、登出、拦截器等功能](https://github.com/superman66/vue-axios-github)
 * > - [axios和网络传输相关知识的学习实践](http://www.jianshu.com/p/8e5fb763c3d7)
 * > - [Vue.js REST API Consumption with Axios](https://alligator.io/vuejs/rest-api-axios/)
 */
import querystring from 'querystring'
import axios from 'axios'
import tokenUtil from './tokenUtil'
import store from '../store/index.js'
import Config from "@/services";

const instance = axios.create({
  // // TODO: full base url
  // baseURL: '//localhost:2080/api/',
  baseURL: Config.API_URL,//'http://map.xmtfj.gov.cn:8004/xmtdt.asmx/',//'http://www.ztgis.com:8886/xmtdt.asmx/',//
  // baseURL: '//localhost:44/dist',  //发布的地址
  timeout: 60000,
  headers: {
    // 'X-Custom-Header': 'foobar',
    // // true: need, false: dont need
    // 'Authorization': true,
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// request拦截器
instance.interceptors.request.use(config => {
  if(!config.data){
    config.data = {}
  }
  config.data.Token =tokenUtil.token
  config.data = querystring.stringify({
    para: JSON.stringify(config.data)
  })
  return config

}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})


// respone拦截器
instance.interceptors.response.use(
  response => {
    const code = response.data.RespCode
    if (code === 1) {
      if (!response.data.Results) {
        return true
      } else {
        return response.data.Results
      }
    } else {
      console.log(response.data.RespDesc)
      return false
    }
  },
  error => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
)

export default instance
