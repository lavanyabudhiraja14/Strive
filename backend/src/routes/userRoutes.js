const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require(
  "../controllers/userController"
);

router.get(
  "/me",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/password",
  authMiddleware,
  changePassword
);

module.exports = router;