<template>
  <div id="opencollectivites">
    <div class="rf-container">
      <BaseBreadcrumb :currentPage="currentPage" />
      <h1>Fiche commune: {{ name }}</h1>
    </div>
  </div>
</template>

<script>
import BaseBreadcrumb from "../vue-gouvfr/BaseBreadcrumb.vue";
export default {
  components: { BaseBreadcrumb },
  name: "PlaceSummary",
  props: ["siren", "name"],
  data() {
    return {
      collectivity: {},
    };
  },
  computed: {
    currentPage() {
      return "Fiche commune: " + this.name;
    },
  },
  mounted: {
    getCollectivityData() {
      this.collectivity = this.siren;
    },
  },
};
</script>

<style>
</style>