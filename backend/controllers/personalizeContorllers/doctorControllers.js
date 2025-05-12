const Appointment = require('../../models/Appointment');

const getDoctorAppointments = async (req, res) => {
  const doctorId = req.doctor._id; // assuming doctor is authenticated and ID is in req.doctor

  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name email') // populate patient name/email only
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      message: "Appointments fetched successfully.",
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments for doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {getDoctorAppointments};
