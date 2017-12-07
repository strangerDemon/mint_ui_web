<template>
  <div class="return">
      <span class="prompt">操作成功</span>
  </div>
</template>
<script>
import { Toast } from "../../../node_modules/mint-ui";

import * as platform from "@/utils/platform.js";

export default {
  name: "return",
  directives: {},
  components: {},
  data() {
    return {
      isAndroid: false,
      isIos: false
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    init() {
      this.isAndroid = platform.isAndroid() && window.bridge != undefined;
      this.isIos = platform.isIos();
      if (this.isAndroid) {
        window.bridge.clickOnJsOfClose();
      } else if (this.isIos) {
      }
    }
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    this.init();
  }
};
</script>
<style lang="css" scoped>
.return {
  position: absolute;
  width: 100%;
  height: 100%;
}
.prompt {
  position: absolute;
  top: 60%;
  text-align: center;
  width: 100%;
  height: 30px;
}
.button {
  position: absolute;
  top: 60%;
  text-align: center;
  width: 100%;
  height: 30px;
  margin-top: 30px;
}
</style>