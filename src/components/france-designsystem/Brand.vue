<template>
  <div :class="[isHeader ? 'rf-header__brand' : 'rf-footer__brand']">
    <a class="rf-logo" href="#" :title="brand_name">
      <span class="rf-logo__title" v-html="brand_name"></span>
    </a>
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