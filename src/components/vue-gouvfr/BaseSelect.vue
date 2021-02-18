<template>
  <div
    class="rf-select-group"
    :class="{
      'rf-select-group--error': isError,
      'rf-select-group--valid': isValid,
    }"
  >
    <label
      class="rf-label"
      :for="selectId"
      :aria-describedby="{
        'select-error-desc-error': isError,
        'select-valid-desc-valid': isValid,
      }"
    >
      {{ select_data.label }}
    </label>
    <p
      v-if="select_data.description"
      class="rf-hint-text"
      id="select-hint-desc-hint"
    >
      {{ select_data.description }}
    </p>
    <!-- If there are option groups -->
    <select
      class="rf-select"
      :class="{ 'rf-select--error': isError, 'rf-select--valid': isValid }"
      :id="selectId"
      :name="selectId"
      :disabled="isDisabled === true"
      v-if="select_data.optionGroups"
    >
      <option value="" disabled hidden :selected="!queryValue">
        {{ defaultOption }}
      </option>
      <optgroup
        v-for="group in select_data.optionGroups"
        :label="group.groupName"
        :key="group.groupName"
      >
        <option
          v-for="option in group.items"
          :value="option.value"
          :selected="option.value == queryValue"
          :key="option.value"
          :disabled="option.isDisabled === true"
          :hidden="option.isHidden === true"
          @click="$emit('input', option)"
        >
          {{ option.text }}
        </option>
      </optgroup>
    </select>
    <!-- If there are no option groups -->
    <select
      class="rf-select"
      :class="{ 'rf-select--error': isError, 'rf-select--valid': isValid }"
      :id="selectId"
      :name="selectId"
      :disabled="isDisabled === true"
      v-else
    >
      <option value="" :selected="!queryValue" disabled hidden>
        {{ defaultOption }}
      </option>
      <option
        v-for="option in select_data.options"
        :value="option.value"
        :selected="option.value == queryValue"
        :key="option.value"
        :disabled="option.isDisabled === true"
        :hidden="option.isHidden === true"
        @click="$emit('input', option)"
      >
        {{ option.text }}
      </option>
    </select>
    <p v-if="isError" id="select-error-desc-error" class="rf-error-text">
      {{ error_message }}
    </p>
    <p v-if="isValid" id="select-valid-desc-valid" class="rf-valid-text">
      {{ validation_message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    select_data: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    isError: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    error_message: {
      type: String,
      default: "Une erreur est survenue",
    },
    validation_message: {
      type: String,
      default: "",
    },
    defaultOption: {
      type: String,
      default: "- Select -",
    },
    queryParam: {
      type: String,
      required: false,
    },
  },
  computed: {
    selectId() {
      if (this.isDisabled) {
        return "select-disabled";
      } else if (this.isError) {
        return "select-error";
      } else if (this.isValid) {
        return "select-valid";
      } else {
        return "select";
      }
    },
    queryValue() {
      if (this.queryParam) {
        if (this.$route.query[this.queryParam]) {
          return this.$route.query[this.queryParam];
        }
      }
      return null;
    },
  },
};
</script>

<style>
</style>