const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.get("/dashboard", protect, authorizeRole("patient"), (req, res) => {
  res.send("Welcome Patient!");
});

module.exports = router;
