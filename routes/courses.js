const express = require("express");
const router = express.Router();
const { getAll,getDetail,create,update,destroy  } = require("./handler/courses");

const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/",verifyToken,can('admin'), create);
router.put("/:id",verifyToken,can('admin','student'), update);
router.delete("/:id",verifyToken,can('admin'),destroy);

module.exports = router;
