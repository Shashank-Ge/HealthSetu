import React, { useEffect, useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorName] = useState(localStorage.getItem('name') || '');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const status = localStorage.getItem('status');
    
    if (!token || role !== 'doctor') {
      navigate('/loginDoctor');
      return;
    }
    
    if (status !== 'approved') {
      navigate('/loginDoctor');
      return;
    }
    
    // Fetch appointments (placeholder for future functionality)
    fetchAppointments();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/auth/doctor-dashboard/appointments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
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
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <section className="welcome-section">
          <h1>Welcome to HealthSetu, Dr. {doctorName}!</h1>
          <p>Your dashboard to manage appointments and more</p>
        </section>

        <section className="appointments-section">
          <h2>Your Appointments</h2>
          <div className="appointments-grid">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <p>Appointment with {appointment.patient.name}</p>
                  <p>reason: {appointment.reason}</p>
                  <button className="action-button">Reschedule</button>
                  <button className="action-button">Cancel</button>
                </div>
              ))
            ) : (
              <p>No appointments scheduled.</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@healthsetu.com</p>
            <p>Phone: +91 1234567890</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HealthSetu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default DoctorDashboard;