import appService from "../services/appService";

const appController = class AppController {
  /**
  * Returns all orders
  *
  * @param req
  * @param res
  * @param next
  */
  download(req, res) {
    console.log(req);
    const app = req.body;

    appService.download(app).then(
      (result) => {
        res.json(result);
      },
      () => {
        res.status(500).send({ messsage: "Something went wrong" });
      },
    );
  }
};

export default new appController();
