import Vue from 'vue'
import Vuex from 'vuex'

import App from '@/App.vue'
import router from '@/router'
import store from "@/store";

Vue.use(Vuex)

Vue.config.productionTip = false

import VuexRouterSync from 'vuex-router-sync';
VuexRouterSync.sync(store, router);

import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

