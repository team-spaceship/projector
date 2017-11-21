import syncController from "../controllers/syncController";

export default class AppRoutes {
  /**
  * Create the order routes.
  */
  static create(router) {
    router.get('/v1/sync/start', syncController.sync);
  }  
}
