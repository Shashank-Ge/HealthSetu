const Appointment = require('../../models/Appointment');
const Doctor = require('../../models/Doctor')

const bookAppointment = async (req, res) => {
  const { doctorId, reason } = req.body;
  const patientId = req.patient.userId; // assuming patient is authenticated and ID is in req.patient

  if (!doctorId || !reason) {
    return res.status(400).json({ message: "Doctor ID and reason are required." });
  }

  try {
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      reason,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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

module.exports = { bookAppointment, getApprovedDoctors };
