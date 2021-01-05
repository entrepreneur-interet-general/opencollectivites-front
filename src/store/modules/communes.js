import OpenCollectivitesDataService from '@/services/OpenCollectivitesDataService'


export default {
  namespaced: true,

  state: {
    items: {},
    mainCommune: null
  },

  actions: {
    fetchCommuneData({ state, commit }, { siren }) {
      return new Promise((resolve) => {
        OpenCollectivitesDataService.communeBySiren(siren)
          .then((response) => {
            var itemData = response.data;
            OpenCollectivitesDataService.aspicFicheCommune(siren).then(
              (response) => {
                console.log("🏢 Fetching data for commune " + siren)
                itemData = { ...itemData, ...response.data }
                commit('setItem', { resource: 'communes', id: siren, item: itemData }, { root: true })
                resolve(state.items[siren])
              })
          })
      })
    },

    fetchSeveralCommunes({ dispatch }, { sirens }) {
      sirens = Array.isArray(sirens) ? sirens : Object.keys(sirens)
      return Promise.all(sirens.map(siren => dispatch('fetchCommuneData', { siren })))
    }
  },

  mutations: {
    setMain(state, siren) {
      state.mainCommune = siren
    }
  }

}
