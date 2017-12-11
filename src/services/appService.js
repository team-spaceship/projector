import fs from 'fs';
import path from 'path';

const appService = class AppService {
  renderApp(req, res) {
    const location = path.join(__dirname, `../../apps/${req.params.name}`);
    if (fs.existsSync(location)) {
      // Do something
      console.log('Directory exists');
      return res.render(`${req.params.name}/index`, {});
    } else {
      return res.json({ status: 403, message: 'App not found' });
    }
  }
};

export default new appService();
