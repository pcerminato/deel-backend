const router = require("express").Router();
const { getAllNonTerminatedByUser, getById } = require("../controllers");

router.get("/", getAllNonTerminatedByUser);

router.get("/:id", getById);

module.exports = router;
