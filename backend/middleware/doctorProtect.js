const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');


const doctorAuthWithApproval = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized, token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 1. Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Check role
    if (decoded.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. Not a doctor.' });
    }

    // 3. Fetch doctor from DB
    const doctor = await Doctor.findById(decoded.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // 4. Check approval status
    if (doctor.status !== 'approved') {
      return res.status(403).json({ message: `Access denied. Current status: ${doctor.status}` });
    }

    // 5. Attach to request
    req.doctor = doctor;
    next();
  } catch (error) {
    console.error('Doctor auth error:', error);
    res.status(401).json({ message: 'Unauthorized, invalid token or user' });
  }
};

module.exports = doctorAuthWithApproval;
