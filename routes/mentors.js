const express = require("express");
const router = express.Router();
const { getAll,getDetail,create,update,destroy } = require("./handler/mentors");

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
