import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
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
            <span className="logo-tagline" >Your Health, Our Priority</span>
          </div>
          <div className="nav-menu">
            <Link to="find-doctors" smooth={true} offset={-100} duration={500} className="nav-link">Doctors</Link>
            <Link to="health-tips" smooth={true} offset={-100} duration={500} className="nav-link">Health Tips</Link>
            <Link to="feedback" smooth={true} offset={-100} duration={500} className="nav-link">Feedback</Link>
          </div>
        </div>
      </header>

      <main className="home-content">
        <section className="hero-section">
          <h1 className="hero-title" >Welcome to HealthSetu</h1>
          <p className="hero-subtitle" >Your one-stop solution for healthcare needs</p>
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

            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=" alt="Dr. Sarah Johnson" />
              </div>
              <h3>Dr. Sarah Johnson</h3>
              <p className="specialization">Cardiologist</p>
              <p className="experience">7+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://png.pngtree.com/png-clipart/20240323/original/pngtree-professional-doctor-with-order-png-image_14666249.png" alt="Dr. Michael Chen" />
              </div>
              <h3>Dr. Michael Chen</h3>
              <p className="specialization">Neurologist</p>
              <p className="experience">9+ years experience</p>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="https://t4.ftcdn.net/jpg/03/20/74/45/360_F_320744517_TaGkT7aRlqqWdfGUuzRKDABtFEoN5CiO.jpg" alt="Dr. Emily Patel" />
              </div>
              <h3>Dr. Emily Patel</h3>
              <p className="specialization">Pediatrician</p>
              <p className="experience">5+ years experience</p>
            </div>
          </div>
        </section>

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

        <section className="feedback-section" id="feedback">
          <h2>What Our Users Say</h2>
          <div className="reviews-container">
            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Mitchell" />
                <div className="reviewer-info">
                  <h4>Sarah Mitchell</h4>
                  <div className="star-rating">★★★★★</div>
                </div>
              </div>
              <p className="review-text">"HealthSetu made it so easy to find the right doctor and book appointments. The health tips section is a bonus that helps me maintain a healthy lifestyle!"</p>
            </div>

            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Anderson" />
                <div className="reviewer-info">
                  <h4>John Anderson</h4>
                  <div className="star-rating">★★★★★</div>
                </div>
              </div>
              <p className="review-text">"Great platform! I was able to quickly find a specialist and get an appointment. The interface is user-friendly and the process is seamless."</p>
            </div>

            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Maria Garcia" />
                <div className="reviewer-info">
                  <h4>Maria Garcia</h4>
                  <div className="star-rating">★★★★½</div>
                </div>
              </div>
              <p className="review-text">"The health tips are really helpful and practical. I appreciate how the platform focuses on overall wellness, not just medical appointments."</p>
            </div>

            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://randomuser.me/api/portraits/men/92.jpg" alt="David Chen" />
                <div className="reviewer-info">
                  <h4>David Chen</h4>
                  <div className="star-rating">★★★★★</div>
                </div>
              </div>
              <p className="review-text">"Being able to see doctor profiles and their experience before booking an appointment gives me confidence in choosing the right healthcare provider."</p>
            </div>

            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://randomuser.me/api/portraits/women/89.jpg" alt="Kenelly Kruce" />
                <div className="reviewer-info">
                  <h4>Kenelly Kruce</h4>
                  <div className="star-rating">★★★★★</div>
                </div>
              </div>
              <p className="review-text">"The appointment reminders and easy rescheduling options have made managing my healthcare so much more convenient. Highly recommended!"</p>
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