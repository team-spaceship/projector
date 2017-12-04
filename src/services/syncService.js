import * as fs from 'fs';
import request from 'request';
import AdmZip from 'adm-zip';
import App from '../schemas/App';

const syncService = class SyncService {
  /**
  * Returns all orders
  *
  * @returns [{orders}]
  */
  async sync() {
    const apps = [];
    const local_apps = await this.getLocalApps();
    const server_apps = await this.getAppsFromServer();

    // When local_apps is empty insert a: 'none' string so syncing can continue
    if (!local_apps.length) {
      local_apps.push('none');
    }

    // Fill app array with all apps
    server_apps.forEach((app) => {
      apps.push(app);
    });

    // Compare local & server apps
    local_apps.forEach((local_app) => {
      server_apps.forEach((server_app) => {
        const app_name = this.convertAppName(server_app.name);

        // Remove match from update array
        if (app_name === local_app) {
          apps.splice(apps.indexOf(server_app), 1);
        }
      });
    });

    // Loop trough all apps and download the ones not installed
    apps.forEach((app) => {
      this.download(app);
    });

    return apps;
  }

  async download(app) {
    console.log("downloading... " + app.name);

    const path_to_remote_zip = `${process.env.APP_STORE_DOWNLOAD_PATH}/${this.convertAppName(app.name)}.zip`;
    const local_zip = `./apps/tmp/${this.convertAppName(app.name)}.zip`;
    const app_folder = `./apps/`;

    // Download app ZIP from App Store
    request(path_to_remote_zip).pipe(fs.createWriteStream(local_zip))
      .on('close', () => {
        this.unzipApp(app, local_zip, app_folder);
      });
      
    // this.unzipApp(app, local_zip, app_folder);
    return app;
  }

  unzipApp(app, local_zip, app_folder) {
    try {
      const zip = new AdmZip(local_zip);
      const zipEntries = zip.getEntries();
  
      // Read what's inside the ZIP
      zipEntries.forEach((zipEntry) => {
        if (zipEntry.name !== `${app.name}.zip`) {
          throw new Error("App name does not match");
        }

        if (zipEntries.isDirectory === false) {
          throw new Error("ZIP is not a directory");
        }
      });

      // Extract ZIP to app folder
      zip.extractAllTo(`${app_folder}`, true);
    } catch (e) {
      console.log(`error while syncing: ${e}`);
    }
  }

  async getLocalApps() {
    const local_apps = [];

    await fs.readdir("./apps", (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      
      files.forEach(file => {
        local_apps.push(file);
      });
    });

    return local_apps;
  }

  async getAppsFromServer() {
    // @TODO: get installed apps from user, not all apps!
    const apps = await App.find().exec();

    if (!apps) {
      console.log("404 apps not found :(");
      return false;
    }

    return apps;    
  }

  convertAppName(app_name) {
    return app_name.split(' ').join('-');
  }
};

export default new syncService();
