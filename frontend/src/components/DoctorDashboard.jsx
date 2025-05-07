import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    // Fetch the doctor's name from local storage or backend
    const storedDoctorName = localStorage.getItem("doctorName"); // Assuming it's stored in localStorage
    if (storedDoctorName) {
      setDoctorName(storedDoctorName);
    } else {
      // Redirect to login if no doctor name is found
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">HealthSetu</div>
        <nav className="nav-menu">
          <button onClick={() => navigate("/profile")}>Profile</button>
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
            <div className="appointment-card">
              <p>Appointment with Patient XYZ</p>
              <button className="action-button">Reschedule</button>
              <button className="action-button">Approve</button>
            </div>
            {/* Add more appointments here */}
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