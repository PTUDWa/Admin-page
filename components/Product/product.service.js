const Product = require('./product.model')

class Course{
    show() {
        return Product.find({}).lean()
    }
    add(req, res) {
        var cate = [];
        if(req.body.man == "Man") cate.push(req.body.man)
        if(req.body.woman == "Woman") cate.push(req.body.woman)
        var newProduct = new Product({
            title: req.body.name,
            price: req.body.price,
            summary: req.body.summary,
            description: req.body.description,
            category: cate,
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
    delete(req){
        Product.find({name: req.body.name}).remove().exec();
    }
    async update(req){
        const filter = { title: req.body.title };
        const update = {price: req.body.title, summary: req.body.summary, inStock: req.body.inStock, description: req.body.description, category: req.body.category  };
        await Character.findOneAndUpdate(filter, update);
    }
}

module.exports = new Course();
