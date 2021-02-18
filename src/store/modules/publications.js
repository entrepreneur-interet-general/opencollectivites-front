import OpenCollectivitesDataService from '@/services/OpenCollectivitesDataService'

export default {
    namespaced: true,

    state: {
        items: {
            topics: [],
            scopes: [],
            publications: []
        },
    },

    getters: {
        getTopics: (state) => {
            return state.items.topics
        },
        getScopes: (state) => {
            return state.items.scopes
        },
        getPublications: (state) => {
            return state.items.publications
        }
    },

    actions: {
        fetchFilters({ state, commit }) {
            return new Promise((resolve) => {
                OpenCollectivitesDataService.publicationFilters()
                    .then((response) => {
                        console.log("💎 Fetching filters...")
                        const filtersData = response.data;
                        commit('setItem', { resource: 'publications', id: 'topics', item: filtersData.topics }, { root: true })
                        commit('setItem', { resource: 'publications', id: 'scopes', item: filtersData.scopes }, { root: true })

                        resolve(state.items)
                    })
            })
        },
        fetchPublications({ state, commit }, filters = {}) {
            return new Promise((resolve) => {
                OpenCollectivitesDataService.getPublications(filters)
                    .then((response) => {
                        console.log("📜 Fetching publications...")
                        const pubData = response.data;
                        commit('setItem', { resource: 'publications', id: 'publications', item: pubData }, { root: true })
                        resolve(state.items)
                    })
            })
        },
    },

    mutations: {
    }

}
