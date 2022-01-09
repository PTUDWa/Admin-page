const mongoose = require("mongoose");
const OrderModel = require("./order.model");

class OrderService {
  getOrders = (queryObject = {}) => {
    return OrderModel.find(queryObject)
      .sort({ createdAt: -1 })
      .populate("items.productID")
      .populate("customerId")
      .lean();
  };

  getItemByPage(page, perPage, queryObject) {
    return OrderModel.find(queryObject)
      .sort({ createdAt: -1 })
      .populate("items.productID")
      .populate("customerId")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
  }
  getOrder(id) {
    return OrderModel.findOne({ _id: mongoose.Types.ObjectId(id) })
      .populate("items.productID")
      .populate("customerId")
      .lean();
  }
  async setStatus(id, status) {
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const update = {
      status: status,
    };
    await OrderModel.findOneAndUpdate(filter, update);
  }
  count = () => {
    return OrderModel.count();
  };
}

module.exports = new OrderService();
