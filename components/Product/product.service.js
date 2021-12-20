const Product = require("./product.model");
const mongoose = require("mongoose");

class Course {
  show() {
    return Product.find({}).lean();
  }

  count() {
    return Product.count();
  }

  getItemByPage(page, perPage) {
    return Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
  }

  add({ man, woman, name, price, summary, description }) {
    var cate = [];
    if (man == "Man") cate.push(man);
    if (woman == "Woman") cate.push(woman);
    var newProduct = new Product({
      title: name,
      price: price,
      summary: summary,
      description: description,
      category: cate,
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
  async update({ man, woman, name, price, summary, inStock, description, id }) {
    var cate = [];
    if (man == "Man") cate.push(man);
    if (req.body.woman == "Woman") cate.push(woman);
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const update = {
      title: name,
      price: price,
      summary: summary,
      inStock: inStock,
      description: description,
      category: cate,
    };
    await Product.findOneAndUpdate(filter, update);
  }
  detail(id) {
    return Product.findOne({ _id: id }).lean();
  }
}

module.exports = new Course();
