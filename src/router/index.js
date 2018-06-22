import Vue from "vue";
import Router from "vue-router";
import App from "@/components/App";
import topicEditTable from "../components/topicEdit/EditTable.vue"

import Success from "../components/units/Success.vue"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "App",
      component: App
    },
  {
      path: "/topicEditTable",
      name: "topicEditTable",
      component: topicEditTable
    }
    ,{
      path: "/Success",
      name: "Success",
      component: Success
    }
  ]
});
