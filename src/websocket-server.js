export default class WebsocketServer {
  /**
  * Create the order routes.
  */
  static create(io) {
    io.sockets.on('connection', (socket) => {
      console.log('Connection! Socket ID: ' + socket.id);
      
      socket.on('setActiveApp', (data) => {
        console.log("Setting active app to: " + data.app);
      });
    });
  }  
}
