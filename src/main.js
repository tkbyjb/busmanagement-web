import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router'
import store  from './store'
import api from './api/api'
import manage from './utils/manage'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$api = api
Vue.prototype.$manage = manage

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
