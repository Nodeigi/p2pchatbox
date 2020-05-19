<template>
  <div id="app">
    <Toolbar />
    <ChatBox
      v-for="chat in chats"
      v-bind:key="chat.peerId"
      v-bind:chat="chat"
    />
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import ChatBox from "./components/ChatBox.vue";
import store from './store'
import peer from './services/peer'

export default {
  name: "App",
  computed: {
    chats() { return store.state.chats }
  },
  store,
  components: {
    Toolbar,
    ChatBox
  },
  created () {
    peer.init()
  }
};
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 30px;
  }
</style>
