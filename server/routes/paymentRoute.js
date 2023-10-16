const express = require("express");
const { paymentGateway } = require("../controllers/paymentController");

const router = express.Router();

router.post("/payment-sheet", paymentGateway);

module.exports = router;
