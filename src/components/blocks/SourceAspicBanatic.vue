<template>
  <p class="rf-text--xs">
    Source des données :
    <a
      href="https://www.data.gouv.fr/fr/datasets/les-donnees-contextuelles-des-intercommunalites-et-autres-structures-territoriales/"
      target="_blank"
    >
      Aspic/Banatic </a
    ><span v-if="file">(fichier {{ file }})</span>. Année : {{ year }}, sauf
    précision.
  </p>
</template>

<script>
export default {
  props: {
    year: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style>
</style>