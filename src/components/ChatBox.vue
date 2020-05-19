<template>
  <div :class="bem()">
    <div :class="bem('title-bar')">
      <div :class="bem('status', { connected })"/>
      <h3 :class="bem('title')">ChatBox {{ chat.peerId }}</h3>
      <div :class="bem('close')" @click="close"/>
    </div>
    <div :class="bem('messages')" ref="messagesRef">
      <ChatMessage
        v-for="message in messages"
        v-bind:key="JSON.stringify(message)"
        v-bind:message="message"
      />
    </div>
    <ChatInput v-bind:peerId="chat.peerId" />
  </div>
</template>

<script>
  import ChatMessage from './ChatMessage'
  import ChatInput from './ChatInput'
  import { mapActions } from 'vuex'

  export default {
    name: "ChatBox",
    props: {
      chat: Object
    },
    computed: {
      messages() { return [...this.chat.messages] },
      connected() { return this.chat.connected }
    },
    components: {
      ChatInput,
      ChatMessage
    },
    methods: {
      close() {
        this.closeChat({ peerId: this.chat.peerId })
      },
      ...mapActions(['closeChat'])
    },
    watch: {
      messages: {
        handler(newMessages, oldMessages) {
          if (newMessages.length > oldMessages.length) {
            const ref = this.$refs.messagesRef

            if (ref.scrollTop >= ref.scrollHeight - ref.clientHeight) {
              this.$nextTick(() => {
                ref.scrollTop = ref.scrollHeight - ref.clientHeight
              })
            }
          }
        },
        deep: true
      }
    }
  };
</script>

<style scoped lang="scss">
  .chat-box {
    display: inline-block;
    margin-right: 1rem;
    border-right: 1px solid black;
    width: 400px;

    &__title-bar {
      display: flex;
      align-items: center;
    }

    &__status {
      width: 3rem;
      height: 2rem;
      position: relative;
      &:before {
        content: "";
        border: 1px solid #2c3e50;
        border-radius: 5px;
        width: 10px;
        height: 10px;
        position: absolute;
        left: calc(50% - 5px);
        top: calc(50% - 5px);
      }
      &--connected:before {
        background-color: #42b983;
      }
    }

    &__title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
    }

    &__close {
      width: 3rem;
      height: 2rem;
      position: relative;
      cursor: pointer;
      &:before, &:after {
        content: "";
        display: block;
        position: absolute;
        right: 10px;
        top: 50%;
        width: 15px;
        border-top: 2px solid #2c3e50;
        transform-origin: center center;
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
      &:hover {
        background: #cccccc;
      }
    }

    &__messages {
      height: 50vh;
      overflow-y: auto;
      padding: 1rem;
    }
  }
</style>
