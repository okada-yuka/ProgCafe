<template>
  <div class="avatar">
    <Fire :level="fireLevel" />
    <PC />
    <AvatarIcon
      :userId="userId"
      :tablePosition="tablePosition"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AvatarIcon from '@/components/room/virtualSpace/avatar/AvatarIcon.vue';
import Fire from '@/components/room/virtualSpace/avatar/Fire.vue';
import PC from '@/components/room/virtualSpace/avatar/PC.vue';
import StatusPopup from '@/components/room/virtualSpace/avatar/statusPopup/StatusPopup.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    AvatarIcon,
    Fire,
    PC,
    StatusPopup,
  },
})
export default class Avatar extends Vue {
  threshold = 10;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  tablePosition!: number;

  get fireLevel() {
    if (store.activeTime % this.threshold === 0 && this.userId === store.githubId) {
      store.sendProgress();
    }
    return store.progress[this.userId]
      ? Math.floor(store.progress[this.userId] / this.threshold)
      : 0;
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  width: 100%;
}
</style>
