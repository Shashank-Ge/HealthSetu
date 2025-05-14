const Appointment = require('../../models/Appointment');
const scheduleGoogleMeet = require('../../googleMeetService');
const sendEmail = require('../../sendEmail');
const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');
const Feedback = require('../../models/Feedback');

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
  try {
    const { doctorName, patientId, appointmentId, scheduledDateTime } = req.body;

    if (!doctorName || !patientId || !appointmentId || !scheduledDateTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const date = new Date(scheduledDateTime);
    if (isNaN(date)) {
      return res.status(400).json({ message: 'Invalid scheduled date/time' });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const meetLink = await scheduleGoogleMeet(doctorName, patient.email, scheduledDateTime);
    appointment.meetLink = meetLink;
    appointment.scheduledAt = date;
    appointment.status = 'confirmed';
    await appointment.save();

    try {
      await sendEmail(
        patient.email,
        `Google Meet with Dr. ${doctorName}`,
        `<p>Your appointment is scheduled for ${date.toLocaleString()}<br/>Join here: <a href="${meetLink}">${meetLink}</a></p>`
      );
    } catch (err) {
      console.error('Failed to send patient email:', err.message);
    }

    const doctor = await Doctor.findById(req.doctor._id);
    if (doctor && doctor.email) {
      try {
        await sendEmail(
          doctor.email,
          `Google Meet with Patient: ${patient.name}`,
          `<p>Your appointment with ${patient.name} is scheduled for ${date.toLocaleString()}<br/>Join here: <a href="${meetLink}">${meetLink}</a></p>`
        );
      } catch (err) {
        console.error('Failed to send doctor email:', err.message);
      }
    }

    return res.status(200).json({ message: 'Meet scheduled and emails sent', meetLink });
  } catch (err) {
    console.error('scheduleAppointment error:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  const { appointmentId, reason } = req.body;

  if (!appointmentId || !reason) {
    return res.status(400).json({ message: 'Appointment ID and reason are required' });
  }

  try {
    const doctorId = req.doctor._id;

    // Find the appointment and populate patient info
    const appointment = await Appointment.findOne({ _id: appointmentId, doctor: doctorId })
      .populate('patient', 'name email');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or unauthorized' });
    }

    // Log and extract patient email
    const patientEmail = appointment.patient.email;
    const patientName = appointment.patient.name;
    const doctor = await Doctor.findById(doctorId);
    const doctorName = doctor?.name || 'Doctor';

    console.log(`Doctor ${doctorId} cancelled appointment ${appointmentId}. Reason: ${reason}`);

    // Send cancellation email to patient
    await sendEmail(
      patientEmail,
      `Your appointment with Dr. ${doctorName} has been cancelled`,
      `<p>Dear ${patientName},</p>
      <p>Your appointment with Dr. ${doctorName} has been <strong>cancelled</strong>.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>Please reschedule at your convenience.</p>`
    );

    // Delete the appointment
    await Appointment.findByIdAndDelete(appointmentId);

    return res.status(200).json({ message: 'Appointment cancelled and patient notified' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUpcomingAndUpdateAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor._id;

    // Get confirmed and completed appointments for this doctor
    let appointments = await Appointment.find({
      doctor: doctorId,
      status: { $in: ['confirmed', 'completed'] },
    }).populate('patient', 'name email');

    const now = new Date();

    // Loop through and update statuses if scheduled time has passed
    const updatePromises = appointments.map(async (appointment) => {
      if (appointment.status === 'confirmed' && appointment.scheduledAt && appointment.scheduledAt < now) {
        appointment.status = 'completed';
        await appointment.save();
      }
      return appointment;
    });

    // Wait for all status updates to complete
    appointments = await Promise.all(updatePromises);

    // Sort appointments by scheduled date (ascending)
    appointments.sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

    res.status(200).json({
      message: 'Upcoming and completed appointments fetched successfully.',
      appointments,
    });
  } catch (error) {
    console.error('Error in getUpcomingAndUpdateAppointments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getDoctorFeedback = async (req, res) => {
  const doctorId = req.doctor._id; // assuming middleware sets this

  console.log("Doctor ID from token:", doctorId);

  try {
    const feedbacks = await Feedback.find({ doctor: doctorId })
      .populate('patient', 'name email')
      .populate('appointment', 'scheduledAt status');

    console.log("Fetched Feedbacks:", feedbacks);

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { 
  getDoctorAppointments, 
  scheduleAppointment ,
  cancelAppointment ,
  getUpcomingAndUpdateAppointments,
  getDoctorFeedback
};
