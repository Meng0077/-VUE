<template>
  <div id="tip_container">
    <div class="mask"></div>
    <section id="tip_text_container">
      <p class="tip_text">{{tips_message}}</p>
      <p v-on:click="closeTip" class="confrim">确定</p>
    </section>
  </div>
</template>
<script>
  export default {
    name: "tips",
    props: ["tips_message"],
    methods: {
      closeTip(){
        this.$emit("closeTip");
      }
    }
  }
</script>

<style scoped>
  #tip_container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 150;
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
  }
  #tip_text_container {
    position: absolute;
    top: 30%;
    left: 30%;
    /*margin-top: 5px;*/
    /*margin-left: 5px;*/
    width: 40%;
    background-color: #EEEEEE;
    border: 1px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .tip_text {
    line-height: 20px;
    text-align: center;
    margin-top: 20%;
    padding: 2px;
    color: #666;
  }
  .confrim {
    position: relative;
    bottom: 0;
    font-weight: bold;
    background-color: #D5D5D5;
    text-align: center;
    border: 1px;
    width: 100%;
    height: 40%;
    padding-top: 4px;
    line-height: 30px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin: 0;
    color: #666;
  }
</style>