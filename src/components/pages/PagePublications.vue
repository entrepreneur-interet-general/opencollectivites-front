<template>
  <div id="opencollectivites">
    <div class="header-block">
      <PublicationFilters />
    </div>
    <div class="rf-container">
      <BaseBreadcrumb currentPage="Publications" />

      <h1>{{ title }}</h1>
      <h2>{{ subtitleWithPublicationsNumber }}</h2>
      <template v-if="getPublicationsCount('pagepublications')">
        <BasePagination
          :numberOfPages="numberOfPages"
          v-if="isPaginated"
          v-bind:currentpagenumber.sync="currentPageNumber"
        />
        <PublicationList :cards="cardsSlice" />
        <BasePagination :numberOfPages="numberOfPages" v-if="isPaginated" />
      </template>
      <template v-else>
        <p>
          Essayez de relancer la recherche en supprimant l’un des filtres
          sélectionnés ci-dessus, ou essayez une recherche type :
        </p>
        <p>
          <a
            class="rf-link rf-link--icon-right"
            target="_self"
            href="/publications?type=1"
            >Publications statistiques sur les collectivités locales</a
          >
        </p>
        <p>
          <a
            class="rf-link rf-link--icon-right"
            target="_self"
            href="/publications?type=2"
            >Jeux de données sur les collectivités locales</a
          >
        </p>
        <p>
          <a
            class="rf-link rf-link--icon-right"
            target="_self"
            href="/publications?type=3"
            >Outils utiles pour les collectivités locales</a
          >
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseBreadcrumb from "@/components/vue-gouvfr/BaseBreadcrumb.vue";
import PublicationFilters from "@/components/blocks/PublicationFilters.vue";
import PublicationList from "../blocks/PublicationList.vue";
import BasePagination from "../vue-gouvfr/BasePagination.vue";

export default {
  metaInfo: {
    title: "Études, statistiques et outils locaux",
  },

  components: {
    PublicationFilters,
    BaseBreadcrumb,
    PublicationList,
    BasePagination,
  },

  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 20,
    },
  },

  data() {
    return {
      dataFilters: {},
      cards: [],
      cardsSlice: [],
      title: "Études, statistiques et outils locaux",
      currentPageNumber: 1,
    };
  },

  computed: {
    ...mapGetters("publications", ["getPublicationsCount"]),
    subtitleWithPublicationsNumber() {
      if (this.getPublicationsCount("pagepublications")) {
        return (
          "Votre recherche a renvoyé " +
          this.getPublicationsCount("pagepublications") +
          " résultats"
        );
      } else {
        return "Votre recherche n’a renvoyé aucun résultat";
      }
    },
    numberOfPages() {
      return Math.ceil(this.cards.length / this.pageSize);
    },
    isPaginated() {
      return this.numberOfPages > 1;
    },
  },

  methods: {
    ...mapActions("header", ["minimizeHeader"]),
    ...mapActions("publications", ["listPublications"]),
    selectedIntFilter(filter) {
      if (this.$route.query[filter] >= 1) {
        return parseInt(this.$route.query[filter]);
      } else {
        return null;
      }
    },
    updateContents() {
      return new Promise((resolve) => {
        this.dataFilters.document_type = this.selectedIntFilter(
          "document_type"
        );
        this.dataFilters.topic = this.selectedIntFilter("topic");
        this.dataFilters.scope = this.selectedIntFilter("scope");
        this.listPublications({
          id: "pagepublications",
          filters: this.dataFilters,
        }).then((cards) => {
          this.cards = cards;
          if (this.isPaginated) {
            const sliceStart = (this.currentPageNumber - 1) * this.pageSize;
            const sliceEnd = sliceStart + this.pageSize;
            this.cardsSlice = this.cards.slice(sliceStart, sliceEnd);
          } else {
            this.cardsSlice = this.cards;
          }
          resolve(this.cards);
        });
      });
    },
  },
  watch: {
    $route() {
      this.updateContents();
    },
  },

  created() {
    this.minimizeHeader();
    this.updateContents().then(() => {
      this.$emit("ready");
    });
  },
};
</script>

<style scoped>
</style>