const express = require('express');
const router = express.Router();
const doctorAuthWithApproval = require('../middleware/doctorProtect');
const { registerDoctor, loginDoctor } = require('../controllers/authControllers/doctorAuthController');
const { getDoctorAppointments, scheduleAppointment, cancelAppointment,getUpcomingAndUpdateAppointments, getDoctorFeedback } = require('../controllers/personalizeContorllers/doctorControllers');

const { getDoctorProfile, updateDoctorProfile } = require('../controllers/profileController/doctorProfileController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/doctors');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, `doctor_${req.doctor.id}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .jpeg, .jpg and .png files are allowed'));
  }
});


router.post('/loginDoctor', loginDoctor);
router.post('/signupDoctor', registerDoctor);
router.get('/doctor-dashboard', doctorAuthWithApproval, (req, res) => {
  res.json({ message: `Welcome Doctor ${req.doctor._id}` });
});
router.get('/doctor-dashboard/appointments', doctorAuthWithApproval, getDoctorAppointments);
router.post('/doctor-dashboard/scheduleAppointments', doctorAuthWithApproval, scheduleAppointment);
router.post('/doctor-dashboard/cancelAppointment',doctorAuthWithApproval,cancelAppointment)

router.get('/doctor-dashboard/doctor-meetings',doctorAuthWithApproval,getUpcomingAndUpdateAppointments)

router.get('/doctor-profile', doctorAuthWithApproval, getDoctorProfile);
router.put('/doctor-profile', doctorAuthWithApproval, upload.single('profileImage'), updateDoctorProfile);

router.get('/doctor-dashboard/doctor-feedbacks',doctorAuthWithApproval,getDoctorFeedback);

module.exports = router;