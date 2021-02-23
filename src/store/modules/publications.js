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

        listPublications({ dispatch, state }, filters) {
            return new Promise((resolve) => {
                dispatch('fetchPublications', { filters: filters }).then(() => {
                    let cards = [];
                    const publications = state.items.publications;
                    for (const p of publications) {
                        const card = { id: p.id, data: {} };

                        // Type de contenu | Date de màj  •  Source 1, Source 2 par ordre alphabétique
                        var document_type = "Publication";
                        if (p.document_type.length) {
                            document_type = p.document_type[0].name;
                        }
                        var detail = document_type + " | " + p.last_update;
                        detail += " • " + p.source.editor[0].acronym;
                        card.data.detail =
                            detail.length < 200 ? detail : detail.substring(0, 200) + "…";

                        card.data.url = p.url;
                        card.data.title =
                            p.title.length < 100 ? p.title : p.title.substring(0, 100) + "…";
                        card.data.description =
                            p.body.length < 300 ? p.body : p.body.substring(0, 200) + "…";
                        cards.push(card);
                    }
                    console.log("the cards");
                    console.log(cards);
                    resolve(cards);
                });
            });
        },
    },

    mutations: {
    }

}
