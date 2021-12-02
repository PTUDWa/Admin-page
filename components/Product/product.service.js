const Product = require('./product.model')
const mongoose = require('mongoose');

class Course{
    show() {
        return Product.find({}).lean()
    }

    count() {
        return Product.count()
    }

    getItemByPage(page, perPage) {
        return Product.find({}).skip((page - 1) * perPage).limit(perPage).lean();
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
        Product.find({_id: mongoose.Types.ObjectId(req.query.id)}).remove().exec();
    }
    async update(req){
        var cate = [];
        if(req.body.man == "Man") cate.push(req.body.man)
        if(req.body.woman == "Woman") cate.push(req.body.woman)
        const filter = { _id: mongoose.Types.ObjectId(req.query.id) };
        const update = {title: req.body.name, price: req.body.price, summary: req.body.summary, inStock: req.body.inStock, description: req.body.description, category: cate  };
        await Product.findOneAndUpdate(filter, update);
    }
    detail(id){
        return Product.findOne({_id: id}).lean();
    }
}

module.exports = new Course();
