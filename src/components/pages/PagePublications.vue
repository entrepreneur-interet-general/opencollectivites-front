<template>
  <div id="opencollectivites">
    <div class="header-block">
      <PublicationFilters />
    </div>
    <div class="rf-container">
      <BaseBreadcrumb currentPage="Publications" />

      <h1>{{ titleWithPublicationsNumber }}</h1>
      <BasePagination
        :numberOfPages="numberOfPages"
        v-if="isPaginated"
        v-bind:currentpagenumber.sync="currentPageNumber"
      />
      <PublicationList :cards="cardsSlice" />
      <BasePagination :numberOfPages="numberOfPages" v-if="isPaginated" />
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
      default: 8,
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
    titleWithPublicationsNumber() {
      return (
        this.title + " (" + this.getPublicationsCount("pagepublications") + ")"
      );
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