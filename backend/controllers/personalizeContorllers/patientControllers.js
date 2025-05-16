const Appointment = require('../../models/Appointment');
const Doctor = require('../../models/Doctor');
const Patient = require('../../models/Patient');
const Feedback = require('../../models/Feedback');
const sendEmail = require('../../sendEmail');
const { deleteGoogleCalendarEvent } = require('../../googleMeetService');

const bookAppointment = async (req, res) => {
  const { doctorId, reason } = req.body;
  const patientId = req.patient.userId;

  if (!doctorId || !reason) {
    return res.status(400).json({ message: "Doctor ID and reason are required." });
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or patient not found." });
    }

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      reason,
    });

    await appointment.save();

    // Doctor email content
    const doctorEmailHTML = `
      <p>Dear Dr. ${doctor.name},</p>
      <p>You have received a new appointment request.</p>
      <p><strong>Patient:</strong> ${patient.name} (${patient.email})</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>Please visit your dashboard to view and manage this appointment.</p>
      <br/>
      <p>Best regards,<br/>DocMeet Team</p>
    `;

    // Patient email content
    const patientEmailHTML = `
      <p>Dear ${patient.name},</p>
      <p>Your appointment request with <strong>Dr. ${doctor.name}</strong> has been submitted successfully.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>You will be notified once the doctor responds.</p>
      <br/>
      <p>Best regards,<br/>DocMeet Team</p>
    `;

    // Send emails
    await sendEmail(doctor.email, 'New Appointment Request', doctorEmailHTML);
    await sendEmail(patient.email, 'Appointment Request Submitted', patientEmailHTML);

    res.status(201).json({
      message: "Appointment booked and confirmation emails sent.",
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

// Controller: Patient submits feedback
const submitFeedback = async (req, res) => {
  const { appointmentId, message } = req.body;
  const patientId = req.patient.userId; // assuming authentication middleware sets this

  if (!appointmentId || !message) {
    return res.status(400).json({ message: 'Appointment ID and feedback message are required.' });
  }

  try {
    const appointment = await Appointment.findById(appointmentId);

    // Check appointment validity, ownership, and status
    if (!appointment || appointment.patient.toString() !== patientId) {
      return res.status(403).json({ message: 'Invalid appointment or not authorized.' });
    }

    if (appointment.status !== 'completed') {
      return res.status(400).json({ message: 'Feedback can only be submitted after the appointment is completed.' });
    }

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({ appointment: appointmentId });
    if (existingFeedback) {
      return res.status(400).json({ message: 'Feedback already submitted for this appointment.' });
    }

    const feedback = new Feedback({
      appointment: appointment._id,
      patient: appointment.patient,
      doctor: appointment.doctor,
      message,
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully.', feedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all appointments for a patient
const getPatientAppointments = async (req, res) => {
  const patientId = req.patient.userId;
  try {
    const appointments = await Appointment.find({ patient: patientId })
      .populate('doctor', 'name email specialization')
      .sort({ createdAt: -1 });
    res.status(200).json({ message: 'Appointments fetched successfully.', appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel an appointment (patient side)
const cancelAppointment = async (req, res) => {
  const { appointmentId, reason } = req.body;
  const patientId = req.patient.userId;

  if (!appointmentId || !reason) {
    return res.status(400).json({ message: 'Appointment ID and reason are required' });
  }

  try {
    // Find the appointment and populate doctor info
    const appointment = await Appointment.findOne({ _id: appointmentId, patient: patientId })
      .populate('doctor', 'name email');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or unauthorized' });
    }

    // Extract doctor email and name
    const doctorEmail = appointment.doctor.email;
    const doctorName = appointment.doctor.name;
    const patient = await Patient.findById(patientId);
    const patientName = patient?.name || 'Patient';

    console.log(`Patient ${patientId} cancelled appointment ${appointmentId}. Reason: ${reason}`);

    // Delete the Google Calendar event if it exists
    if (appointment.googleEventId) {
      await deleteGoogleCalendarEvent(appointment.googleEventId);
    }

    // Send cancellation email to doctor
    await sendEmail(
      doctorEmail,
      `Appointment with ${patientName} has been cancelled`,
      `<p>Dear Dr. ${doctorName},</p>
      <p>The appointment with ${patientName} has been <strong>cancelled</strong> by the patient.</p>
      <p><strong>Reason:</strong> ${reason}</p>`
    );

    // Delete the appointment
    await Appointment.findByIdAndDelete(appointmentId);

    return res.status(200).json({ message: 'Appointment cancelled and doctor notified' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get upcoming and completed appointments with status updates
const getUpcomingAndUpdateAppointments = async (req, res) => {
  try {
    const patientId = req.patient.userId;

    // Get confirmed and completed appointments for this patient
    let appointments = await Appointment.find({
      patient: patientId,
      status: { $in: ['confirmed', 'completed'] },
    }).populate('doctor', 'name email specialization');

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

    // For each completed appointment, check if feedback exists
    const appointmentsWithFeedbackStatus = await Promise.all(
      appointments.map(async (appointment) => {
        const apptObj = appointment.toObject();
        if (appointment.status === 'completed') {
          const feedback = await Feedback.findOne({ appointment: appointment._id });
          apptObj.hasFeedback = !!feedback;
        }
        return apptObj;
      })
    );

    res.status(200).json({
      message: 'Upcoming and completed appointments fetched successfully.',
      appointments: appointmentsWithFeedbackStatus,
    });
  } catch (error) {
    console.error('Error in getUpcomingAndUpdateAppointments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  bookAppointment, 
  getApprovedDoctors, 
  submitFeedback,
  getPatientAppointments,
  cancelAppointment,
  getUpcomingAndUpdateAppointments
};
