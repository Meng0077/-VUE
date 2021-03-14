import Vue from 'vue';
import Router from 'vue-router';
//引入要切换的组件
// import firstchild from "../components/firstchild";
// import secondchild from "../components/secondchild";

//引入page中的component
import homepage from "../page/homepage";
import minepage from "../page/minepage";
import orderpage from "../page/orderpage";
import login from "../page/login";
import searchpage from "../page/searchpage";
import address from "../page/address";
import citypage from "../page/citypage";
import shoplist from "../components/shoplist";
import shop from "../page/shop";
import orderfood from "../components/orderfood";
import evaluation from "../components/evaluation";
import shopdescription from "../components/shopdescription";
import agreementA from "../page/agreementA";
import agreementB from "../page/agreementB";
import mineInfo from "../page/mineInfo";
import changePassword from "../page/changePassword";
Vue.use(Router)
const routes = [
    {
        path: '/home',
        name: "home",
        component: homepage,
        children: [
            { path: '/',  component: shoplist},
            { path: 'shoplist', component: shoplist},
        ]
    },
    {path: '/mine', component: minepage},
    {path: '/order', component: orderpage},
    {path: '/login', component: login},
    {path: '/search', component: searchpage},
    {path: '/address', component: address},
    {path: '/city', component: citypage},
    {path: '/agreementA', component: agreementA},
    {path: '/agreementB', component: agreementB},
    {path: '/mineInfo', component: mineInfo},
    {path: '/changePassword', component: changePassword},

    {
        path: '/shop',
        component: shop,
        name: 'shop',
        children: [
            { path: '/', component: orderfood},
            { path: 'orderfood', component: orderfood},
            { path: 'evaluation', component: evaluation},
            { path: 'shopdescription', component: shopdescription}

        ]
    },
    // {path: '/', component:homepage},
    {path: '*', redirect: '/home'},



]
const router = new Router({
    routes: routes,
})
export default router
