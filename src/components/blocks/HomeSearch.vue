<template>
  <div
    id="homesearch"
    class="rf-container-fluid rf-bg--alt rf-padding-bottom-6N rf-padding-top-2N"
  >
    <div class="rf-container">
      <h1>
        Trouver les études, statistiques et outils locaux utiles à vos prises de
        décision, recherches ou au débat public
      </h1>
      <div class="rf-select-group">
        <label class="rf-label">Commune, EPCI, département, région</label>
        <multiselect
          v-model="place"
          :options="optionList"
          group-values="items"
          group-label="groupName"
          track-by="value"
          label="text"
          :group-select="false"
          :multiple="false"
          :internal-search="false"
          :loading="isLoading"
          :preserve-search="true"
          placeholder="Taper les premières lettres de la collectivité recherchée"
          @search-change="searchCollectivities"
          :options-limit="300"
          :limit="3"
          :limit-text="limitText"
          @input="loadResultPage"
        >
          <span slot="noOptions"></span>
          <span slot="noResult">
            Aucun résultat trouvé, merci de vérifier votre saisie.
          </span>
        </multiselect>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import OpenCollectivitesDataService from "@/services/OpenCollectivitesDataService";
import { shortnamedCommunes } from "@/utils";

export default {
  name: "TitleSearch",
  components: {
    Multiselect,
  },
  data() {
    return {
      optionList: [],
      place: null,
      isLoading: false,
    };
  },
  methods: {
    limitText(count) {
      return `et ${count} autres résultats`;
    },
    searchCollectivities(query) {
      query = query.toLowerCase();

      if (query.length < 3 && !shortnamedCommunes.includes(query)) {
        this.optionList = [];
      } else {
        this.isLoading = true;
        OpenCollectivitesDataService.listByName(query)
          .then((response) => {
            this.optionList = response.data;
            this.isLoading = false;
          })
          .catch((e) => {
            console.log("🙅  Service not responding");
            console.log(e);
          });
      }
    },
    loadResultPage() {
      this.$router.push({
        name: "placeSummary",
        params: {
          siren: this.place.value,
          name: this.place.text,
          type: this.place.type,
        },
      });
    },
  },
};
</script>

<style scoped>
#homesearch {
  padding-top: 10px;
  padding-bottom: 20px;
}
</style>