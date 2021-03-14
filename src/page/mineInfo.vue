<template>
  <div class="myInfo">
    <div class="myInfo_header">
      <span class="myInfo_header_a" v-on:click="goback">
        <icon name="goback" scale="2.5" class="goback" ></icon>
      </span>
      <span class="myInfo_header_b">账户设置</span>
    </div>
    <div class="myInfo_content">
      <p class="myInfo_userimg">
        <span>头像</span>
        <img src="../imgs/user.png" class="img_user">
        <img src="../imgs/arrow.png" class="img_arrow">
      </p>
      <p class="myInfo_username">
        <span class="span_A">用户名</span>
        <span class="span_B">{{ this.$store.state.username}}</span>
      </p>
      <p class="myInfo_userId">
        <span class="span_A">用户ID</span>
        <span class="span_B">{{this.$store.state.user_id}}</span>
      </p>
      <p class="myInfo_tel_title">账号绑定</p>
      <p class="myInfo_tel">
        <span class="span_A">手机号</span>
        <span class="span_B">{{this.$store.state.tel}} 暂时无法绑定</span>
      </p>
      <p class="myInfo_password_title">安全设置</p>
      <p class="myInfo_password">
        <span class="span_A">登录密码</span>
        <router-link to="changePassword" tag="span" class="span_B">
          修改
          <img src="../imgs/arrow.png" class="img_arrowB">
        </router-link>


      </p>

    </div>
  </div>
</template>

<script>
  import Icon from "vue-svg-icon/Icon";
  export default {
    name: "mineInfo",
    components: {
      Icon
    },
    data: function (){
      return {
        username: '',
        user_id:'',
        user_tel:'',
      }
    },
    methods: {
      goback(){
        this.$router.go(-1);
      }
    },
    beforeMount() {
      this.$store.commit('init_user');
      console.log(this.$store.state.user_id);
    },

  }

</script>

<style scoped>
.myInfo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  background-color: white;
  font-family: "Adobe Heiti Std R";
}
  .myInfo_header {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    background-color: #E6E6E6;
  }
    .myInfo_header_b {
      margin-left: 120px;
      display: inline-block;
      height: 22px;
      line-height: 22px;
      font-size: 20px;
      letter-spacing: 1.3px;
    }
  .myInfo_content {
    padding: 10px 0;
  }
    p {
      margin: 0;
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #CCCCCC;
      display: flex;
      flex-direction: row;
    }
    .myInfo_userimg {
      height: 80px;
      line-height: 80px;
    }
      .myInfo_userimg span {
        display: inline-block;
        width: 100px;
        margin-right: 200px;
      }
      .img_user {
        display: inline-block;
        width: 70px;
        height: 70px;
      }
      .img_arrow {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-top: 15px;
        margin-left: 5px;
      }

    .myInfo_tel_title, .myInfo_password_title {
      background-color: #E6E6E6;
      height: 30px;
      line-height: 30px;
    }
    .span_A {
      width: 100px;
      margin-right: 180px;
    }
    .span_B {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
      text-align: right;
    }
    .img_arrowB {
      width: 20px;
      height: 20px;
      position: relative;
      top: 3px;
      /*display: inline-block;*/
    }
</style>