import commandController from "../controllers/commandController";

export default class commandRoutes {
  static create(router) {
    router.get('/v1/commands/next', commandController.nextApp);
  }  
}
