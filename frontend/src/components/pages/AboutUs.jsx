import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleMode from '../ToggleMode';
import './Pages.css';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1>About Us</h1>
        <div className="theme-toggle-wrapper">
          <ToggleMode />
        </div>
      </div>
      
      <div className="page-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At HealthSetu, our mission is to bridge the gap between patients and healthcare providers, 
            making quality healthcare accessible to everyone. We believe that technology can transform 
            the healthcare experience, making it more efficient, transparent, and patient-centered.
          </p>
          
          <h2>Our Story</h2>
          <p>
            Founded in 2023, HealthSetu was born from a simple observation: scheduling medical appointments 
            and accessing healthcare information should be easier. Our team of healthcare professionals and 
            technology experts came together to create a platform that simplifies the healthcare journey for 
            both patients and doctors.
          </p>
          
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Accessibility</h3>
              <p>Making healthcare accessible to everyone, regardless of location or background.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Continuously improving our platform to provide cutting-edge healthcare solutions.</p>
            </div>
            <div className="value-card">
              <h3>Integrity</h3>
              <p>Maintaining the highest standards of ethics and privacy in all our operations.</p>
            </div>
            <div className="value-card">
              <h3>Empathy</h3>
              <p>Understanding and addressing the unique needs of each patient and healthcare provider.</p>
            </div>
          </div>
          
          <h2>Our Team</h2>
          <p>
            HealthSetu is powered by a diverse team of healthcare professionals, technology experts, and 
            customer service specialists. Together, we work to ensure that our platform provides the best 
            possible experience for all users.
          </p>
        </section>
      </div>

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
};

export default AboutUs;