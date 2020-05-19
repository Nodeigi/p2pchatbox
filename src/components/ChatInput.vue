<template>
  <div :class="bem()">
    <textarea :class="bem('field')" v-model="text"></textarea>
    <button :class="bem('button')" @click="submit">Go!</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "ChatInput",
    data() {
      return {
        text: ''
      }
    },
    props: {
      peerId: String
    },
    methods: {
      submit() {
        this.postMessage({ peerId: this.peerId, text: this.text })
        this.text = ''
      },
      ...mapActions([ 'postMessage' ])
    }
  };
</script>

<style scoped lang="scss">
  .chat-input {
    display: flex;
    &__field {
      width: calc(100% - 50px);
      resize: none;
      border: 1px solid #2c3e50;
    }
    &__button {
      width: 50px;
      background: #2c3e50;
      color: #fff;
      border: none;
    }
  }
</style>
