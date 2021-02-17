<template>
  <div id="opencollectivites">
    <div id="comparator-header-block">
      <div class="rf-container">
        <table
          class="comparator-header-table"
          aria-label="Comparaison de collectivités"
        >
          <thead>
            <tr>
              <th>
                <router-link tag="span" :to="linkBackRoute">
                  <BaseButton :isSecondary="true" label="<" />
                </router-link>
              </th>
              <th v-for="(name, key) in placesNames" :key="key" width="10%">
                {{ name }}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="rf-container">
      <div class="collectivity-comparator">
        <div>
          <h1>Comparaison</h1>

          <h2 id="donnees-contexte">Données de contexte</h2>
          <BaseTable
            caption="Population"
            :tableContent="popData"
            :fullWidth="true"
            :force10="true"
          />

          <BaseTable
            caption="Emploi - chômage"
            :tableContent="emploiChomageData"
            :fullWidth="true"
            :force10="true"
          />
          <BaseTable
            caption="Zonage de politiques publiques"
            :tableContent="zonageData"
            :fullWidth="true"
            :force10="true"
          />

          <h2 id="ressources-financieres-fiscales">
            Ressources financières et fiscales
          </h2>

          <BaseTable
            caption="Dotation globale de fonctionnement"
            :tableContent="dotationGlobaleData"
            :fullWidth="true"
            :force10="true"
          />

          <BaseTable
            caption="Dotation « Élu local »"
            :tableContent="dotationEluLocalData"
            :fullWidth="true"
            :force10="true"
          />

          <BaseTable
            caption="Fonds national de péréquation des ressources intercommunales et communales (FPIC)"
            :tableContent="dotationFpicData"
            :fullWidth="true"
            :force10="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTable from "../vue-gouvfr/BaseTable.vue";
import BaseButton from "../vue-gouvfr/BaseButton.vue";

import { mapActions } from "vuex";
import { formatNumber } from "@/utils";

export default {
  components: {
    BaseTable,
    BaseButton,
  },
  props: {
    type: { type: String, required: true },
    siren1: { type: String, required: true },
    siren2: { type: String, required: true },
    siren3: { type: String, default: null },
    siren4: { type: String, default: null },
  },

  data() {
    return {
      placesNames: [],
      popData: [],
      emploiChomageData: [],
      niveaudevieData: [],
      zonageData: [],
      dotationGlobaleData: [],
      dotationEluLocalData: [],
      dotationFpicData: [],
    };
  },

  computed: {
    sirens() {
      let sirens = [this.siren1, this.siren2];
      if (this.siren3) {
        sirens.push(this.siren3);
      }
      if (this.siren4) {
        sirens.push(this.siren4);
      }
      return sirens;
    },

    linkBackRoute() {
      const backRoute = {
        name: "placeSummary",
        params: {
          siren: this.siren1,
          type: this.type,
        },
      };

      if (this.$store.state.communes.items[this.siren1]) {
        backRoute.params.name = this.$store.state.communes.items[
          this.siren1
        ].name;
      }
      return backRoute;
    },
  },

  methods: {
    ...mapActions("header", ["minimizeHeader"]),
    ...mapActions("communes", ["fetchSeveralCommunes"]),
  },

  created() {
    this.minimizeHeader();

    this.fetchSeveralCommunes({
      sirens: this.sirens,
    }).then((response) => {
      const communes = this.$store.state.communes.items;
      for (const siren of this.sirens) {
        this.placesNames.push(communes[siren].name);
      }

      const years = response[0].years;

      // Prepare tables
      this.popData = [
        [`Population totale en vigueur en ${years.PopTot}`],
        [`Population municipale en vigueur en ${years.PopMuni}`],
        [
          "Densité démographique (population totale/superficie géographique, en hab/km²)",
        ],
        [`Variation annuelle de la population entre ${years.TCAM} (en %)`],
      ];

      this.emploiChomageData = [
        [
          `Taux d’activité des 15 à 64 ans en ${years["PopActive1564%"]} (en %)`,
        ],
        [`Taux de chômage des 15 à 64 ans en ${years["PopChom1564%"]} (en %)`],
      ];

      this.niveaudevieData = [
        [
          `Revenu fiscal médian des ménages par unité de consommation ${years.RevenuFiscal} (en €)`,
        ],
      ];

      this.zonageData = [
        ["Classement de la commune en zone de revitalisation rurale (ZRR)"],
        ["Commune classée en zone de montagne"],
      ];

      this.dotationGlobaleData = [
        ["Dotation globale de fonctionnement totale (en €)"],
        ["Dont dotation forfaitaire (en €)"],
        [
          " - dotation de solidarité urbaine et de cohésion sociale (DSU) (en €)",
        ],
        [" - dotation de solidarité rurale (DSR) (en €)"],
        [" - dotation de péréquation totale (DNP) (en €)"],
        ["DGF par habitant (en €)"],
        ["Population « DGF »"],
      ];

      this.dotationEluLocalData = [["Dotation élu local (en €)"]];

      this.dotationFpicData = [
        ["Solde net FPIC (en €)"],
        ["Dont reversement au profit de la commune (en €)"],
        ["Dont prélèvement de la commune (en €)"],
        ["FPIC par habitant (en €)"],
      ];

      // Fill tables
      for (const siren of this.sirens) {
        this.popData[0].push(formatNumber(communes[siren].PopTot));
        this.popData[1].push(formatNumber(communes[siren].PopMuni));
        this.popData[2].push(formatNumber(communes[siren].Densité));
        this.popData[3].push(formatNumber(communes[siren].TCAM));

        this.emploiChomageData[0].push(
          formatNumber(communes[siren]["PopActive1564%"])
        );
        this.emploiChomageData[1].push(
          formatNumber(communes[siren]["PopChom1564%"])
        );

        this.niveaudevieData[0].push(
          formatNumber(communes[siren].RevenuFiscal)
        );

        this.zonageData[0].push(
          communes[siren].ZRR ? "Classée en ZRR" : "Non classée"
        );
        this.zonageData[1].push(
          communes[siren].Montagne ? "Classée en ZRR" : "Non classée"
        );

        this.dotationGlobaleData[0].push(
          formatNumber(communes[siren].DGF_Totale)
        );
        this.dotationGlobaleData[1].push(
          formatNumber(communes[siren].Forfaitaire)
        );
        this.dotationGlobaleData[2].push(formatNumber(communes[siren].DSU));
        this.dotationGlobaleData[3].push(formatNumber(communes[siren].DSR));
        this.dotationGlobaleData[4].push(formatNumber(communes[siren].DNP));
        this.dotationGlobaleData[5].push(
          formatNumber(communes[siren].DGFParHab)
        );
        this.dotationGlobaleData[6].push(formatNumber(communes[siren].PopDGF));

        this.dotationEluLocalData[0].push(
          formatNumber(communes[siren].DotationEluLocal)
        );

        this.dotationFpicData[0].push(formatNumber(communes[siren].SoldeFPIC));
        this.dotationFpicData[1].push(
          formatNumber(communes[siren].AttributionFPIC)
        );
        this.dotationFpicData[2].push(
          formatNumber(communes[siren].ContributionFPIC)
        );
        this.dotationFpicData[3].push(
          formatNumber(communes[siren].SoldeFPIC_DGF)
        );
      }

      window.scrollTo(0, 0);
      this.$emit("ready");
    });
  },
};
</script>

<style scoped>
#comparator-header-block {
  background: #fff;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 100;
}

.comparator-header-table {
  width: 100%;
  min-height: 7em;
  border-collapse: collapse;
}

.comparator-header-table th {
  font-weight: normal;
  border: 1px solid #ccc;
}
</style>