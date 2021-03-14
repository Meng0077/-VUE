import Vue from 'vue';
import Router from 'vue-router';
//引入page中的component
// import searchpage from "../page/searchpage";
// import addresspage from "../page/address";
// import citypage from "../page/citypage";
import shop from "../components/shop";

Vue.use(Router)
const homeroutes = [
    // {path: '/search', component: searchpage},
    // {path: '/address', component: addresspage},
    // {path: '/city', component: citypage},
    {path: '/shop', component: shop},

]
const homerouter = new Router({
    routes: homeroutes,
})
export default homerouter