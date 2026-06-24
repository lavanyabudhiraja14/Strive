const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getCoachAdvice,
  askCoach,
} = require("../controllers/aiController");

router.get(
  "/coach",
  authMiddleware,
  getCoachAdvice
);

router.post(
  "/chat",
  authMiddleware,
  askCoach
);

module.exports = router;