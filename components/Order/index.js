const express = require("express");
const router = express.Router();

const orderController = require("./order.controller");

/* GET home page. */
router.get("/", orderController.index);
router.get('/:id', orderController.showDetail);
router.post('/setStatus', orderController.setStatus);
module.exports = router;
