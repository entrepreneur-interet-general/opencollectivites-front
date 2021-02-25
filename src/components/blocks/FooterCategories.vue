<template>
  <div
    class="rf-container-fluid rf-bg--alt rf-padding-bottom-6N rf-padding-top-2N"
  >
    <div id="categories-jumbotron" class="rf-container">
      <h2>
        Toutes les études, statistiques et outils pour les communes par
        thématique
      </h2>
      <div id="home-categories">
        <div v-for="(tile, index) in tiles" :key="index" class="rf-col-2">
          <BaseTile :tile_data="tile" class="home-tile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTile from "../vue-gouvfr/BaseTile";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeCategories",
  components: { BaseTile },
  data() {
    return {
      tiles: [],
    };
  },
  methods: {
    ...mapActions("publicationsFilterLists", ["fetchFilterLists"]),
  },
  computed: {
    ...mapGetters("publicationsFilterLists", ["getTopics"]),
  },
  created() {
    return new Promise((resolve) => {
      if (!this.getTopics.length) {
        resolve(this.fetchFilterLists());
      } else {
        resolve(this.getTopics);
      }
    }).then(() => {
      for (var topic of this.getTopics) {
        this.tiles.push({
          title: topic.name,
          image: {
            src: topic.icon_path,
            alt: topic.name,
          },
          url: "/publications?topic=" + topic.id,
        });
      }
    });
  },
};
</script>
<style scoped>
#categories-jumbotron {
  padding-top: 1em;
  margin-top: 1em;
}
</style>
