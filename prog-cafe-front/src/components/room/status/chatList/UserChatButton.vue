<template>
  <li class="user-chat-button">
    <button @click="$emit('open')">
      <UserIcon :name="id" />
      <UserName :name="id" />
    </button>
  </li>
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
export default class UserChatButton extends Vue {
  @Prop({ required: true }) id!: string;
}
</script>

<style lang="scss" scoped>
.user-chat-button {
  height: 80px;
  display: block;

  button {
    display: grid;
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    margin: 0;
    padding: 0 15px;
    background: transparent;
    text-align: start;

    font-family: Ubuntu, sans-serif;

    grid-template-columns: 80px 1fr;

    cursor: pointer;

    img {
      margin: 15px;
      height: 50px;
    }

    h4 {
      font-size: 1.5em;
      color: var(--font);
      margin-top: 1em;
    }
  }

  & + .user-chat-button {
    border-top: 1px solid var(--border);
  }
}
</style>
