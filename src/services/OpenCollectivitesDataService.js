import apiCall from "../http-common"

class OpenCollectivitesDataService {
  listByName(name) {
    return apiCall.get(`/france/all/${name}`);
  }
  communeBySiren(siren) {
    return apiCall.get(`/france/communes/siren/${siren}/`)
  }
  aspicFicheCommune(siren) {
    return apiCall.get(`/aspic/fiche-commune/${siren}/`)
  }
}

export default new OpenCollectivitesDataService();