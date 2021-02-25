<template>
  <div id="studiesfeed">
    <h2>Études et statistiques locales</h2>
    <h3>Synthèses sur l'ensemble des activités</h3>
    <PublicationList :cards="synthesisDocsCards" />

    <h3>Communes</h3>
    <PublicationList :cards="communesDocsCards" />
    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les communes</a
      >
    </p>

    <h3>Intercommunalités</h3>
    <PublicationList :cards="intercommunalitesDocsCards" />
    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les
        intercommunalités</a
      >
    </p>

    <h3>Départements</h3>
    <p>...</p>
    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les
        départements</a
      >
    </p>

    <h3>Régions</h3>
    <p>...</p>

    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les régions</a
      >
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PublicationList from "./PublicationList.vue";

export default {
  name: "StudiesFeed",
  components: { PublicationList },
  methods: {
    ...mapActions("publications", ["listPublicationsFromSeveralFilters"]),
  },

  data() {
    return {
      blocks: {
        synthesisDocs: {
          topic: 3,
          limit: 6,
        },
        communesDocs: {
          topic: 4,
          limit: 6,
        },
        intercommunalitesDocs: {
          topic: 5,
          limit: 6,
        },
      },
      synthesisDocsCards: [],
      communesDocsCards: [],
      intercommunalitesDocsCards: [],
    };
  },

  created() {
    this.listPublicationsFromSeveralFilters({
      filtersList: this.blocks,
    }).then((result) => {
      console.log("result", result);
      this.synthesisDocsCards = result[0];
      this.communesDocsCards = result[1];
      this.intercommunalitesDocsCards = result[2];
    });
  },
};
</script>

<style scoped>
</style>