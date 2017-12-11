import appService from '../services/appService';

const appController = class AppController {
  /**
  * Returns all apps
  *
  * @param req
  * @param res
  * @param next
  */
  renderSelectedApp(req, res) {
    // Search for app with the corresponding name and render content.
    if (req.params.name) {
      appService.renderApp(req, res); 
    } else {
      res.status(403).send({ messsage: "App not found." });
    }
  }
};

export default new appController();
