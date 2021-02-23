<template>
  <div id="opencollectivites">
    <div class="header-block">
      <PublicationFilters v-on:update:filters="listPublications($event)" />
    </div>
    <div class="rf-container">
      <BaseBreadcrumb currentPage="Publications" />

      <PublicationList
        title="Études, statistiques et outils locaux"
        :cards="cards"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PublicationList from "@/components/blocks/PublicationList.vue";
import BaseBreadcrumb from "@/components/vue-gouvfr/BaseBreadcrumb.vue";
import PublicationFilters from "../blocks/PublicationFilters.vue";

export default {
  components: {
    PublicationList,
    PublicationFilters,
    BaseBreadcrumb,
  },

  data() {
    return {
      dataFilters: {},
      cards: [],
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
    ...mapActions("publications", ["listPublications"]),
    selectedIntFilter(filter) {
      if (this.$route.query[filter] >= 1) {
        return parseInt(this.$route.query[filter]);
      } else {
        return null;
      }
    },
  },

  created() {
    this.minimizeHeader();
    if (this.filters) {
      this.dataFilters = this.filters;
    } else {
      this.dataFilters.topic = this.selectedIntFilter("topic");
      this.dataFilters.scope = this.selectedIntFilter("scope");
      this.dataFilters.page = this.selectedIntFilter("page");
    }
    this.listPublications(this.dataFilters).then((cards) => {
      console.log("my cards");
      console.log(cards);
      this.cards = cards;
      this.$emit("ready");
    });
  },
};
</script>

<style scoped>
</style>