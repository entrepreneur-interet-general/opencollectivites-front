<template>
  <div id="app">
    <TheHeader
      service_name="Open Collectivités"
      brand_name="Ministère <br />de la Cohésion <br />des territoires <br />et des
              Relations <br />avec les collectivités <br />territoriales"
      :tools="tools"
    />
    <router-view />
    <HomeCategories />
    <TheFooter brand_name="République<br />française" />
  </div>
</template>

<script>
import TheHeader from "@/components/vue-gouvfr/TheHeader";
import TheFooter from "@/components/vue-gouvfr/TheFooter";
import HomeCategories from "@/components/blocks/HomeCategories";
import store from "@/store";

export default {
  name: "app",
  components: {
    TheHeader,
    TheFooter,
    HomeCategories,
  },
  data() {
    return {
      tools: {
        dark_mode: true,
      },
    };
  },
  store,
};
</script>

<style>
</style>