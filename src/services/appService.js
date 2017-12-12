import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import render from 'react-node-render';

const appService = class AppService {
  async renderApp(req, res) {
    const locationJSXFile = path.join(__dirname, `../../apps/${req.params.name}/index.jsx`);
   
    // Check if the file exists.
    if (fs.existsSync(locationJSXFile)) {
      const html = await render(locationJSXFile);
      console.log(html);
      // const comp = require(`${locationJSXFile}`);
      // const component = ReactDOM.createFactory(comp);

      // return res.json({ message: "Successfully rendered component.", component: ReactDOM.renderToString(Component()) });
    } else {
      return res.json({ status: 403, message: 'App not found' });
    }
  }
};

export default new appService();
