import axios from "axios";

const apiCall = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

class OpenCollectivitesDataService {
  listByName(name) {
    return apiCall.get(`/france/subdivisions/${name}?category=communes`);
  }
  communeBySiren(siren) {
    return apiCall.get(`/france/communes/siren/${siren}`)
  }
  aspicFicheCommune(siren) {
    return apiCall.get(`/aspic/fiche-commune/${siren}`)
  }
}

export default new OpenCollectivitesDataService();