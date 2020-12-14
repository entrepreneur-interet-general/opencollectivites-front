<template>
  <button
    class="rf-btn"
    :title="label"
    :class="{
      'rf-btn--secondary': isSecondary,
    }"
    :disabled="isDisabled"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    isSecondary: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>