const express = require("express");
const router = express.Router();
const patientProtect = require("../middleware/patientProtect")
const {loginPatient,registerPatient} = require("../controllers/authControllers/patientAuthController");
const { getApprovedDoctors, submitFeedback } = require('../controllers/personalizeContorllers/patientControllers');
const { bookAppointment } = require("../controllers/personalizeContorllers/patientControllers");

const { getPatientProfile, updatePatientProfile } = require('../controllers/profileController/patientProfileController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const uploadDir = path.join(__dirname, '../uploads/patients');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
      cb(null, `patient_${req.patient.userId}_${Date.now()}${path.extname(file.originalname)}`);
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

try {
router.post("/loginPatient",loginPatient);
router.post("/signupPatient",registerPatient);
router.get("/patient-dashboard", patientProtect, (req, res) => {
    res.json({ message: `welcome Patient ${req.patient.userId}` });
    });
router.get("/patient-dashboard/doctors",patientProtect,getApprovedDoctors)
} catch (error) {
    console.error(error)
}
router.post("/patient-dashboard/bookAppointment",patientProtect,bookAppointment)

router.get("/patient-profile", patientProtect, getPatientProfile);
router.put("/patient-profile", patientProtect, upload.single('profileImage'), updatePatientProfile);
router.post("/patient-dashboard/giveFeedback",patientProtect,submitFeedback)

module.exports = router;
