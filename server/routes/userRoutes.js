const express = require("express");
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  uploadProfile,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/upload", uploadProfile);
router.get("/all", verifyToken, getUsers);
router
  .route("/")
  .get(getUser)
  .patch(updateUser)
  .delete(verifyToken, deleteUser);

module.exports = router;
