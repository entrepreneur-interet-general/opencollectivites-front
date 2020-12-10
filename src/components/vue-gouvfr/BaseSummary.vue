<template>
  <nav class="rf-summary" role="navigation" aria-label="Sommaire">
    <div class="rf-container">
      <div class="rf-summary__title">Sommaire</div>
      <ol class="rf-summary__list">
        <li v-for="(anchor, index) in anchors" :key="index">
          <a :href="anchor.href">{{ anchor.title }}</a>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    anchors: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>