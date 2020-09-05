import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'es6-promise/auto'
import axios from 'axios'
import store from '../src/store'
// import './store/index'

Vue.use(router);
Vue.use(ElementUI);

Vue.prototype.$axios = axios 
Vue.prototype.$store = store
 

import './router/permit'

Vue.config.productionTip = false;



new Vue({
  render: h => h(App),
    router,
    // store,
    // axios
    store: store,
}).$mount('#app')
