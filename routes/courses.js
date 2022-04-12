const express = require("express");
const router = express.Router();
const { getAll,getDetail,create,update,destroy  } = require("./handler/courses");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/",verifyToken, create);
router.put("/:id",verifyToken, update);
router.delete("/:id",verifyToken,destroy);

module.exports = router;
