const Doctor = require('../../models/Doctor')

// Get all doctors with full details
const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find().populate('approvedBy', 'name email');
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Approve/Reject/Block a doctor
  const updateDoctorStatus = async (req, res) => {
    const { doctorId } = req.params;
    const { status } = req.body;
  
    if (!['approved', 'rejected', 'blocked'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
  
    try {
      const doctor = await Doctor.findByIdAndUpdate(
        doctorId,
        { status, approvedBy: req.admin.id },
        { new: true }
      ).populate('approvedBy', 'name email');
  
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  
      res.status(200).json({ message: `Doctor status updated to ${status}`, doctor });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
module.exports = {getAllDoctors,updateDoctorStatus} 