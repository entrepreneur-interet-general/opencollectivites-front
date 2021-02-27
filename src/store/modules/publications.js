import OpenCollectivitesDataService from '@/services/OpenCollectivitesDataService'
import { countObjectProperties } from '@/utils'

export default {
    namespaced: true,

    state: {
        items: {
        },
    },

    getters: {
        getPublicationsCount: state => id => {
            if (state.items[id]) {
                return countObjectProperties(state.items[id].publications)
            } else {
                return 0
            }

        },

    },

    actions: {
        fetchPublications({ state, commit }, { id, filters }) {
            return new Promise((resolve) => {
                OpenCollectivitesDataService.getPublications(filters)
                    .then((response) => {
                        console.log("📜 Fetching publications...")
                        const pubData = response.data;
                        const data = { filters: filters, publications: pubData }
                        commit('setItem', { resource: 'publications', id: id, item: data }, { root: true })
                        resolve(state.items[id])
                    })
            })
        },

        listPublications({ state, dispatch, commit }, { id, filters }) {
            return new Promise((resolve) => {
                dispatch('fetchPublications', { id: id, filters: filters }).then(() => {
                    let cards = [];
                    const publications = state.items[id].publications;
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
                    const data = { filters: filters, publications: publications, cards: cards }
                    commit('setItem', { resource: 'publications', id: id, item: data }, { root: true })
                    resolve(cards);
                });
            });
        },

        listPublicationsFromSeveralFilters({ dispatch }, { filtersList }) {
            const ids = Object.keys(filtersList)
            return Promise.all(ids.map(id => dispatch('listPublications', { id: id, filters: filtersList[id] })))
        }
    },

    mutations: {
    }

}
