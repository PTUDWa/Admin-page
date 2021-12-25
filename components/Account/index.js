const express = require("express");
const passport = require("../../passport");
const router = express.Router();

const accountController = require("./account.controller");

/* GET home page. */

router.get("/createAdmin", accountController.createAdminForm);
router.get("/listAdmin", accountController.listAdmin);
router.get("/detail", accountController.detail);
router.post("/createAdmin", accountController.createAdmin);
router.get("/listUser", accountController.listUser);
router.post("/lockUser", accountController.lockUser);
router.post("/unlockUser", accountController.unlockUser);
module.exports = router;
