const express = require("express");
const router = express.Router();
const doctorAuthWithApproval = require("../middleware/doctorProtect")
const { registerDoctor,loginDoctor } = require('../controllers/authControllers/doctorAuthController');

try {
router.post('/loginDoctor', loginDoctor)
router.post('/signupDoctor', registerDoctor);
router.get("/doctor-dashboard",doctorAuthWithApproval, (req, res) => {
  res.json({ message: `Welcome Doctor ${req.doctor._id}` });
});

} catch (error) {
console.error(error)  
}

module.exports = router;



