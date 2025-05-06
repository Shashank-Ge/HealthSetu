const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

try {
    router.get("/patient-dashboard", protect, authorizeRole("patient"), (req, res) => {
        res.send("Welcome Patient!");
      });
} catch (error) {
    console.error(error)
}

module.exports = router;
