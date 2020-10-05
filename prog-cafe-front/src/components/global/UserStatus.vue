<template>
  <div class="user-status" @click="toUserProfile(name)">
    <UserIcon :name="name" />
    <UserName :name="name" />
    <div class="user-rank">
      Rank {{rank}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserIcon from '@/components/global/UserIcon.vue';
import UserName from '@/components/global/UserName.vue';

@Component({
  components: {
    UserIcon,
    UserName,
  },
})
export default class UserStatus extends Vue {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  rank!: string;

  toUserProfile(name: string) {
    if (this.$route.name !== 'User') this.$router.push({ name: 'User', params: { userId: name } });
  }
}
</script>

<style lang="scss" scoped>
.user-status {
  display: grid;
  grid-template-columns: 10em minmax(0, 1fr);
  grid-template-areas:
    'icon name'
    'icon rank';
  cursor: pointer;

  .user-icon {
    height: 8em;
    width: 8em;

    grid-area: icon;
  }
  .user-name {
    margin: 0;
    margin-top: 0.5em;
    font-size: 2em;

    grid-area: name;
  }
  .user-rank {
    font-size: 1.25em;
    grid-area: rank;
  }
}
</style>
