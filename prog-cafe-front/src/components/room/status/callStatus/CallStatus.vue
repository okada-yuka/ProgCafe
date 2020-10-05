<template>
  <div class="call-status">
    <UserIcon :name="targetUser" />
    <div class="buttons calling" v-if="calling">
      <button class="red left">
        <img src="@/assets/hungup.png" alt="end tel" @click="hangup">
      </button>
      <button class="brown right">
        <img src="@/assets/mute.png" alt="mute" @click="mute">
      </button>
    </div>
    <div class="buttons not-calling" v-else>
      <button class="red left">
        <img src="@/assets/no.png" alt="deny" @click="deny">
      </button>
      <button class="green right">
        <img src="@/assets/yes.png" alt="accept" @click="accept">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import UserIcon from '@/components/global/UserIcon.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    UserIcon,
  },
})
export default class CallStatus extends Vue {
  @Ref() audioElement!: HTMLAudioElement
  muted = false

  get targetUser() {
    return store.callTarget || '';
  }

  get calling() {
    return store.callStatus !== 'none';
  }

  mute() {
    if (!store.callConn?.stream) return;
    this.muted = !this.muted;
    store.callConn.stream.getAudioTracks().forEach((track) => {
      // eslint-disable-next-line no-param-reassign
      track.enabled = !this.muted;
    });
  }

  hangup() {
    store.callEnd();
  }

  deny() {
    store.callDeny();
  }

  accept() {
    store.callStart();
  }
}
</script>

<style lang="scss" scoped>
.call-status {
  position: relative;
  padding: 1em;
  padding-bottom: 0;

  .user-icon {
    position: absolute;
    top: 55%;
    left: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
  }

  .buttons {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    height: 100%;
    max-width: 100%;

    button {
      display: block;
      height: 100%;
      border: 0;
      outline: none;
      cursor: pointer;

      img {
        height: 20%;
      }

      &.red {
        background: #dc9292;
      }
      &.brown {
        background: var(--main);
      }
      &.green {
        background: #8ebf96;
      }
      &.left {
        border-radius: 10px 0 0 10px;
      }
      &.right {
        border-radius: 0 10px 10px 0;
      }
    }
  }
}
</style>
