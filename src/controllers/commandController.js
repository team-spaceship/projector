const commandController = class CommandController {
/**
 * Get app settings based on app name
 * 
 * @param req
 * @param res
 * 
 */
  nextApp(req, res) {
    console.log('next app');
    res.json({ succes: true });
  }
};

export default new commandController();
