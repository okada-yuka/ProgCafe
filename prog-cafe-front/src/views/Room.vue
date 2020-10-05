<template>
  <div class="room">
    <VirtualSpace />
    <Status />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/global/header/Header.vue';
import VirtualSpace from '@/components/room/virtualSpace/VirtualSpace.vue';
import Status from '@/components/room/status/Status.vue';

@Component({
  components: {
    Header,
    VirtualSpace,
    Status,
  },
})
export default class Room extends Vue {

}
</script>

<style lang="scss" scoped>
.room {
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr 22.5em;

  overflow: hidden;
}
</style>
