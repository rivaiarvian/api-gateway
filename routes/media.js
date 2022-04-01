const express = require("express");
const router = express.Router();
const { create, getAll, deleted } = require("./handler/media");

router.get("/", getAll);
router.post("/", create);
router.delete("/:id", deleted);

module.exports = router;
