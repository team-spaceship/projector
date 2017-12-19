import * as fs from 'fs';

const settingService = class settingService {
  async getAppSettings(name) {
    const filePath = './src/settings/' + name + '.json';

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  async createAppSettings(fileContent) {
    await fs.writeFile('./src/settings/hodor.json', JSON.stringify(fileContent), (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
    }); 
  }
};

export default new settingService();
