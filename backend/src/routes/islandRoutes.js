const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  completeDay,
} = require("../controllers/islandController");

router.post(
  "/complete-day",
  protect,
  completeDay
);

module.exports = router;