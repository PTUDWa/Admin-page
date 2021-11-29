const express = require('express');
const router = express.Router();

const authController = require('./auth.controller')

/* GET home page. */
router.get('/', authController.index);

module.exports = router;
