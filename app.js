const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("./passport");
require("dotenv").config();

const dashboardRouter = require("./components/Dashboard");
const productRouter = require("./components/Product");
const authRouter = require("./components/Auth");
const accountRouter = require("./components/Account");
const orderRouter = require("./components/Order");
const loggedInUserGuard = require("./middlewares/loggedInUserGuard");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/utils", express.static(path.join(__dirname, "./utils")));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/auth", authRouter);
app.use("/product", loggedInUserGuard, productRouter);
app.use("/", loggedInUserGuard, dashboardRouter);
app.use("/account", loggedInUserGuard, accountRouter);
app.use("/order", loggedInUserGuard, orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("404");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
