<template>
  <div class="capture">
    <video
      ref="captureVideoElement"
      autoplay
      controls
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';

@Component
export default class Capture extends Vue {
  @Ref() captureVideoElement!: HTMLVideoElement

  mounted() {
    this.captureStart();
  }

  beforeDestroy() {
    this.captureEnd();
  }

  captureStart() {
    navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 360 },
    })
      .then((stream) => {
        this.captureVideoElement.srcObject = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  captureEnd() {
    if (this.captureVideoElement.srcObject instanceof MediaStream) {
      this.captureVideoElement.srcObject.getTracks().forEach((track) => track.stop());
    }
    this.captureVideoElement.srcObject = null;
  }
}
</script>

<style lang="scss" scoped>
.capture {
  width: 100%;
  height: 100%;

  padding: 1em;
  padding-bottom: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 10px;
  }
}
</style>
