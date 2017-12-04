import appController from "../controllers/appController";

export default class AppRoutes {
  /**
  * Create the order routes.
  */
  static create(router) {
    router.get('/v1/app:name', appController.renderSelectedApp);
  }  
}
