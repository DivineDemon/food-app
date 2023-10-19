const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { paymentGateway } = require("../controllers/paymentController");

const router = express.Router();

router.post("/", paymentGateway);

module.exports = router;
