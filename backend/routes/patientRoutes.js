const express = require("express");
const router = express.Router();
const patientProtect = require("../middleware/patientProtect")
const {loginPatient,registerPatient} = require("../controllers/authControllers/patientAuthController")

try {
router.post("/loginPatient",loginPatient);
router.post("/signupPatient",registerPatient);
router.get("/patient-dashboard", patientProtect, (req, res) => {
    res.json({ message: `welcome Patient ${req.patient.userId}` });
    });

} catch (error) {
    console.error(error)
}

module.exports = router;
