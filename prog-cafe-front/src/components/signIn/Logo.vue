<template>
  <div class="wrapper">
    <p><img src="@/assets/title.svg" class="title"></p>
    <p><img src="@/assets/logo.svg" class="logo"></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Logo extends Vue {
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;

  p {
    text-align: center;

    .title {
      width: 30vw;
    }
    .logo {
      width: 12vw;
    }
  }
}
</style>
