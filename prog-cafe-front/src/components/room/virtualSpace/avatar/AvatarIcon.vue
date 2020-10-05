<template>
  <div class="avatar-icon">
    <!-- avatar-body -->
    <img class="avatar-body" v-if="tablePosition === 0" src="@/assets/p1.png"/>
    <img class="avatar-body" v-else-if="tablePosition === 1" src="@/assets/p2.png"/>
    <img class="avatar-body" v-else-if="tablePosition === 2" src="@/assets/p3.png"/>
    <img class="avatar-body" v-else-if="tablePosition === 3" src="@/assets/p4.png"/>
    <img class="avatar-body" v-else-if="tablePosition === 4" src="@/assets/p5.png"/>
    <img class="avatar-body" v-else-if="tablePosition === 5" src="@/assets/p6.png"/>
    <img class="avatar-body" v-else-if="tablePosition === 6" src="@/assets/p7.png"/>
    <img class="avatar-body" v-else-if="tablePosition === 7" src="@/assets/p8.png"/>
    <!-- avatar-icon -->
    <div @click="showProfile">
      <UserIcon :name="userId" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserIcon from '@/components/global/UserIcon.vue';

@Component({
  components: {
    UserIcon,
  },
})
export default class AvatarIcon extends Vue {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  tablePosition!: number;

  showProfile() {
    this.$router.push({ name: 'User', params: { userId: this.userId } });
  }
}
</script>

<style lang="scss" scoped>
.avatar-icon {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  .avatar-body {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .user-icon {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    height: 150px;
  }
  div {
    cursor: pointer;
  }
}
</style>
