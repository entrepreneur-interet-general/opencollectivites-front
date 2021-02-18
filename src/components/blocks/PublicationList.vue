<template>
  <div class="bloc-publications">
    <h1 v-if="title">{{ titleWithPublicationsNumber }}</h1>

    <PublicationFilters
      v-if="showFilters"
      v-on:update:filters="listPublications($event)"
    />

    <div class="three-col">
      <div class="rf-col-4 feedcard" v-for="card in cards" :key="card.id">
        <BaseCard :card_data="card.data" :noArrow="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseCard from "../vue-gouvfr/BaseCard.vue";
import PublicationFilters from "../blocks/PublicationFilters.vue";

export default {
  components: {
    BaseCard,
    PublicationFilters,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    showFilters: {
      type: Boolean,
      required: false,
      default: false,
    },
    filters: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      dataFilters: {},
      cards: [],
      titleWithPublicationsNumber: this.title,
    };
  },

  computed: {
    ...mapGetters("publications", [
      "getPublications",
      "getTopics",
      "getScopes",
    ]),
  },

  methods: {
    ...mapActions("header", ["minimizeHeader"]),
    ...mapActions("publications", ["fetchPublications"]),
    selectedIntFilter(filter) {
      if (this.$route.query[filter] >= 1) {
        return parseInt(this.$route.query[filter]);
      } else {
        return null;
      }
    },
    listPublications(filters) {
      return new Promise((resolve) => {
        resolve(this.fetchPublications(filters));
      }).then(() => {
        let cards = [];
        const publications = this.getPublications;
        console.log(this.getPublications);
        this.titleWithPublicationsNumber =
          this.title + " (" + publications.length + ")";
        for (const p of publications) {
          const card = { id: p.id, data: {} };

          // Type de contenu | Date de màj  •  Source 1, Source 2 par ordre alphabétique
          var document_type = "Publication";
          if (p.document_type.length) {
            document_type = p.document_type[0].name;
          }
          var detail = document_type + " | " + p.last_update;
          detail += " • " + p.source.editor[0].acronym;
          card.data.detail =
            detail.length < 200 ? detail : detail.substring(0, 200) + "…";

          card.data.url = p.url;
          card.data.title =
            p.title.length < 100 ? p.title : p.title.substring(0, 100) + "…";
          card.data.description =
            p.body.length < 300 ? p.body : p.body.substring(0, 200) + "…";
          cards.push(card);
        }
        this.cards = cards;
      });
    },
  },

  created() {
    if (this.filters) {
      this.dataFilters = this.filters;
    } else {
      this.dataFilters.topic = this.selectedIntFilter("topic");
      this.dataFilters.scope = this.selectedIntFilter("scope");
      this.dataFilters.page = this.selectedIntFilter("page");
    }
    this.listPublications(this.dataFilters);
  },
};
</script>


<style>
</style>