import Order from '../schemas/Order';

const orderService = class OrderService {
  /**
  * Returns all orders
  *
  * @returns [{orders}]
  */
  async getAllOrders(res) {
    const orders = await Order.find().exec();
    
    if (!orders) {
      return res.status(400).end();
    }
    
    return orders;
  }
  
  /**
  * Find order by id
  *
  * @param id
  * @returns {order}
  */
  async getOrder(res, id) {
    const order = await Order.findOne({ _id: id }).exec();
    
    if (!order) {
      return res.status(400).end();
    }
    
    return order;
  }
};

export default new orderService();
