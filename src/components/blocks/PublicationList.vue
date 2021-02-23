<template>
  <div class="bloc-publications">
    <h1 v-if="title">{{ titleWithPublicationsNumber }}</h1>

    <div class="three-col">
      <div class="rf-col-4 feedcard" v-for="card in cards" :key="card.id">
        <BaseCard :card_data="card.data" :noArrow="true" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from "../vue-gouvfr/BaseCard.vue";

export default {
  components: {
    BaseCard,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    cards: {
      type: Array,
      required: true,
    },
  },

  computed: {
    titleWithPublicationsNumber() {
      return this.title + "(" + this.cards.length + ")";
    },
  },
};
</script>


<style>
</style>