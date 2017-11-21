// import App from '../schemas/App';

const appService = class OrderService {
  /**
  * Returns all orders
  *
  * @returns [{orders}]
  */
  async download(app) {
    console.log(app);
    return app;
  }
};

export default new appService();
