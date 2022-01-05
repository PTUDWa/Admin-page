const express = require("express");
const router = express.Router();

const orderController = require("./order.controller");

/* GET home page. */
router.get("/", orderController.index);

module.exports = router;
