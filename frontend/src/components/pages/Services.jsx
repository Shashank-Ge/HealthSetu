import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleMode from '../ToggleMode';
import './Pages.css';

const Services = () => {
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
        <h1>Our Services</h1>
        <div className="theme-toggle-wrapper">
          <ToggleMode />
        </div>
      </div>
      
      <div className="page-content">
        <section className="services-section">
          <h2>Healthcare Services We Offer</h2>
          <p>
            HealthSetu provides a comprehensive range of services designed to improve 
            the healthcare experience for both patients and healthcare providers.
          </p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">👨‍⚕️</div>
              <h3>Doctor Consultations</h3>
              <p>
                Connect with qualified doctors across various specializations. Book appointments, 
                have virtual consultations, and receive personalized medical advice.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📅</div>
              <h3>Appointment Management</h3>
              <p>
                Easily schedule, reschedule, or cancel appointments. Receive timely reminders 
                and manage your healthcare calendar efficiently.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Specialist Referrals</h3>
              <p>
                Get referred to specialists based on your health needs. Our platform ensures 
                you find the right specialist for your specific condition.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">💊</div>
              <h3>Health Tips & Resources</h3>
              <p>
                Access a wealth of health information, tips, and resources to help you 
                maintain a healthy lifestyle and make informed health decisions.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Secure Health Records</h3>
              <p>
                Maintain your health records securely on our platform. Access your medical 
                history, prescriptions, and test results whenever needed.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Telemedicine</h3>
              <p>
                Consult with doctors remotely through our secure video conferencing feature. 
                Get medical advice from the comfort of your home.
              </p>
            </div>
          </div>
          
          <h2>For Healthcare Providers</h2>
          <p>
            HealthSetu also offers specialized services for doctors and healthcare providers:
          </p>
          
          <ul className="provider-services">
            <li>Patient management system</li>
            <li>Appointment scheduling and reminders</li>
            <li>Secure communication with patients</li>
            <li>Digital prescription management</li>
            <li>Professional profile management</li>
          </ul>
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

export default Services;