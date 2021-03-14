<template>
  <div id="app">
    <router-view></router-view>

    <footer_guide></footer_guide>
  </div>

</template>

<script>
  import router from "./router";
  import footer_guide from "./components/footer";

  export default {
    name: "home",
    router: router,
    components: {
      footer_guide: footer_guide,
    },


  }
</script>

<style scoped>

</style>