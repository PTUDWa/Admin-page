const productService = require('./product.service')
const PAGE = require("../../constants/page")
const pageUtils = require("../../utils/page")

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

    addExec: (req, res, next) => {
        productService.add(req, res);
    },
}