const express = require("express");
const passport = require('../../passport')
const router = express.Router();

const authController = require("./auth.controller");

/* GET home page. */
router.get("/login", authController.index);

router.get("/logout", authController.logout);

router.post("/login", passport.authenticate('local', { 
                    successRedirect: '/',
                    failureRedirect: '/auth/login?wrong',}));


module.exports = router;
