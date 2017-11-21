import appController from "../controllers/appController";

export default class AppRoutes {
  /**
  * Create the order routes.
  */
  static create(router) {
    router.post('/v1/apps/download', appController.download);
  }  
}
