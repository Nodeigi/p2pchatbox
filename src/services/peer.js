import Peer from 'peerjs'
import store from '../store'

export default new class PeerService {

  constructor () {
    this.connections = {}
  }

  init () {
    this.me = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/peerjs'
    })
    this.me.on('open', () => {
      store.dispatch('peerServerConnected', { id: this.me.id })
    })
    this.me.on('connection', (connection) => {
      store.dispatch('incomingChat', { peerId: connection.peer })
      this.bindConnection(connection)
    })
  }

  bindConnection (connection) {
    const peerId = connection.peer
    this.connections[peerId] = connection

    connection.on('close', () => {
      store.dispatch('connectionStatus', { peerId, connected: false })
    })
    connection.on('data', (data) => {
      if (data.type === 'chatMessage') {
        store.dispatch('incomingMessage', { peerId, message: data.payload.message })
      }
    })
  }

  connect(peerId) {
    const connection = this.me.connect(peerId)
    this.bindConnection(connection)

    connection.on('open', () => {
      store.dispatch('connectionStatus', { peerId, connected: true })
    })
  }

  disconnect(peerId) {
    this.connections[peerId].close()
    delete this.connections[peerId]
  }

  send(peerId, message) {
    this.connections[peerId].send({
      type: 'chatMessage',
      payload: { message }
    })
  }
}
