import Vue from 'vue';
import Vuex from 'vuex';
import {setStore, getStore} from "../storage/storage";

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        homeSearchState: true,
        //search
        placeholder_message: "",
        search_content: "",
        searchHistory: [],
        tips: "未搜索到相关结果(后端没做，也没写假数据）",
        //address city
        addressAll: [
            {
                address: "浙大玉泉校区(新桥门）",
                name: "ym",
                tel: "19858874808"
            },
            {
                address: "浙大玉泉校区(北门）",
                name: "ym",
                tel: "19858874808"
            }
        ],
        addressNearby: [
           "aaaaaa",
            "bbbbbb"
        ],
        history_city:["杭州", "上海"],
        hot_city:[ ],
        choosed_city: {},
        guess_city: {},
        current_city: {},
        current_address: {
            address: "当前定位不可用",
            name: "",
            tel: ""
        },
        classification_food: {
            0: {
                name: "甜品饮品",
                imgPath: "https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            1: {
                name: "商超便利",
                imgPath: "https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            2: {
                name: "美食团购",
                imgPath: "https://fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            3: {
                name: "水果生鲜",
                imgPath: "https://fuss10.elemecdn.com/4/34/ea0d51c9608310cf41faa5de6b8efjpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            4: {
                name: "汉堡薯条",
                imgPath: "https://fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            5: {
                name: "西餐意面",
                imgPath: "https://fuss10.elemecdn.com/7/b6/235761e50d391445f021922b71789jpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            6: {
                name: "日韩料理",
                imgPath: "https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            7: {
                name: "快餐便当",
                imgPath: "https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            },
            8: {
                name: "全部分类",
                imgPath: "https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg",
                //将router-link中的path写在这里，统一为food
                path: "shop"
            }
        },
        //shop
        shopList: {},
        currentShopMenu: {},
        currentShopId: "",
        currentShop: {},
        //cart
        cartList: {},  //购物车中food列表_localstorage
        cartFoodList: {},
        //user
        user_id:'',
        username:'',
        tel:'',
    },
    mutations: {
        gotosearch(state){
            //判断之前是否搜索过
            state.searchHistory.unshift(state.search_content);
            state.search_content = "";
        },
        updata(state, value){
            state.search_content =value;
        },
        changePlaceholder(state, value){
            state.placeholder_message = value;
        },
        chooseAddress(state, value){
            state.current_address = value;
        },
        // 定位城市
        changeGuessCity(state, value){
            state.guess_city = value;
        },
        //选择城市
        chooseCity(state, value){
            state.choosed_city = value;
        },
    //    获取shoplist
        getShopList(state, value){
            state.shopList = value;
        },
        getMenu(state, value){
            state.currentShopMenu = value;
        },
        getcurrentShopId(state, value){
            state.currentShopId = value;
        },
        getcurrentShop(state, value){
            state.currentShop = value;
        },
        //添加购物车
        add_cart(state, {shop_id, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock}){
            console.log(shop_id);
            let cart = state.cartList;
            let shop = cart[shop_id] = (cart[shop_id] || {});
            let category = shop[category_id] = (shop[category_id] || {});
            let item = category[item_id] = (category[item_id] || {});
            if (item[food_id]) {
                item[food_id]['num']++;
            } else {
                item[food_id] = {
                    "num" : 1,
                    "id" : food_id,
                    "name" : name,
                    "price" : price,
                    "specs" : specs,
                    "packing_fee" : packing_fee,
                    "sku_id" : sku_id,
                    "stock" : stock
                };
            }
            state.cartList = {...cart};
            setStore('Cart', state.cartList);
        },
        //移出购物车
        remove_cart(state, { shop_id, category_id, item_id, food_id}){
            let cart = state.cartList;
            let shop = (cart[shop_id] || {});
            let category =  (shop[category_id] || {});
            let item = (category[item_id] || {});
            if (item[food_id] && item) {
                if (item[food_id]['num'] > 0) {
                    item[food_id]['num'] --;
                    state.cartList = {...cart};
                    setStore('Cart', state.cartList)
                }else {
                    //num为0.清空商品信息; 为0后，不再显示-
                    item[food_id] = null;
                }
            }
        },
        //初始化时从本地获取购物车信息
        init_cart(state){
            let initcart = getStore('Cart');
            if(initcart) {
                state.cartList = JSON.parse(initcart);
            }
        },
        //清空当前购物车信息
        //同步每个商品cart的num
        getcartFoodList(state, value){
            state.cartFoodList = value;
        },

        //login
        setUser(state, value){
            console.log(value);
            state.user_id = value.user_id;
            state.username = value.username;
            console.log(state.user_id);
            setStore('username', state.username);
            setStore('user_id', state.user_id);

        },
        init_user(state){
            let user_id = getStore('user_id');
            console.log(user_id);
            if(user_id){
                state.user_id = user_id;
                state.username = getStore('username');
            }
        },
    }
})
export default store