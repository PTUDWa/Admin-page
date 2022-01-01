const Product = require("./product.model");
const mongoose = require("mongoose");

class Course {
  show() {
    return Product.find({}).lean();
  }

  count() {
    return Product.count();
  }

  getItemByPage(page, perPage, queryObject) {
    return Product.find(queryObject)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
  }

  getItemByName(name) {
    return Product.findOne({
      title: name,
    }).lean();
  }

  add({ ava, images, category, name, price, summary, description }) {
    var newProduct = new Product({
      title: name,
      price,
      summary,
      description,
      category,
      thumbnail: ava,
      image: images,
    });

    newProduct.save((err, doc) => {
      if (!err) {
        return true;
      } else return false;
    });
  }
  delete(id) {
    Product.find({ _id: mongoose.Types.ObjectId(id) })
      .remove()
      .exec();
  }
  async update({
    category,
    name,
    price,
    summary,
    inStock,
    description,
    id,
    thumbnail,
    image,
  }) {
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const update = {
      title: name,
      price: price,
      summary: summary,
      inStock: inStock,
      description: description,
      category,
      thumbnail,
      image,
    };
    await Product.findOneAndUpdate(filter, update);
  }
  detail(id) {
    return Product.findOne({ _id: id }).lean();
  }
}

module.exports = new Course();
