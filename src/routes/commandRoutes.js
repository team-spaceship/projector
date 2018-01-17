import commandController from "../controllers/commandController";

export default class commandRoutes {
  static create(router, io) {
    router.get('/v1/commands/next', (req, res) => {
      commandController.nextApp(req, res, io);
    });
  }  
}
