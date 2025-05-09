const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../../models/Patient");
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname,'.../.env')})

const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const patient = await Patient.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      role: "patient",
      name: patient.name,
    });
  } catch (error) {
    console.error("Patient signup error:", error);
    res.status(500).json({ message: "Error creating patient" });
  }
};

const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      role: "patient",
      name: patient.name,
    });
  } catch (error) {
    console.error("Patient login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = {
  registerPatient,
  loginPatient,
};
