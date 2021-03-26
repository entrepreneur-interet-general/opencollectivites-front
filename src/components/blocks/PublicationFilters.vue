<template>
  <div class="rf-container">
    <form id="publications-header-form" class="rf-grid-row">
      <p class="rf-col-1">
        <router-link
          :to="{ path: $store.state.route.from.fullPath }"
          tag="button"
          class="rf-btn rf-btn--secondary"
          >&lt;
        </router-link>
      </p>
      <BaseSelect
        class="rf-col-2"
        title="Thématique"
        :select_data="topics"
        :defaultOption="topicsDefaultOption"
        queryParam="topic"
        @input="setParam('topic', $event)"
      />
      <span class="rf-col-1"></span>
      <BaseSelect
        class="rf-col-2"
        title="Portée"
        :select_data="scopes"
        :defaultOption="scopesDefaultOption"
        queryParam="scope"
        @input="setParam('scope', $event)"
      />
      <span class="rf-col-1"></span>
      <BaseSelect
        class="rf-col-2"
        title="Type"
        :select_data="document_types"
        :defaultOption="documentTypesDefaultOption"
        queryParam="document_type"
        @input="setParam('document_type', $event)"
      />
    </form>
  </div>
</template>


<script>
import BaseSelect from "../vue-gouvfr/BaseSelect.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BaseSelect,
  },
  data() {
    return {
      topics: { label: "Thématique", options: [] },
      scopes: { label: "Portée", options: [] },
      document_types: { label: "Type", options: [] },
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
      documentTypesDefaultOption: {
        isDisabled: false,
        isHidden: false,
        text: "- Type de ressources -",
      },
    };
  },
  computed: {
    ...mapGetters("publicationsFilterLists", [
      "getTopics",
      "getScopes",
      "getDocumentTypes",
    ]),
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

        for (var document_type of this.getDocumentTypes) {
          this.document_types.options.push({
            text: document_type.name,
            value: document_type.id,
          });
        }
      });
    });
  },
};
</script>


<style scoped>
</style>