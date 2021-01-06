import apiCall from "../http-common";
import Router from '../router'

class OpenCollectivitesDataService {
    listByName(name) {
        return apiCall.get(`/france/all/${name}`);
    }
    communeBySiren(siren) {
        return apiCall.get(`/france/communes/siren/${siren}/`).catch(
            Router.push({
                name: "error"
            })

        )
    }
    aspicFicheCommune(siren) {
        return apiCall.get(`/aspic/fiche-commune/${siren}/`)
    }
}

export default new OpenCollectivitesDataService();