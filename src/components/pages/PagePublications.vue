<template>
  <div id="opencollectivites">
    <div class="rf-container">
      <BaseBreadcrumb currentPage="Publications" />

      <PublicationList
        title="Études, statistiques et outils locaux"
        :showFilters="true"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PublicationList from "@/components/blocks/PublicationList.vue";
import BaseBreadcrumb from "@/components/vue-gouvfr/BaseBreadcrumb.vue";

export default {
  components: {
    PublicationList,
    BaseBreadcrumb,
  },
  methods: {
    ...mapActions("header", ["minimizeHeader"]),
  },
  created() {
    this.minimizeHeader();
    this.$emit("ready");
  },
};
</script>

<style scoped>
</style>