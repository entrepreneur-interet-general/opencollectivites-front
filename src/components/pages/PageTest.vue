<template>
  <div class="rf-container">
    <BasePagination :numberOfPages="20" />
    <BasePagination :numberOfPages="15" />
    <BasePagination :numberOfPages="7" />
    <BasePagination :numberOfPages="5" />
  </div>
</template>

<script>
import BasePagination from "../vue-gouvfr/BasePagination.vue";
export default {
  components: { BasePagination },
  created() {
    this.$emit("ready");
  },
};
</script>

<style>
</style>