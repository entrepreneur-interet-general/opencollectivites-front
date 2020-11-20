<template>
  <footer class="rf-footer" role="contentinfo" id="">
    <div class="rf-container">
      <div class="rf-footer__body">
        <Brand :brand_name="brand_name" :isHeader="false" />
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
          <li>
            <a href="#">Plan du site</a>
          </li>
          <li>
            <a href="#">Accessibilité: {{ compliance }} conforme</a>
          </li>
          <li>
            <a href="#">Mentions légales</a>
          </li>
          <li>
            <a href="#">Données personnelles</a>
          </li>
          <li>
            <a href="#">Gestion des cookies</a>
          </li>
        </ul>
        <div class="rf-footer__bottom-copy">© République Française 2020</div>
      </div>
    </div>
  </footer>
</template>

<script>
import Brand from "./Brand";

export default {
  name: "Footer",
  props: {
    brand_name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    compliance: {
      type: String,
      default: "non/partiellement/totalement",
    },
  },
  components: { Brand },
};
</script>

<style>
</style>