const express = require("express");
const passport = require("../../passport");
const router = express.Router();

const accountController = require("./account.controller");

/* GET home page. */

router.get("/createAdmin", accountController.createAdminForm);
router.get("/listAdmin", accountController.listAdmin);
router.get("/detail", accountController.detail);
router.get("/listUser", accountController.listUser);
router.get("/detailUser", accountController.detailUser)
router.get("/updateAdminInformation",accountController.updateInformationForm)
router.post("/updateAdminInformation",accountController.updateAdminInformation)
router.post("/createAdmin", accountController.createAdmin);
router.post("/lockUser", accountController.lockUser);
router.post("/unlockUser", accountController.unlockUser);

module.exports = router;
