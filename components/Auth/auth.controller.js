const authService = require("./auth.service");
module.exports = {
  index: function (req, res, next) {
    const wrong = req.query["wrong"] !== undefined;
    res.render("login", { wrong });
  },
  login: function (req, res, next) {},
  logout: function (req, res, next) {
    req.logout();
    res.redirect("/");
  },
};
