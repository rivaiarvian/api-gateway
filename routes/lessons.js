const express = require("express");
const router = express.Router();
const { create,update,destroy,getAll,getDetail } = require("./handler/lessons");

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
