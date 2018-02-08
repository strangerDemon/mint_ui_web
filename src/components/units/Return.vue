<template>
  <div class="return">
    <span class="prompt">操作成功</span>
  </div>
</template>
<script>
export default {
  name: "return",
  directives: {},
  components: {},
  data() {
    return {
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    init() {
      if (window.bridge != undefined) {
        window.bridge.clickOnJsOfClose();
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