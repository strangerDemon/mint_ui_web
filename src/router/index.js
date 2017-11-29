import Vue from "vue";
import Router from "vue-router";
import App from "@/components/App";
import topicEdit from "../components/topicEdit/Index.vue";
import topicEditMap from "../components/topicEdit/EditAtMap.vue";
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
      path: "/topicEdit",
      name: "topicEdit",
      component: topicEdit
    },
    {
      path: "/topicEditMap",
      name: "topicEditMap",
      component: topicEditMap
    },{
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
