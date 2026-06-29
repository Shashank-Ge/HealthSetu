const Patient = require('../../models/Patient');
const fs = require('fs');
const path = require('path');

// Get patient profile
const getPatientProfile = async (req, res) => {
  try {
    const patientId = req.patient.userId;
    const patient = await Patient.findById(patientId).select('-password');
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.status(200).json({ patient });
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update patient profile
const updatePatientProfile = async (req, res) => {
  try {
    const patientId = req.patient.userId;
    const { name } = req.body;
    
    // Find patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // Update fields if provided
    if (name) patient.name = name;
    
    // Handle profile image upload if included
    if (req.file) {
      // If there's an existing profile image, delete it
      if (patient.profileImage) {
        const oldImagePath = path.join(__dirname, '../../uploads/patients', patient.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Save new image filename
      patient.profileImage = req.file.filename;
    }
    
    await patient.save();
    
    res.status(200).json({ 
      message: 'Profile updated successfully',
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        profileImage: patient.profileImage
      }
    });
  } catch (error) {
    console.error('Error updating patient profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPatientProfile,
  updatePatientProfile
};