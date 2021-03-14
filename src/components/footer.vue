<template>
  <div id="footer_guide">
    <ul>
      <router-link tag="li" to="home" class="item">
        <icon name="home" scale="3"></icon>
        <span>首页</span>
      </router-link>
      <router-link tag="li" to="order" class="item">
        <icon name="order" scale="3"></icon>
        <span>订单</span>
      </router-link>
      <router-link tag="li" to="mine" class="item">
        <icon name="mine" scale="3"></icon>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import Icon from "vue-svg-icon/Icon"
  export default {
    name: "footer_guide",
    components: {
      Icon
    }
  }
</script>

<style scoped>
  #footer_guide ul {
    position: fixed;
    background-color: #fff;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 100;
    width: 100%;
    height: 50px;
    padding: 0;
    margin: 0;
    font-size: 12px;
    font-weight: bold;
    color: #585858;
  }
    .item {
      display: flex;
      text-align: center;
      align-items: center;
      flex-direction: column;
      list-style-type: none;
      float: left;
      width: 33%;
      opacity: 0.6;
    }
    .router-link-active {
      opacity: 1;

    }

</style>