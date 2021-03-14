<template>
  <div id="header_top">
    <div class="logo">
      <slot name="logo"></slot>
      <slot name="logotext"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="search">
     <slot name="search"></slot>
    </div>
    <div class="set">
      <slot name="set"></slot>
    </div>
    <div id="message">
      <slot name="message"></slot>
    </div>


  </div>
</template>

<script>

  export default {
    name: "header_top",
  }
</script>

<style scoped>
  #header_top {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    color: #666666;
    z-index: 100;
  }
  #message {
    position: absolute;
    right: 15px;
    top: 15px;
  }
  .search, .set {
    position: absolute;
    right: 50px;
    top: 15px;
    opacity: 0.6;
  }
  .center {
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-family: "Adobe 黑体 Std R";
    letter-spacing: 1.3px;
  }
  .logo {
    position: absolute;
    left: 15px;
    top: 15px;
    opacity: 0.8;
  }
  .logo span {
    display: inline-block;
    position: relative;
    top: -5px;
    left: 5px;
  }
</style>