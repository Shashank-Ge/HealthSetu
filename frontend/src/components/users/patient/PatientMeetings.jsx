import React, { useEffect, useState } from 'react';
import API from '../../../api';
import { useNavigate, Link } from 'react-router-dom';
import './PatientDashboard.css';
import Footer from '../../common/Footer';


const PatientMeetings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [patientName] = useState(localStorage.getItem('name') || '');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState({});
  const navigate = useNavigate();

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get(
        '/auth/patient-dashboard/patient-meetings'
      );
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle Cancel Appointment
  const handleCancel = async (appointmentId) => {
    const reason = prompt('Please enter the reason for cancellation:');
    if (!reason) return;

    setCancelLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await API.post(
        '/auth/patient-dashboard/cancelAppointment',
        { appointmentId, reason }
      );
      alert(response.data.message);
      fetchAppointments(); // Refresh list
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment.');
    } finally {
      setCancelLoading(false);
    }
  };

  // Handle Submit Feedback
  const handleSubmitFeedback = async (appointmentId) => {
    const message = prompt('Please provide your feedback about the consultation:');
    if (!message) return;

    setFeedbackLoading(prev => ({ ...prev, [appointmentId]: true }));
    const token = localStorage.getItem('token');

    try {
      const response = await API.post(
        '/auth/patient-dashboard/giveFeedback',
        { appointmentId, message }
      );
      alert('Feedback submitted successfully!');
      fetchAppointments(); // Refresh list
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    } finally {
      setFeedbackLoading(prev => ({ ...prev, [appointmentId]: false }));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/loginPatient');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <Link to="/" className="logo-link">
          <div className="logo">HealthSetu</div>
        </Link>
        <nav className="nav-menu">
          <button onClick={() => navigate('/patient-dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/patient-dashboard/patient-profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Content */}
      <main className="dashboard-content">
        <section className="appointments-section">
          <h2>My Meetings</h2>
          {loading ? (
            <p className="text-center">Loading meetings...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : appointments.length === 0 ? (
            <p>No meetings found.</p>
          ) : (
            <div className="appointments-grid">
              {appointments.map((appt) => (
                <div key={appt._id} className="appointment-card">
                  <p><strong>Doctor:</strong> {appt.doctor?.name}</p>
                  <p><strong>Specialization:</strong> {appt.doctor?.specialization}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`font-semibold ${appt.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {appt.status}
                    </span>
                  </p>
                  <p>
                    <strong>Scheduled At:</strong>{' '}
                    {appt.scheduledAt ? new Date(appt.scheduledAt).toLocaleString() : 'Not scheduled'}
                  </p>

                  {/* Show Meet Link only if NOT completed */}
                  {appt.status !== 'completed' && appt.meetLink && (
                    <p>
                      <strong>Meet Link:</strong>{' '}
                      <a
                        href={appt.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Join Meeting
                      </a>
                    </p>
                  )}

                  {/* Show Cancel Button only if status is confirmed */}
                  {appt.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="action-button"
                      disabled={cancelLoading}
                    >
                      {cancelLoading ? 'Cancelling...' : 'Cancel Meeting'}
                    </button>
                  )}

                  {/* Show Feedback Button if completed and no feedback given yet */}
                  {appt.status === 'completed' && !appt.hasFeedback && (
                    <button
                      onClick={() => handleSubmitFeedback(appt._id)}
                      className="feedback-button"
                      disabled={feedbackLoading[appt._id]}
                    >
                      {feedbackLoading[appt._id] ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                  )}

                  {/* Show Feedback Given indicator if already provided */}
                  {appt.status === 'completed' && appt.hasFeedback && (
                    <p className="feedback-given">✓ Feedback Submitted</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PatientMeetings; 