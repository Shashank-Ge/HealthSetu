const express = require('express');
const adminProtect = require('../middleware/adminProtect');
const { loginAdmin } = require('../controllers/authControllers/adminAuthController');
const { getAllDoctors, updateDoctorStatus } = require('../controllers/personalizeContorllers/adminControllers')
const router = express.Router();

router.post('/loginAdmin',loginAdmin);

router.get('/admin-dashboard', adminProtect, (req, res) => {
  res.json({ message: `Welcome Admin ${req.admin.id}` });
});

// Get full list of doctors
router.get('/admin-dashboard/doctors', adminProtect, getAllDoctors);

// Update doctor status
router.patch('/admin-dashboard/doctor-status/:doctorId', adminProtect, updateDoctorStatus);

module.exports = router;
