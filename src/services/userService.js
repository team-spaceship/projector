import * as fs from 'fs';
import path from 'path';

const userService = class userService {
  constructor() {
    this.base_path = path.join(__dirname, "/../../");
    this.lumos_user_path = path.join(this.base_path, "lumos-userid.json");
    this.lumos_user_exists = true;
  }

  async getLumosUser() {
    if (!fs.existsSync(this.lumos_user_path)) {
      console.log("lumos-userid.json does not exist!! creating custom JSON file with empty user_id");
      console.log("this means that the next-app feature will not work properly");
      this.lumos_user_exists = false;
    }

    const result = await new Promise((resolve, reject) => {
      if (this.lumos_user_exists) {
        fs.readFile(this.lumos_user_path, "utf8", (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data));
        });
      } else {
        resolve({ user_id: "" });
      }
    });

    return result;
  }

  async writeUser(user_id) {
    const fileContent = { user_id };

    await fs.writeFile(this.lumos_user_path, JSON.stringify(fileContent), (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
    });
  }
};

export default new userService();
