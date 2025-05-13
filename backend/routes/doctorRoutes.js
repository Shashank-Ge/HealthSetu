const express = require('express');
const router = express.Router();
const doctorAuthWithApproval = require('../middleware/doctorProtect');
const { registerDoctor, loginDoctor } = require('../controllers/authControllers/doctorAuthController');
const { getDoctorAppointments, scheduleAppointment } = require('../controllers/personalizeContorllers/doctorControllers');

router.post('/loginDoctor', loginDoctor);
router.post('/signupDoctor', registerDoctor);
router.get('/doctor-dashboard', doctorAuthWithApproval, (req, res) => {
  res.json({ message: `Welcome Doctor ${req.doctor._id}` });
});
router.get('/doctor-dashboard/appointments', doctorAuthWithApproval, getDoctorAppointments);
router.post('/doctor-dashboard/scheduleAppointments', doctorAuthWithApproval, scheduleAppointment);

module.exports = router;