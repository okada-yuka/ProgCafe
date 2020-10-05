<template>
  <div class="container">
    <Logo />
    <SignInButton />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '@/components/signIn/Logo.vue';
import SignInButton from '@/components/signIn/SignInButton.vue';

@Component({
  components: {
    SignInButton,
    Logo,
  },
})
export default class SignIn extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background);
}
</style>
