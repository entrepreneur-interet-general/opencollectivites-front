<template :key="currentPageNumber">
  <nav class="rf-pagination" aria-label="Pagination navigation">
    <ul class="rf-pagination__list">
      <li
        class="rf-pagination__item--first rf-pagination__item"
        :class="{
          'rf-pagination__item--disabled': currentPageNumber == 1,
        }"
      >
        <router-link
          class="rf-pagination__link"
          :to="routeWithPageNumber(1)"
          aria-label="Première page"
          title="Première page"
        >
        </router-link>
      </li>
      <li
        class="rf-pagination__item--prev rf-pagination__item"
        :class="{
          'rf-pagination__item--disabled': currentPageNumber == 1,
        }"
      >
        <router-link
          class="rf-pagination__link"
          :to="routeWithPageNumber(parseInt(currentPageNumber) - 1)"
          aria-label="Page précédente"
          title="Page précédente"
        >
          <span class="rf-pagination__label">Précédente</span>
        </router-link>
      </li>

      <li
        v-for="(pageItem, index) in pageItems"
        :key="index"
        class="rf-pagination__item"
        :class="{
          'rf-pagination__item--active': pageItem == currentPageNumber,
        }"
        :aria-current="{ page: pageItem == currentPageNumber }"
      >
        <router-link
          v-if="Number.isInteger(pageItem)"
          :aria-label="pageNumberLabel(pageItem)"
          :title="pageNumberLabel(pageItem)"
          :to="routeWithPageNumber(pageItem)"
        >
          {{ pageItem }}
        </router-link>
        <span v-else>
          {{ pageItem }}
        </span>
      </li>
      <li
        class="rf-pagination__item--next rf-pagination__item"
        :class="{
          'rf-pagination__item--disabled': currentPageNumber == numberOfPages,
        }"
      >
        <router-link
          class="rf-pagination__link"
          :to="routeWithPageNumber(parseInt(currentPageNumber) + 1)"
          aria-label="Page suivante"
          title="Page suivante"
        >
          <span class="rf-pagination__label">Suivante</span>
        </router-link>
      </li>
      <li
        class="rf-pagination__item--last rf-pagination__item"
        :class="{
          'rf-pagination__item--disabled': currentPageNumber == numberOfPages,
        }"
      >
        <router-link
          class="rf-pagination__link"
          :to="routeWithPageNumber(numberOfPages)"
          aria-label="Dernière page"
          title="Dernière page"
        >
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    numberOfPages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pageItems: [],
    };
  },
  computed: {
    currentPageNumber() {
      if (this.$route.query.page > this.numberOfPages) {
        return parseInt(this.numberOfPages);
      } else if (this.$route.query.page >= 1) {
        return parseInt(this.$route.query.page);
      } else {
        return 1;
      }
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    queryWithPageNumber(pageNumber) {
      const query = Object.assign({}, this.$route.query);
      query.page = pageNumber;
      return query;
    },
    pageNumberLabel(pageNumber) {
      return "Page " + pageNumber;
    },
    routeWithPageNumber(pageNumber) {
      return {
        name: this.currentRouteName,
        query: this.queryWithPageNumber(pageNumber),
      };
    },
    listPageItems() {
      let pageItems = [1, 2];
      if (this.currentPageNumber > 1) {
        pageItems.push(this.currentPageNumber - 1);
      }
      pageItems.push(this.currentPageNumber);
      if (this.currentPageNumber < this.numberOfPages) {
        pageItems.push(this.currentPageNumber + 1);
      }

      pageItems.push(this.numberOfPages - 1);
      pageItems.push(this.numberOfPages);

      // Keep only one of each
      let uniquePageItems = [...new Set(pageItems)];

      // Add "…" separators between non-consecutive values
      let uniquePageItemsWithSeparators = [uniquePageItems[0]];

      for (let i = 1; i < uniquePageItems.length; i++) {
        // If "…" would replace only one value, show it instead
        if (uniquePageItems[i] - uniquePageItems[i - 1] == 2) {
          uniquePageItemsWithSeparators.push(uniquePageItems[i - 1] + 1);
        } else if (uniquePageItems[i] - uniquePageItems[i - 1] > 1) {
          uniquePageItemsWithSeparators.push("…");
        }
        uniquePageItemsWithSeparators.push(uniquePageItems[i]);
      }
      this.pageItems = uniquePageItemsWithSeparators;
    },
  },
  created() {
    this.listPageItems();
  },
  watch: {
    $route() {
      this.listPageItems();
    },
  },
};
</script>

<style>
</style>