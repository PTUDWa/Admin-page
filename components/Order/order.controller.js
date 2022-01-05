const orderService = require("./order.service");
const PAGE = require("../../constants/page");
const pageUtils = require("../../utils/page");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const total = await orderService.count();
    const pagination = pageUtils.getPagination(page, total);
    const queryObject = {};

    const orders = await orderService.getItemByPage(
      page,
      PAGE.perPage,
      queryObject
    );

    const ordersWithKey = orders.map((order, index) => {
      const price = order.items.reduce(
        (a, b) => a + b.productID.price * b.qty,
        0
      );

      return {
        ...order,
        price,
        key: pagination.keys[index],
      };
    });
    res.render("order.hbs", {
      ordersWithKey,
      pagination,
      curPage: page,
      url: "/order",
    });
  },
};
