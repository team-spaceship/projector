import syncService from "../services/syncService";

const syncController = class SyncController {
  /**
  * Returns all orders
  *
  * @param req
  * @param res
  * @param next
  */
  sync(req, res) {
    if (!req.user) {
      return res.status(500).send({ message: "Please provide a user to start syncing" });
    }

    syncService.sync(req.user._id).then(
      (result) => {
        res.json(result);
      },
      (e) => {
        console.log(e);
        res.status(500).send({ message: `Something went wrong: ${e}` });
      },
    );
  }
};

export default new syncController();
