import settingService from "../services/settingService";

const settingController = class SettingController {
/**
 * Get app settings based on app name
 * 
 * @param req
 * @param res
 * 
 */
  getAppSettings(req, res) {
    let name = req.url.split("/");
    [name] = [name.slice(-1)[0]];

    settingService.getAppSettings(name).then(
      (result) => {
        res.json(result);
      },
      () => {
        res.status(500).send({ messsage: "Something went wrong" });
      },
    );
  }

  createAppSettings(req, res) {
    let name = req.url.split("/");
    [name] = [name.slice(-1)[0]];

    settingService.createAppSettings(req.body, name).then(
      (result) => {
        res.json(result);
      },
      (error) => {
        res.status(500).send({ messsage: "Something went wrong: " + error.messsage });
      },
    ); 
  }
};

export default new settingController();
