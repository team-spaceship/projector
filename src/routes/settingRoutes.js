import settingsController from "../controllers/settingController";

export default class settingRoutes {
  /**
  * Create the app routes.
  */
  static create(router) {
    router.get('/v1/settings/:app', settingsController.getAppSettings);
    router.post('/v1/settings/:state', settingsController.createAppSettings);
  }  
}
