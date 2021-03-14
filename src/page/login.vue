<template>
    <div id="login">
      <div class="login_header">
        <span class="login_header_a" v-on:click="goback">
          <icon name="goback" scale="2.5" class="goback" ></icon>
        </span>

        <span class="login_header_b">手机号登录</span>
      </div>
     <form>
       <p class="form_title">密码登录</p>
       <input type="tel" placeholder="请输入账号/手机号" class="account" v-model="username" autocomplete="on">
       <input type="password" placeholder="请输入密码" class="account" v-model="password" autocomplete="on">
       <p class="verify">
         <input type="text" placeholder="验证码" v-model="captcha_code" maxlength="4" autocomplete="off">
         <span class="verify_detail">
           <img :src="this.img">
           <button class="refresh" v-on:click="getVerify" type="button">刷新验证码</button>
         </span>

       </p>
       <button class="btn_login"  v-on:click="login(username, password, captcha_code)"
               :disabled="iflogin" type="button"
       >登录</button>
       <div class="check">
         <input type="checkbox" v-on:click="checkbox" id="check">
         <label for="check">
           未注册手机号/账号登录后将自动生成账号，且代表您已阅读并同意
           <router-link to="agreementA">《用户服务协议》</router-link>
           <router-link to="agreementB">《隐私协议》</router-link>
         </label>
       </div>
     </form>
      <tips v-if="showTips" v-on:closeTip="closeTip" v-bind:tips_message="tips_message"></tips>
    </div>
</template>

<script>
import Icon from "vue-svg-icon/Icon";
import tips from "../components/tips";


  export default {
    name: "login",
    data: function (){
      return {
        img: '',
        isCheck: false,
        username:'',
        password:'',
        captcha_code: '',
        iflogin: true,
        showTips:false,
        tips_message:"",
      }
    },
    components: {
      Icon,
      tips:tips
    },
    created(){
      this.getVerify();
    },
    watch: {
      loginOption(){
        if(this.captcha_code && this.username && this.password && this.isCheck) {
          this.iflogin = false;
        }else {
          this.iflogin = true;
        }
      },
    },
    computed: {
      loginOption(){
        const {isCheck, username, password, captcha_code} = this;
        return {
          isCheck,
          username,
          password,
          captcha_code
        }
      }
    },
    methods: {
      goback(){
        this.$router.go(-1);
      },
      getVerify() {
        this.$http.post("https://elm.cangdu.org/v1/captchas").then(({data}) => {
          this.img = data.code
        })
      },
      checkbox(){
        this.isCheck = event.target.checked;
      },
      login(username, password, captcha_code){
        this.$http.post("https://elm.cangdu.org/v2/login", {username, password, captcha_code}).then(({data}) => {
          if(data.status == 0){
            this.tips_message = data.message;
            this.showTips = true;
          }else{
            console.log(data);
            let user_id = data.user_id;
            let username = data.username;
            this.$store.commit("setUser", {user_id, username});
            this.$router.go(-1);
          }
        })
      },
      closeTip(){
        this.showTips = false;
      },
    }
  }
</script>

<style scoped>
  #login {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #F7F7F7;
    z-index: 101;
    font-family: "Adobe Heiti Std R";
  }
    .login_header {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
      .login_header .login_header_b {
        margin-left: 270px;
        display: inline-block;
        height: 22px;
        line-height: 22px;
      }

    form {
      width: 100%;
      height: 250px;
    }
      .form_title {
        font-size: 20px;
        font-weight: bold;
        height: 25px;
        line-height: 25px;
        margin-left: 20px;
      }
      form input {
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom: 1px solid #BBBBBB;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        width: 90%;
        margin-left: 20px;
        outline: none;
        background-color: #F7F7F7;
      }
      .account {
        display: block;
      }
    .verify {
      margin: 0;
      position: relative;
    }
      .verify_detail {
        display: inline-block;
        position: absolute;
        right: 20px;
      }
      .verify img {
        width: 90px;
        margin-right: 20px;
      }
      .refresh {
        width: 80px;
        height: 25px;
        line-height: 25px;
        position: relative;
        top: -10px;
        border-radius: 12.5px;
      }

    .btn_login {
      width: 80%;
      height: 30px;
      margin-top: 20px;
      margin-left: 10%;
      border-radius: 15px;
      font-size: 18px;
      letter-spacing: 20px;
      font-weight: 550;
      display: block;
      margin-bottom: 10px;
    }

    button {
      border: none;
      outline: none;
      background-color: #BBBBBB;
    }
    .check {
      margin: 0 20px;
    }
    #check {
      width: 15px;
      height: 15px;
    }
    label {
      font-size: 15px;
      height: 40px;
      line-height: 20px;
    }
    label a {
      text-decoration: none;
      color: #558CDD;
    }



</style>