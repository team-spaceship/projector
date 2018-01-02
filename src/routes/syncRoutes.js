import { authenticated } from '../middleware/passport';
import syncController from "../controllers/syncController";

export default class SyncRoutes {
  /**
  * Create the sync routes.
  */
  static create(router) {
    router.get('/v1/sync/start', syncController.sync);
  }
}
