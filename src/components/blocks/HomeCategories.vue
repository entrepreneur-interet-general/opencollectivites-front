<template>
  <div
    class="rf-container-fluid rf-bg--alt rf-padding-bottom-6N rf-padding-top-2N"
  >
    <div class="rf-container">
      <h2>
        Toutes les études, statistiques et outils pour les communes par
        thématique
      </h2>
      <div id="home-categories">
        <div v-for="(tile, index) in tiles" :key="index" class="rf-col-2">
          <div>
            <TileIcon :tile_data="tile" class="home-tile" />
          </div>
          <div class="rf-col-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TileIcon from "../france-designsystem-custom/TileIcon";
export default {
  name: "HomeCategories",
  components: { TileIcon },
  data() {
    return {
      tiles: [
        {
          title: "Aides & dotations",
          remixicon: {
            name: "calculator",
          },
          url: "https://test.com",
        },
        {
          title: "Culture & éducation",
          image: {
            src: "/img/placeholder-80-80.png",
            alt: "placeholder kitten",
          },
          url: "https://test.com",
        },
        {
          title: "Développement durable",
          image: {
            src: "/img/placeholder-80-80.png",
            alt: "placeholder kitten",
          },
          url: "https://test.com",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>