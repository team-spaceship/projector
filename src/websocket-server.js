export default class WebsocketServer {
  /**
  * Create the order routes.
  */

  static create(io) {
    const sockets = [];
    io.sockets.on('connection', (socket) => {
      sockets.push(socket);
      
      socket.on('setActiveApp', (data) => {
        io.sockets.emit('renderApp', { app: data.app });
      });
    });
  }  
}
