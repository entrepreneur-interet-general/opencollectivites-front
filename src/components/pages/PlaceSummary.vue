<template>
  <div id="opencollectivites">
    <div class="rf-container">
      <h1>Fiche commune: {{ name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaceSummary",
  props: ["siren", "name"],
};
</script>

<style>
</style>