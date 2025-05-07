import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './Signup.css';
import './Login.css'; // Import Login styles as well since we're sharing some

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      navigate(role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/signup', formData);
      const { token, role, name } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);

      navigate(role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Sign Up</h1>
          <h2 className="auth-subtitle">Create Account</h2>
          <p className="auth-subtitle">Join HealthSetu today</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input className="form-input" type="text" placeholder="Name" />
          <input className="form-input" type="email" placeholder="Email" />
          <input className="form-input" type="password" placeholder="Password" />
          <select className="form-select">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button className="signup-button">Create Account</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link className="auth-link" to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
