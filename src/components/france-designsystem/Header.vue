<template>
  <header class="rf-header">
    <div class="rf-container">
      <div class="rf-header__body">
        <div class="rf-header__brand">
          <a class="rf-logo" href="#" :title="entity">
            <span class="rf-logo__title" v-html="entity"></span>
          </a>
        </div>
        <div class="rf-header__navbar">
          <div class="rf-service">
            <a class="rf-service__title" href="#" :title="service_name">
              {{ service_name }}
            </a>
            <em>.fr</em>
          </div>
        </div>
        <div class="rf-shortcuts">
          <ul class="rf-shortcuts__list">
            <li class="rf-shortcuts__item">
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
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    service_name: String,
    entity: String,
  },
};
</script>

<style scoped>
</style>