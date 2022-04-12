const express = require("express");
const router = express.Router();
const { create,getAll } = require("./handler/myCourses");

router.get("/", getAll);
router.post("/", create);

module.exports = router;
