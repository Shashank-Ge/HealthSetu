const Appointment = require('../../models/Appointment');
const Doctor = require('../../models/Doctor');
const Patient = require('../../models/Patient');
const Feedback = require('../../models/Feedback');
const sendEmail = require('../../sendEmail');

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

module.exports = { bookAppointment, getApprovedDoctors, submitFeedback };
