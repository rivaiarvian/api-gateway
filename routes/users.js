const express = require("express");
const router = express.Router();
const { register } = require("./handler/users");

router.post("/register", register);

module.exports = router;
