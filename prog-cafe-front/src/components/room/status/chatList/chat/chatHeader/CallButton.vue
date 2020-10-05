<template>
  <button class="call-button" @click="call">
    <img src="@/assets/tel.png" alt="tel">
  </button>
</template>

<script lang="ts">
import { store } from '@/utils/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CallButton extends Vue {
  @Prop({ required: true }) id!: string

  call() {
    store.callRequest(this.id);
  }
}
</script>

<style lang="scss" scoped>
.call-button {
  display: block;

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
