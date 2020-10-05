<template>
  <img
    class="fire"
    src="@/assets/fire.png"
    :style="{
      width: `${level}%`
    }"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Fire extends Vue {
  @Prop({ required: true }) level!: number
}
</script>

<style lang="scss" scoped>
.fire {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
