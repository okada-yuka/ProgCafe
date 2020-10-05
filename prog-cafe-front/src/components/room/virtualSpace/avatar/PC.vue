<template>
  <img class="pc" src="@/assets/PC_right.png">
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PC extends Vue {}
</script>

<style lang="scss" scoped>
.pc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
