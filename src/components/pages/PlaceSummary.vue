<template>
  <div v-if="display" id="opencollectivites">
    <div class="rf-container">
      <BaseBreadcrumb :currentPage="title" />

      <h1>{{ title }}</h1>
      <p>
        Code postal : {{ collectivity.code_postal }} / Code INSEE :
        {{ collectivity.insee }} / Code SIREN : {{ siren }}
      </p>

      <p>
        {{ this.name }} est une commune française, située dans le département de
        {{ collectivity.departement.name }} en région
        {{ collectivity.departement.region.name }}. Le maire actuel est
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
          <BaseTable caption="Population" :tableContent="popData" />

          <BaseTable
            caption="Emploi - chômage"
            :tableContent="emploiChomageData"
          />

          <BaseTable caption="Niveau de vie" :tableContent="niveaudevieData" />

          <h2 id="intercommunalites-zonage">Intercommunalités et zonage</h2>
          <BaseTable
            :caption="`Intercommunalités (${listeIntercos.length})`"
            :tableContent="listeIntercos"
          />

          <BaseTable
            caption="Zonage de politiques publiques"
            :tableContent="zonageData"
          />
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
          />

          <BaseTable
            caption="Dotation « Élu local »"
            :tableContent="dotationEluLocalData"
          />

          <BaseTable
            caption="Fonds national de péréquation des ressources intercommunales et communales (FPIC)"
            :tableContent="dotationFpicData"
          />
          <a
            title="Dotation - Direction générale des Collectivités locales"
            href="http://www.dotations-dgcl.interieur.gouv.fr/"
            target="_blank"
            rel="noopener"
            class="rf-link rf-link--icon-right"
          >
            Plus d’informations sur le site dotations de la DGCL
          </a>

          <h2 id="communes-limitrophes-comparaison">
            Communes limitrophes et comparaison
          </h2>
          <CollectivityCompareSelector type="commune" :origin="siren" />

          <h2 id="outils-pratiques">Outils pratiques</h2>
          <p>[...]</p>
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
import OpenCollectivitesDataService from "@/services/OpenCollectivitesDataService";
import { formatNumber } from "@/utils";

export default {
  components: {
    BaseBreadcrumb,
    BaseTile,
    BaseTable,
    BaseSummary,
    CollectivityCompareSelector,
  },

  name: "PlaceSummary",

  props: ["siren", "name", "type"],
  data() {
    return {
      display: false,
      collectivity: {},
      aspic: {},
      title: "",
      navigationTiles: [],
      popData: [],
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
          href: "#communes-limitrophes-comparaison",
          title: "Communes limitrophes et comparaison",
        },
        {
          href: "#outils-pratiques",
          title: "Outils pratiques",
        },
      ],
    };
  },

  created() {
    const types = { commune: "commune", departement: "département" };
    OpenCollectivitesDataService.communeBySiren(this.siren)
      .then((response) => {
        this.collectivity = response.data;
        OpenCollectivitesDataService.aspicFicheCommune(this.siren).then(
          (response) => {
            this.collectivity = { ...this.collectivity, ...response.data };
            this.title = `Fiche ${types[this.type]} : ${
              this.collectivity.name
            }`;

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
              title: "Département : " + this.collectivity.departement.name,
              url: `/epci/${this.collectivity.departement.siren}/${this.collectivity.departement.name}`,
              image: {
                src: "/img/hexagon3.svg",
                alt: "Département",
              },
            });

            this.navigationTiles.push({
              title: "Région : " + this.collectivity.departement.region.name,
              url: `/epci/${this.collectivity.departement.region.siren}/${this.collectivity.departement.region.name}`,
              image: {
                src: "/img/hexagon4.svg",
                alt: "Région",
              },
            });

            const years = this.collectivity.years;

            this.popData = [
              [
                `Population totale en vigueur en ${years.PopTot}`,
                formatNumber(this.collectivity.PopTot),
              ],
              [
                `Population municipale en vigueur en ${years.PopMuni}`,
                formatNumber(this.collectivity.PopMuni),
              ],
              [
                "Densité démographique (population totale/superficie géographique, en hab/km²)",
                formatNumber(this.collectivity.Densité),
              ],
              [
                `Variation annuelle de la population entre ${years.TCAM} (en %)`,
                formatNumber(this.collectivity.TCAM),
              ],
            ];

            this.emploiChomageData = [
              [
                `Taux d’activité des 15 à 64 ans en ${years["PopActive1564%"]} (en %)`,
                formatNumber(this.collectivity["PopActive1564%"]),
              ],
              [
                `Taux de chômage des 15 à 64 ans en ${years["PopChom1564%"]} (en %)`,
                formatNumber(this.collectivity["PopChom1564%"]),
              ],
            ];

            this.niveaudevieData = [
              [
                `Revenu fiscal médian des ménages par unité de consommation ${years.RevenuFiscal} (en €)`,
                formatNumber(this.collectivity.RevenuFiscal),
              ],
            ];

            /* Liste des intercommunalités */
            this.listeIntercos = [];
            let interco_types = require("@/json/interco_types.json");
            for (let interco_type of interco_types) {
              for (let groupement of this.collectivity.groupements) {
                if (
                  interco_type.code == groupement.groupement__nature_juridique
                ) {
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
                this.collectivity.ZRR ? "Classée en ZRR" : "Non classée",
              ],
              [
                "Commune classée en zone de montagne",
                this.collectivity.Montagne ? "Classée" : "Non classée",
              ],
            ];

            this.dotationGlobaleData = [
              [
                "Dotation globale de fonctionnement totale (en €)",
                formatNumber(this.collectivity.DGF_Totale),
              ],
              [
                "Dont dotation forfaitaire (en €)",
                formatNumber(this.collectivity.Forfaitaire),
              ],
              [
                " - dotation de solidarité urbaine et de cohésion sociale (DSU) (en €)",
                formatNumber(this.collectivity.DSU),
              ],
              [
                " - dotation de solidarité rurale (DSR) (en €)",
                formatNumber(this.collectivity.DSR),
              ],
              [
                " - dotation de péréquation totale (DNP) (en €)",
                formatNumber(this.collectivity.DNP),
              ],
              [
                "DGF par habitant (en €)",
                formatNumber(this.collectivity.DGFParHab),
              ],
              ["Population « DGF »", formatNumber(this.collectivity.PopDGF)],
            ];

            this.dotationEluLocalData = [
              [
                "Dotation élu local (en €)",
                formatNumber(this.collectivity.DotationEluLocal),
              ],
            ];

            this.dotationFpicData = [
              [
                "Solde net FPIC (en €)",
                formatNumber(this.collectivity.SoldeFPIC),
              ],
              [
                "Dont reversement au profit de la commune (en €)",
                formatNumber(this.collectivity.AttributionFPIC),
              ],
              [
                "Dont prélèvement de la commune (en €)",
                formatNumber(this.collectivity.ContributionFPIC),
              ],
              [
                "FPIC par habitant (en €)",
                formatNumber(this.collectivity.SoldeFPIC_DGF),
              ],
            ];
            this.display = true;
          }
        );
      })
      .catch((e) => {
        console.error("Service not responding");
        console.error(e);
      });
  },
};
</script>

<style>
</style>