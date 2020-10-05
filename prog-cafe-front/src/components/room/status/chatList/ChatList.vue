<template>
  <div class="chat-list">
    <transition name="chat">
      <Chat
        v-if="currentId !== ''"
        :id="currentId"
        @close="close"
      />
    </transition>
    <div class="chat-list-container">
      <ChatListHeader />
      <ul>
        <GroupChatButton
          :id="groupId"
          :member="users.length"
          @open="open(groupId)"
        />
        <template v-for="userId in users">
          <UserChatButton
            v-if="userId !== selfId"
            :key="userId"
            :id="userId"
            @open="open(userId)"
          />
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chat from '@/components/room/status/chatList/chat/Chat.vue';
import ChatListHeader from '@/components/room/status/chatList/ChatListHeader.vue';
import GroupChatButton from '@/components/room/status/chatList/GroupChatButton.vue';
import UserChatButton from '@/components/room/status/chatList/UserChatButton.vue';
import { store } from '@/utils/store';
import { getGroupChatId } from '@/utils/utils';

@Component({
  components: {
    Chat,
    ChatListHeader,
    GroupChatButton,
    UserChatButton,
  },
})
export default class ChatList extends Vue {
  currentId = ''

  get groupId() {
    return getGroupChatId(store.roomId ?? '');
  }

  get users() {
    return store.users;
  }

  get selfId() {
    return store.githubId;
  }

  open(id: string): void {
    this.currentId = id;
  }

  close(): void {
    this.currentId = '';
  }
}
</script>

<style lang="scss" scoped>
.chat-list {
  padding: 1em;
  position: relative;
  max-height: 100%;

  .chat-list-container {
    height: 100%;
    background: var(--background-darken);
    border-radius: 10px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      overflow-y: auto;
      height: calc(100% - 3em);
    }
  }

  .chat-enter-active, .chat-leave-active {
    transition: all 0.2s;
  }
  .chat-enter {
    opacity: 0;
  }
  .chat-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
}
</style>
