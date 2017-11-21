import syncService from "../services/syncService";

const syncController = class SyncController {
  /**
  * Returns all orders
  *
  * @param req
  * @param res
  * @param next
  */
  download(req, res) {
    const app = req.body;

    syncService.download(app).then(
      (result) => {
        res.json(result);
      },
      () => {
        res.status(500).send({ messsage: "Something went wrong" });
      },
    );
  }
};

export default new syncController();
