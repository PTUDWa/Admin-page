const authService = require("../Auth/auth.service");
module.exports = {
  listAdmin: async function (req, res, next) {
    const admins = await authService.showUser();
    const adminWithKey = admins.map((item, index) => ({
      ...item,
      key: index + 1,
    }));
    res.render("listAdmin", { adminWithKey });
  },

  createAdminForm: function (req, res, next) {
    res.render("createAdmin", { title: "Create admin" });
  },

  createAdmin: async function (req, res, next) {
    await authService.createAdmin(req, res);
    res.redirect("/");
  },

  detail: async function (req, res, next) {
    const admin = await authService.findByUsername(req.user.username);
    res.render("detailAdmin", { admin });
  },
};
