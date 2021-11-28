module.exports = {
    index: function(req, res, next) {
        res.render('/Dashboard/index', { title: 'Dashboard' });
    }
}