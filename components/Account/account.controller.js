const authService = require('../Auth/auth.service')
module.exports = {
  
  listAdmin: function (req, res, next) {
    const Users = authService.showUser();
    res.render("listAdmin", {Users});
  },

  createAdminForm: function (req, res, next) {
    res.render("createAdmin", { title: "Create admin" });
  },

  createAdmin:async function (req, res, next) {
    await authService.createAdmin(req,res);
    res.redirect('/');
  },

  detail: function (req, res, next) {
    admin = authService.findByUsername(req.user.username);
    res.render("detailAdmin", {admin});
  },
  
};