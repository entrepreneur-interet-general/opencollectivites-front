<template>
  <div
    class="rf-card"
    :class="{
      'rf-card--no-arrow': noArrow,
      'rf-card--horizontal': horizontal,
    }"
  >
    <div class="rf-card__img" v-if="card_data.image">
      <img
        :src="card_data.image.src"
        :title="card_data.image.alt"
        :alt="card_data.image.alt"
      />
    </div>
    <div class="rf-card__body">
      <p class="rf-card__detail">{{ card_data.detail }}</p>
      <h4 class="rf-card__lead">
        <a :href="card_data.url" class="rf-card__link" :target="targetValue">
          {{ card_data.title }}
        </a>
      </h4>
      <p class="rf-card__desc">
        {{ card_data.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card_data: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    noArrow: {
      type: Boolean,
      default: true,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    newTab: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    targetValue() {
      return this.newTab ? "_blank" : "_self";
    },
  },
};
</script>

<style scoped>
</style>