const productService = require('./product.service')
const { ObjectId } = require('mongodb');

module.exports = {
    index: async (req, res, next) => {
        const products = await productService.show();
        res.render("product", {products})
    },
    add: (req, res, next) => {
        res.render("addProduct")      
    },
    addExec: (req, res, next) => {
        productService.add(req, res);
        res.redirect('/product');
    },
    delete: (req, res, next) => {
        productService.delete(req);
    },
    update: async (req, res, next) => {
        const product = await productService.detail(ObjectId(req.params.id));
        res.render('updateProduct', {product})
    },
    updateExec: (req, res, next) => {
        productService.update(req);
    },
}