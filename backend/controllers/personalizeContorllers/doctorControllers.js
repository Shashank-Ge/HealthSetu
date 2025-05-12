const Doctor = require('../../models/Doctor')

// Get only approved doctors
const getApprovedDoctors = async (req, res) => {
    try {
      const approvedDoctors = await Doctor.find({ status: 'approved' }).populate('approvedBy', 'name email');
      res.status(200).json(approvedDoctors);
    } catch (error) {
      console.error('Error fetching approved doctors:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {getApprovedDoctors};
  