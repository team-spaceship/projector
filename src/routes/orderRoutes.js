import orderController from "../controllers/orderController";

export default class OrderRoutes {
  /**
  * Create the order routes.
  */
  static create(router) {
    router.get('/v1/orders', orderController.getAllOrders);
  }  
}
