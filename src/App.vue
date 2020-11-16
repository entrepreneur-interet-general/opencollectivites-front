<template>
  <div id="app">
    <Header
      service_name="Open Collectivités"
      brand_name="Ministère <br />de la Cohésion <br />des territoires <br />et des
              Relations <br />avec les collectivités <br />territoriales"
      :tools="tools"
    />
    <TitleSearch />
    <HomeFeed />
    <HomeCategories />
  </div>
</template>

<script>
import Header from "./components/france-designsystem/Header";
import TitleSearch from "./components/blocks/TitleSearch";
import HomeFeed from "./components/blocks/HomeFeed";
import HomeCategories from "./components/blocks/HomeCategories";
export default {
  name: "app",
  components: {
    Header,
    TitleSearch,
    HomeFeed,
    HomeCategories,
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