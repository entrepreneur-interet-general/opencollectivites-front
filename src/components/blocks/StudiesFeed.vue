<template>
  <div id="studiesfeed">
    <h2>Études et statistiques locales</h2>
    <h3>Synthèses sur l'ensemble des activités</h3>
    <div class="two-col">
      <div
        class="rf-col-4 feedcard"
        v-for="doc in synthesisDocs"
        :key="doc.title"
      >
        <Card :card_data="doc" :noArrow="true" />
      </div>
    </div>

    <h3>Communes</h3>
    <div class="two-col">
      <div
        class="rf-col-4 feedcard"
        v-for="doc in communesDocs"
        :key="doc.title"
      >
        <Card :card_data="doc" />
      </div>
    </div>
    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les communes</a
      >
    </p>

    <h3>Intercommunalités</h3>
    <div class="two-col">
      <div
        class="rf-col-4 feedcard"
        v-for="doc in communesDocs"
        :key="doc.title"
      >
        <Card :card_data="doc" />
      </div>
    </div>
    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les
        intercommunalités</a
      >
    </p>

    <h3>Départements</h3>
    <div class="two-col">
      <div
        class="rf-col-4 feedcard"
        v-for="doc in communesDocs"
        :key="doc.title"
      >
        <Card :card_data="doc" />
      </div>
    </div>
    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les
        départements</a
      >
    </p>

    <h3>Régions</h3>
    <div class="two-col">
      <div
        class="rf-col-4 feedcard"
        v-for="doc in communesDocs"
        :key="doc.title"
      >
        <Card :card_data="doc" />
      </div>
    </div>
    <p class="feed-more-link">
      <a href="#" class="rf-link rf-link--icon-right" target="_self"
        >Toutes les études, statistiques et outils locaux pour les régions</a
      >
    </p>
  </div>
</template>

<script>
import Card from "../france-designsystem/Card";
export default {
  name: "StudiesFeed",
  components: { Card },
  data() {
    return {
      synthesisDocs: [
        {
          title: "Les collectivités locales en chiffres",
          image: { src: "/img/placeholder.jpg", alt: "placeholder kitten" },
          url: "https://test.com",
          description: "",
          detail: "Publication | 8 septembre 2020 • DGCL",
        },
        {
          title: "Finances locales",
          url: "https://test.com",
          type: "Publication",
          description: "",
          detail: "Publication | 17 juillet 2020 • DGCL",
          noArrow: true,
        },
        {
          title: "Fonction publique territoriale",
          url: "https://test.com",
          description: "",
          detail: "Publication | 7 juillet 2020 • DGCL",
          noArrow: true,
        },
        {
          title: "Les chiffres-clés des collectivités locales",
          url: "https://test.com",
          description: "",
          detail: "Publication | 7 juillet 2020 • DGCL",
          noArrow: true,
        },
        {
          title:
            "Rapport de l'observatoire des finances et de la gestion publique locales (OFGL)",
          url: "https://test.com",
          description: "",
          detail: "Publication | 8 septembre 2020 • DGCL",
          noArrow: true,
        },
        {
          title: "Guide Statistique de la fiscalité directe locale",
          url: "https://test.com",
          description: "",
          detail: "Publication | 10 octobre 2020 • DGCL",
          noArrow: true,
        },
      ],
      communesDocs: [
        {
          title: "Les comptes 2016-2019 des communes : données agrégées",
          image: { src: "/img/placeholder.jpg", alt: "placeholder kitten" },
          url: "https://test.com",
          description: "",
          detail: "Publication | 7 juillet 2020 • DGCL",
          noArrow: true,
        },
        {
          title: "Balance comptable des communes",
          url: "https://test.com",
          description: "",
          detail:
            "Données | 18 février 2019 • Ministère de l’économie, des finances et de la relance",
          noArrow: true,
        },
        {
          title: "Dépenses fonctionnelles des communes en 2018",
          url: "https://test.com",
          description: "",
          detail: "Publication | 7 juillet 2020 • DGCL",
          noArrow: true,
        },
        {
          title:
            "Taux de fiscalité directe (TH, FB, FNB, CFE) votés en 2019 par les communes",
          url: "https://test.com",
          description: "",
          detail: "Publication | 1 octobre 2019 • DGCL",
          noArrow: true,
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>