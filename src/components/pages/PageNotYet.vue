<template>
  <div id="opencollectivites">
    <div class="rf-container">
      <img
        src="/img/undraw_work_in_progress_uhmv.svg"
        style="float: right; width: 40%"
        alt=""
      />
      <h1>Page en construction</h1>
      <p>
        <a href="/" class="rf-link rf-link--icon-right" target="_self"
          >Retour à la page d’accueil</a
        >
        <br clear="all" />
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  metaInfo: {
    title: "Page en construction",
  },

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