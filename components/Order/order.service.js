const mongoose = require("mongoose");
const OrderModel = require("./order.model");

class OrderService {
  getOrders = () => {
    return OrderModel.find({})
      .populate("items.productID")
      .populate("customerId")
      .lean();
  };

  getItemByPage(page, perPage, queryObject) {
    return OrderModel.find(queryObject)
      .populate("items.productID")
      .populate("customerId")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
  }

  count = () => {
    return OrderModel.count();
  };
}

module.exports = new OrderService();
