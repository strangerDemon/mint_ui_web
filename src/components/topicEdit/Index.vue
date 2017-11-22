<template>
  <div class="topicEdit">
    <mt-index-list>
      <!--handler 必须学成匿名的-->
      <mt-cell-swipe v-for="(item,index) in topicEditList" :key="index" :title="item.name" :right="[{
          content: '编辑',
          style: { background: '#409EFF', color: '#fff' },
          handler:()=>editAtMap(item.id)
        }]"></mt-cell-swipe>
    </mt-index-list>

  </div>
</template>
<script>
  import * as regExp from '../../utils/regExp.js'
  import tokenUtil from '../../utils/tokenUtil'
  import {
    Toast
  } from '../../../node_modules/mint-ui';
  import Router from "vue-router";
  export default {
    name: "topicEdit",
    directives: {},
    components: {},
    data() {
      return {
        account: "",
        password: "",
        token: "",
        topicEditList: [],
      }
    },
    props: {},
    computed: {},
    watch: {
      '$store.state.mapInfo.topicEditList' (val) {
        this.topicEditList = val;
      }
    },
    methods: {
      editAtMap(topicMapId) {
        this.$store.commit("setTopicMapId", {
          topicMapId: topicMapId
        });
        this.$router.push("topicEditMap");
      }
    },
    beforeCreate() {},
    created() {},
    destroyed() {},
    mounted() {
      let vm = this
      let url = window.location.href;
      vm.account = regExp.GetQueryString(url, "account");
      vm.password = regExp.GetQueryString(url, "password");
      vm.token = regExp.GetQueryString(url, "token");
      tokenUtil.token = vm.token;
      vm.$store.commit('requsetTopicEditList', {
        account: vm.account,
        password: vm.password
      });
      vm.$store.commit('setUserInfo', {
        account: vm.account,
        password: vm.password
      });

    }
  }

</script>
<style lang="css" scoped>
  .topicEdit {
    position: absoulte;
    width: 100%;
    height: 100%;
  }

</style>
