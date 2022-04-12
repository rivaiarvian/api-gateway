const express = require("express");
const router = express.Router();
const { create,destroy } = require("./handler/imageCourse");

router.post("/", create);
router.delete("/:id", destroy);

module.exports = router;
