<template>
  <div
    class="rf-search-bar"
    :class="{ 'rf-search-bar--lg': isLarge }"
    :id="[isLarge ? 'search-input--lg' : 'search-input']"
  >
    <label class="rf-label" for="search-input-input">
      {{ label }}
    </label>
    <input
      class="rf-input"
      :placeholder="placeholder"
      type="search"
      :id="[isLarge ? 'search-input--lg-input' : 'search-input-input']"
      :name="[isLarge ? 'search-input--lg-input' : 'search-input-input']"
    />
    <button
      class="rf-btn"
      :class="{ 'rf-btn--lg': isLarge }"
      title="Rechercher"
    >
      <span> Rechercher </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Rechercher",
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>