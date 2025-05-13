import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound404.css';

const NotFound404 = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <div className="pulse-circle"></div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="medical-icons">
          <div className="icon heartbeat">❤️</div>
          <div className="icon pill">💊</div>
          <div className="icon stethoscope">🩺</div>
        </div>
        <Link to="/" className="home-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;