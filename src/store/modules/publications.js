import OpenCollectivitesDataService from '@/services/OpenCollectivitesDataService'

export default {
    namespaced: true,

    state: {
        items: {
            publications: []
        },
    },

    getters: {
        getPublications: (state) => {
            return state.items.publications
        },
        getPublicationsNumber: (state) => {
            return state.items.publications.length
        },

    },

    actions: {
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
                dispatch('fetchPublications', filters).then(() => {
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
                    resolve(cards);
                });
            });
        },
    },

    mutations: {
    }

}
