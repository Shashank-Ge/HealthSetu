import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleMode from '../ToggleMode';
import './Pages.css';

const Privacy = () => {
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
        <h1>Privacy Policy</h1>
        <div className="theme-toggle-wrapper">
          <ToggleMode />
        </div>
      </div>

      <div className="page-content">
        <section className="privacy-section">
          <p className="last-updated">Last Updated: May 1, 2025</p>
          
          <div className="privacy-intro">
            <p>
              At HealthSetu, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
              please do not access the platform.
            </p>
          </div>
          
          <div className="privacy-item">
            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Health information that you choose to share</li>
              <li>Account credentials</li>
              <li>Feedback and correspondence</li>
              <li>Transaction information</li>
            </ul>
          </div>
          
          <div className="privacy-item">
            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions</li>
              <li>Sending administrative information</li>
              <li>Sending marketing and promotional communications</li>
              <li>Responding to your comments, questions, and requests</li>
              <li>Protecting our rights and interests</li>
            </ul>
          </div>
          
          <div className="privacy-item">
            <h2>Sharing of Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Healthcare providers as necessary for your care</li>
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors</li>
              <li>In response to legal process</li>
              <li>To protect our rights and interests</li>
            </ul>
          </div>
          
          <div className="privacy-item">
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your 
              personal information. However, please note that no method of transmission over the Internet or 
              electronic storage is 100% secure.
            </p>
          </div>
          
          <div className="privacy-item">
            <h2>Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
          </div>
          
          <div className="privacy-item">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@healthsetu.com
              <br />
              Phone: +91 1234567890
            </p>
          </div>
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

export default Privacy;