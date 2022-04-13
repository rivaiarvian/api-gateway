const express = require("express");
const router = express.Router();
const { create,update,destroy  } = require("./handler/reviews");

router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
