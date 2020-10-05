<template>
  <div v-if="shibaUrl" class="shiba">
    <h4>Contribution</h4>
    <div class="shiba-img">
      <img :src="shibaUrl" alt="Not Found" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getShibaImageUrl } from '@/utils/utils';

@Component
export default class GitHubSHIBA extends Vue {
  // eslint-disable-next-line
  get shibaUrl() {
    if (this.githubId != null) return getShibaImageUrl(this.githubId);
    return null;
  }

  @Prop({ required: true })
  githubId!: string;
}
</script>

<style lang="scss" scoped>
  .shiba {
    h4 {
      font-size: 1.5em;
      font-weight: bold;
      text-decoration: underline;
    }
    .shiba-img {
      text-align: center;
    }
    img {
      max-width: 100%;
      padding: 10px;
      background: #fff;
      border: 2px solid #dcdcdc;
    }

  }
</style>
