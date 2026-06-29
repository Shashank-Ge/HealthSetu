import React, { useEffect, useState } from 'react';
import API from '../../../api';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';
import Footer from '../../common/Footer';
import ToggleMode from '../../ToggleMode';

const DoctorMeetings = () => {
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get(
        '/auth/doctor-dashboard/doctor-meetings'
      );
      setAppointments(response.data.appointments);
      setLoading(false);

      // Fetch feedbacks for all completed appointments
      const feedbacksResponse = await API.get(
        '/auth/doctor-dashboard/patient-feedbacks'
      );
      setFeedbacks(feedbacksResponse.data.feedbacks || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Get feedback for a specific appointment
  const getFeedbackForAppointment = (appointmentId) => {
    return feedbacks.find(feedback => feedback.appointment._id === appointmentId);
  };

  // Handle Cancel Appointment
  const handleCancel = async (appointmentId) => {
    const reason = prompt('Please enter the reason for cancellation:');
    if (!reason) return;

    setCancelLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await API.post(
        '/auth/doctor-dashboard/cancelAppointment',
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/loginDoctor');
  };

  return (
    <div className="app-container">
    <div className="dashboard-container">
      {/* Header */}
   




      <header className="main-header">
        <div className="header-content">
          <div className="logo-container">
            <h1 className="logo-text">HealthSetu</h1>
          </div>
          <div className="tagline-container">
            <span className="logo-tagline" >Your Health, Our Priority</span>
          </div>
          <div className="nav-menu">
            <button onClick={() => navigate('/doctor-dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/doctor-dashboard/doctor-profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="theme-toggle-wrapper">
          <ToggleMode />
        </div>
      </header>








      

      {/* Content */}
      <main className="dashboard-content">
        <section className="appointments-section">
          <h2>Confirmed & Completed Appointments</h2>
          {loading ? (
            <p className="text-center">Loading appointments...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <div className="appointments-grid">
              {appointments.map((appt) => {
                const feedback = getFeedbackForAppointment(appt._id);
                return (
                  <div key={appt._id} className="appointment-card">
                    <p><strong>Patient:</strong> {appt.patient?.name}</p>
                    <p><strong>Email:</strong> {appt.patient?.email}</p>
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

                    {/* Show Feedback if status is completed and feedback exists */}
                    {appt.status === 'completed' && feedback && (
                      <div className="feedback-section">
                        <p><strong>Patient Feedback:</strong></p>
                        <p className="feedback-message">{feedback.message}</p>
                        <p className="feedback-date">
                          <small>Received: {new Date(feedback.createdAt).toLocaleString()}</small>
                        </p>
                      </div>
                    )}

                    {/* Show no feedback message if completed but no feedback */}
                    {appt.status === 'completed' && !feedback && (
                      <p className="no-feedback-message">No feedback received yet.</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      
    </div>
     <Footer />
    </div>
  );
};

export default DoctorMeetings;