<template>
  <div id="addressPage">
    <section class="top">
      <header_top>
        <template v-slot:logo>
        <span  id="goback" v-on:click="goback" class="logo_back">
          <icon name="goback" scale="2"></icon>
        </span>
        </template>
        <template v-slot:center id="title" >选择收获地址</template>
        <template v-slot:message>
          <span v-on:click="control_address">管理</span>
        </template>
      </header_top>

    </section>

    <div class="bottom">
      <section class="position_search_container">
        <p >
          <router-link tag="span" class="city_container" to="city">
            <span class="current_city">{{this.$store.state.current_city.name}}</span>
            <icon name="down" scale="0.7"></icon>
          </router-link>
          <icon name="partingLine" scale="2" class="partingLine"></icon>

          <span class="street">
            <icon name="search" scale="1.5" class="searchIcon"></icon>
            <input type="text" placeholder="小区/写字楼/学校等" class="homeaddress">
          </span>
        </p>
      </section>

      <section class="position_now">
        <p class="position_text_title">当前定位</p>
        <p class="position_text">
          <icon name="positionnow"></icon>
          <span class="position_city">{{this.guess_city.name}}</span>
          <span class="reset_position" v-on:click="reset_position">重新定位</span>
        </p>
      </section>

      <div class="division"></div>
      <section class="address_container">
        <span class="address_title">收货地址</span>
        <ul>
          <li v-for="(item, index) in this.$store.state.addressAll" :key="index" class="address_item_container" v-on:click="choosedAddress(item)">
            <p class="address_item">{{ item.address }}</p>
            <p class="address_person">
              <span class="address_name">{{item.name}}</span>
              <span class="address_tel">{{item.tel}}</span>
            </p>
          </li>
          <li class="address_item_container" id="add_new_address" v-on:click="add_address">
            新增地址
          </li>
        </ul>
      </section>

      <div class="division"></div>
      <section class="nearby_container">
        <span class="address_title">附近地址</span>
        <ul>
          <li v-for="(item, index) in this.$store.state.addressNearby" :key="index" class="address_nearby">
            <span class="nearby_item">{{ item }}</span>

          </li>

        </ul>
      </section>

      <keep-alive>
        <router-view id="page"></router-view>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  import header_top from "../components/header";
  import Icon from "vue-svg-icon/Icon";

  export default {
    name: "addresspage",
    data: function (){
      return {
        guess_city: {}
      }
    },

    components: {
      header_top,
      Icon,
    },
    async created() {
      await this.guessCity();
    },
    beforeMount() {
    },
    watch: {
      guess_city: function (){
        this.$nextTick(() => {
          //choose current guess
          this.$store.state.current_city = this.$store.state.guess_city;
          if(this.$store.state.choosed_city.name){
            this.$store.state.current_city = this.$store.state.choosed_city;
            this.$store.state.choosed_city = {};
          }
        })
      }
    },
    methods: {
      //获取当前城市
      // guessCity: function (){
      //   this.$http.get("https://elm.cangdu.org/v1/cities?type=guess").then(({data}) => {
      //     //基本类型，字符串
      //     this.$store.commit("changeGuessCity", data.name);
      //     this.guess_city = this.$store.state.guess_city;
      //   })
      // },
      guessCity: function (){
        this.$http.get("https://elm.cangdu.org/v1/cities?type=guess").then(({data}) => {
          //基本类型，字符串
          this.$store.commit("changeGuessCity", data);
          this.guess_city = this.$store.state.guess_city;
        })
      },
      //返回
      goback(){
        this.$router.go(-1);
      },
      //重新定位
      reset_position(){
        this.guessCity();
      },
      //  管理地址
      control_address(){
        alert("暂未做");
      },
      //新增地址
      add_address(){
        alert("暂未做");

      },
      choosedAddress(item){
        this.$store.state.current_address = item;
        this.$router.go(-1);
      }
    },
  }
</script>

<style scoped>
  .logo_back {
    margin-top: 7px;
  }

  #addressPage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 103;
    background-color: white;

  }
    .bottom{
      position: relative;
      top: 40px;

    }
      .position_search_container {
        font-size: 14px;
        width: 100%;
      }
      .position_search_container p{
        background-color: #F2F2F2;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
        margin-left: 10px;
        border-radius: 15px;
      }
        .city_container {
          margin-left: 15px;
        }
          .city_container span {
            margin-right: 10px;
            display:inline-block;

          }
          .current_city {
            white-space:nowrap;/*强制单行显示*/
            display:inline-block;
            position: relative;
            top: 5px;
            width: 60px;
            height: 20px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        .partingLine {
          position: relative;
          top: 4px;
        }
        .searchIcon {
          position: relative;
          top: 3px;
          margin-right: 4px;
        }
          .homeaddress {
            border: none;
            outline: none;
            -webkit-appearance: none;
            background-color: #F2F2F2;

          }
    .position_now, .address_container, .nearby_container {
      margin-left: 10px;
      margin-right: 10px;
    }
      .position_text_title, .address_title {
        color: #666666;
        font-size: 14px;
        margin: 0;

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
          right: 15px;
          color: #666666;
        }
    .division {
      width: 100%;
      height: 7px;
      background: #F2F2F2;

    }
    .address_container {
      margin-top: 10px;
    }
      .address_container ul, .nearby_container ul{
        margin: 0;
        padding-left: 15px;
      }
        .address_item_container {
          list-style-type: none;
          border-bottom: 1px solid #D6D6D6;
          margin: 0;
        }
          .address_item, .address_person{
            margin: 5px 0;
            height: 25px;
            line-height: 25px;
          }
          .address_item {
            font-size: 17px;
            font-family: "Adobe 黑体 Std R";
          }
          .address_person {
            color: #666666;
            font-size: 14px;
          }
            .address_name {
              margin-right: 10px;
            }
        #add_new_address {
          color: #7272E3;
          font-size: 17px;
          margin: 5px 0;
          border: none;
        }
        .address_nearby {
          list-style-type: none;
          margin: 5px 0;
        }
          .address_nearby span {
            background: #D8D8D8;
            height: 30px;
            line-height: 30px;
            border-radius: 10px;
            padding: 2px 7px;
          }


</style>