<template>
  <header class="rf-header">
    <div class="rf-container">
      <div class="rf-header__body">
        <BaseBrand :brand_name="brand_name" v-show="getHeaderSize" />
        <div class="rf-header__navbar" v-if="service_name">
          <div class="rf-service">
            <router-link to="/" class="rf-service__title" :title="service_name">
              {{ service_name }}
            </router-link>
            <p class="rf-service__tagline" v-if="tagline">
              {{ tagline }}
            </p>
          </div>
        </div>
        <div class="rf-header__tools" v-if="tools">
          <div class="rf-shortcuts">
            <ul class="rf-shortcuts__list">
              <li class="rf-shortcuts__item" v-if="tools.dark_mode">
                <div class="rf-checkbox-group">
                  <input
                    type="checkbox"
                    id="rf-dark-mode-toggle-switch"
                    name="rf-dark-mode-toggle-switch"
                    class="ng-untouched ng-pristine ng-valid"
                  />
                  <label
                    for="rf-dark-mode-toggle-switch"
                    class="rf-label"
                  ></label>
                </div>
              </li>
              <li
                class="rf-shortcuts__item"
                v-for="(item, key) in tools.items"
                :key="key"
              >
                <a
                  :href="item.url"
                  class="rf-link rf-link--icon-left"
                  :class="item.icon"
                  target="_self"
                  >{{ item.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class="rf-search-bar" id="header-search" v-if="tools.search_bar">
            <label class="rf-label" for="header-search-input">{{
              tools.search_bar.label
            }}</label>
            <input
              class="rf-input"
              placeholder="Rechercher"
              type="search"
              id="header-search-input"
              name="header-search-input"
            />
            <button class="rf-btn" title="Rechercher">
              <span> Rechercher </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import BaseBrand from "./BaseBrand";

import { mapGetters } from "vuex";

export default {
  components: {
    BaseBrand,
  },

  props: {
    brand_name: {
      type: String,
      required: true,
    },
    service_name: { type: String },
    tagline: { type: String },
    tools: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: { ...mapGetters("header", ["getHeaderSize"]) },
};
</script>

<style scoped>
</style>