<template>
  <div class="rf-tile" :class="horizontal && 'rf-tile--horizontal'">
    <div class="rf-tile__img">
      <img
        :src="tile_data.image.src"
        :title="tile_data.image.alt"
        :alt="tile_data.image.alt"
      />
    </div>
    <div class="rf-tile__body">
      <h4 class="rf-tile__title">
        <a class="rf-tile__link" :href="tile_data.url">{{ tile_data.title }}</a>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    tile_data: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
</style>