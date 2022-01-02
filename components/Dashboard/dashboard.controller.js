const productService = require("../Product/product.service");
const moment = require("moment");

module.exports = {
  index: async function (req, res, next) {
    const top10ProductsBySold = await productService.getTop10ProductsBySold();
    const top10ProductsBySoldWithKey = top10ProductsBySold.map(
      (item, index) => ({
        ...item,
        key: index + 1,
        createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
      })
    );

    res.render("index", { title: "Dashboard", top10ProductsBySoldWithKey });
  },
};
