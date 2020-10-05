<template>
  <h4 class="user-name">
    {{ name }}
  </h4>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UserName extends Vue {
  @Prop({ required: true })
  name!: string;
}
</script>
