<template>
  <div class="loading" v-if="loading">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" version="1.1">
      <path d="M 80,50 a 30 30 0 1 1 -30,-30" fill="none" stroke="white" stroke-width="10" />
    </svg>
  </div>
</template>

<script lang="ts">
import { store } from '@/utils/store';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  get loading() {
    return store.loading;
  }
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: rotation 1s linear 0s infinite normal none;
  }
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
