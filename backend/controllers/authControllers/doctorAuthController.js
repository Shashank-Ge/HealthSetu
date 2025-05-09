const jwt = require('jsonwebtoken');
const Doctor = require('../../models/Doctor');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname,'.../.env')})

const registerDoctor = async (req, res) => {
  const { name, email, password, specialization, collegeName } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      collegeName
    });

    await doctor.save();

    // JWT Token
    const token = jwt.sign(
      { id: doctor._id, role: 'doctor' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Doctor registered successfully',
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        collegeName: doctor.collegeName,
        status: doctor.status
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { id: doctor._id, role: 'doctor' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        doctor: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          specialization: doctor.specialization,
          collegeName: doctor.collegeName,
          status: doctor.status
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
    registerDoctor,
    loginDoctor,
  };
  