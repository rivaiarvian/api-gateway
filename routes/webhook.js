const express = require("express");
const router = express.Router();
const { create } = require("./handler/webhook");

router.post("/", create);

module.exports = router;
