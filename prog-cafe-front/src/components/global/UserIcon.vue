<template>
  <img :src="icon" alt="user icon" class="user-icon">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getAvatarIconUrl } from '@/utils/utils';

@Component
export default class UserIcon extends Vue {
  @Prop({ required: true })
  name!: string;

  get icon() {
    return getAvatarIconUrl(this.name);
  }
}
</script>

<style lang="scss" scoped>
.user-icon {
  display: block;
  border-radius: 50%;
  background: var(--background);
}
</style>
