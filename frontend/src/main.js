import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/vue-awesome'
import './config/msgs'
import './config/axios'
import './config/mq'
import './config/vue-the-mask'
import './config/v-money'
import './config/vue-moment'
import './config/vue-currency'
import './config/vee-validate'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')