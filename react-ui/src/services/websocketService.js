import socket from 'socket.io-client';

export default class WebsocketService {
  constructor(isProjectorView) {
    if (isProjectorView) {
      this.socket = socket(process.env.REACT_APP_PROJECTOR_WEBSOCKET_SERVER, { query: 'projector=true' });
      // If process.env.REACT_APP_PROJECTOR_WEBSOCKET_SERVER doesn't work use: http://localhost:3004 but don't commit this.
    } else {
      this.socket = socket(process.env.REACT_APP_PROJECTOR_WEBSOCKET_SERVER);
      // If process.env.REACT_APP_PROJECTOR_WEBSOCKET_SERVER doesn't work use: http://localhost:3004 but don't commit this.
    }
  }

  setActiveApp(name) {
    this.socket.emit('setActiveApp', { app: name });
  }

  projectorViewInit(callback, scope) {
    this.socket.on('renderApp', (data) => {
      callback('render', data, scope);
    });

    this.socket.on('commandProjector', (command) => {
      callback('action', command, scope);
    });
  }

  commandProjector(input) {
    this.socket.emit('projectorCommand', { key: input });
  }
}
