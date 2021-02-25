<template>
  <div class="rf-container">
    <div class="rf-grid-row">
      <StudiesFeed />
      <!--       <div class="rf-col-8">
        <StudiesFeed />
      </div>
      <div class="rf-col-1"></div>
      <div class="rf-col-3">
        <NewsFeed />
      </div> -->
    </div>
  </div>
</template>

<script>
import StudiesFeed from "./StudiesFeed";
/* import NewsFeed from "./NewsFeed"; */
export default {
  name: "HomeFeed",
  components: { StudiesFeed /* NewsFeed */ },
};
</script>

<style scoped>
</style>