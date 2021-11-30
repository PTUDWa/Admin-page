const express = require('express');
const router = express.Router();

const productController = require("./product.controller")

/* GET home page. */
router.get('/', productController.index);
router.get('/add', productController.add)
router.post('/add', productController.addExec)

module.exports = router;
