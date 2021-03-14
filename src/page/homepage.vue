<template>
    <div id="home">
      <div id="top">
        <header_top>
          <template v-slot:logo>
            <icon name="position" scale="2.5"></icon>
          </template>
          <template v-slot:logotext>
            <router-link to="address" tag="span">
              <span class="current_address">{{currentAddress}}></span>
              <span>></span>

            </router-link>
          </template>
          <template v-slot:message>
            <icon name="message" scale="2.5"></icon>
          </template>

        </header_top>
      </div>

      <section class="search">
        <router-link to="search" tag="div" id="search" v-on:click.native="gotosearchpage">
          <search>
            <template v-slot:submit>
              <input type="submit" value="搜索" class="search_sumbit">
            </template>
          </search>
        </router-link>
      </section>

      <section class="classification_food_container">
        <ul class="classification_food">
          <li v-for="item in this.$store.state.classification_food" :key="item.name" class="classification_food_item">
            <img :src="item.imgPath">
            <span class="figcaption">{{ item.name }}</span>
          </li>
        </ul>
      </section>
<!--此处改为静态，图片加载时间长；后端传回来的图片地址不对，不是自己的-->
<!--      <section class="classification_food_container">-->
<!--        <ul class="classification_food">-->
<!--          <li v-for="item in this.foodList" :key="item.id" class="classification_food_item">-->
<!--            <img :src="item.image_url">-->
<!--            <span class="figcaption">{{ item.title }}</span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </section>-->

      <section class="shop_container">
        <div class="shop_classification">
        <header>
          <router-link to="/home/shoplist" tag="span" v-on:click.native="getShopList(1)">推荐</router-link>
          <router-link to="/home/shoplist" tag="span" v-on:click.native="getShopList(2)">水果</router-link>
          <router-link to="/home/shoplist" tag="span" v-on:click.native="getShopList(3)">零食</router-link>
          <router-link to="/home/shoplist" tag="span" v-on:click.native="getShopList(4)">百货</router-link>
        </header>
        </div>
        <router-view class="shop_list_container"></router-view>
      </section>
<!--      <div v-if="showShopDetail" class="shop_detail_container">-->
<!--        <section >-->
<!--          sssss-->
<!--        </section>-->
<!--      </div>-->




    </div>
</template>

<script>
  import header_top from "../components/header";
  import Icon from "vue-svg-icon/Icon";
  import search from "../components/search";
  // import shop from "../components/shop";
  // import homerouter from "../router/home";

  export default {
    name: "homepage",
    data: function (){
      return {
        name: "ym",
        placeholder_content: "请输入商品或商家名称",
        currentAddress: this.$store.state.current_address.address,
        guess_city: {},
        lastType: 0,
        latitude: '',
        longitude: '',
        // showShopDetail: true,
      }
    },
    components: {
      header_top: header_top,
      Icon,
      search: search,
    },
    created() {
      // this.getFoodClassfy();
      this.guessCity();
    },
    watch: {
      // foodList: function (){
      //   this.$nextTick(() => {
      //     console.log(this.foodList);
      //   })
      // }
      //  获取当前地址 异步加载
      guess_city(){
        this.$nextTick(() => {
          //是否有选中的城市
          if(this.$store.state.choosed_city.name){
            this.latitude = this.$store.state.choosed_city.latitude;
            this.longitude = this.$store.state.choosed_city.longitude;
          }else {
            this.latitude = this.guess_city.latitude;
            this.longitude = this.guess_city.longitude;
          }
          this.getShopList(1);
        })
      },
      //监测store中shoplist
      '$store.state.shopList'(){
      }

    },
    methods: {
      gotosearchpage() {
        // this.$store.state.homeSearchState = true;
        console.log(this.$router);
      },
      gotoAddress(){
        console.log(1);
        this.$router.push({path:'./address'})
      },
      // getFoodClassfy(){
      //   this.$http.get("https://elm.cangdu.org/v2/index_entry").then(({data}) => {
      //     this.foodList = data;
      //   })
      // },
    //  定位当前城市
    //  获取当前地址
      guessCity(){
        this.$http.get("https://elm.cangdu.org/v1/cities?type=guess").then(({data}) => {
          //基本类型，字符串
          this.$store.commit("changeGuessCity", data);
          this.guess_city = this.$store.state.guess_city;
        })
      },
      //获取商铺list
      getShopList(type) {
        if(!type == this.lastType){
          switch (type){
            case 1: {
              this.$http.get("https://elm.cangdu.org/shopping/restaurants?latitude="+ this.latitude +"&longitude="+ this.longitude+"&order_by=4").then(({data}) => {
                this.$store.commit("getShopList", data)
              })
              break;
            }
            case 2: {
              this.$http.get("https://elm.cangdu.org/shopping/restaurants?latitude="+ this.latitude +"&longitude="+ this.longitude+"&order_by=3").then(({data}) => {
                this.$store.commit("getShopList", data)
              })
              break;
            }
            case 3: {
              this.$http.get("https://elm.cangdu.org/shopping/restaurants?latitude="+ this.latitude +"&longitude="+ this.longitude+"&order_by=2").then(({data}) => {
                this.$store.commit("getShopList", data)
              })
              break;
            }
            case 4: {
              this.$http.get("https://elm.cangdu.org/shopping/restaurants?latitude="+ this.latitude +"&longitude="+ this.longitude+"&order_by=1").then(({data}) => {
                this.$store.commit("getShopList", data)
              })
              break;
            }
            default: console.log("error type");
          }
        }


      }

    },

    beforeMount() {
      this.$store.commit("changePlaceholder", "输入商家或商品名称");
      this.$store.state.placeholder_message = this.placeholder_content
    },
    activated: {

    },
  }
</script>

<style scoped>
  #top {
    margin: 0;
    height: 50px;
    background-color: white;
    z-index: 100;
  }
  #page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
    background-color: white;
  }
    .current_address{
      white-space:nowrap;/*强制单行显示*/
      display:inline-block;
      position: relative;
      top: 5px;
      width: 100px;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .classification_food_container {
      background-color: white;
      width: 100%;
    }
      .classification_food {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
      }
        .classification_food_item {
          width: 25%;
          text-align: center;
          padding-top: 5px;
          padding-bottom: 5px;
        }
          .classification_food_item img {
            width: 45px;
            height: 45px;
          }
          .classification_food_item span {
            display: inline-block;
            color: #666;
            font-family: Microsoft Yahei;
            font-size: 15px;
          }
    .shop_list_container {
      width: 100%;
    }

  /*.shop_detail_container {*/
  /*  width: 100%;*/
  /*  position: absolute;*/
  /*  background-color: red;*/
  /*  min-height: 100%;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  z-index: 102;*/
  /*}*/

</style>