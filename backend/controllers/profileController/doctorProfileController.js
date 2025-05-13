const Doctor = require('../../models/Doctor');
const fs = require('fs');
const path = require('path');

// Get doctor profile
const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await Doctor.findById(doctorId).select('-password');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const { name, specialization, collegeName } = req.body;

    // Find doctor by ID
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update fields if provided
    if (name) doctor.name = name;
    if (specialization) doctor.specialization = specialization;
    if (collegeName) doctor.collegeName = collegeName;

    // Handle profile image upload if included
    if (req.file) {
      // Delete old profile image if it exists
      if (doctor.profileImage) {
        const oldImagePath = path.join(__dirname, '../../uploads/doctors', doctor.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new profile image filename
      doctor.profileImage = req.file.filename;
    }

    // Save changes
    await doctor.save();

    // Get updated doctor object (excluding password)
    const updatedDoctor = await Doctor.findById(doctorId).select('-password');

    res.status(200).json({
      message: 'Doctor profile updated successfully',
      doctor: updatedDoctor
    });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDoctorProfile,
  updateDoctorProfile,
};