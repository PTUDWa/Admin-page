const productService = require("./product.service");
const PAGE = require("../../constants/page");
const pageUtils = require("../../utils/page");
const mongoose = require("mongoose");
const cloud = require("../../cloud/index");

module.exports = {
  index: async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const total = await productService.count();
    const pagination = pageUtils.getPagination(page, total);

    const products = await productService.getItemByPage(page, PAGE.perPage);
    const productsWithKey = products.map((product, index) => ({
      ...product,
      key: pagination.keys[index],
    }));

    res.render("product", {
      productsWithKey,
      pagination,
      curPage: page,
      url: "/product",
    });
  },

  add: (req, res, next) => {
    res.render("addProduct");
  },

  addExec: async (req, res, next) => {
    const { category, avatar, image, name, price, summary, description } =
      req.body;

    const ava = (await cloud.uploader.upload(avatar.src)).url;
    const images = [];

    for (let img of image) {
      const reuslt = await cloud.uploader.upload(img.src);
      images.push(reuslt.url);
    }

    await productService.add({
      ava,
      images,
      category,
      name,
      price,
      summary,
      description,
    });

    console.log("Done");

    res.send("success");
  },
  delete: async (req, res, next) => {
    const id = req.query.id;
    await productService.delete(id);
    res.redirect("/product");
  },
  update: async (req, res, next) => {
    const product = await productService.detail(
      mongoose.Types.ObjectId(req.query.id)
    );

    res.render("updateProduct", { product });
  },
  updateExec: (req, res, next) => {
    const { man, woman, name, price, summary, inStock, description } = req.body;
    const { id } = req.query;
    productService.update({
      man,
      woman,
      name,
      price,
      summary,
      inStock,
      description,
      id,
    });
    res.redirect("/product");
    req.flash("success", "User added successfully!");
  },
};
