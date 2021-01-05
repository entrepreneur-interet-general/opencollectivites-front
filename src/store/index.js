import Vue from 'vue'
import Vuex from 'vuex'

import communes from './modules/communes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },

  getters: {
    listItems: (state) => (resource) => {
      return Object.keys(state[resource].items)
    }
  },

  actions: {},

  mutations: {
    increment(state) {
      state.count++
    },

    setItem(state, { item, id, resource }) {
      console.log("Setting item" + id + " " + resource)
      Vue.set(state[resource].items, id, item)
    }
  },

  modules: {
    communes
  }

})

