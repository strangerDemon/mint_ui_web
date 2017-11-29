<template>
  <!-- learn from https://www.bilibili.com/video/av8135647/?t=105 -->
  <div class="container">
    <div class="heartLoading">
      <div class="heart-0"></div>
      <div class="heart-1"></div>
      <div class="heart-2"></div>
      <div class="heart-3"></div>
      <div class="heart-4"></div>
      <div class="heart-5"></div>
      <div class="heart-6"></div>
      <div class="heart-7"></div>
      <div class="heart-8"></div>
    </div>
    <return-div></return-div>
  </div>
</template>

<script>
import ReturnDiv from "./Return"
export default {
  name: "heartLoading",
  directives: {},
  components: {
      ReturnDiv
  },
  data() {
    return {};
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {}
};
</script>
<style lang="css" scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.heartLoading {
  position: relative;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -70px;
}

[class*="heart-"] {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -5px;
  border-radius: 5px;
}

.heart-0,
.heart-8 {
  animation: heart-0 3.2s infinite;
  -webkit-animation: heart-0 3.2s infinite;
}

.heart-1,
.heart-7 {
  animation: heart-1 3.2s infinite;
  -webkit-animation: heart-1 3.2s infinite;
}

.heart-2,
.heart-6 {
  animation: heart-2 3.2s infinite;
  -webkit-animation: heart-2 3.2s infinite;
}

.heart-3,
.heart-5 {
  animation: heart-3 3.2s infinite;
  -webkit-animation: heart-3 3.2s infinite;
}

.heart-4 {
  animation: heart-4 3.2s infinite;
  -webkit-animation: heart-4 3.2s infinite;
}

.heart-0 {
  left: 0;
  animation-delay: 0s;
  background-color: #ec2d37;
}

.heart-1 {
  left: 16px;
  animation-delay: 0.15s;
  background-color: #addddd;
}

.heart-2 {
  left: 32px;
  animation-delay: 0.3s;
  background-color: #bababa;
}

.heart-3 {
  left: 48px;
  animation-delay: 0.45s;
  background-color: #f2f234;
}

.heart-4 {
  left: 64px;
  animation-delay: 0.6s;
  background-color: #ababab;
}

.heart-5 {
  left: 80px;
  animation-delay: 0.75s;
  background-color: #0a9;
}

.heart-6 {
  left: 96px;
  animation-delay: 0.9s;
  background-color: #90a;
}

.heart-7 {
  left: 112px;
  animation-delay: 1.05s;
  background-color: #6c2;
}

.heart-8 {
  left: 128px;
  animation-delay: 1.2s;
  background-color: #ece;
}

@keyframes heart-0 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 30px;
    top: -15px;
  }
}

@keyframes heart-1 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 60px;
    top: -30px;
  }
}

@keyframes heart-2 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 80px;
    top: -40px;
  }
}

@keyframes heart-3 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 90px;
    top: -45px;
  }
}

@keyframes heart-4 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 98px;
    top: -49px;
  }
}
</style>
