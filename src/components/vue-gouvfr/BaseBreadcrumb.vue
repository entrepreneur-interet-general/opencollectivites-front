<template>
  <nav class="rf-breadcrumb" aria-label="vous êtes ici :">
    <button class="rf-breadcrumb__button" hidden>Voir le fil d’Ariane</button>
    <ol class="rf-breadcrumb__list">
      <li class="rf-breadcrumb__item">
        <router-link to="/">Accueil</router-link>
      </li>

      <li
        class="rf-breadcrumb__item"
        v-for="(link, index) in links"
        :key="index"
      >
        <router-link :to="link.url"> {{ link.name }} </router-link>
      </li>
      <li
        class="rf-breadcrumb__item rf-breadcrumb__item--current"
        aria-current="page"
      >
        {{ currentPage }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
    },
    currentPage: {
      type: String,
      required: true,
      default: "Page actuelle",
    },
  },
};
</script>

<style>
</style>