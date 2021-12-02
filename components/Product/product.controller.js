const productService = require('./product.service')
const mongoose = require('mongoose');

module.exports = {
    index: async (req, res, next) => {
        const products = await productService.show();
        res.render("product", {products})
    },
    add: (req, res, next) => {
        res.render("addProduct")      
    },
    addExec:async (req, res, next) => {
        await productService.add(req, res);
        res.redirect('/product');
    },
    delete: async (req, res, next) => {
        await productService.delete(req);
        res.redirect('/product');
    },
    update: async (req, res, next) => {
        
        const product = await productService.detail(mongoose.Types.ObjectId(req.query.id));
        
        res.render("updateProduct", {product});
    },
    updateExec: (req, res, next) => {
        productService.update(req);      
        res.redirect('/product');
        req.flash('success', 'User added successfully!');
    },
}