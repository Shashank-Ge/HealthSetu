import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">HealthSetu</div>
        <nav className="nav-menu">
          <button onClick={() => navigate('/loginAdmin')}>Admin Login</button>
        </nav>
      </header>

      <main className="home-content">
        <section className="hero-section">
          <h1>Welcome to HealthSetu</h1>
          <p>Your one-stop solution for healthcare needs</p>
          <button 
            className="cta-button" 
            onClick={() => navigate('/loginPatient')}
          >
            Login/Signup
          </button>
        </section>

        <section className="features-section">
          <h2>Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Find Doctors</h3>
              <p>Connect with specialized doctors</p>
            </div>
            <div className="feature-card">
              <h3>Book Appointments</h3>
              <p>Schedule appointments with ease</p>
            </div>
            <div className="feature-card">
              <h3>Health Records</h3>
              <p>Access your medical history</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 HealthSetu. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;