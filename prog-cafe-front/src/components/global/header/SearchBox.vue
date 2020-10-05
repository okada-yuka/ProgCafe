<template>
  <div class="search-box">
    <img src="@/assets/search.png" alt="search">
    <input
      type="text"
      placeholder="Search"
      v-model="searchText"
      @keypress.enter="search"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { search } from '@/utils/http';
import { store } from '@/utils/store';

@Component
export default class SearchBox extends Vue {
  searchText = ''

  get selfUserName() {
    return store.githubId ?? '';
  }

  search() {
    store.loading = true;
    // search('tetsushi', 's').then((searchResults) => { // ←テストnp用
    search(this.selfUserName, this.searchText)
      .then((searchResults) => { // ←本番用
        store.searchResults = searchResults;
        if (this.$route.name !== 'Search') {
          this.$router.push({ name: 'Search' });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        store.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  img {
    position: absolute;
    width: 1.25em;
    height: 1.25em;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  input {
    outline: none;
    background: none;
    width: 50vw;
    font-size: 1.25em;
      padding: 0.2em 0.5em 0.2em 1.75em;
    color: var(--font);

    border: var(--font) 2px solid;
    border-radius: 0.75em;

    &:focus {
      padding: 0.2em 0.5em 0.2em 1.75em;
      &::placeholder {
        color: transparent;
      }
    }
    &::placeholder {
      text-align: center;
      color: var(--font);
      font-family: Ubuntu, sans-serif;

      transition: all 0.2s;
    }
  }
}
</style>
