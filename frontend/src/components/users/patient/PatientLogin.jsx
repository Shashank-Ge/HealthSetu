import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToggleMode from '../../ToggleMode';
import './PatientLogin.css';
import Footer from '../../common/Footer';

function PatientLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/loginPatient', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('name', response.data.name);
      
      navigate('/patient-dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div classname='app-container'>
    <div className="auth-container">
      <div className="theme-toggle-wrapper auth-header-toggle">
        <ToggleMode />
      </div>
      <div className="back-button-wrapper">
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Home  
      </button>
      </div>
      <div className="auth-form-container">
        <h2>Patient Login</h2>
        
        <button 
          className="switch-role-btn"
          onClick={() => navigate('/loginDoctor')}
        >
          Are you Doctor? Login Here
        </button>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-links">
          <button 
            className="text-link"
            onClick={() => navigate('/signupPatient')}
          >
            New Here? Get Register
          </button>
        </div>
      </div>
     
    </div>
    <Footer />
    </div>
  );
}

export default PatientLogin;