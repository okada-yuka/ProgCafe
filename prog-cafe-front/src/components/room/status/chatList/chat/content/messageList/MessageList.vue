<template>
  <div class="message-list" ref="listElement">
    <Message
      v-for="(msg, i) in history"
      :key="i"
      :message="msg"
    />
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Ref, Vue, Watch,
} from 'vue-property-decorator';
import Message from '@/components/room/status/chatList/chat/content/messageList/Message.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    Message,
  },
})
export default class MessageList extends Vue {
  @Prop({ required: true }) id!: string
  @Ref() listElement!: HTMLDivElement

  get history(): ChatHistory {
    return store.chatHistories[this.id] || [];
  }

  @Watch('history', { immediate: true })
  async scrollDown() {
    await this.$nextTick();
    this.listElement.scrollTop = this.listElement.scrollHeight;
  }
}
</script>

<style lang="scss" scoped>
.message-list {
  width: 100%;

  overflow-y: auto;
}
</style>
