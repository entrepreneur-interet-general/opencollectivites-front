<template>
  <div id="app">
    <TheHeader
      service_name="Open Collectivités"
      brand_name="Ministère <br />de la Cohésion <br />des territoires <br />et des
        Relations <br />avec les collectivités <br />territoriales"
      tagline="Un service de la DGCL"
      :tools="tools"
    />
    <router-view :key="$route.path" v-show="showPage" @ready="pageReady" />
    <AppSpinner v-show="!showPage" />

    <FooterCategories />
    <TheFooter brand_name="République<br />française" />
  </div>
</template>

<script>
import TheHeader from "@/components/vue-gouvfr/TheHeader";
import TheFooter from "@/components/vue-gouvfr/TheFooter";
import FooterCategories from "@/components/blocks/FooterCategories";
import AppSpinner from "./components/blocks/AppSpinner.vue";

export default {
  name: "app",
  components: {
    TheHeader,
    TheFooter,
    FooterCategories,
    AppSpinner,
  },

  data() {
    return {
      tools: {
        dark_mode: true,
      },

      showPage: false,
    };
  },

  methods: {
    pageReady() {
      this.showPage = true;
    },
  },
};
</script>

<style>
</style>