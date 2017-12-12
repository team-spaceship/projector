export default class WebsocketServer {
  /**
  * Create the order routes.
  */

  static create(io) {
    const sockets = [];
    io.sockets.on('connection', (socket) => {
      console.log('Connection! Socket ID: ' + socket.id);
      sockets.push(socket);
      
      socket.on('setActiveApp', (data) => {
        console.log("Setting active app to: " + data.app);
      
        // // Trigger renderApp event.
        // for (let i = 0; i < sockets.length; i += 1) {
        //   sockets[i].emit('renderApp', { app: data.app });
        // }

        io.sockets.emit('renderApp', { app: data.app });
      });
    });
  }  
}
