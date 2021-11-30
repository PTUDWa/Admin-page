const productService = require('./product.service')
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
    },
    delete: (req, res, next) => {
        productService.delete(req);
    },
    update: (req, res, next) => {
        productService.update(req);
    },
}