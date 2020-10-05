<template>
  <div class="virtual-space">
    <Desk />
    <div class="avatars">
      <Avatar
        v-for="(userId, index) in users"
        :key="userId"
        :userId="userId"
        :tablePosition="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Desk from '@/components/room/virtualSpace/Desk.vue';
import Avatar from '@/components/room/virtualSpace/avatar/Avatar.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    Desk,
    Avatar,
  },
})
export default class VirtualSpace extends Vue {
  get users() {
    return store.users;
  }
}
</script>

<style lang="scss" scoped>
.virtual-space {
  position: relative;

  .avatars {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    padding: calc(288px + calc(10vw * -1.5));

    .avatar:nth-child(-1n+4) {
      transform: rotate(180deg);
    }
  }
}
</style>
