<template>
  <div :class="[isHeader ? 'rf-header__brand' : 'rf-footer__brand']">
    <router-link to="/" class="rf-logo" :title="brand_name">
      <span class="rf-logo__title" v-html="brand_name"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Brand",
  props: {
    brand_name: {
      type: String,
      required: true,
    },
    isHeader: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
</style>