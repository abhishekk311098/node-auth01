const express = require("express");
const verifySource = require("../middleware/verifySource");
const authenticate = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", verifySource, registerUser);
router.post("/login", verifySource, loginUser);
router.get("/get-profile", authenticate, getProfile);

module.exports = router;
