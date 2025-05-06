const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.get("/dashboard", protect, authorizeRole("doctor"), (req, res) => {
  res.send("Welcome Doctor!");
});

module.exports = router;
