// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import MintUi from 'mint-ui'
import plugins from './plugins'
import store from './store'
import * as esriLoader from 'esri-loader'

// ## Import styles
// =========================
//import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.css'
// import 'normalize.css/normalize.css'

// ## Use plugins
// =========================
Vue.use(ElementUI)
Vue.use(MintUi)
Vue.use(plugins)

// ## Config
// =========================
Vue.config.debug = true
Vue.config.devtools = true
Vue.config.productionTip = false
window.log = console.log



// ## Initial
// =========================
// ...

// ## Root app
// =========================

/* eslint-disable no-new */
const app = new Vue({
  // el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})



Array.prototype.clear = function () {
  this.splice(0, this.length)
};


if (!esriLoader.isLoaded()) {
  esriLoader.bootstrap((err) => {
    if (err) {
      console.error(err)
    }
    dojo.require("esri.map");
    dojo.require("esri.dijit.InfoWindow")
    dojo.require('esri.layers.WebTiledLayer')
    dojo.require("esri.toolbars.draw")
    dojo.require("dojo._base.event")
    dojo.require("dijit.Menu")
    dojo.require("dijit.MenuItem")
    dojo.require("dijit.MenuSeparator")
    
    //dojo 插件只能放在此处加载
    // Object.defineProperties(Vue, { dojo: { get: () => dojo } })

    dojo.ready(function () {
      // console.log('main',dojo);
      app.$mount('#app')
    });


  }, {
    // url: "http://g.com/3.20/"
    url: "http://www.ztgis.com:8868/arcgis_js_api/library/3.20/"
    // url:'https://js.arcgis.com/3.20/'
  })
}
