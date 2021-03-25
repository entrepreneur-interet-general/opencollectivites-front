<template>
  <div id="opencollectivites">
    <div class="rf-container">
      <img
        src="/img/undraw_no_data_re_kwbl.svg"
        style="float: right; width: 40%"
        alt=""
      />
      <h1>La page recherchée n’existe plus</h1>
      <p>Essayez l’un des liens ci-dessous :</p>

      <p>
        <a class="rf-link rf-link--icon-right" target="_self" href="/"
          >Page d’accueil</a
        >
      </p>
      <p>
        <a
          class="rf-link rf-link--icon-right"
          target="_self"
          href="/publications?type=1"
          >Publications statistiques sur les collectivités locales</a
        >
      </p>
      <p>
        <a
          class="rf-link rf-link--icon-right"
          target="_self"
          href="/publications?type=2"
          >Jeux de données sur les collectivités locales</a
        >
      </p>
      <p>
        <a
          class="rf-link rf-link--icon-right"
          target="_self"
          href="/publications?type=3"
          >Outils utiles pour les collectivités locales</a
        >
      </p>
      <p>
        <a class="rf-link rf-link--icon-right" target="_self" href="/plan"
          >Plan du site</a
        >
      </p>

      <br clear="all" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  metaInfo: {
    title: "La page recherchée n’existe plus",
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