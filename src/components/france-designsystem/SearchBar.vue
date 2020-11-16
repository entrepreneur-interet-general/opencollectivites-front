<template>
  <div
    class="rf-search-bar"
    :class="{ 'rf-search-bar--lg': large }"
    id="search-input"
  >
    <label class="rf-label" for="search-input-input">
      {{ label }}
    </label>
    <input
      class="rf-input"
      :placeholder="placeholder"
      type="search"
      id="search-input-input"
      name="search-input-input"
    />
    <button class="rf-btn" title="Rechercher">
      <span> Rechercher </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Rechercher",
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>