const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .get(getCategory)
  .post(verifyToken, addCategory)
  .patch(verifyToken, updateCategory)
  .delete(verifyToken, deleteCategory);

router.get("/all", getAllCategories);

module.exports = router;
