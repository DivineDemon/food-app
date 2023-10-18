const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  addOrder,
  getOrder,
  getUserOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/user", getUserOrders);
router.route("/").post(addOrder).get(getOrder);

module.exports = router;
