import http from "../http-common";

class OpenCollectivitesDataService {
    listByName(name) {
        return http.get(`/france/all/${name}`);
    }
    communeBySiren(siren) {
        return http.get(`/france/communes/siren/${siren}/`)
    }
}

export default new OpenCollectivitesDataService();