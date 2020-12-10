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

          <h2 id="intercommunalites-zonage">Intercommunalités et zonage</h2>
          <p>[...]</p>
          <h2 id="ressources-financieres-fiscales">
            Ressources financières et fiscales
          </h2>
          <p>[...]</p>
          <h2 id="communes-limitrophes-comparaison">
            Communes limitrophes et comparaison
          </h2>
          <p>[...]</p>
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
import OpenCollectivitesDataService from "@/services/OpenCollectivitesDataService";
import BaseTile from "../vue-gouvfr/BaseTile.vue";
import BaseTable from "../vue-gouvfr/BaseTable.vue";
import BaseSummary from "../vue-gouvfr/BaseSummary.vue";

export default {
  components: { BaseBreadcrumb, BaseTile, BaseTable, BaseSummary },
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

            this.popData = [
              [
                "Population totale en vigueur en 2020 (millésimée 2017)",
                this.collectivity.PopTot.toLocaleString("fr-FR"),
              ],
              [
                "Population municipale en vigueur en 2020 (millésimée 2017)",
                this.collectivity.PopMuni.toLocaleString("fr-FR"),
              ],
              [
                "Densité démographique (population totale/superficie géographique, en hab/km²",
                this.collectivity.Densité.toLocaleString("fr-FR"),
              ],
              [
                "Variation annuelle de la population entre 2015 et 2020 (en %)",
                this.collectivity.TCAM.toLocaleString("fr-FR"),
              ],
            ];

            this.display = true;
          }
        );
      })
      .catch((e) => {
        console.log("Service not responding");
        console.log(e);
      });
  },
};
</script>

<style>
</style>