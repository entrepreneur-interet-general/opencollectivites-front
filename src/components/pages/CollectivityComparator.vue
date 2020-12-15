<template>
  <div class="collectivity-comparator">
    <thead class="comparator-header">
      <tr>
        <td>{{ siren1 }}</td>
        <td>{{ siren2 }}</td>
        <td v-if="siren3">{{ siren3 }}</td>
        <td v-if="siren4">{{ siren4 }}</td>
      </tr>
    </thead>
    <div>{{ type }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
    siren1: { type: String, required: true },
    siren2: { type: String, required: true },
    siren3: { type: String, default: null },
    siren4: { type: String, default: null },
  },
};
</script>

<style>
</style>