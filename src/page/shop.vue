<template>
  <div id="shopPage">
    <div class="mask_bg">
      <img :src="`http://elm.cangdu.org/img/${this.$store.state.currentShop.image_path}`">
    </div>
    <div class="shop_top">
      <section class="goback" v-on:click="goback">
        <icon name="goback" scale="2.5" ></icon>
      </section>
      <section class="shop_title_container" v-if="showtitle">
        <header >
          <span class="shop_title">{{ this.$store.state.currentShop.name }}</span>
          <p class="second">
            <span class="delivery_mode">{{this.$store.state.currentShop.delivery_mode.text}}</span>
            <span class="time">{{this.$store.state.currentShop.order_lead_time ? this.$store.state.currentShop.order_lead_time + "分钟" : "无法预计时长"}}</span>
            <span>  ·  </span>
            <span class="num">月售{{this.$store.state.currentShop.recent_order_num ? this.$store.state.currentShop.recent_order_num : 0}}</span>
          </p>
          <p class="third">
            <span>公告： {{ this.$store.state.currentShop.promotion_info}}</span>
          </p>
          <p class="fourth" v-if="this.$store.state.currentShop.activities.length">
            <span v-for="item in this.$store.state.currentShop.activities" :key="item.id">
              {{ item.description}}
            </span>
          </p>
        </header>
      </section>
      <section class="img">
        <img :src="`http://elm.cangdu.org/img/${this.$store.state.currentShop.image_path}`">
      </section>
    </div>
    <div class="show_type">
      <router-link to="/shop/orderfood" tag="span">点餐</router-link>
      <router-link to="/shop/evaluation" tag="span">评价</router-link>
      <router-link to="/shop/shopDescription" tag="span">商家</router-link>
    </div>
    <router-view></router-view>
<!--    购物车-->
    <div class="cart" v-on:click="showCartList">
      <section class="cart_num">
        <div class="cart_icon">
          <icon name="shoppingcartA" scale="4" v-if="this.totalFoodNum"></icon>
          <icon name="shoppingcartB" scale="4" v-if="!this.totalFoodNum"></icon>
          <p v-if="this.totalFoodNum" id="totalNum">{{this.totalFoodNum}}</p>
          <div class="cart_money">
            <p class="moneyA">
              <span>￥</span>
              <span>{{this.totalPrice}}</span>
            </p>
            <p class="moneyB">另需配送费{{ this.$store.state.currentShop.float_delivery_fee }}元</p>
          </div>
        </div>
      </section>
      <section class="gotopay" v-on:click.stop="gotopay"> 去结算 </section>
    </div>
<!--    购物车列表-->
    <div class="cartlist_bg" v-if="this.cartFoodList.length" v-on:click.self="hiddencart" v-show="showcartlist"></div>
    <div class="cartlist_container" v-if="this.cartFoodList.length" v-show="showcartlist">
      <p class="cartlist_title_container">
        <span class="cartlist_title">已选商品</span>
        <span class="clearcart">清空列表</span>
      </p>
      <section>
        <ul class="cart_item_container">
          <li v-for="item in this.cartFoodList" :key="item.id" class="cart_item">
            <img :src="`http://elm.cangdu.org/img/${item.image_path}`">
           <div class="item_description">
             <span class="food_title">{{item.name}}</span>
             <span class="food_price">￥{{item.specfoods[0].price}}</span>
             <span class="remove" v-on:click="remove(item)">－</span>
             <span class="cart_num">{{storagecartlist[item.category_id][item.item_id][item.specfoods[0].food_id].num}}</span>
             <span v-on:click="addFood(item)" class="add">+</span>
           </div>
          </li>
        </ul>
      </section>
      <div id="css"></div>
    </div>
  </div>
</template>

<script>
  import Icon from "vue-svg-icon/Icon";

  export default {
    name: "shop",
    data: function (){
      return {
        showtitle: true,
        // ifBuy: "shoppingcartB",
        shopId: null,
        totalPrice: 0, //总价
        categoryNum: [], //各菜单加入购物车的总数量
        cartFoodList: [], //购物车列表
        showcartlist: false,//显示购物列表
        // foods: {},
        totalFoodNum: 0,
        storagecartlist:{},
      }
    },
    components: {
      Icon
    },
    created() {
      this.$store.commit('init_cart');
    },
    computed: {
      watchid(){
        const {currentShopId, cartList, currentShopMenu} = this.$store.state;
        return {
          currentShopId,
          cartList,
          currentShopMenu
        }
      }
    },
    watch: {
      //1 shopid
      '$store.state.currentShopId'(){
        this.$nextTick(() => {
          this.getShopData();
        })
      },
      watchid(){
        this.shopId = this.$store.state.currentShopId;
        this.storagecartlist = this.$store.state.cartList[this.shopId];
        this.initCart();
      },
      cartFoodList(){

      }
    },
    methods: {
      goback(){
        this.$router.go(-1);
      },
      //2 shopdata
      getShopData(){
        //detail
        this.$http.get("https://elm.cangdu.org/shopping/restaurant/" + this.$store.state.currentShopId).then(({data}) => {
          this.$store.commit("getcurrentShop", data);
        })
        //menu
        this.$http.get("https://elm.cangdu.org/shopping/v2/menu?restaurant_id=" + this.$store.state.currentShopId).then(({data}) => {
          this.$store.commit("getMenu", data);

        })
      },
      //初始化购物车
      initCart(){
        let cartfoods = this.storagecartlist;
        this.totalPrice = 0;
        this.cartFoodList = [];
        this.totalFoodNum = 0;
        let newArr = [];
        console.log(this.$store.state.currentShopMenu);
        for(let i in this.$store.state.currentShopMenu){
          this.categoryNum[i] = 0;
          //某类menu不存在 category.id 不存在,其内food的num全为0
          let item = this.$store.state.currentShopMenu[i];
          if(!cartfoods[item.id]){
            newArr[i] = 0;
          }else {
            newArr[i] = [];
            //menu存在，看food
            for(let j in item["foods"]) {
              let food = item["foods"][j];
              let foodid = food.specfoods[0].food_id;
              if(cartfoods[item.id][food.item_id] && cartfoods[item.id][food.item_id][foodid].num){
                let num = cartfoods[item.id][food.item_id][foodid].num;
                console.log(num);
                //各个food
                newArr[i][j] = num;
                //menu
                this.categoryNum[i] = this.categoryNum[i] + num;
                //total
                this.totalFoodNum = this.totalFoodNum + num;
                //cartlist
                this.cartFoodList.push(food);
                //totalprice
                let price = cartfoods[item.id][food.item_id][foodid].price + cartfoods[item.id][food.item_id][foodid].packing_fee;
                this.totalPrice = this.totalPrice + num * price;
              }else {
                newArr[i][j] = 0;
              }
            }
          }
        }
        this.$store.commit("getcartFoodList", newArr);
        this.totalPrice = this.totalPrice.toFixed(2);  //tofixed 四舍五入到2位小数
        console.log(this.cartFoodList);
      },
      add(item){
        console.log(item);
      },
      remove(item){
        let shop_id = item.specfoods[0].restaurant_id;
        let category_id = item.category_id;
        let item_id = item.item_id;
        let food_id = item.specfoods[0].food_id;
        this.$store.commit('remove_cart', {shop_id, category_id, item_id, food_id});
      },
      addFood(item){
        let category_id = item.category_id;
        let item_id = item.item_id;
        let food_id = item.specfoods[0].food_id;
        let sku_id = item.specfoods[0].sku_id;
        let shop_id = item.specfoods[0].restaurant_id;
        let name = item.specfoods[0].name;
        let specs = item.specfoods[0].specs;
        let packing_fee = item.specfoods[0].packing_fee;
        let price = item.specfoods[0].price;
        let stock = item.specfoods[0].stock;
        this.$store.commit('add_cart', {shop_id, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
      },
      showCartList(){
        this.showcartlist = true;
        console.log(1);
      },
      hiddencart(){
        this.showcartlist = false;
      },
      gotopay(){
        console.log("a");
      },
    }
  }
</script>

<style scoped>
  #shopPage {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #F7F7F7;
    z-index: 101;
    font-family: "Microsoft Yahei";
    overflow: hidden;
  }
  .mask_bg {
    width: 100%;
    background-color: #EEEEEE;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
    .mask_bg img{
      width: 100%;
      opacity: 0.2;
      filter: blur(15px)
    }
    .shop_top {
      width: 95%;
      height: 115px;
      background-color: #f5f5f5;
      margin: 10px 2.5%;
      overflow: hidden;
      border-radius: 10px;
      display: flex;
      flex-direction: row;
      z-index: 103;
    }
      .goback {
        width: 30px;
        height: 30px;
        margin-top: 10px;
      }
      .shop_title_container {
        width: 90%;
        background-color: #f5f5f5;
        height: 100%;
      }
        .shop_title {
          display: block;
          font-size: 18px;
          font-weight: 550;
          margin-top: 10px;
        }
        .second, .third, .fourth {
          margin-top: 7px;
          margin-bottom: 0;
          font-size: 14px;
          color: #3C3C3C;
        }
        .delivery_mode {
          display: inline-block;
          background-color: #C4CEF6;
          color: #2248DD;
          width: 60px;
          text-align: center;
          border-radius: 2px;
        }
        .time {
          display: inline-block;
          margin-left: 10px;
        }
        .third {
          color: #888888;
        }
        .fourth {
          color: #FF1111;
        }
      .img {
        height: 60px;
        width: 60px;
        padding: 10px;
        line-height: 100%;
        position: absolute;
        right: 0;
      }
        .img img {
          width: 60px;
          height: 60px;
          border-radius: 8px;
        }

    .show_type {
      background-color: #f5f5f5;
      height: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 15px;
      padding-left: 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
     .show_type span {
       margin-right: 30px;
     }
   .router-link-active {
     font-weight: 600;
   }

   .cart {
     height: 50px;
     position: absolute;
     bottom: 0;
     width: 100%;
     background-color: white;
     display: flex;
     flex-direction: row;
     justify-items: center;
     border-top-right-radius: 10px;
     border-top-left-radius: 10px;
   }
    #totalNum{
      padding: 0;
      display: inline-block;
      position: absolute;
      z-index: 104;
      background-color: red;
      color: white;
      bottom: 25px;
      left: 45px;
      width: 23px;
      height: 23px;
      line-height: 23px;
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
    }
    .cart_icon {
      width: 200px;
      height: 50px;
      display: flex;
      flex-direction: row;
      padding-left: 20px;
      padding-top: 5px;
    }
      .cart_icon p {
        padding-left: 25px;
        margin: 0;
      }
      .moneyA {
        font-size: 15px;
        font-weight: 700;
      }
      .moneyB {
        font-size: 14px;
        color: #999999;
      }
    .gotopay {
      background-color: #67a4ed;
      position: absolute;
      right: 10px;
      top: 10px;
      height: 30px;
      width: 80px;
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      font-weight: 600;
      color: #F2F2F2;
    }

    .cartlist_bg {
      width: 100%;
      position: absolute;
      bottom: 50px;
      left: 0;
      height: 100%;
      background-color: black;
      opacity: 0.3;
      z-index: 100;
    }
      .cartlist_container {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 50px;
        z-index: 106;
        background-color: white;
        opacity: 1;
        max-height: 400px;
        overflow: auto;
        display: flex;
        flex-direction: column;

      }
        .cartlist_title_container {
          height: 30px;
          width: 100%;
          /*position: absolute;*/
          /*top: 0;*/
          line-height: 30px;
          background-color: white;
        }
          .cartlist_title {
            display: inline-block;
            font-size: 18px;
            font-weight: 600;
            padding-left: 20px;
            margin-right: 220px;
          }
          .clearcart {
            font-size: 15px;
            color: #999999;
          }

        .cart_item_container {
          /*position: absolute;*/
          /*top: 30px;*/
          flex: 1;
          padding: 0;
          margin: 0;

        }
          .cart_item {
            width: 100%;
            height: 80px;
            list-style-type: none;
            overflow: hidden;
            margin-left: 15px;
            line-height: 80px;
            display: flex;
            flex-direction: row;
          }
          .cart_item img {
            width: 50px;
            height: 50px;
            display: inline-block;
            margin-top: 15px;
          }
          .item_description {
            flex: 1;
            display: inline-block;
          }
            .food_title, .food_price {
              display: inline-block;
              width: 80px;
              font-weight: 600;
              height: 30px;
              line-height: 30px;
              margin-left: 20px;
            }
            .food_price {
              margin-right: 50px;
            }
            .add, .remove{
              background-color: #67a4ed;
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              line-height: 20px;
              text-align: center;
              color: white;
              font-weight: 600;
              font-size: 20px;
            }
            .cart_num {
              margin-right: 10px;
              margin-left: 10px;
              display: inline-block;
            }
        .css {
          clear: both;
        }



</style>