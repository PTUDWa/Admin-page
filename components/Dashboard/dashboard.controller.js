const productService = require("../Product/product.service");
const moment = require("moment");
const orderService = require("../Order/order.service");

module.exports = {
  index: async function (req, res, next) {
    const top10ProductsBySold = await productService.getTop10ProductsBySold();
    const quarter = Math.floor((moment().month() + 3) / 3);

    const orders = await Promise.all([
      orderService.getOrders({
        status: "ready_for_pickup",
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lt: moment().endOf("day").toDate(),
        },
      }),
      orderService.getOrders({
        status: "ready_for_pickup",
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lt: moment().endOf("week").toDate(),
        },
      }),
      orderService.getOrders({
        status: "ready_for_pickup",
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lt: moment().endOf("month").toDate(),
        },
      }),
      orderService.getOrders({
        status: "ready_for_pickup",
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lt: moment().endOf("year").toDate(),
        },
      }),
      orderService.getOrders({
        status: "ready_for_pickup",
        createdAt: {
          $gte: moment(`${(quarter - 1) * 3 + 1}/${moment().year()}`, "MM/YYYY")
            .startOf("month")
            .toDate(),
          $lt: moment(`${(quarter - 1) * 3 + 3}/${moment().year()}`, "MM/YYYY")
            .endOf("month")
            .toDate(),
        },
      }),
    ]);

    const totalPrice = orders.map((orders) =>
      orders.reduce(
        (price, order) =>
          price +
          order.items.reduce(
            (total, item) => total + item.productID.price * item.qty,
            0
          ),
        0
      )
    );

    const [incomeDay, incomeWeek, incomeMonth, incomeYear, incomeQuarter] =
      totalPrice;

    const top10ProductsBySoldWithKey = top10ProductsBySold.map(
      (item, index) => ({
        ...item,
        key: index + 1,
        createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
      })
    );

    res.render("index", {
      title: "Dashboard",
      top10ProductsBySoldWithKey,
      incomeDay,
      incomeWeek,
      incomeMonth,
      incomeYear,
      incomeQuarter,
    });
  },
};
