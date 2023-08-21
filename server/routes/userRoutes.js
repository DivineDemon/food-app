const express = require("express");
const { uploadProfile } = require("../controllers/userController");

const router = express.Router();

router.post("/", uploadProfile);

module.exports = router;
