<template>
  <div class="rf-tile" :class="tile_data.horizontal && 'rf-tile--horizontal'">
    <div class="rf-tile__img">
      <vue-remixicon
        v-if="tile_data.remixicon"
        :name="tile_data.remixicon.name"
        size="xl"
        type="line"
        color="#000"
      />
      <img
        v-else
        :src="tile_data.image.src"
        :title="tile_data.image.alt"
        :alt="tile_data.image.alt"
      />
    </div>
    <div class="rf-tile__body">
      <h4 class="rf-tile__title">
        <a class="rf-tile__link" :href="tile_data.url">{{ tile_data.title }}</a>
        <vue-remixicon name="bank" type="fill" color="#aaa" />
      </h4>
    </div>
  </div>
</template>

<script>
import vueRemixicon from "@katalonne/vue-remixicon";

export default {
  name: "TileIcon",
  props: { tile_data: {} },
  components: {
    vueRemixicon,
  },
};
</script>

<style scoped>
</style>