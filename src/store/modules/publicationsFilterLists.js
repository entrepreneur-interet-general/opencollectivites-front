import OpenCollectivitesDataService from '@/services/OpenCollectivitesDataService'

export default {
    namespaced: true,

    state: {
        items: {
            topics: [],
            scopes: [],
            document_types: []
        },
    },

    getters: {
        getTopics: (state) => {
            return state.items.topics
        },
        getScopes: (state) => {
            return state.items.scopes
        },
        getDocumentTypes: (state) => {
            return state.items.document_types
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
                        commit('setItem', { resource: 'publicationsFilterLists', id: 'document_types', item: filtersData.document_types }, { root: true })

                        resolve(state.items)
                    })
            })
        },
    },

    mutations: {
    }

}
