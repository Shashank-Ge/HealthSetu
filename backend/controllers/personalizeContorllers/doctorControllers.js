const Appointment = require('../../models/Appointment');
const scheduleGoogleMeet = require('../../googleMeetService');
const sendEmail = require('../../sendEmail');
const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');

const getDoctorAppointments = async (req, res) => {
  const doctorId = req.doctor._id;
  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ message: 'Appointments fetched successfully.', appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const scheduleAppointment = async (req, res) => {
  console.log('⏱ scheduleAppointment called with:', req.body);
  try {
    const { doctorName, patientId, appointmentId, scheduledDateTime } = req.body;
    console.log('Parsed date/time:', scheduledDateTime);

    const patient = await Patient.findById(patientId);
    if (!patient) {
      console.log('patient not found:', patientId);
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Create Google Meet and update appointment
    const meetLink = await scheduleGoogleMeet(doctorName, patient.email, scheduledDateTime);
    await Appointment.findByIdAndUpdate(appointmentId, {
      meetLink,
      scheduledAt: new Date(scheduledDateTime),
      status: 'confirmed',
    });

    // Send email to patient
    await sendEmail(
      patient.email,
      `Google Meet with Dr. ${doctorName}`,
      `<p>Your appointment is scheduled for ${new Date(scheduledDateTime).toLocaleString()}.<br/>Join here: <a href=\"${meetLink}\" target=\"_blank\">${meetLink}</a></p>`
    );

    // Fetch doctor details and send email to doctor
    const doctorId = req.doctor._id;
    const doctor = await Doctor.findById(doctorId);
    if (doctor && doctor.email) {
      await sendEmail(
        doctor.email,
        `Google Meet with Patient: ${patient.name}`,
        `<p>Your appointment with ${patient.name} is scheduled for ${new Date(scheduledDateTime).toLocaleString()}.<br/>Join here: <a href=\"${meetLink}\" target=\"_blank\">${meetLink}</a></p>`
      );
    }
    
    return res.status(200).json({ message: 'Meet scheduled and emails sent', meetLink });
  } catch (err) {
    console.error('scheduleAppointment error:', err);
    return res.status(500).json({ message: 'Error scheduling meet', error: err.message });
  }
};

module.exports = { getDoctorAppointments, scheduleAppointment };
