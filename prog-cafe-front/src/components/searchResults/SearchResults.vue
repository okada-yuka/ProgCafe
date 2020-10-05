<template>
  <div class="search-results">
    <div v-for="result in searchResults" :key="result.name">
      <User
        :name="result.name"
        :following="result.result.following"
        :rank="result.result.rank"
        :online="result.result.online"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import User from '@/components/searchResults/user/User.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    User,
  },
})
export default class SearchResults extends Vue {
  get searchResults() {
    if (store.searchResults) {
      const resultList = Object.entries(store.searchResults).map(([name, result]) => {
        const temp = {
          name,
          result,
        };
        return temp;
      });
      return resultList;
    }
    return null;
  }
}
</script>
<style scoped lang="scss">
.search-results{
  background: var(--background);
}
</style>
