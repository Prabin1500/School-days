"use strict";

const express = require("express");
const router = express.Router();
const {login, logout, registerUser, registerStudent} = require("../controller/authController");

router.post("/login", login);
router.get("/logout", logout);
router.post("/registerUser", registerUser);
router.post("/registerStudent", registerStudent);

module.exports = router;