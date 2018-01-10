export default class WebsocketServer {
  static create(io) {
    io.sockets.on('connection', (socket) => {
      console.log('Connection!: ', socket.id); 
      // Listen for active app events.
      socket.on('setActiveApp', (data) => {
        io.sockets.emit('renderApp', { app: data.app });
      });

      // Listen for control events.
      socket.on('projectorCommand', (input) => {
        io.sockets.emit('commandProjector', input);
      });
    });
  }  
}
