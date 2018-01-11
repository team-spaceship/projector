import path from "path";
import fs from "fs";

const appProviderService = class AppProviderService {
  chooseApp(req, res) {
    try {
      // render jsx file to string.
      // serve string.
      const name = req.params.app;
  
      // @TODO: check if app is really the app for security (no ../ etc)
      const html = fs.readFileSync(path.join(__dirname, `../../react-ui/src/apps/${name}/index.html`), "utf8");

      res.json({
        succcess: true,
        html: html,
      });
    } catch (e) {
      console.log(e);
    }
  }
};

export default new appProviderService();
