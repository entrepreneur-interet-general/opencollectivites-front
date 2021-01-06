export default {
  namespaced: true,

  state: {
    fullHeader: true
  },

  getters: {
    getHeaderSize: (state) => {
      return state.fullHeader
    }
  },

  actions: {
    minimizeHeader({ state, commit }) {
      if (state.fullHeader) {
        console.log("🤏 minimizing header")
        commit('setHeaderSize', false)
      }
    },

    maximizeHeader({ state, commit }) {
      if (!state.fullHeader) {
        console.log("🤙 maximizing header")
        commit('setHeaderSize', true)
      }
    }
  },

  mutations: {
    setHeaderSize(state, { value }) {
      state.fullHeader = value
    },
  }

}
