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
          <BaseTile :tile_data="tile" class="home-tile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTile from "../vue-gouvfr/BaseTile";
export default {
  name: "HomeCategories",
  components: { BaseTile },
  data() {
    return {
      tiles: [
        {
          title: "Aides & dotations",
          image: {
            src: "/img/remixicon/calculator-line.svg",
            alt: "Aides & dotations",
          },
          url: "https://test.com",
        },
        {
          title: "Culture & éducation",
          image: {
            src: "/img/remixicon/keynote-line.svg",
            alt: "Culture & éducation",
          },
          url: "https://test.com",
        },
        {
          title: "Emploi & Fonction publique territoriale",
          image: {
            src: "/img/remixicon/briefcase-4-line.svg",
            alt: "Emploi & Fonction publique territoriale",
          },
          url: "https://test.com",
        },
        {
          title: "Finances & Fiscalité",
          image: {
            src: "/img/remixicon/percent-line.svg",
            alt: "Finances & Fiscalité",
          },
          url: "https://test.com",
        },
        {
          title: "Géographie & Intercom­munalités", // Il y a une marque de césure (U+00AD SOFT HYPHEN) entre les deux "m".
          image: {
            src: "/img/remixicon/map-2-line.svg",
            alt: "Géographie & Intercommunalités",
          },
          url: "https://test.com",
        },
        {
          title: "Parité",
          image: {
            src: "/img/parite.svg",
            alt: "Parité",
          },
          url: "https://test.com",
        },
        {
          title: "Santé & Social",
          image: {
            src: "/img/remixicon/hospital-line.svg",
            alt: "Santé & Social",
          },
          url: "https://test.com",
        },
        {
          title: "Sécurité",
          image: {
            src: "/img/remixicon/shield-line.svg",
            alt: "Sécurité",
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