// define controllers' routes, visit path and method
const express = require("express");
const {UsersController} = require("./users.controller");

const router = express.Router();

router.post("/register", UsersController.signUp);
router.post('/login', UsersController.signIn);

module.exports = router;
