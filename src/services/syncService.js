// import App from '../schemas/App';

const syncService = class SyncService {
  /**
  * Returns all orders
  *
  * @returns [{orders}]
  */
  async sync(app) {
    console.log(app);
    return app;
  }
};

export default new syncService();
