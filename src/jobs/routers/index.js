const router = require("express").Router();
const { payJob, getAllUnpaid } = require("../controllers");

router.post("/:job_id/pay", payJob);

router.get("/unpaid", getAllUnpaid);

module.exports = router;
