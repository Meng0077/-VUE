<template>
  <div class="agreement">
    <div class="agmentB_header">
        <span class="agmentB_header_a" v-on:click="goback">
          <icon name="goback" scale="2.5" class="goback" ></icon>
        </span>

      <span class="agmentB_header_b">隐私协议</span>
    </div>
    <div class="agreement_content">
      <p>xxxxxxxxxxxxxxxx</p>
    </div>
  </div>
</template>

<script>
  import Icon from "vue-svg-icon/Icon";
  export default {
    name: "agreementB",
    components: {
      Icon
    },
    methods: {
      goback(){
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped>
.agreement {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  background-color: white;
}
.agmentB_header {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.agmentB_header .agmentB_header_b {
  margin-left: 120px;
  display: inline-block;
  height: 22px;
  line-height: 22px;
}
.agreement_content {
  padding: 5px 20px;
}
</style>