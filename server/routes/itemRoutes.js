const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  addItem,
  getItem,
  deleteItem,
  updateItem,
  getAllItems,
  searchItems,
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
router.get("/search", searchItems);
router.get("/category", getCategoryItems);

module.exports = router;
