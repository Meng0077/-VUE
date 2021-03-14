<template>
    <div id="order">
      <header_top>
        <template v-slot:center>
          订单
        </template>
        <template v-slot:search>
          <icon name="search" scale="2.5"></icon>
        </template>
        <template v-slot:message>
          <icon name="message" scale="2.5"></icon>
        </template>
      </header_top>



    </div>
</template>

<script>
  import header_top from "../components/header";
  import Icon from "vue-svg-icon/Icon";
  export default {
    name: "orderpage",
    components: {
      header_top: header_top,
      Icon
    }
}
</script>

<style scoped>

</style>