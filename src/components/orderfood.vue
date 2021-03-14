<template>
  <div class="orderfood">
    <section class="nav">
      <ul>
        <li v-for="item in this.$store.state.currentShopMenu" :key="item.id" :class="[ item.id == currentNavId ? 'nav_item active' : 'nav_item']" v-on:click="tofoods(item.id)">
          {{item.name}}
        </li>
      </ul>
    </section>
    <section class="foods" :v-if="showfood">
      <ul>
        <li v-for="(item, indexA) in this.$store.state.currentShopMenu" :key="item.id">
          <ul>
            <li v-for="(food, indexB) in item.foods" :key="food.id" :v-if="food.id" class="food_item">
              <section class="img">
                <img :src="`http://elm.cangdu.org/img/${food.image_path}`">
              </section>
              <section class="right">
                <p class="first">{{food.name}}</p>
                <p class="second"> {{food.description}} </p>
                <p class="third">月售{{food.month_sales}} 好评率{{food.satisfy_rate}}%</p>
<!--                <p class="fourth" v-for="(activityitem, index) in food.activity" :key="activityitem.icon_color" >{{ index }} </p>-->
                <p v-if="food.specfoods" class="fourth">
                  <span class="a">￥</span>
                  <span class="b">{{food.specfoods[0].price}}</span>
                </p>

                <span class="choose">
                  <span class="remove" v-if="$store.state.cartFoodList[indexA] && $store.state.cartFoodList[indexA][indexB]" v-on:click="remove(food)">－</span>
                  <span class="food_num" v-if="$store.state.cartFoodList[indexA] && $store.state.cartFoodList[indexA][indexB]">{{ $store.state.cartFoodList[indexA][indexB] }}</span>
                 <span v-on:click="addFood(food)" class="add">+</span>
                </span>
              </section>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  // import Search from "./search";
  export default {
    name: "orderfood",
    // components: {Search},
    data: function (){
      return {
        currentNavId: '',
        showfood: false,
      }
    },
    watch: {
      '$store.state.currentShopMenu'(){
        this.$nextTick(() => {
          // console.log(this.$store.state.currentShopMenu);
          this.showfood = true;
        })
      }
    },
    methods: {
      tofoods(id){
        this.currentNavId = id;
      },
      //添加商品
      addFood(food){
        let category_id = food.category_id;
        let item_id = food.item_id;
        let food_id = food.specfoods[0].food_id;
        let sku_id = food.specfoods[0].sku_id;
        let shop_id = food.specfoods[0].restaurant_id;
        let name = food.specfoods[0].name;
        let specs = food.specfoods[0].specs;
        let packing_fee = food.specfoods[0].packing_fee;
        let price = food.specfoods[0].price;
        let stock = food.specfoods[0].stock;
        this.$store.commit('add_cart', {shop_id, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
      },
      //删除商品
      remove(food){
        let shop_id = food.specfoods[0].restaurant_id;
        let category_id = food.category_id;
        let item_id = food.item_id;
        let food_id = food.specfoods[0].food_id;
        this.$store.commit('remove_cart', {shop_id, category_id, item_id, food_id});
      }
    },
  }
</script>

<style scoped>
  .orderfood {
    width: 100%;
    height: 350px;
    overflow: auto;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: row;
    justify-items: center;
    font-family: "Microsoft Yahei";
  }
    .nav {
      width: 90px;
      min-height: 300px;
      background-color: #D8D8D8;
      overflow: auto;
    }

      .nav ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-size: 15px;
      }
        .nav_item {
          padding: 5px 0 5px 5px;
          height: 30px;
          line-height: 30px;
          display:inline-block;
          width:85px;
          overflow: hidden;
          white-space:nowrap;/*强制单行显示*/

          text-overflow: ellipsis;
        }
        .active {
          background-color: white;
        }
    .foods {
      flex: 1;
      overflow: auto;
    }
    .foods ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
      .food_item {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
        .img {
          width: 50px;
          padding: 10px;
        }
          .img img {
            width: 50px;
            height: 50px;
            border: 1px solid #AAAAAA;
          }
        .right {
          flex: 1;
          position: relative;
        }
          .right p {
            margin: 3px 0 0 5px;
          }
          .first {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
          }
          .second, .third {
            font-size: 13px;
          }
          .second {
            color: #999999;
          }
          .third {
            color: #333333;
          }
          .fourth {
            color: #F8532A;
            margin: 0;
          }
            .fourth .a {
              font-size: 14px;
            }
            .fourth .b {
              font-size: 16px;
              font-weight: 600;
            }
      .choose {
        position: absolute;
        top: 20px;
        right: 10px;
      }
        .remove, .add {
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
        .food_num {
          display: inline-block;
          width: 25px;
          text-align: center;
        }

</style>