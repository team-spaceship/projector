import * as fs from 'fs';
import path from 'path';
import request from 'request';
import AdmZip from 'adm-zip';
import InstalledVersion from '../schemas/InstalledVersion';

/* eslint-disable */
import Version from "../schemas/Version";
import App from "../schemas/App";
/* eslint-enable */

const syncService = class SyncService {
  constructor() {
    this.base_path = path.join(__dirname + "/../../");
    this.app_folder_path = path.join(this.base_path, `./react-ui/apps`);
    this.app_folder_tmp = path.join(`${this.app_folder_path}/tmp`);

    this.checkFolders();
  }

  checkFolders() {
    if (!fs.existsSync(this.app_folder_path)) {
      fs.mkdirSync(this.app_folder_path); 
    }

    if (!fs.existsSync(this.app_folder_tmp)) {
      fs.mkdirSync(this.app_folder_tmp);
    }
  }

  /**
  * Sync apps van server naar lokale omgeving
  *
  * @returns [{orders}]
  */
  async sync(user_id) {
    if (!user_id) {
      console.log("SyncService requires user_id");
      return { error: "user_id not found" };
    }

    try {
      const apps = [];
      const local_apps = await this.getLocalApps();
      const server_apps = await this.getAppsFromServer(user_id);

      // When local_apps is empty insert a: 'none' string so syncing can continue
      if (!local_apps.length) {
        local_apps.push('none');
      }

      // When local_apps is empty insert a: 'none' string so syncing can continue
      if (!server_apps.length) {
        console.log("SyncService requires server apps", console.log(server_apps));
        return { error: "no apps not found on server" };
      }      

      // Fill app array with all apps
      server_apps.forEach((app) => {
        apps.push(app);
      });

      // Compare local & server apps
      local_apps.forEach((local_app) => {
        server_apps.forEach((server_app) => {
          if (server_app) {
            const app_name = this.convertAppName(server_app.version.app.name);
  
            // Remove match from update array
            if (app_name === local_app) {
              apps.splice(apps.indexOf(server_app), 1);
            }
          }
        });
      });

      const downloaded_apps = [];

      if (!apps) {
        console.log("Nothing to sync");
      }

      // Usually await should not be used in a for loop, but this is a special case
      /* eslint-disable */
      for (let app of apps) {
        console.time(`Downloading_${app.version.app.name}`);
        const downloaded_app = await this.download(app);
        downloaded_apps.push(downloaded_app);
        console.log(`Downloaded: "${app.version.app.name}" in: `)
        console.timeEnd(`Downloading_${app.version.app.name}`);
      }
      /* eslint-enable */
  
      return downloaded_apps;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async download(app) {
    console.log(`downloading... ${app.version.app.name}`);

    const path_to_remote_zip = `${process.env.APP_STORE_DOWNLOAD_PATH}/${app.version.version_path}`;
    const local_zip = path.join(`${this.app_folder_tmp}/${this.convertAppName(app.version.app.name)}.zip`);
    const app_folder = path.join(`${this.app_folder_path}`);

    // Check if app already exists, if so don't download it again
    if (!fs.existsSync(local_zip)) {
      await this.downloadFromUrlToFile(path_to_remote_zip, local_zip);
    } else {
      console.log("ZIP already present, not downloading again..");
    }

    const unzip_result = await this.unzipApp(app, local_zip, app_folder);

    return { message: unzip_result };
  }

  /**
   * @param url, url where the remote file is downloaded from
   * @param path, the local filepath where the downloaded remote file is streamed into
   */
  async downloadFromUrlToFile(url, filePath) {
    console.log(url);
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      request(url).pipe(writeStream)
        .on('end', () => {
          console.log("resolved file... @TODO: check if file is not HTML. BUT A ZIP");
          resolve();
        }).on('error', (err) => {
          reject(err);
        });
    });
  }

  async unzipApp(app, local_zip, app_folder) {
    try {
      const zip = new AdmZip(local_zip);
    
      // Extract ZIP to tmp folder
      await zip.extractAllTo(`${app_folder}/tmp/`, true);

      // For some reason it needs to be unzipped again, otherwise it won't work
      const zip2 = new AdmZip(`${app_folder}/tmp/${app.version.version}.zip`);
      const zipEntries = zip2.getEntries();

      let repo_name = "";

      // Read what's inside the ZIP
      zipEntries.forEach((zipEntry) => {
        repo_name = zipEntry.entryName;

        // if (zipEntry.name !== `${app.version.version}.zip`) {
        //   throw new Error("App name does not match");
        // }

        if (zipEntries.isDirectory === false) {
          throw new Error("ZIP is not a directory");
        }
      });

      // Extract to app folder
      await zip2.extractAllTo(`${app_folder}`, true);

      const rename_from_path = path.join(`${app_folder}/${repo_name.split("/")[0]}`);
      const rename_to_path = path.join(`${app_folder}/${this.convertAppName(app.version.app.name)}`);

      await fs.rename(rename_from_path, rename_to_path, (err) => {
        if (err) throw err;
      });

      return `${app.version.app.name} is synced! Yay`;
    } catch (e) {
      console.log(`error while syncing: ${e}`);
      return `Got error while syncing: ${e}`;
    }
  }

  async getLocalApps() {
    const local_apps = [];

    await fs.readdir(this.app_folder_path, (err, files) => {
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

  async getAppsFromServer(user_id) {
    const apps = this.getInstalledAppsByUserId(user_id);

    if (!apps) {
      console.log("404 apps not found :(");
      return false;
    }

    return apps;    
  }

  async getInstalledAppsByUserId(user_id) {
    const user_apps = await InstalledVersion
      .find({ user: user_id })
      .populate('user')
      .populate('version')
      .populate({
        path: 'version',
        populate: { path: 'app' },
      })
      .exec();

    return user_apps;
  }


  convertAppName(app_name) {
    return app_name.split(' ').join('-');
  }
};

export default new syncService();
