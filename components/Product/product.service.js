const Product = require('./product.model')

class Course{
    show() {
        return Product.find({}).lean()
    }
    add(req, res) {
        var newProduct = new Product({
            title: req.body.name,
            price: req.body.price,
            summary: req.body.summary,
            description: req.body.description,
        });
        newProduct.save((err, doc) => {
            if (!err){
                console.log("SA")
            } 
            else
                console.log("er")
            }
        )
    }
}

module.exports = new Course();
