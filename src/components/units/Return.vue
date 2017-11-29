<template>
  <div class="return">
      操作成功
      <mt-button type="default" size="small" @click.native="goback"> 返回 </mt-button>
  </div>
</template>
<script>
import { Toast } from "../../../node_modules/mint-ui";
export default {
  name: "return",
  directives: {},
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    goback() {
      if (window.bridge != undefined) {
        window.bridge.clickOnJsOfClose();
      } else {
        Toast("你的设备不支持改项操作");
      }
    }
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {}
};
</script>
<style lang="css" scoped>
.return {
  position: absolute;
  top: 60%;
  left: 50%;
  margin: 0 0 0 -58px;
}
</style>