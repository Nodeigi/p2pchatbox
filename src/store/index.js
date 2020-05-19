import Vue from "vue";
import Vuex from "vuex";
import peer from '../services/peer'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    chats: [],
    myId: ''
  },
  mutations: {
    startChat: (state, { peerId }) => {
      const chat = state.chats.find(c => c.peerId === peerId)
      if (!chat) {
        state.chats.push({
          peerId,
          connected: false,
          messages: []
        })
      }
    },
    closeChat: (state, { peerId }) => {
      const idx = state.chats.findIndex(c => c.peerId === peerId)
      if (idx >= 0) state.chats.splice(idx, 1)
    },
    registerMessage: (state, { peerId, ...message }) => {
      const chat = state.chats.find(c => c.peerId === peerId)
      if (chat) {
        chat.messages.push(message)
      }
    },
    setPeerId: (state, { id }) => {
      state.myId = id
    },
    connectionStatus: (state, { peerId, connected }) => {
      const chat = state.chats.find(c => c.peerId === peerId)
      if (chat) {
        chat.connected = connected
      }
    }
  },
  actions: {
    startChat: (ctx, { peerId }) => {
      ctx.commit('startChat', { peerId })
      peer.connect(peerId)
    },
    closeChat: (ctx, { peerId }) => {
      ctx.commit('closeChat', { peerId })
      peer.disconnect(peerId)
    },
    postMessage: (ctx, { peerId, text }) => {
      const time = new Date().valueOf()
      ctx.commit('registerMessage', {
        text,
        time,
        user: 'me',
        peerId
      })
      peer.send(peerId, { text, time })
    },
    peerServerConnected: (ctx, { id }) => {
      ctx.commit('setPeerId', { id })
    },
    incomingChat: (ctx, { peerId }) => {
      ctx.commit('startChat', { peerId })
      ctx.commit('connectionStatus', { peerId, connected: true })
    },
    connectionStatus: (ctx, { peerId, connected }) => {
      ctx.commit('connectionStatus', { peerId, connected })
    },
    incomingMessage: (ctx, { peerId, message }) => {
      ctx.commit('registerMessage', { peerId, user: 'peer', ...message })
    }
  },
  modules: {}
});

window.store = store

export default store
