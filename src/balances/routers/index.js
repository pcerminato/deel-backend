const router = require("express").Router();
const { depositByUserId } = require("../controllers");

router.post("/deposit/:userId", depositByUserId);

module.exports = router;
