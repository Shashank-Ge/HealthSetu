import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../api';
import ToggleMode from '../../ToggleMode';
import './PatientSignup.css';
import Footer from '../../common/Footer';


function PatientSignup() {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await API.post('/auth/signupPatient', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('name', response.data.name);
      
      navigate('/patient-dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app-container'>
      <header className="main-header">
        <div className="header-content">
          <div className="logo-container">
            <h1 className="logo-text">HealthSetu</h1>
          </div>
          <div className="tagline-container">
            <span className="logo-tagline" >Your Health, Our Priority</span>
          </div>
        </div>
        <div className="theme-toggle-wrapper">
          <ToggleMode />
        </div>
      </header>
    <div className="auth-container">
      <div className='back-button-wrapper'>
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>
      </div>
      <div className="auth-form-container">
        <h2>Patient Registration</h2>
        
        <button 
          className="switch-role-btn"
          onClick={() => navigate('/signupDoctor')}
        >
          Are you Doctor? Register here
        </button>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-links">
          <button 
            className="text-link"
            onClick={() => navigate('/loginPatient')}
          >
            Already Registered? Login Patient Here
          </button>
        </div>
      </div>
      
    </div>
     <Footer />
    </div>
  );
}

export default PatientSignup;