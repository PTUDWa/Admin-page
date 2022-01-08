const orderService = require("./order.service");
const PAGE = require("../../constants/page");
const pageUtils = require("../../utils/page");
const mongoose = require("mongoose");
const { setStatus } = require("./order.service");

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
      const price = order.items.reduce((a, b) => {
        if (b.productID) {
          return a + b.productID.price * b.qty;
        } else {
          return a;
        }
      }, 0);

      const items = order.items.filter((item) => item.productID);

      return {
        ...order,
        price,
        items,
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
  showDetail: async (req, res, next) => {
    const order = await orderService.getOrder(req.params.id);

    for (var i = 0; i < order.items.length; i++) {
      order.items[i].total =
        order.items[i].productID.price * order.items[i].qty;
    }

    const totalPrice = order.items.reduce(
      (a, b) => a + b.productID.price * b.qty,
      0
    );

    res.render("orderDetail.hbs", { order, totalPrice });
  },
  setStatus: async (req, res, next) => {
    await orderService.setStatus(req.body.id, req.body.status);
  },
};
