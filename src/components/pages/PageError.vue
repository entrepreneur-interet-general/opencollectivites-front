<template>
  <div id="full-page-message" class="rf-container rf-error">
    <BaseCallout
      title="Erreur"
      text="Une erreur est survenue"
      buttonLabel="Retourner à l'accueil"
      v-on:button-clicked="handleClick"
      class="rf-fi-alert-fill rf-callout--scheme-soft-orange-soft"
    />
  </div>
</template>

<script>
import BaseCallout from "@/components/vue-gouvfr/BaseCallout.vue";
import { mapActions } from "vuex";

export default {
  metaInfo: {
    title: "Erreur",
  },

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