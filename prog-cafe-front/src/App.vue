<template>
  <div id="app">
    <Header />
    <router-view/>
    <Loading />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/global/header/Header.vue';
import Loading from '@/components/Loading.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    Header,
    Loading,
  },
})
export default class App extends Vue {
  storeData = store;
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  min-width: 100vw;
  min-height: 100vh;

  color: var(--font);
  background: url('./assets/background.jpg') center/cover no-repeat;

  font-family: 'Ubuntu', 'Noto Sans JP', sans-serif;

  overflow-x: hidden; // 最終奥義
}
</style>
