const Product = require('./product.model')

class Course{
    show() {
        return Product.find({}).lean()
    }
}

module.exports = new Course();
