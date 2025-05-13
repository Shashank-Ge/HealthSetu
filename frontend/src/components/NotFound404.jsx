import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound404.css';

const NotFound404 = () => {
  return (
    <div className="not-found-container">
      <div className="dna-helix"></div>
      <div className="not-found-content">
        <div className="error-code">404</div>
        <div className="pulse-circle"></div>
        <div className="pulse-circle-2"></div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="medical-icons">
          <div className="icon heartbeat">❤️</div>
          <div className="icon pill">💊</div>
          <div className="icon stethoscope">🩺</div>
          <div className="icon hospital">🏥</div>
          <div className="icon ambulance">🚑</div>
        </div>
        <div>
          <Link to="/" className="home-button">
            Return to Home
          </Link>
          <Link to="/loginDoctor" className="doctor-button">
            Doctor Login
          </Link>
          <Link to="/loginPatient" className="patient-button">
            Patient Login
          </Link>
        </div>
        <div className="health-tip">
          <div className="health-tip-title">HealthSetu Tip</div>
          <p>Remember to stay hydrated and take regular breaks from screen time for better eye health. Your wellbeing is our priority!</p>
        </div>
      </div>
      <div className="stethoscope-animation"></div>
    </div>
  );
};

export default NotFound404;