<template class="desk">
  <div class="desk">
    <img src="../../../assets/table.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Desk extends Vue {
}
</script>

<style lang="scss" scoped>
.desk {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 90%;
    display: block;
  }
}
</style>
