const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { addOrder, getUserOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", addOrder);
router.get("/user", getUserOrders);

module.exports = router;
