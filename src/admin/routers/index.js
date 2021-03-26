const router = require("express").Router();
const { getBestProfession } = require("../controllers");

router.get("/best-profession", getBestProfession);

module.exports = router;
