<template>
  <li class="group-chat-button">
    <button @click="$emit('open')">
      <img src="../../../../assets/groupicon.png" alt="Group">
      <h4>Group chat({{ member }})</h4>
    </button>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GroupChatButton extends Vue {
  @Prop({ required: true, type: Number }) member!: number
}
</script>

<style lang="scss" scoped>
.group-chat-button {
  height: 80px;
  border-bottom: 1px solid var(--border);
  display: block;

  button {
    display: grid;
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    margin: 0;
    padding: 0 15px;
    background: transparent;
    text-align: start;

    font-family: Ubuntu, sans-serif;

    grid-template-columns: 80px 1fr;

    cursor: pointer;

    img {
      margin: 15px;
      height: 50px;
    }

    h4 {
      font-size: 1.5em;
      color: var(--font);
      margin-top: 1em;
    }
  }
}
</style>
