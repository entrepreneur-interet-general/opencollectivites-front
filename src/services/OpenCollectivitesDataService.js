import axios from "axios";

console.log(process.env.VUE_APP_TITLE)
console.log(process.env.VUE_APP_API_BASE_URL)

const apiCall = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json"
  }
});

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