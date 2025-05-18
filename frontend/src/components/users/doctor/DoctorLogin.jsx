import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToggleMode from '../../ToggleMode';
import './DoctorLogin.css';

function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(false);
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
    setPendingStatus(false);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/loginDoctor', formData);
      
      // Check doctor status
      if (response.data.doctor.status === 'pending') {
        setPendingStatus(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'doctor');
        localStorage.setItem('name', response.data.doctor.name);
        localStorage.setItem('status', response.data.doctor.status);
      } else if (response.data.doctor.status === 'approved') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'doctor');
        localStorage.setItem('name', response.data.doctor.name);
        localStorage.setItem('status', response.data.doctor.status);
        navigate('/doctor-dashboard');
      } else {
        setError(`Your account status is: ${response.data.doctor.status}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="theme-toggle-wrapper auth-header-toggle">
        <ToggleMode />
      </div>
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>
      <div className="auth-form-container">
        <h2>Doctor Login</h2>
        
        <button 
          className="switch-role-btn"
          onClick={() => navigate('/loginPatient')}
        >
          Not a Doctor? Login Here
        </button>
        
        {error && <div className="error-message">{error}</div>}
        
        {pendingStatus ? (
          <div className="pending-status">
            <h3>Your account is pending approval</h3>
            <p>Please wait for admin approval. You can refresh this page to check your status.</p>
            <button onClick={() => window.location.reload()}>Refresh Status</button>
          </div>
        ) : (
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
        )}
        
        <div className="auth-links">
          <button 
            className="text-link"
            onClick={() => navigate('/signupDoctor')}
          >
            New Here? Register Doctor here
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;