<template>
  <div class="bloc-publications">
    <div class="col-auto">
      <div class="rf-col-4 feedcard" v-for="card in cards" :key="card.id">
        <BaseCard :card_data="card.data" :noArrow="true" :newTab="true" />
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
    cards: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style>
</style>