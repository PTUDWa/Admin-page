const productService = require('./product.service')
const PAGE = require("../../constants/page")
const pageUtils = require("../../utils/page")
const mongoose = require('mongoose');

module.exports = {
    index: async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const total = await productService.count();
        const pagination = pageUtils.getPagination(page, total)

        const products = await productService.getItemByPage(page, PAGE.perPage);
        const productsWithKey = products.map((product, index) => ({
            ...product,
            key: pagination.keys[index]
        }))
        
        res.render("product", {productsWithKey, pagination, curPage: page,})
    },

    add: (req, res, next) => {
        res.render("addProduct")      
    },


    addExec: async (req, res, next) => {
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