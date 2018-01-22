import userService from "../services/userService";

const commandController = class CommandController {
/**
 * Get app settings based on app name
 * 
 * @param req
 * @param res
 * 
 */

  async nextApp(req, res, io) {
    const user = await userService.getLumosUser();

    console.log("Next app controller has user:", (user && user.user_id));

    // Trigger the rendering of the next app.
    io.sockets.emit('commandProjector', { key: 'nextApp', user_id: (user && user.user_id) });
    res.json({ succes: true });
  }
};

export default new commandController();
