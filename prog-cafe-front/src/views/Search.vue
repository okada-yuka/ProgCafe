<template>
  <div class="search">
    <SearchResult />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/global/header/Header.vue';
import SearchResult from '@/components/searchResults/SearchResults.vue';

@Component({
  components: {
    Header,
    SearchResult,
  },
})
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
.search {
  padding: 2em 5em;
}
</style>
