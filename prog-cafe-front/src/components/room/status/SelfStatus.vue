<template>
  <div class="self-status">
    <div class="status-change-buttons">
      <button
        :class="{ active: working }"
        @click="setStatus('Working')"
      >
        <img src="@/assets/working.png" alt="working">
        <p v-if="working">{{ getActiveTime }}</p>
      </button>
      <button
        :class="{ active: !working }"
        @click="setStatus('Breaking')"
      >
        <img src="@/assets/break.png" alt="break">
        <p v-if="!working">{{ remainingTime }}</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '@/utils/store';
import { Component, Vue } from 'vue-property-decorator';
import { zeroPadding } from '@/utils/utils';

@Component
export default class SelfStatus extends Vue {
  limitTime = 300;
  count = this.limitTime;
  timer!: number;
  clock!: number;

  get working() {
    return store.status === 'Working';
  }

  get getActiveTime() {
    const hour = zeroPadding(Math.floor(store.activeTime / 3600), 2);
    const min = zeroPadding(Math.floor((store.activeTime - (3600 * Number(hour))) / 60), 2);
    const second = zeroPadding(store.activeTime % 60, 2);
    return `${hour}:${min}:${second}`;
  }

  get remainingTime() {
    const min = zeroPadding(Math.floor(this.count / 60), 2);
    const second = zeroPadding(this.count % 60, 2);
    return `${min}:${second}`;
  }

  setStatus(status: Status) {
    const oldStatus = store.status; // ボタンを押される前の状態
    store.status = status;
    if (oldStatus === store.status) return;
    store.sendStatus(status);
    if (status === 'Breaking') {
      this.timer = setInterval(() => {
        this.count -= 1;
        if (this.count <= 0) this.setStatus('Working');
      }, 1000);
    } else {
      this.count = this.limitTime;
      clearInterval(this.timer);
    }
  }

  created() {
    if (store.stopping) {
      store.stopping = false;
      this.clock = setInterval(() => {
        if (store.status === 'Working') {
          store.activeTime += 1;
        }
      }, 1000);
    }
  }

  beforeDestroy() {
    clearInterval(this.clock);
    store.stopping = true;
  }
}
</script>

<style lang="scss" scoped>
.self-status {
  padding: 1em;
  padding-bottom: 0;

  .status-change-buttons {
    display: grid;
    height: 100%;
    width: 100%;
    border: 6px solid var(--main);
    border-radius: 10px;
    background: var(--main);

    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(0, 1fr);

    button {
      height: 100%;
      border: 0;
      outline: none;
      background: var(--main);
      padding: 1em;
      cursor: pointer;

      border-radius: 5px;

      &.active {
      background: var(--background);
        cursor: default;
      }

      transition: all 0.2s;

      img {
        height: 90%;
      }
      p {
        margin: 0;
        font-family: Ubuntu, sans-serif;
        color: var(--font);
      }
    }
  }
}
</style>
