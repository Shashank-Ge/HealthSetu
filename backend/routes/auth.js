const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controllers/authController");
const { loginAdmin } = require('../controllers/adminController');

const protect = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("./loginAdmin",loginAdmin)
router.get("/profile", protect, getProfile);

module.exports = router;
