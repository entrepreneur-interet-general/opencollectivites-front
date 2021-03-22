<template>
  <p class="rf-text--xs">
    Source des données :
    <a
      href="https://www.data.gouv.fr/fr/datasets/les-donnees-contextuelles-des-intercommunalites-et-autres-structures-territoriales/"
      target="_blank"
    >
      Aspic/Banatic<span v-if="file"> (fichier {{ file }})</span>.
    </a>
    Année : {{ year }}, sauf précision.
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