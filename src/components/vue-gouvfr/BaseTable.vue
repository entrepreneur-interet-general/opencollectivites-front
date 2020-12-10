<template>
  <div
    class="rf-table"
    :class="{
      'rf-table--bordered': bordered,
      'rf-table--no-scroll': noScroll,
      'rf-table--layout-fixed': fixedLayout,
      'rf-table--no-caption': noCaption,
      'rf-table--caption-bottom': bottomCaption,
    }"
  >
    <table>
      <caption>
        {{
          caption
        }}
      </caption>
      <thead v-if="colTitles">
        <tr>
          <th v-for="(title, index) in colTitles" :key="index" scope="col">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in tableContent" :key="i">
          <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      required: true,
    },
    colTitles: {
      type: Array,
    },
    tableContent: {
      type: Array,
      required: true,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    noScroll: {
      type: Boolean,
      default: false,
    },
    fixedLayout: {
      type: Boolean,
      default: false,
    },
    noCaption: {
      type: Boolean,
      default: false,
    },
    bottomCaption: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>