<template>
    <div id="mine">
      <header_top>
        <template v-slot:center>
          个人中心
        </template>
        <template v-slot:set>
          <icon name="set" scale="2.5"></icon>
        </template>
        <template v-slot:message>
          <icon name="message" scale="2.5"></icon>
        </template>
      </header_top>
      <section class="user_center">
        <img src="../imgs/user.png" class="img_mine">
        <router-link :to="this.loginOrInfo" class="user_detail" tag="p">
          <span class="user_name">{{ this.username }}</span>
          <span class="user_slogan">填满了肚子，人生就不会空虚</span>
        </router-link>
      </section>
      <section class="common_function">
        <p>常用功能</p>
       <div class="function_container" >
         <span class="function_item">
           <img src="../imgs/balance.png">
           <span>我的余额</span>
         </span>
         <span class="function_item">
            <img src="../imgs/redPacket.png">
            <span>我的红包</span>
         </span>
         <span class="function_item">
            <img src="../imgs/customer_serve.png">
           <span>我的客服</span>
         </span>
       </div>
      </section>

    </div>
</template>

<script>
  import header_top from "../components/header";
  import Icon from "vue-svg-icon/Icon";
  export default {
    name: "minepage",
    components: {
      header_top: header_top,
      Icon
    },
    data: function (){
      return {
        username: "立即登录",
        loginOrInfo: 'login'
      }
    },
    beforeMount() {
      this.$store.commit('init_user');
      if(this.$store.state.user_id){
        this.username = this.$store.state.username;
        this.loginOrInfo = 'mineInfo';
      }
    },
  }
</script>

<style scoped>
  .user_center {
    position: relative;
    top: 45px;
    width: 100%;
    height: 100px;
    background-color: #F7F7F7;
    border-radius: 10px;
  }
    .img_mine {
      width: 80px;
      height: 80px;
      margin-top: 10px;
      margin-left: 10px;
    }
    .user_detail {
      display: inline-block;
      position: relative;
      top: -20px;
      padding-left: 10px;
    }
      .user_name {
        display: block;
        font-size: 20px;
        color: #3c3c3c;
        font-weight: 600;
      }
      .user_slogan {
        display: block;
        margin-top: 15px;
        font-size: 15px;
        color: #6F6F6F;
      }
    .common_function {
      position: relative;
      top: 50px;
      height: 80px;
      width: 100%;
    }
      .common_function p {
        margin: 5px 0 5px 0;
        height: 25px;
        line-height: 25px;
        font-size: 16px;
        font-weight: 600;
      }
      .function_container {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      .function_item {
        display: inline-block;
        width: 33%;
        text-align: center;

      }
        .function_item img {
          display: block;
          width: 50px;
          height: 50px;
          margin-left: 40px;
          margin-bottom: 10px;
        }

</style>