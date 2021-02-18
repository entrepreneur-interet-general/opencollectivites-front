import Vue from 'vue'
import Vuex from 'vuex'

import communes from './modules/communes'
import header from './modules/header'
import publications from './modules/publications'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  getters: {
    listItems: (state) => (resource) => {
      return Object.keys(state[resource].items)
    }
  },

  actions: {
  },

  mutations: {
    setItem(state, { item, id, resource }) {
      Vue.set(state[resource].items, id, item)
    }
  },

  modules: {
    communes,
    publications,
    header
  }

})

