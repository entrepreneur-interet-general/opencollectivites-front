<template>
  <footer class="rf-footer" role="contentinfo" id="">
    <div class="rf-container">
      <div class="rf-footer__body">
        <BaseBrand :brand_name="brand_name" :isHeader="false" />
        <div class="rf-footer__content">
          <p class="rf-footer__content-desc">
            {{ content }}
          </p>
          <ul class="rf-footer__content-links">
            <li>
              <a href="http://legifrance.gouv.fr">legifrance.gouv.fr</a>
            </li>
            <li>
              <a href="http://gouvernement.fr">gouvernement.fr</a>
            </li>
            <li>
              <a href="http://service-public.fr">service-public.fr</a>
            </li>
            <li>
              <a href="http://data.gouv.fr">data.gouv.fr</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="rf-footer__bottom">
        <ul class="rf-footer__bottom-list">
          <li v-for="(link, index) in legal_links" :key="index">
            <a :href="link.url">{{ link.title }}</a>
          </li>
        </ul>
        <div class="rf-footer__bottom-copy">© République Française 2020</div>
      </div>
    </div>
  </footer>
</template>

<script>
import BaseBrand from "./BaseBrand";

export default {
  props: {
    brand_name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    legal_links: {
      type: Array,
      default() {
        return [
          { url: "#", title: "Plan du site" },
          {
            url: "#",
            title: "Accessibilité: non/partiellement/totalement conforme",
          },
          { url: "#", title: "Mentions légales" },
          { url: "#", title: "Données personnelles" },
          { url: "#", title: "Gestion des cookies" },
        ];
      },
    },
  },
  components: { BaseBrand },
};
</script>

<style>
</style>