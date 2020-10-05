<template>
  <span class="tech">
    {{ skill }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Tech extends Vue {
  @Prop({ required: true })
  skill!: string;
}
</script>

<style lang="scss" scoped>
  .tech {
    display: inline-block;
    text-align: center;
    line-height: 10em;
    width: 10em;
    height: 10em;
    background: var(--sub);
    color: #fff;
    border-radius: 50%;
    font-size: 1em;
  }
</style>
