<template>
  <div class="rf-callout">
    <h4 v-if="title" class="rf-callout__title">{{ title }}</h4>
    <p class="rf-callout__text">{{ text }}</p>
    <button
      v-if="buttonLabel"
      @click="clicked"
      class="rf-btn"
      :title="buttonLabel"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    buttonLabel: {
      type: String,
    },
  },

  methods: {
    clicked() {
      this.$emit("button-clicked");
    },
  },
};
</script>

<style>
</style>