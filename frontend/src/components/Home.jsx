import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-content">
            <h1 className="nav-logo">HealthSetu</h1>
            <div className="nav-buttons">
              <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
              <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Health Journey <br />
            <span className="text-blue-600">Starts Here</span>
          </h1>
          <p className="hero-subtitle">
            Connect with top healthcare professionals and manage your appointments seamlessly
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3 className="feature-title">Expert Doctors</h3>
              <p className="feature-text">Access to a network of verified and experienced healthcare professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Easy Booking</h3>
              <p className="feature-text">Book appointments instantly with your preferred doctors</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3 className="feature-title">Online Consultations</h3>
              <p className="feature-text">Get medical advice from anywhere through video consultations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;