const express = require('express');
const router = express.Router();

const productController = require("./product.controller")

/* GET home page. */
router.get('/', productController.index);
router.get('/add', productController.add)
router.get('/update', productController.update)
router.get('/delete', productController.delete)
router.post('/add', productController.addExec)
router.post('/update', productController.updateExec)

module.exports = router;
