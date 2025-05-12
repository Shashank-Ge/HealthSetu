const express = require("express");
const router = express.Router();
const patientProtect = require("../middleware/patientProtect")
const {loginPatient,registerPatient} = require("../controllers/authControllers/patientAuthController");
const { getApprovedDoctors } = require('../controllers/personalizeContorllers/patientControllers');
const { bookAppointment } = require("../controllers/personalizeContorllers/patientControllers");

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

module.exports = router;
