<template>
  <button @click="$emit('click')" class="back-button">
    <img src="@/assets/back.png" alt="Back">
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BackButton extends Vue {
}
</script>

<style lang="scss" scoped>
.back-button {
  display: block;
  transform: rotate(-90deg);

  border: 0;
  outline: none;
  background: transparent;
  height: 100%;

  cursor: pointer;

  img {
    height: 2em;
  }
}
</style>
