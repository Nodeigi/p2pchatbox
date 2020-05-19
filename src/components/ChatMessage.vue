<template>
  <div :class="bem({ me })">
    <div :class="bem('time')" v-bind:title="fullTime">{{ formattedTime }}</div>
    <div :class="bem('text')">{{ message.text }}</div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "ChatMessage",
    data() {
      return {
        formattedTime: moment(this.message.time).fromNow()
      }
    },
    computed: {
      me() { return this.message.user === 'me' },
      fullTime() { return moment(this.message.time).format('H:mm:ss') }
     },
    props: {
      message: Object
    },
    created() {
      setInterval(() => {
        this.formattedTime = moment(this.message.time).fromNow()
      }, 15000)
    }
  };
</script>

<style scoped lang="scss">
  .chat-message {
    $self: &;

    text-align: left;
    &--me {
      text-align: right;
    }

    &__time {
      font-size: 0.75rem;
      color: #888;
    }

    &__text {
      --color: #42b983;
      display: inline-block;
      max-width: 60%;
      background: var(--color);
      padding: 1rem 2rem;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0px;
        right: -20px;
        border-left: 20px solid var(--color);
        border-bottom: 10px solid transparent;
      }

      #{$self}--me & {
        margin-left: auto;
        --color: #2c3e50;
        color: #fff;
        &:before {
          right: auto;
          left: -20px;
          border-left: none;
          border-right: 20px solid var(--color);
        }
      }
    }

  }
</style>
