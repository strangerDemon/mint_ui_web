<template>
  <router-view class='app'>
  </router-view>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0 0 0 0;
  }

  html {
    font-family: Arial, sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
  }

  body {
    font-size: 12px;
    line-height: 1.5;
    color: #565656;
    word-wrap: break-word
  }

  * {
    box-sizing: border-box;
  }

  .app {
    height: 100%;
    width: 100%;
    margin: 0 0 0 0;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }

  .clearfix {
    overflow: hidden;
    _zoom: 1;
  }

</style>
