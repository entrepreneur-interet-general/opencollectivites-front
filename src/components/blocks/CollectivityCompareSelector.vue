<template>
  <div class="comparison-selector rf-bg--alt">
    <form @submit.prevent="loadResultPage">
      <div class="rf-select-group">
        <label class="rf-label">
          Sélectionnez jusqu'à trois collectivités :
        </label>
        <multiselect
          v-model="places"
          :options="optionList"
          track-by="value"
          label="text"
          :multiple="true"
          :max="3"
          :internal-search="false"
          :close-on-select="false"
          :loading="isLoading"
          :preserve-search="true"
          placeholder="Taper les premières lettres de la collectivité recherchée"
          @search-change="searchCollectivities"
          :options-limit="300"
          :limit="3"
          :limit-text="limitText"
        >
          <span slot="noOptions"></span>
          <span slot="noResult">
            Aucun résultat trouvé, merci de vérifier votre saisie.
          </span>
        </multiselect>
      </div>
      <BaseButton
        label="Comparer"
        class="rf-btn--icon-right"
        :isDisabled="!(places && places.length)"
      />
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import OpenCollectivitesDataService from "@/services/OpenCollectivitesDataService";
import { shortnamedCommunes } from "@/utils";
import BaseButton from "../vue-gouvfr/BaseButton.vue";

export default {
  components: {
    Multiselect,
    BaseButton,
  },

  props: {
    type: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    defaultList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      optionList: this.defaultList,
      places: null,
      isLoading: false,
    };
  },

  computed: {
    groupName() {
      if (this.type === "commune") {
        return "Communes";
      }
      return "";
    },
  },

  methods: {
    limitText(count) {
      return `et ${count} autres résultats`;
    },

    searchCollectivities(query) {
      query = query.toLowerCase();

      if (query.length < 3 && !shortnamedCommunes.includes(query)) {
        this.optionList = this.defaultList;
      } else {
        this.isLoading = true;
        OpenCollectivitesDataService.listByName(query)
          .then((response) => {
            const results = response.data;
            for (const r of results) {
              // filtering to get only the needed type
              if (r.groupName === this.groupName) {
                // Do not list the current (origin) page in the results
                this.optionList = r.items.filter((item) => {
                  return item.value !== this.origin;
                });
                this.isLoading = false;
              }
            }
          })
          .catch((e) => {
            console.log("🙅  Service not responding");
            console.log(e);
          });
      }
    },

    loadResultPage() {
      let params = {
        type: this.type,
        siren1: this.origin,
      };
      let n = 2;
      for (const p of this.places) {
        params[`siren${n}`] = p.value;
        n++;
      }

      this.$router.push({
        name: "collectivityComparator",
        params,
      });
    },
  },
};
</script>


<style>
</style>