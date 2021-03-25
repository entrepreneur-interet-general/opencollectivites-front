<template>
  <div id="opencollectivites">
    <HomeSearch />
    <HomeFeed />
  </div>
</template>

<script>
import HomeSearch from "@/components/blocks/HomeSearch";
import HomeFeed from "@/components/blocks/HomeFeed";
import { mapActions } from "vuex";

export default {
  name: "Homepage",

  metaInfo: {
    title: "Accueil",
  },

  components: {
    HomeSearch,
    HomeFeed,
  },

  methods: {
    ...mapActions("header", ["maximizeHeader"]),
  },

  created() {
    this.maximizeHeader();
    this.$emit("ready");
  },
};
</script>

<style>
</style>