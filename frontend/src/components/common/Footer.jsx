import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ToggleMode from '../ToggleMode';
import './Footer.css';


const Footer = () => {
  const navigate = useNavigate();

  return (
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
              <a href="/about" onClick={(e) => {e.preventDefault(); navigate('/about');}}>About Us</a>
            </li>
            <li>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}}>Services</a>
            </li>
            <li>
              <a href="/privacy" onClick={(e) => {e.preventDefault(); navigate('/privacy');}}>Privacy Policy</a>
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
  );
};

export default Footer;