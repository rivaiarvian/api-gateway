const express = require("express");
const router = express.Router();
const { refreshTokens } = require("./handler/refresh-tokens");

router.post("/", refreshTokens);
module.exports = router;
