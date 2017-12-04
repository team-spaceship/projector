import render from 'react-node-render';

const appController = class AppController {
  /**
  * Returns all apps
  *
  * @param req
  * @param res
  * @param next
  */
  renderSelectedApp(req, res) {
    // Search for apps with the corresponding name.
    if (req.query.name) {
      const html = render('../../apps/' + req.query.name);
      console.log(html);
      res.json({ html });
    } else {
      res.status(403).send({ messsage: "App not found." });
    }
  }
};

export default new appController();
