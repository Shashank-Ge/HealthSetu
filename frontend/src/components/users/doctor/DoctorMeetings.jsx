import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorMeetings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [doctorName] = useState(localStorage.getItem('name') || '');
  const navigate = useNavigate();

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:8080/api/auth/doctor-dashboard/doctor-meetings',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/doctor-dashboard/cancelAppointment',
        { appointmentId, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      fetchAppointments(); // Refresh list
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/loginDoctor');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <Link to="/" className="logo-link">
          <div className="logo">HealthSetu</div>
        </Link>
        <nav className="nav-menu">
          <button onClick={() => navigate('/doctor-dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/doctor-dashboard/doctor-profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
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
              {appointments.map((appt) => (
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
                        {appt.meetLink}
                      </a>
                    </p>
                  )}

                  {/* Show Cancel Button only if status is confirmed */}
                  {appt.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="action-button"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2025 HealthSetu. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DoctorMeetings;
