const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  addItem,
  getItem,
  deleteItem,
  updateItem,
  getAllItems,
  getCategoryItems,
} = require("../controllers/itemController");

const router = express.Router();

router
  .route("/")
  .get(getItem)
  .post(verifyToken, addItem)
  .patch(verifyToken, updateItem)
  .delete(verifyToken, deleteItem);

router.get("/all", getAllItems);
router.get("/category", getCategoryItems);

module.exports = router;
