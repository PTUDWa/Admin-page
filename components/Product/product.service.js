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
                return true;
            } 
            else
                return false;
            }
        )
    }
    delete(req){
        Product.find({_id: req.body._id}).remove().exec();
    }
    async update(req){
        const filter = { _id: req.body.id };
        const update = {title: req.body.title, price: req.body.title, summary: req.body.summary, inStock: req.body.inStock, description: req.body.description, category: req.body.category  };
        await Product.findOneAndUpdate(filter, update);
    }
    detail(id){
        return Product.findOne({_id: id}).lean();
    }
}

module.exports = new Course();
