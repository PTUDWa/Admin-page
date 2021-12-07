const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");

/* GET home page. */
router.get("/login", authController.index);
router.get("/createAdmin", authController.createAdminForm);
router.get("/listAdmin", authController.listAdmin);
router.get("/detail", authController.detail);
router.post("/createAdmin", authController.createAdmin);

module.exports = router;
