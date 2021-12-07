module.exports = {
  index: function (req, res, next) {
    res.render("login", { title: "Login" });
  },

  listAdmin: function (req, res, next) {
    res.render("listAdmin", { title: "List admin" });
  },

  createAdminForm: function (req, res, next) {
    res.render("createAdmin", { title: "Create admin" });
  },

  createAdmin: function (req, res, next) {
    console.log(req.body);
  },

  detail: function (req, res, next) {
    res.render("detailAdmin", { title: "Detail" });
  },
};
