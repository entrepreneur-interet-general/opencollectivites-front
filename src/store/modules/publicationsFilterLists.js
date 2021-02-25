import OpenCollectivitesDataService from '@/services/OpenCollectivitesDataService'

export default {
    namespaced: true,

    state: {
        items: {
            topics: [],
            scopes: [],
        },
    },

    getters: {
        getTopics: (state) => {
            return state.items.topics
        },
        getScopes: (state) => {
            return state.items.scopes
        },
    },

    actions: {
        fetchFilterLists({ state, commit }) {
            return new Promise((resolve) => {
                OpenCollectivitesDataService.publicationFilters()
                    .then((response) => {
                        console.log("💎 Fetching filters...")
                        const filtersData = response.data;
                        commit('setItem', { resource: 'publicationsFilterLists', id: 'topics', item: filtersData.topics }, { root: true })
                        commit('setItem', { resource: 'publicationsFilterLists', id: 'scopes', item: filtersData.scopes }, { root: true })

                        resolve(state.items)
                    })
            })
        },
    },

    mutations: {
    }

}
