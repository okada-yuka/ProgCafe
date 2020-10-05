<template>
  <div class="follow">
    <button @click="follow" class="not-following" v-if="!computedFollowing">
      <img src="@/assets/follow.png">
      <span>Follow</span>
    </button>
    <button @click="follow" class="following" v-else>
      <img src="@/assets/following.png">
      <span>Following</span>
    </button>
  </div>
</template>

<script lang="ts">
import { follow } from '@/utils/http';
import { store } from '@/utils/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FollowButton extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) following!: boolean
  changedFollowing: boolean | null = null

  get computedFollowing() {
    return (this.changedFollowing == null)
      ? this.following
      : this.changedFollowing;
  }

  follow() {
    if (!store.githubId) return;
    follow(store.githubId, this.id, !this.computedFollowing).then(() => {
      if (!store.searchResults) return;
      this.changedFollowing = !this.computedFollowing;
    });
  }
}
</script>

<style lang="scss" scoped>
.follow {
  button {
    display: flex;
    align-items: center;
    border-radius: 15px;
    padding: 0.5em 1.2em;
    width: 300px;
    height: 55px;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      margin-left: 1em;
      font: bold 25px 'Ubuntu';
    }
  }

  .not-following {
    background-color: var(--background);
    color: var(--font);
    border: 4px solid var(--font);
    padding: 0.5em 1.2em;
  }

  .following {
    background-color: var(--font);
    color: var(--background);
    border: 6px solid var(--font);
  }
}
</style>
