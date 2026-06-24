const express = require("express");


const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  getDeveloperProfile,
} = require(
  "../controllers/developerProfileController"
);

router.get(
  "/",
  authMiddleware,
  getDeveloperProfile
);

module.exports = router;