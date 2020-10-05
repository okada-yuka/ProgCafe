<template>
  <div class="chat-list-header">
    <h4>
      Chat
    </h4>
  </div>
</template>

<style lang="scss" scoped>
.chat-list-header {
  display: grid;
  background: var(--main);
  height: 2.5em;
  padding: 0.2em 0.5em;

  font-size: 1.25em;
  font-weight: bold;
  border-radius: 10px 10px 0px 0px;

  h4 {
    margin: 0;
    margin-left: 0.75em;
    height: 100%;
    display: inline-flex;
    align-items: center;

    cursor: default;
    user-select: none;
  }
}
</style>
