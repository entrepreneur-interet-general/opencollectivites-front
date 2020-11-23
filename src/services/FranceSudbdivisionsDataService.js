import http from "../http-common";

class FranceSudbdivisionsDataService {
    findByName(name) {
        return http.get(`/france/all/${name}`);
    }
}

export default new FranceSudbdivisionsDataService();