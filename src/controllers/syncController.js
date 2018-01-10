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
    let user_id = null;

    if (req.user && req.user._id.length) {
      user_id = req.user._id;
    }

    if (req.query && req.query.id && req.query.id.length) {
      user_id = req.query.id;
    }
    
    if (!user_id) {
      return res.status(500).send({ message: "Please provide a user to start syncing" });
    }

    syncService.sync(user_id).then(
      (result) => {
        res.json(result);
      },
      (e) => {
        res.status(500).send({ message: `Something went wrong: ${e}` });
      },
    );
  }
};

export default new syncController();
