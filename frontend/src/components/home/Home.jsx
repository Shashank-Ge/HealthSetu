import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="main-header">
        <div className="header-content">
          <div className="logo-container">
            <h1 className="logo-text">HealthSetu</h1>
          </div>
          <div className="tagline-container">
            <span className="logo-tagline">Your Health, Our Priority</span>
          </div>
          <div className="nav-menu">
            <a href="#find-doctors" className="nav-link">Doctors</a>
            <a href="#health-tips" className="nav-link">Health Tips</a>
            {/* <button className="admin-link" onClick={() => navigate('/loginAdmin')}>
              Admin Login
            </button> */}
          </div>
        </div>
      </header>

      <main className="home-content">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to HealthSetu</h1>
          <p className="hero-subtitle">Your one-stop solution for healthcare needs</p>
          <p className="hero-tagline">Book & take appointments from the ease of your home!</p>
          <button 
            className="cta-button" 
            onClick={() => navigate('/loginPatient')}
          >
            Login/Signup
          </button>
        </section>

        <section className="features-section" id="find-doctors">
          <h2>Find Doctors</h2>
          <div className="doctor-slider">
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=" alt="Dr. Sarah Johnson" />
              </div>
              <h3>Dr. Sarah Johnson</h3>
              <p className="specialization">Cardiologist</p>
              <p className="experience">15+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://png.pngtree.com/png-clipart/20240323/original/pngtree-professional-doctor-with-order-png-image_14666249.png" alt="Dr. Michael Chen" />
              </div>
              <h3>Dr. Michael Chen</h3>
              <p className="specialization">Neurologist</p>
              <p className="experience">12+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://t4.ftcdn.net/jpg/03/20/74/45/360_F_320744517_TaGkT7aRlqqWdfGUuzRKDABtFEoN5CiO.jpg" alt="Dr. Emily Patel" />
              </div>
              <h3>Dr. Emily Patel</h3>
              <p className="specialization">Pediatrician</p>
              <p className="experience">10+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://img.freepik.com/free-photo/portrait-male-doctor_23-2148480369.jpg?semt=ais_hybrid&w=740" alt="Dr. Robert Wilson" />
              </div>
              <h3>Dr. Robert Wilson</h3>
              <p className="specialization">Orthopedic Surgeon</p>
              <p className="experience">18+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://media.istockphoto.com/id/182706361/photo/beautiful-mature-female-doctor-standing-in-uniform-against-white.jpg?s=612x612&w=0&k=20&c=EfPxtgPc4iHe1O28xxZnEZXh3U_GO8etTGRkUbmIj2U=" alt="Dr. Lisa Martinez" />
              </div>
              <h3>Dr. Lisa Martinez</h3>
              <p className="specialization">Dermatologist</p>
              <p className="experience">14+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://media.istockphoto.com/id/869573918/photo/portrait-of-a-serious-confident-male-doctor.jpg?s=612x612&w=0&k=20&c=_Y-ZAXQHTKaV8R6GpY8hXl246B-GjRcGj6G0oK93FzQ=" alt="Dr. James Kim" />
              </div>
              <h3>Dr. James Kim</h3>
              <p className="specialization">Psychiatrist</p>
              <p className="experience">16+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://media.istockphoto.com/id/1292015214/photo/portrait-female-doctor-stock-photo.jpg?s=612x612&w=0&k=20&c=nr4XaWnRPQnWqwhzahajZhskIDG1yK9DmIteV5gpUOI=" alt="Dr. Maanvi Sharma" />
              </div>
              <h3>Dr. Maanvi Sharma</h3>
              <p className="specialization">Endocrinologist</p>
              <p className="experience">13+ years experience</p>
            </div>
          </div>
        </section>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Book Appointments</h3>
            <p>Schedule appointments with ease</p>
          </div>
          <div className="feature-card">
            <h3>Health Records</h3>
            <p>Access your medical history</p>
          </div>
        </div>

        <section className="health-tips-section" id="health-tips">
          <h2>Health Tips for Better Living</h2>
          
          <div className="tips-container">
            <div className="tips-category">
              <h3>General Wellness Tips</h3>
              <ul className="tips-list">
                <li>
                  <h4>Stay Hydrated</h4>
                  <p>Drink at least 8 glasses of water daily to maintain good health and energy levels.</p>
                </li>
                <li>
                  <h4>Regular Exercise</h4>
                  <p>Aim for 30 minutes of moderate exercise daily to boost physical and mental health.</p>
                </li>
                <li>
                  <h4>Balanced Diet</h4>
                  <p>Include fruits, vegetables, whole grains, and lean proteins in your daily meals.</p>
                </li>
              </ul>
            </div>

            <div className="tips-category">
              <h3>Specific Health Concerns</h3>
              <div className="specific-tips-grid">
                <div className="tip-card">
                  <h4>Respiratory Health</h4>
                  <ul>
                    <li>Take regular walks in fresh air</li>
                    <li>Practice deep breathing exercises</li>
                    <li>Keep indoor air clean and well-ventilated</li>
                  </ul>
                </div>
                <div className="tip-card">
                  <h4>Joint Health</h4>
                  <ul>
                    <li>Maintain good posture while sitting</li>
                    <li>Do gentle stretching exercises</li>
                    <li>Stay active but avoid overexertion</li>
                  </ul>
                </div>
                <div className="tip-card">
                  <h4>Eye Care</h4>
                  <ul>
                    <li>Follow the 20-20-20 rule when using screens</li>
                    <li>Protect eyes from direct sunlight</li>
                    <li>Eat foods rich in vitamins A and C</li>
                  </ul>
                </div>
                <div className="tip-card">
                  <h4>Mental Wellness</h4>
                  <ul>
                    <li>Practice daily meditation or mindfulness</li>
                    <li>Maintain a regular sleep schedule</li>
                    <li>Stay connected with family and friends</li>
                  </ul>
                </div>
              </div>
            </div>
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

export default Home;