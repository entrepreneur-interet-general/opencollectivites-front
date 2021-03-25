<template>
  <div id="opencollectivites">
    <div class="rf-container">
      <BaseBreadcrumb :currentPage="title" />

      <h1>{{ title }}</h1>
      <p>
        Code postal : {{ collectivity.code_postal }} / Code INSEE :
        {{ collectivity.insee }} / Code SIREN : {{ siren }}
      </p>

      <p>
        {{ this.name }} est une commune française, située dans le département de
        {{ departement.name }} en région {{ region.name }}. Le maire actuel est
        {{ collectivity.civ_maire }} {{ collectivity.pre_maire }}
        {{ collectivity.nom_maire }}.
      </p>

      <div id="navigation-tiles">
        <div
          v-for="(tile, index) in navigationTiles"
          :key="index"
          class="rf-col-2"
        >
          <BaseTile :tile_data="tile" class="home-tile" />
        </div>
      </div>

      <div class="rf-grid-row">
        <div class="rf-col-8">
          <h2 id="donnees-contexte">Données de contexte</h2>
          <BaseTable
            caption="Population"
            :tableContent="popData"
            :fullWidth="true"
            :force10="true"
          />
          <SourceAspicBanatic :year="max_year" file="Données communes" />

          <BaseTable
            caption="Emploi - chômage"
            :tableContent="emploiChomageData"
            :fullWidth="true"
            :force10="true"
          />
          <SourceAspicBanatic :year="max_year" file="Données communes" />

          <BaseTable
            caption="Niveau de vie"
            :tableContent="niveaudevieData"
            :fullWidth="true"
            :force10="true"
          />
          <SourceAspicBanatic :year="max_year" file="Données communes" />

          <h2 id="intercommunalites-zonage">Intercommunalités et zonage</h2>
          <BaseTable
            :caption="`Intercommunalités (${listeIntercos.length})`"
            :tableContent="listeIntercos"
            :fullWidth="true"
          />

          <BaseTable
            caption="Zonage de politiques publiques"
            :tableContent="zonageData"
            :fullWidth="true"
          />
          <SourceAspicBanatic :year="max_year" file="Données communes" />
          <br />
          <a
            title="Observatoire des Territoires"
            href="https://www.observatoire-des-territoires.gouv.fr/"
            target="_blank"
            rel="noopener"
            class="rf-link rf-link--icon-right"
          >
            Plus d’informations sur le site de l’Observatoire des Territoires
          </a>

          <h2 id="ressources-financieres-fiscales">
            Ressources financières et fiscales
          </h2>

          <BaseTable
            caption="Dotation globale de fonctionnement"
            :tableContent="dotationGlobaleData"
            :fullWidth="true"
            :force10="true"
          />
          <SourceAspicBanatic :year="max_year" file="Données communes" />

          <BaseTable
            caption="Dotation « Élu local »"
            :tableContent="dotationEluLocalData"
            :fullWidth="true"
            :force10="true"
          />
          <SourceAspicBanatic :year="max_year" file="Données communes" />

          <BaseTable
            caption="Fonds national de péréquation des ressources intercommunales et communales (FPIC)"
            :tableContent="dotationFpicData"
            :fullWidth="true"
            :force10="true"
          />
          <SourceAspicBanatic :year="max_year" file="Données communes" />
          <br />
          <a
            title="Dotation - Direction générale des Collectivités locales"
            href="http://www.dotations-dgcl.interieur.gouv.fr/"
            target="_blank"
            rel="noopener"
            class="rf-link rf-link--icon-right"
          >
            Plus d’informations sur le site dotations de la DGCL
          </a>

          <h2 id="comparaison-autres-communes">
            Comparaison avec d’autres communes
          </h2>
          <CollectivityCompareSelector type="commune" :origin="siren" />

          <!--<h2 id="outils-pratiques">Outils pratiques</h2>
          <p>[...]</p>-->
        </div>
        <div class="rf-col-1"></div>
        <div class="rf-col-3"><BaseSummary :anchors="summaryAnchors" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseBreadcrumb from "../vue-gouvfr/BaseBreadcrumb.vue";
import BaseTile from "../vue-gouvfr/BaseTile.vue";
import BaseTable from "../vue-gouvfr/BaseTable.vue";
import BaseSummary from "../vue-gouvfr/BaseSummary.vue";
import CollectivityCompareSelector from "../blocks/CollectivityCompareSelector.vue";
import { formatNumber } from "@/utils";

import { mapActions } from "vuex";
import SourceAspicBanatic from "../blocks/SourceAspicBanatic.vue";

export default {
  metaInfo() {
    return {
      title: this.title,
    };
  },

  components: {
    BaseBreadcrumb,
    BaseTile,
    BaseTable,
    BaseSummary,
    CollectivityCompareSelector,
    SourceAspicBanatic,
  },

  name: "PlaceSummary",

  props: ["siren", "name", "type"],
  data() {
    return {
      collectivity: {},
      departement: {},
      region: {},
      aspic: {},
      title: "",
      max_year: "0",
      navigationTiles: [],
      popData: [],
      emploiChomageData: [],
      niveaudevieData: [],
      listeIntercos: [],
      zonageData: [],
      dotationGlobaleData: [],
      dotationEluLocalData: [],
      dotationFpicData: [],
      summaryAnchors: [
        { href: "#donnees-contexte", title: "Données de contexte" },
        {
          href: "#intercomunalites-zonage",
          title: "Intercommunalités et zonage",
        },
        {
          href: "#ressources-financieres-fiscales",
          title: "Ressources financières et fiscales",
        },
        {
          href: "#comparaison-autres-communes",
          title: "Comparaison avec d’autres communes",
        },
        {
          href: "#outils-pratiques",
          title: "Outils pratiques",
        },
      ],
    };
  },

  methods: {
    ...mapActions("header", ["minimizeHeader"]),
    ...mapActions("communes", ["fetchCommuneData"]),
  },

  created() {
    this.minimizeHeader();

    const types = {
      commune: "commune",
      departement: "département",
      region: "région",
      epci: "EPCI",
    };

    if (!(this.type in types)) {
      this.$router.push({
        name: "NotFound",
      });
    } else if (this.type != "commune") {
      this.$router.push({
        name: "NotYet",
      });
    } else {
      this.fetchCommuneData({ siren: this.siren }).then((response) => {
        this.collectivity = response;
        this.departement = response.departement;
        this.region = response.departement.region;

        this.title = `Fiche ${types[this.type]} : ${this.collectivity.name}`;

        // Navigation
        this.navigationTiles.push({
          title: "EPCI : " + this.collectivity.epci.name,
          url: `/epci/${this.collectivity.epci.siren}/${this.collectivity.epci.name}`,
          image: {
            src: "/img/hexagon2.svg",
            alt: "EPCI",
          },
        });

        this.navigationTiles.push({
          title: "Département : " + this.departement.name,
          url: `/epci/${this.departement.siren}/${this.departement.name}`,
          image: {
            src: "/img/hexagon3.svg",
            alt: "Département",
          },
        });

        this.navigationTiles.push({
          title: "Région : " + this.region.name,
          url: `/epci/${this.region.siren}/${this.region.name}`,
          image: {
            src: "/img/hexagon4.svg",
            alt: "Région",
          },
        });

        const years = this.collectivity.years;
        this.max_year = this.collectivity.T150.max_year;

        this.popData = [
          [
            `Population totale en vigueur en ${years.PopTot}`,
            formatNumber(this.collectivity.T150.PopTot),
          ],
          [
            `Population municipale en vigueur en ${years.PopMuni}`,
            formatNumber(this.collectivity.T150.PopMuni),
          ],
          [
            `Densité démographique en ${years.Densité} (population totale/superficie géographique, en hab/km²)`,
            formatNumber(this.collectivity.T150.Densité),
          ],
          [
            `Variation annuelle de la population entre ${years.TCAM} (en %)`,
            formatNumber(this.collectivity.T150.TCAM),
          ],
        ];

        this.emploiChomageData = [
          [
            `Taux d’activité des 15 à 64 ans en ${years["PopActive1564%"]} (en %)`,
            formatNumber(this.collectivity.T150["PopActive1564%"]),
          ],
          [
            `Taux de chômage des 15 à 64 ans en ${years["PopChom1564%"]} (en %)`,
            formatNumber(this.collectivity.T150["PopChom1564%"]),
          ],
        ];

        this.niveaudevieData = [
          [
            `Revenu fiscal médian des ménages par unité de consommation ${years.RevenuFiscal} (en €)`,
            formatNumber(this.collectivity.T150.RevenuFiscal),
          ],
        ];

        /* Liste des intercommunalités */
        this.listeIntercos = [];
        let interco_types = require("@/json/interco_types.json");
        for (let interco_type of interco_types) {
          for (let groupement of this.collectivity.groupements) {
            if (interco_type.code == groupement.groupement__nature_juridique) {
              const newline = [
                interco_type.libelle,
                `${groupement.groupement__raison_sociale} (${groupement.groupement_id})`,
                interco_type.code,
              ];
              this.listeIntercos.push(newline);
            }
          }
        }

        this.zonageData = [
          [
            "Classement de la commune en zone de revitalisation rurale (ZRR)",
            this.collectivity.T150.ZRR ? "Classée en ZRR" : "Non classée",
          ],
          [
            "Commune classée en zone urbaine sensible (ZUS)",
            this.collectivity.T150.ZUS ? "Classée en ZUS" : "Non classée",
          ],
          [
            "Commune classée en zone de montagne",
            this.collectivity.T150.Montagne ? "Classée" : "Non classée",
          ],
          [
            "Commune classée comme touristique",
            this.collectivity.T150.Touristique ? "Classée" : "Non classée",
          ],
        ];

        this.dotationGlobaleData = [
          [
            "Dotation globale de fonctionnement totale (en €)",
            formatNumber(this.collectivity.T150.DGF_Totale),
          ],
          [
            "Dont dotation forfaitaire (en €)",
            formatNumber(this.collectivity.T150.Forfaitaire),
          ],
          [
            " - dotation de solidarité urbaine et de cohésion sociale (DSU) (en €)",
            formatNumber(this.collectivity.T150.DSU),
          ],
          [
            " - dotation de solidarité rurale (DSR) (en €)",
            formatNumber(this.collectivity.T150.DSR),
          ],
          [
            " - dotation de péréquation totale (DNP) (en €)",
            formatNumber(this.collectivity.T150.DNP),
          ],
          [
            "DGF par habitant (en €)",
            formatNumber(this.collectivity.T150.DGFParHab),
          ],
          ["Population « DGF »", formatNumber(this.collectivity.PopDGF)],
        ];

        this.dotationEluLocalData = [
          [
            "Dotation élu local (en €)",
            formatNumber(this.collectivity.T150.DotationEluLocal),
          ],
        ];

        this.dotationFpicData = [
          [
            "Solde net FPIC (en €)",
            formatNumber(this.collectivity.T150.SoldeFPIC),
          ],
          [
            "Dont reversement au profit de la commune (en €)",
            formatNumber(this.collectivity.T150.AttributionFPIC),
          ],
          [
            "Dont prélèvement de la commune (en €)",
            formatNumber(this.collectivity.T150.ContributionFPIC),
          ],
          [
            "FPIC par habitant (en €)",
            formatNumber(this.collectivity.T150.SoldeFPIC_DGF),
          ],
        ];
        this.$emit("ready");
      });
    }
  },
};
</script>

<style>
</style>