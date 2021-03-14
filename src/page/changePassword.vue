<template>
  <div class="changePassword">
    <div class="changePassword_header">
      <span class="changePassword_header_a" v-on:click="goback">
        <icon name="goback" scale="2.5" class="goback" ></icon>
      </span>
      <span class="changePassword_header_b">重置密码</span>
    </div>
    <div class="changePassword_content">
      <p>
        <span>用户名</span>
        <input type="text" :placeholder="this.$store.state.username" disabled>
      </p>
      <p>
        <span>用户ID</span>
        <input type="text" :placeholder="this.$store.state.user_id" disabled>
      </p>

      <p>
        <span>旧密码</span>
        <input type="text" placeholder="旧密码" v-model="oldpassword">
      </p>
      <p>
        <span>新密码</span>
        <input type="text" placeholder="新密码" v-model="newpassword">
      </p>
      <p>
        <span>确认新密码</span>
        <input type="text" placeholder="确认新密码" v-model="confirmpassword">
      </p>
      <p>
        <span>验证码</span>
        <input type="text" placeholder="验证码" v-model="captcha_code">
        <img :src="this.img">
        <button class="refresh" v-on:click="getVerify" type="button">刷新</button>
      </p>
      <button class="sumbit" :disabled="confirm" v-on:click="sumbitchange">确定</button>


  </div>
    <tips v-if="showTips" v-on:closeTip="closeTip" v-bind:tips_message="tips_message"></tips>
  </div>
</template>

<script>
import Icon from "vue-svg-icon/Icon";
import tips from "../components/tips";


  export default {
    name: "changePassword",
    components: {
      Icon,
      tips
    },
    data: function (){
      return {
        img:'',
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
        captcha_code: '',
        confirm: true,
        tips_message:'',
        showTips: false,
        changesuccess: false,
      }
    },
    created(){
      this.getVerify();
    },
    watch: {
      ifconfirm(){
        if(this.oldpassword && this.newpassword && this.confirmpassword && this.captcha_code){
          this.confirm = false;
        }else {
          this.confirm = true;
        }
      }
    },
    computed: {
      ifconfirm(){
        const {oldpassword, newpassword, confirmpassword, captcha_code} = this;
        return {
          oldpassword,
          newpassword,
          confirmpassword,
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
      sumbitchange(){
        let username = this.$store.state.username;
        let oldpassWord = this.oldpassword;
        let newpassword = this.newpassword;
        let confirmpassword = this.confirmpassword;
        let captcha_code = this.captcha_code;
        this.$http.post("https://elm.cangdu.org/v2/changepassword", {username, oldpassWord, newpassword,  confirmpassword, captcha_code}).then(({data}) => {
          if(data.status == 0) {
            this.tips_message = data.message;
            this.showTips = true;
          }else {
            this.tips_message = data.success;
            this.showTips = true;
            this.changesuccess = true;
          }


        })
      },
      closeTip(){
        if(this.changesuccess){
          this.showTips = false;
          this.$router.go(-1);
        }
        else {
          this.showTips = false;

        }
      },
    }
  }
</script>

<style scoped>
  .changePassword {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    background-color: white;
    font-family: "Adobe Heiti Std R";
  }
    .changePassword_header {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    background-color: #E6E6E6;
  }
      .changePassword_header_b {
    margin-left: 120px;
    display: inline-block;
    height: 22px;
    line-height: 22px;
    font-size: 20px;
    letter-spacing: 1.3px;
  }
    .changePassword_content {
      padding: 10px 0;
    }
      p {
        display: inline-block;
        padding: 0 10px;
        margin: 0;
        width: 100%;
        height: 50px;
        padding: 0 10px;
        line-height: 50px;
        border-bottom: 1px solid #CCCCCC;
      }
      p span {
        display: inline-block;
        width: 100px;
      }
      p input {
        height: 45px;
        line-height: 45px;
        outline: none;
        background-color: white;
        border: none;
        width: 150px;
      }
      .sumbit {
        width: 80%;
        height: 30px;
        margin-top: 20px;
        margin-left: 10%;
        border-radius: 15px;
        font-size: 18px;
        letter-spacing: 20px;
        font-weight: 550;
        display: block;
        border: none;
        background-color: #999999;
        outline: none;
      }
</style>