<template>
  <div class="user-profile">
    <User :following="getFollowing" :name="targetId" />
    <div class="github-info">
      <GitHubSHIBA :githubId="targetId" />
      <Techs :skills="getSkills" />
      <Follower :name="getFollowingList" :followingList="getFollowingList" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import User from '@/components/searchResults/user/User.vue';
import GitHubSHIBA from '@/components/userProfile/GitHubSHIBA.vue';
import Techs from '@/components/userProfile/techs/Techs.vue';
import Follower from '@/components/userProfile/Follower.vue';
import { getUserInfo } from '@/utils/http';
import { store } from '@/utils/store';

@Component({
  components: {
    User,
    GitHubSHIBA,
    Techs,
    Follower,
  },
})
export default class UserProfile extends Vue {
  following = false;
  skills = [] as string[];
  followingList = [] as string[];

  get targetId() {
    return this.$route.params.userId;
  }
  get selfId() {
    return store.githubId ?? '';
  }
  get getFollowing() {
    return this.following;
  }
  get getSkills() {
    return this.skills;
  }
  get getFollowingList() {
    return this.followingList;
  }

  @Watch('targetId', { immediate: true })
  getUserInfo() {
    getUserInfo(this.selfId, this.targetId, true).then((res) => {
      this.following = res.following;
      this.skills = res.skills;
      this.followingList = res.following_list ?? [];
    }).catch((err) => {
      console.error(err);
    });
  }
}
</script>

<style lang="scss" scoped>
  .user-profile {
    width: 90vw;
    background: var(--background);
    padding: 3em;
    margin: 3em auto;
    box-shadow: 0px 0px 10px 0 var(--shadow);
  }
</style>
