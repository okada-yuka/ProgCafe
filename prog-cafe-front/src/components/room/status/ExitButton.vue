<template>
  <div class="exit-button">
    <button @click="exit">
      Leave the room
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ExitButton extends Vue {
  exit() {
    window.location.href = '/';
  }
}
</script>

<style lang="scss" scoped>
.exit-button {
  padding: 1em;
  padding-bottom: 0;

  button {
    width: 100%;
    height: 100%;
    outline: none;
    border: 0;
    background: var(--font);
    color: var(--main);
    font-family: Ubuntu, sans-serif;
    font-size: 1.5em;
    font-weight: bold;
    border-radius: 10px;

    cursor: pointer;
  }
}
</style>
