<template>
  <div class="invite-button">
    <button>
      <img src="@/assets/invite.png">
      <span>Invite the room</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class InviteButton extends Vue {
}
</script>

<style scoped>
button{
  display: flex;
  background-color: var(--background);
  color: var(--background);
  border: 4px solid var(--font);
  border-radius: 15px;
  padding: 0.5em 1.2em;
  align-items: center;
  width: 300px;
  height: 55px;
}
button span{
  color: var(--font);
  margin-left: 1em;
  font: bold 25px 'Ubuntu';
}
button img{
  width: 40px;
  height: 40px;
}
</style>
