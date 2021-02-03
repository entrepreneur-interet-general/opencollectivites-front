<template>
  <div id="full-page-message" class="rf-container rf-info">
    <BaseCallout
      title="Page encore non implémentée"
      text="La page que vous cherchez n'a pas encore été implémentée. En effet, Open Collectivités est encore en phase de développement actif."
      buttonLabel="Retourner à l'accueil"
      v-on:button-clicked="handleClick"
      class="rf-fi-info-fill rf-callout--scheme-soft-blue-soft"
    />
  </div>
</template>

<script>
import BaseCallout from "@/components/vue-gouvfr/BaseCallout.vue";
import { mapActions } from "vuex";

export default {
  components: { BaseCallout },

  methods: {
    ...mapActions("header", ["maximizeHeader"]),
    handleClick() {
      this.$router.push("/");
    },
  },

  created() {
    this.maximizeHeader();
    this.$emit("ready");
  },
};
</script>

<style scoped>
.rf-error {
  margin-top: 30px;
}
</style>