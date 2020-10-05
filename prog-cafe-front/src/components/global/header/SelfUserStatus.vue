<template>
  <div @click="toSelfUserProfile" class="self-user-status">
    <img :src="icon" alt="self icon">
    <div>
      <h4>{{name}}</h4>
      <p>{{status}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '@/utils/store';
import { getAvatarIconUrl } from '@/utils/utils';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SelfUserStatus extends Vue {
  get name() {
    return store.githubId ?? 'ssssota';
  }
  get icon() {
    return getAvatarIconUrl(this.name);
  }
  get status() {
    return store.status;
  }

  get path() {
    return this.$route.params.userId ?? '';
  }

  toSelfUserProfile() {
    if (this.$route.params.userId !== this.name) this.$router.push({ name: 'User', params: { userId: this.name ?? '' } });
  }
}
</script>

<style lang="scss" scoped>
.self-user-status {
  height: 100%;
  display: flex;
  align-items: center;

  img {
    height: 60%;
    margin: 1em;
  }
  div {
    h4 {
      margin: 0.1em;
      font-size: 1.25em;
    }
    p {
      margin: 0;
    }
  }

  cursor: pointer;
}
</style>
