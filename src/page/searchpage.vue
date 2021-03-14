<template>
  <div id="searchpage">
    <div id="searchTop">
      <span  id="goback" v-on:click="goback">
        <icon name="goback" scale="1.5"></icon>
      </span>
      <search id="searchContext" v-on:gotosearch="gotoSearch">
        <template v-slot:cancle>
          <input type="button" value="取消" class="cancle" v-on:click="goback">
        </template>
      </search>
    </div>
    <tips v-if="showTips" v-on:closeTip="closeTip" v-bind:tips_message="tips_message" v-bind:showHide="showTips"></tips>

    <div id="history" v-if="showHistory">
      <p>
        <span class="title_history">搜索历史</span>
        <span class="delete_history" v-on:click="delete_history">
          <icon name="delete" scale="2"></icon>
        </span>
      </p>
      <div class="history_container">
        <span v-for="(item, index) in this.$store.state.searchHistory" :key="index" class="history_list">{{item}}</span>
      </div>

    </div>
  </div>

</template>

<script>
  import Icon from "vue-svg-icon/Icon";
  import search from "../components/search";
  import tips from "../components/tips";
  import store from "../store";
  export default {
    name: "searchpage",
    components: {
      Icon,
      search,
      tips
    },
    store: store,
    beforeMount() {
      if(this.$store.state.searchHistory.length != 0){
        this.showHistory = true;
      //  history应储存
      }
      this.$store.state.placeholder_message = this.placeholder_content;
      console.log(this.$store.state.placeholder_message)
    },
    data: function(){
      return {
        ifshow: true,
        search_History: [],
        showHistory: false,
        showTips: false,
        tips_message: null,
        placeholder_content: "请输入商品或商家名称"
      }
    },
    methods: {
      delete_history(){
        this.search_History = [];
        this.showHistory = false
      },

      goback(){
        this.$router.go(-1);

      },
      gotoSearch() {
        if(this.$store.state.search_content == ""){
          this.showTips = true;
          this.tips_message = "查询内容不得为空";
          return
        }else {
        //请求数据，
          this.showTips = true;
          this.tips_message = "未搜索到相关结果(上未做后端，没数据）";
          //缺少去重，以及history的储存限制，是否储存在localsession
          this.$store.commit("gotosearch");
          return
        }

      },
      closeTip() {
        this.showTips = false;
        if(this.$store.state.searchHistory.length != 0){
          this.showHistory = true;
        }
      }
    },



  }
</script>

<style scoped>
  #searchpage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
    background-color: white;
  }
  #searchTop {
    margin: 15px;
  }
    #searchContext {
      display: inline-block;
      width: 80%;
    }
    #goback {
      margin-right: 10px;
    }
  #history {
    margin: 15px;
  }
    .title_history {
      font-size: 16px;
      line-height: 20px;
      color: #666;
    }
    .delete_history {
      float: right;
      margin-right: 10px;
    }
    .history_container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      align-content: flex-start;
      max-height: 150px;


    }
    .history_list {
      font-size: 15px;
      color: #666;
      min-width: 20px;
      background-color: #D8D8D8;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 10px;
      text-align: center;
      padding-left: 4px;
      padding-right: 4px;

    }
</style>