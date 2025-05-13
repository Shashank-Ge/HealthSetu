import React, { useState, useEffect } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';

function PatientDashboard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const name = localStorage.getItem("name");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/auth/patient-dashboard/doctors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginPatient");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Link to="/" className="logo-link">
          <div className="logo">HealthSetu</div>
        </Link>
        <nav className="nav-menu">
          <button onClick={() => navigate('/patient-dashboard/patient-profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="dashboard-content">
        <section className="welcome-section">
          <h1>Welcome to HealthSetu, {name}!</h1>
          <p>Your journey to better health starts here</p>
        </section>

        <section className="doctors-section">
          <h2>Available Doctors</h2>
          <div className="doctors-grid">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor._id} className="doctor-card">
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialization}</p>
                  <button
                    onClick={() => navigate(`/patient-dashboard/bookAppointment/${doctor._id}`)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <p>No doctors available at the moment.</p>
            )}
          </div>
        </section>
      </main>

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
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
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

export default PatientDashboard;