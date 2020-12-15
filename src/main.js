import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
