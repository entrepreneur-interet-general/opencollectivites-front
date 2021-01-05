<template>
  <div id="opencollectivites">
    <TitleSearch />
    <HomeFeed />
  </div>
</template>

<script>
import TitleSearch from "@/components/blocks/TitleSearch";
import HomeFeed from "@/components/blocks/HomeFeed";

export default {
  name: "Homepage",

  components: {
    TitleSearch,
    HomeFeed,
  },

  created() {
    this.$emit("ready");
  },
};
</script>

<style>
</style>