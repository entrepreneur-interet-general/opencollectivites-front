<template>
  <div id="opencollectivites">
    <TitleSearch />
    <HomeFeed />
    <HomeCategories />
  </div>
</template>

<script>
import TitleSearch from "@/components/blocks/TitleSearch";
import HomeFeed from "@/components/blocks/HomeFeed";
import HomeCategories from "@/components/blocks/HomeCategories";

export default {
  name: "Homepage",
  components: {
    TitleSearch,
    HomeFeed,
    HomeCategories,
  },
};
</script>

<style>
</style>