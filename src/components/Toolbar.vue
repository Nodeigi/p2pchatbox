<template>
  <div :class="bem()">
    <div :class="bem('status')">My id: {{ myId || '---' }}</div>
    <div :class="bem('new-chat')">
      <button @click="toggle" :class="bem('new-chat-start')">Start new chat</button>
      <input v-model="peerId" :class="bem('new-chat-input')" v-if="visible"/>
      <button @click="submit"  :class="bem('new-chat-submit')" v-if="visible">Go!</button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import store from '../store'

  export default {
    name: "Toolbar",
    data: () => ({
      peerId: "",
      visible: false
    }),
    computed: {
      myId() { return store.state.myId }
    },
    methods: {
      toggle: function() { this.visible = !this.visible },
      submit: function() {
        this.startChat({ peerId: this.peerId })
        this.peerId = ''
        this.visible = false
      },
      ...mapActions(['startChat'])
    },
    store
  };
</script>

<style scoped lang="scss">
  .toolbar {
    text-align: left;
    &__status {
      margin-bottom: 1rem;
    }
    &__new-chat {
      display: flex;
      &-start {
        background: #42b983;
        border: none;
        padding: 1rem;
      }
      &-input {
        border: none;
        border-top: 1px solid #2c3e50;
        border-bottom: 1px solid #2c3e50;
      }
      &-submit {
        background: #2c3e50;
        border: none;
        color: #fff;
        padding: 1rem;
      }
    }
  }
</style>
