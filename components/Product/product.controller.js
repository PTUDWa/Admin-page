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
    const queryObject = {};

    if (req.query.category) {
      queryObject.category = req.query.category;
    }

    const products = await productService.getItemByPage(
      page,
      PAGE.perPage,
      queryObject
    );
    const productsWithKey = products.map((product, index) => ({
      ...product,
      key: pagination.keys[index],
    }));

    res.render("product", {
      productsWithKey,
      pagination,
      curPage: page,
      url: "/product",
      filter: req.query.category,
    });
  },

  add: (req, res, next) => {
    res.render("addProduct");
  },

  addExec: async (req, res, next) => {
    const { category, avatar, image, name, price, summary, description } =
      req.body;

    const product = await productService.getItemByName(name);

    if (product) {
      res.status(400).send({ message: "Product is already exists." });
      return;
    }

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

    res.status(200).send("Done");
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
  updateExec: async (req, res, next) => {
    const {
      category,
      name,
      price,
      summary,
      stock,
      description,
      id,
      avatar,
      image,
    } = req.body;

    const product = await productService.getItemByName(name);

    if (product && product._id.toString() !== id) {
      res.status(400).send({ message: "Product is already exists." });
      return;
    }

    const ava = (await cloud.uploader.upload(avatar.src)).url;
    const images = [];

    for (let img of image) {
      const reuslt = await cloud.uploader.upload(img.src);
      images.push(reuslt.url);
    }

    await productService.update({
      category,
      name,
      price,
      summary,
      inStock: stock,
      description,
      thumbnail: ava,
      image: images,
      id,
    });

    res.status(200).send("Done");
  },
};
