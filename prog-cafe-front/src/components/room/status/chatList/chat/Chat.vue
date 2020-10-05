<template>
  <div class="chat">
    <div class="chat-container">
      <ChatHeader
        :id="id"
        @back="$emit('close')"
      />
      <Content :id="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChatHeader from '@/components/room/status/chatList/chat/chatHeader/ChatHeader.vue';
import Content from '@/components/room/status/chatList/chat/content/Content.vue';

@Component({
  components: {
    ChatHeader,
    Content,
  },
})
export default class Chat extends Vue {
  @Prop({ required: true }) id!: string;
}
</script>

<style lang="scss" scoped>
.chat {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 1em;

  .chat-container {
    width: 100%;
    height: 100%;
    background: var(--background-darken);
    border-radius: 10px;
  }
}
</style>
