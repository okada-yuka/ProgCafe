<template>
  <div class="user">
    <UserStatus :name="name" :rank="rank"/>
    <div class="buttons">
      <FollowButton :id="name" :following="following" />
      <InviteButton v-if="online" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserStatus from '@/components/global/UserStatus.vue';
import FollowButton from '@/components/searchResults/user/FollowButton.vue';
import InviteButton from '@/components/searchResults/user/InviteButton.vue';

@Component({
  components: {
    UserStatus,
    FollowButton,
    InviteButton,
  },
})

export default class User extends Vue {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  following!: string;

  @Prop({ required: true })
  online!: boolean;

  @Prop({ required: true })
  rank!: string;
}
</script>
<style scoped lang="scss">
.user {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  padding: 2em 10vw;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;

    div {
      margin: 1em 0.5em 0 0.5em;
    }
  }
}
</style>
