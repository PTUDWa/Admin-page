module.exports = {
    index: (req, res, next) => {
        res.render("product")
    },
    add: (req, res, next) => {
        res.render("addProduct")
    }
}