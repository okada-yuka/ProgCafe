<template>
  <div class="chat-header">
    <BackButton @click="$emit('back')" />
    <h4>{{ chatName }}</h4>
    <CallButton v-if="!isGroup" :id="id" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserName from '@/components/global/UserName.vue';
import BackButton from '@/components/room/status/chatList/chat/chatHeader/BackButton.vue';
import CallButton from '@/components/room/status/chatList/chat/chatHeader/CallButton.vue';
import { groupChatId } from '@/utils/constants';

@Component({
  components: {
    UserName,
    BackButton,
    CallButton,
  },
})
export default class ChatHeader extends Vue {
  @Prop({ required: true }) id!: string;

  get isGroup() {
    return this.id.startsWith(groupChatId);
  }
  get chatName() {
    return (this.isGroup)
      ? 'Group chat'
      : this.id;
  }
}
</script>

<style lang="scss" scoped>
.chat-header {
  display: grid;
  background: var(--main);
  height: 2.5em;
  padding: 0.2em 0.5em;

  font-size: 1.25em;
  font-weight: bold;
  border-radius: 10px 10px 0px 0px;

  grid-template-columns: 2em 1fr 2em;

  h4 {
    margin: 0;
    margin-left: 0.2em;
    height: 100%;
    display: inline-flex;
    align-items: center;

    cursor: default;
    user-select: none;
  }
}
</style>
