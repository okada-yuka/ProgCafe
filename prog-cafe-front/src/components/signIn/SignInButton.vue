<template>
  <div class="signin">
    <button @click="signIn">
      <img src="https://github.githubassets.com/favicons/favicon-dark.png" />
      <span>Sign up with GitHub</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import { auth } from '@/utils/firebase';
import { store } from '@/utils/store';
import { signin } from '@/utils/http';

@Component
export default class SignInButton extends Vue {
  signIn() {
    store.loading = true;
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        const username = result?.additionalUserInfo?.username;
        if (username == null) throw new Error('Username is not defined');
        store.githubId = username; // update store.githubId
        return signin(username);
      })
      .then((res) => {
        store.enterRoom(res.id, res.users);
        this.$router.push({ name: 'Room', params: { roomId: res.id } }); // ルームへ飛びます（ルームIDは適当）
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        store.loading = false;
      });
  }
}
</script>

<style scoped>
.signin {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
button {
  display: flex;
  background-color: black;
  color: white;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  padding: 0.5em 1.2em;
  align-items: center;
}
button span {
  margin-left: 1em;
}
button img {
  height: 1.5em;
}
</style>
