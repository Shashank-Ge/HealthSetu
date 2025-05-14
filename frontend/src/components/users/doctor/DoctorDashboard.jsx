import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './DoctorDashboard.css';

function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorName] = useState(localStorage.getItem('name') || '');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const status = localStorage.getItem('status');
    if (!token || role !== 'doctor' || status !== 'approved') {
      navigate('/loginDoctor');
      return;
    }
    fetchAppointments();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:8080/api/auth/doctor-dashboard/appointments',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Filter only pending appointments
      const pendingAppointments = response.data.appointments
        .filter((a) => a.status === 'pending')
        .map((a) => ({ ...a, scheduledDate: '', scheduledTime: '' }));

      setAppointments(pendingAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSchedule = async (appointmentId, patientId, date, time) => {
    if (!date || !time) {
      alert('Please select both date and time!');
      return;
    }
    const token = localStorage.getItem('token');
    const scheduledDateTime = new Date(`${date}T${time}:00`).toISOString();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/doctor-dashboard/scheduleAppointments',
        { doctorName, patientId, appointmentId, scheduledDateTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      fetchAppointments(); // Refresh after scheduling
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment.');
    }
  };

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
      fetchAppointments(); // Refresh after cancelling
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
      <header className="dashboard-header">
        <Link to="/" className="logo-link"><div className="logo">HealthSetu</div></Link>
        <nav className="nav-menu">
          <button onClick={()=> navigate('/doctor-dashboard/doctor-Meetings')}>Meetings</button>
          <button onClick={() => navigate('/doctor-dashboard/doctor-profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="dashboard-content">
        <section className="welcome-section">
          <h1>Welcome to HealthSetu, Dr. {doctorName}!</h1>
          <p>Your dashboard to manage appointments and more</p>
        </section>

        <section className="appointments-section">
          <h2>Pending Appointments</h2>
          {appointments.length === 0 ? (
            <p>No pending appointments.</p>
          ) : (
            <div className="appointments-grid">
              {appointments.map((appointment, idx) => (
                <div key={appointment._id} className="appointment-card">
                  <p>Appointment with {appointment.patient?.name}</p>
                  <p>Reason: {appointment.reason}</p>

                  <label>
                    Select Date:
                    <input
                      type="date"
                      value={appointment.scheduledDate}
                      onChange={e => {
                        const updated = [...appointments];
                        updated[idx].scheduledDate = e.target.value;
                        setAppointments(updated);
                      }}
                    />
                  </label>

                  <label>
                    Select Time:
                    <input
                      type="time"
                      value={appointment.scheduledTime}
                      onChange={e => {
                        const updated = [...appointments];
                        updated[idx].scheduledTime = e.target.value;
                        setAppointments(updated);
                      }}
                    />
                  </label>

                  <button
                    className="action-button"
                    onClick={() =>
                      handleSchedule(
                        appointment._id,
                        appointment.patient._id,
                        appointment.scheduledDate,
                        appointment.scheduledTime
                      )
                    }
                  >
                    Schedule
                  </button>

                  <button
                    className="action-button cancel"
                    onClick={() => handleCancel(appointment._id)}
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 HealthSetu. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DoctorDashboard;