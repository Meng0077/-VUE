import Vue from 'vue';
import home from "./home";
import store from "./store/index.js";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
new Vue({
    el: "#ele",
    render: h => h(home),
    store: store
})

