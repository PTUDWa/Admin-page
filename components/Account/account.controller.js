const authService = require("../Auth/auth.service");
module.exports = {
  listAdmin: async function (req, res, next) {
    const admins = await authService.showAdmin();
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
    const { username, password, name } = req.body;

    await authService.createAdmin({ username, password, name });
    res.redirect("/");
  },

  detail: async function (req, res, next) {
    const admin = await authService.findByUsername(req.user.username);
    res.render("detailAdmin", { admin });
  },
  listUser: async function (req, res, next) {
    const users = await authService.showUser();
    const userWithKey = users.map((item, index) => ({
      ...item,
      key: index + 1,
    }));
    res.render("listUser", { userWithKey });
  },
  detailUser: async function (req, res, next) {
    const customer = await authService.detailUser(req.query.id);
    res.render("detailUser", { customer });
  },
  lockUser: async function (req, res, next) {
    const id = req.body.id;
    await authService.lockUser(id);
    res.status(201).json(id);
  },
  unlockUser: async function (req, res, next) {
    const id = req.body.id;
    await authService.unlockUser(id);
    res.status(201).json(id);
  },
};
