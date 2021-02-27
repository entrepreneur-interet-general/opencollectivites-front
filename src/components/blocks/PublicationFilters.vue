<template>
  <div class="rf-container">
    <form id="publications-header-form" class="rf-grid-row">
      <div class="rf-col-2">
        <router-link :to="{ path: $store.state.route.from.fullPath }">
          <BaseButton :isSecondary="true" label="<" />
        </router-link>
      </div>
      <BaseSelect
        class="rf-col-4"
        title="Thématique"
        :select_data="topics"
        :defaultOption="topicsDefaultOption"
        queryParam="topic"
        @input="setParam('topic', $event)"
      />
      <span class="rf-col-1"></span>
      <BaseSelect
        class="rf-col-4"
        title="Portée"
        :select_data="scopes"
        :defaultOption="scopesDefaultOption"
        queryParam="scope"
        @input="setParam('scope', $event)"
      />
    </form>
  </div>
</template>


<script>
import BaseSelect from "../vue-gouvfr/BaseSelect.vue";
import BaseButton from "../vue-gouvfr/BaseButton.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BaseSelect,
    BaseButton,
  },
  data() {
    return {
      topics: { label: "Thématique", options: [] },
      scopes: { label: "Portée", options: [] },
      topicsDefaultOption: {
        isDisabled: false,
        isHidden: false,
        text: "- Thématique -",
      },
      scopesDefaultOption: {
        isDisabled: false,
        isHidden: false,
        text: "- Portée -",
      },
    };
  },
  computed: {
    ...mapGetters("publicationsFilterLists", ["getTopics", "getScopes"]),
  },
  methods: {
    ...mapActions("header", ["minimizeHeader"]),
    ...mapActions("publicationsFilterLists", ["fetchFilterLists"]),
    queryWithParameterValue(parameter, value) {
      const query = Object.assign({}, this.$route.query);
      if (value) {
        query[parameter] = value;
      } else {
        delete query[parameter];
      }
      return query;
    },
    routeWithParameterValue(parameter, value) {
      return {
        name: this.$route.name,
        query: this.queryWithParameterValue(parameter, value),
      };
    },
    setParam(parameter, value) {
      let passedValue = null;
      if (value) {
        passedValue = value.value;
      }
      const newRoute = this.routeWithParameterValue(parameter, passedValue);
      this.$router.push(newRoute);
      this.$emit("update:filters", newRoute.query);
    },
  },

  created() {
    return new Promise((resolve) => {
      if (!this.getTopics.length) {
        resolve(this.fetchFilterLists());
      } else {
        resolve(this.getTopics);
      }
    }).then(() => {
      return new Promise(() => {
        for (var topic of this.getTopics) {
          this.topics.options.push({
            text: topic.name,
            value: topic.id,
          });
        }

        for (var scope of this.getScopes) {
          this.scopes.options.push({
            text: scope.name,
            value: scope.id,
          });
        }
      });
    });
  },
};
</script>


<style scoped>
</style>