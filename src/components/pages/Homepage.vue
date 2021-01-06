<template>
  <div id="opencollectivites">
    <TitleSearch />
    <HomeFeed />
  </div>
</template>

<script>
import TitleSearch from "@/components/blocks/TitleSearch";
import HomeFeed from "@/components/blocks/HomeFeed";
import { mapActions } from "vuex";

export default {
  name: "Homepage",

  components: {
    TitleSearch,
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