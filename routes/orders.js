const express = require("express");
const router = express.Router();
const { getOrder } = require("./handler/order-payment");

router.get("/", getOrder);

module.exports = router;
