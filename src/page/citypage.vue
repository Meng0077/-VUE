<template>
  <div id="cityPage">
    <div id="searchTop">
      <span  id="goback" v-on:click="goback">
        <icon name="goback" scale="1.5"></icon>
      </span>
      <search id="searchContext" v-on:gotosearch="gotoSearch" v-bind:placeholder_content="placeholder_content">
        <template v-slot:cancle>
          <input type="button" value="取消" class="cancle" v-on:click="goback">
        </template>
      </search>
    </div>
    <div class="bottom">
      <section class="position_now">
        <p class="title">当前定位</p>
        <p class="position_text">
          <icon name="positionnow"></icon>
          <span class="position_city">{{ this.guessCity }}</span>
          <span class="reset_position" v-on:click="reset_position">重新定位</span>
        </p>
      </section>
      <div class="division"></div>
<!--      历史城市-->
      <section class="city_history">
        <p class="title">历史访问城市</p>
        <div class="itemContainer">
          <span v-for="(item, index) in this.$store.state.history_city" :key="index" class="city_item" v-on:click="choosed(item)">{{item}}</span>
        </div>
      </section>
<!--      热门城市-->
      <section class="city_Hot">
        <p class="title">热门城市</p>
        <span v-for="(item, index) in this.hotcity" :key="index" class="city_item" v-on:click="choosed(item.id)">{{item.name}}</span>
      </section>
<!--      所有城市-->
      <section class="city_All">
        <ul>
          <li class="city_letter" v-for="(item, index) in allCities" :key="index">
            <span class="title">{{index}}</span>
            <span v-if="index == 'A'" class="title">（按字母排序）</span>
            <div class="allcity_item_container">
              <p v-for="(itemCity) in item" :key="itemCity.id"  class="allcity_item" v-on:click="choosed(itemCity.id)">
                {{itemCity.name}}
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import search from "../components/search";
  import Icon from "vue-svg-icon/Icon";

  export default {
    name: "citypage",
    components: {
      search,
      Icon

    },
    data: function (){
      return {
        placeholder_content: "输入城市名称进行搜索",
        //应该请求服务器，这里使用假数据
        allCities: {}, //所有城市列表
        guessCity: '',   //当前城市
        hotcity: {},     //热门城市列表
        getcities: {},  //所有城市列
      }
    },
    async created() {
    //  请求数据
      await this.getCity();
      await this.getHotCity();
      await this.getAllCity();
    },
    watch: {
      getcities: function (){
       this.$nextTick(() => {
         let cities = {};
         for(let i = 65; i < 97; i++){
           //是否为空
           if(this.getcities[String.fromCharCode(i)]){
             cities[String.fromCharCode(i)] = this.getcities[String.fromCharCode(i)];
           }
         }
         this.allCities = cities;
       })
     },
    hotcity: function (){
      this.$nextTick(() => {});
    },
    guessCity: function (){
      this.$nextTick(() => {});
    }

    },
    methods: {
      //所有城市
      getAllCity(){
        this.$http.get("https://elm.cangdu.org/v1/cities?type=group").then(({data}) => {
          this.getcities = data;
        })
      },
      //获取当前城市
      getCity(){
        this.$http.get('https://elm.cangdu.org/v1/cities?type=guess').then(({data}) => {
          this.guessCity = data.name;
          this.$store.state.current_city = data.name;
        });
      },

      getHotCity(){
        this.$http.get("https://elm.cangdu.org/v1/cities?type=hot").then(({data}) => {
          let hot = data;
          for(let i = 0; i < hot.length; i++){
            this.hotcity[i] = hot[i];
            console.log(this.hotcity[i])
            // this.hotcity.push(hot[i]);
          }
        })
      },
      goback(){
        this.$router.go(-1)
      },
      gotoSearch(){
        console.log(1);
      },
      reset_position(){
        //重新定位
        this.getCity();
      },
      choosed(item){
        this.$http.get("https://elm.cangdu.org/v1/cities/" + item).then(({data}) => {
          console.log(data);
          this.$store.commit("chooseCity", data);
          console.log(this.$store.state.choosed_city);
        })

        this.$router.go(-1);
      },

    },
    computed: {
      allCity(){
        let cities = {};

        for(let i = 'A'; i < 'Z'; i++){
          // console.log(this.allCities["A"]);
          // cities[i] = this.allCity[i];
          console.log(i);
          // if(this.allCities[String.fromCharCode(i)]){
          //   cities[String.fromCharCode(i)] = this.allCities[String.fromCharCode(i)];
          // }
        }
        return cities;
      }
    }
  }
</script>

<style scoped>
  #cityPage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 103;
    background-color: white;
    min-height: 100%;
    height: auto;
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
  .bottom{
    position: relative;
  }
    .position_now, .city_All, .city_history, .city_Hot{
      margin-left: 10px;
      margin-right: 10px;
    }
      .title{
        color: #666666;
        font-size: 14px;
        margin: 10px 0;

      }
      .position_text {
        margin: 3px 5px;
        width: 100%;
      }
        .position_city {
          margin-left: 5px;
          font-size: 17px;
          font-family: "Adobe 黑体 Std R";
        }
        .reset_position {
          position: absolute;
          right: 10px;
          color: #666666;
        }
      .itemContainer {
        padding: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
      }
       .city_item {
         display: inline-block;
         text-align: center;
         background-color: #F2F2F2;
         padding: 3px 8px;
         flex: auto;
         margin: 7px;
         border-radius: 15px;
         width: 25%;
         overflow: hidden;
       }
    .division {
      width: 100%;
      height: 7px;
      background: #F2F2F2;

    }
      .city_All ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
        .city_letter {
          margin: 0;
        }
        .allcity_item {
          margin: 10px;
          border-bottom: 1px solid #D5D5D5;
          color: #585858;
        }

</style>