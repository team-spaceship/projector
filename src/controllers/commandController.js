const commandController = class CommandController {
/**
 * Get app settings based on app name
 * 
 * @param req
 * @param res
 * 
 */

  nextApp(req, res, io) {
    console.log('next app');
    // Trigger the rendering of the next app.
    io.sockets.emit('commandProjector', { key: 'nextApp' });
    res.json({ succes: true });
  }
};

export default new commandController();
