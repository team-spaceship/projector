import socket from 'socket.io-client';

export default class WebsocketService {
  constructor() {
    this.socket = socket(process.env.REACT_APP_PROJECTOR_WEBSOCKET_SERVER);
  }

  setActiveApp(name) {
    this.socket.emit('setActiveApp', { app: name });
  }
}
