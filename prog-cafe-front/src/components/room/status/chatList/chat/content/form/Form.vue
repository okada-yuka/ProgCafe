<template>
  <form class="form" @submit="sendMessage">
    <input type="text" v-model="message" placeholder="Message">
    <button type="submit">
      <img src="@/assets/send.png" alt="Send button">
    </button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TextField from '@/components/room/status/chatList/chat/content/form/TextField.vue';
import SendButton from '@/components/room/status/chatList/chat/content/form/SendButton.vue';
import { store } from '@/utils/store';

@Component({
  components: {
    TextField,
    SendButton,
  },
})
export default class Form extends Vue {
  @Prop({ required: true }) id!: string;
  message = ''

  sendMessage(e: Event) {
    e.preventDefault();
    if (this.message === '') return;
    store.sendMessage(this.id, this.message);
    this.message = '';
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  width: 100%;
  padding: 0.2em;

  grid-template-columns: minmax(0, 1fr) 3em;
  input {
    outline: none;
    background: none;
    font-size: 1.25em;
    padding: 0.2em 0.5em;
    color: var(--font);
    border: var(--font) 2px solid;
    border-radius: 0.75em;
    font-family: Ubuntu, 'Noto sans JP', sans-serif;

    &::placeholder {
      color: var(--main);
    }
  }
  button {
    border: 0;
    outline: none;
    background: transparent;
    padding: 0;
    height: 100%;

    img {
      height: 2em;
    }
  }
}
</style>
