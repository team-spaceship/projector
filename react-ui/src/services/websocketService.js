import socket from 'socket.io-client';

export default class WebsocketService {
  constructor(isProjectorView) {
    if (isProjectorView) {
      this.socket = socket(process.env.REACT_APP_PROJECTOR_WEBSOCKET_SERVER, { query: 'projector=true' });
    } else {
      this.socket = socket(process.env.REACT_APP_PROJECTOR_WEBSOCKET_SERVER);
    }
  }

  setActiveApp(name) {
    this.socket.emit('setActiveApp', { app: name });
  }

  projectorViewInit(callback, scope) {
    this.socket.on('renderApp', (data) => {
      callback(data, scope);
    });
  }
}
