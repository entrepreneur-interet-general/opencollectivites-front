<template>
  <div id="app">
    <Header
      service_name="Open Collectivités"
      brand_name="Ministère <br />de la Cohésion <br />des territoires <br />et des
              Relations <br />avec les collectivités <br />territoriales"
      :tools="tools"
    />
    <router-view />
    <Footer brand_name="République<br />française" />
  </div>
</template>

<script>
import Header from "./components/vue-gouvfr/Header";
import Footer from "./components/vue-gouvfr/Footer";

export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      tools: {
        dark_mode: true,
      },
    };
  },
};
</script>

<style>
</style>