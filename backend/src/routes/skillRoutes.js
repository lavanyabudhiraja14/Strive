const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createSkill,
  getSkills,
} = require(
  "../controllers/skillController"
);

router.post(
  "/",
  authMiddleware,
  createSkill
);

router.get(
  "/",
  authMiddleware,
  getSkills
);

module.exports = router;