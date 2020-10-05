<template>
  <div class="content">
    <MessageList :id="id" />
    <Form :id="id" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MessageList from '@/components/room/status/chatList/chat/content/messageList/MessageList.vue';
import Form from '@/components/room/status/chatList/chat/content/form/Form.vue';

@Component({
  components: {
    MessageList,
    Form,
  },
})
export default class Content extends Vue {
  @Prop({ required: true }) id!: string;
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  height: calc(100% - 3em);
  width: 100%;
  padding: 1em;

  grid-template-rows: minmax(0, 1fr) 3em;
  grid-template-columns: minmax(0, 1fr);
}
</style>
