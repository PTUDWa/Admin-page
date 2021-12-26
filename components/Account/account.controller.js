const authService = require("../Auth/auth.service");
const pageUtils = require("../../utils/page");
const PAGE = require("../../constants/page");

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
    const page = req.body.page || 1;
    const total = await authService.countUser();
    const pagination = pageUtils.getPagination(page, total);
    const users = await authService.getUserByPage(page, PAGE.perPage);

    const userWithKey = users.map((item, index) => ({
      ...item,
      key: index + 1,
    }));

    res.render("listUser", {
      userWithKey,
      pagination,
      curPage: page,
      url: "/account/listUser",
    });
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
