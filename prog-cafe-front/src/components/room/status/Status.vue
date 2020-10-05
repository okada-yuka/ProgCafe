<template>
  <div class="status">
    <CallStatus v-if="calling" />
    <Capture v-else />
    <SelfStatus />
    <ExitButton />
    <ChatList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Capture from '@/components/room/status/Capture.vue';
import CallStatus from '@/components/room/status/callStatus/CallStatus.vue';
import SelfStatus from '@/components/room/status/SelfStatus.vue';
import ExitButton from '@/components/room/status/ExitButton.vue';
import ChatList from '@/components/room/status/chatList/ChatList.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    Capture,
    CallStatus,
    SelfStatus,
    ExitButton,
    ChatList,
  },
})
export default class Status extends Vue {
  get calling() {
    return !!store.callId;
  }
}
</script>

<style lang="scss" scoped>
.status {
  display: grid;

  grid-template-rows: 12em 6em 6em minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);

  max-height: 90vh;
}
</style>
