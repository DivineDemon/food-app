const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { addOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", addOrder);

module.exports = router;
