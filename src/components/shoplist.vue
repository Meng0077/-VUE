<template>
  <div class="shop_list_container">
    <ul>
      <router-link to="shop" tag="li"  v-for="item in this.$store.state.shopList" :key="item.id" class="shop_item" v-on:click.native="gotoshop(item.id)">
        <section class="left">
          <img :src="`http://elm.cangdu.org/img/${item.image_path}`">
        </section>
        <section class="right">
          <header >
            <span class="shop_title">{{ item.name }}</span>
          </header>
          <section class="order_num">
            <span class="score"><span class="score_num">{{item.rating}}</span><span>分</span></span>
            <span class="num">月售{{item.recent_order_num}}</span>
            <span class="least_money">起送￥{{item.float_minimum_order_amount}}</span>
            <span class="delivery_fee">配送￥{{item.float_delivery_fee}}</span>
            <span class="time">{{item.order_lead_time}}</span>
            <span class="distance">{{item.distance}}</span>
            <span class="delivery_mode">{{item.delivery_mode["text"]}}</span>
          </section>


        </section>
      </router-link>
      <li class="shop_item_bottom"></li>
    </ul>
<!--    加载动画-->
<!--    <transition name="loading">-->
<!--      <loading v-show="showLoading"></loading>-->
<!--    </transition>-->
  </div>
</template>

<script>
  export default {
    name: "shoplist",
    data: function (){
      return {
        showshoplist: false
      }
    },
    created() {

    },
    watch: {
      '$store.state.shopList'(){
        this.showshoplist = true;

      }

    },
    methods: {
      gotoshop(id){
        this.$store.commit("getcurrentShopId", id);
      }
    }
  }
</script>

<style scoped>
  .shop_list_container {
    width: 100%;
    height: auto;

  }
  ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: #F7F7F7;
    float: left;
    font-family: "Microsoft Yahei";
  }
    .shop_item {
      width: 95%;
      height: 105px;
      background-color: white;
      margin: 10px 2.5%;
      overflow: hidden;
      border-radius: 10px;
      display: flex;
      flex-direction: row;
    }
      .left {
        padding: 0 10px;
        height: 100%;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: center;
      }
        .left img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
        }
      .right {
        padding: 13px 10px;
        height: 100%;
        width: 300px;
      }
        .shop_title {
          white-space:nowrap;/*强制单行显示*/
          display:inline-block;
          position: relative;
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #333;
          font-weight: 700;
        }
        .order_num {
          color: #808080;
          font-size: 12px;
          height: 25px;
          line-height: 25px;
        }

          .score {
            display: inline-block;
            color: #F8532A;
            width: 45px;
          }
            .score_num {
              font-weight: 600;
              font-size: 16px;
            }
          .num {
            display: inline-block;
            width: 90px;

          }
          .least_money {
            display: inline-block;
            width: 60px;
          }
          .delivery_fee {
            display: inline-block;
            width: 50px;
          }
          .time {
            display: inline-block;
            width: 80px;
          }
          .distance {
            display: inline-block;
            width: 100px;
          }
          .delivery_mode {
            display: inline-block;
            border: 1px solid #5577FF;
            color: #5577FF;
            width: 60px;
            text-align: center;
            height: 20px;
            line-height: 20px;
            border-radius: 8px;
          }

</style>