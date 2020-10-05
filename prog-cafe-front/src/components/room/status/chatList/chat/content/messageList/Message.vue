<template>
  <div class="message" :style="additionalStyle">
    <UserIcon :name="message.from" v-if="!isSelfMessage" />
    <UserName :name="message.from" v-if="!isSelfMessage" />
    <p :style="additionalStyleForMessage">{{ message.message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserIcon from '@/components/global/UserIcon.vue';
import UserName from '@/components/global/UserName.vue';
import { store } from '@/utils/store';
import { theme } from '@/utils/constants';

@Component({
  components: {
    UserIcon,
    UserName,
  },
})
export default class Message extends Vue {
  @Prop({ required: true }) message!: ChatMessage;

  get isSelfMessage() {
    return store.githubId === this.message.from;
  }

  get additionalStyle() {
    return !this.isSelfMessage
      ? undefined
      : {
        gridTemplateColumns: 'minmax(0, 1fr)',
        gridTemplateAreas: `
          'message'
        `,
        justifyItems: 'end',
      };
  }

  get additionalStyleForMessage() {
    return !this.isSelfMessage
      ? undefined
      : {
        backgroundColor: theme.main,
        borderRadius: '0.5em 0 0.5em 0.5em',
      };
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: grid;
  margin-bottom: 1em;

  grid-template-columns: 3em minmax(0, 1fr);
  grid-template-areas:
    'icon name'
    'icon message';
  justify-items: start;

  .user-icon {
    grid-area: icon;
    height: 2.5em;
  }
  .user-name {
    grid-area: name;
    margin: 0;
  }
  p {
    grid-area: message;
    margin: 0;
    background: var(--sub);
    padding: 0.5em;
    border-radius: 0 0.5em 0.5em 0.5em;
  }
}
</style>
