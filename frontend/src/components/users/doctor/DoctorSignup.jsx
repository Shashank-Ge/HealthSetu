import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DoctorSignup.css';

function DoctorSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    collegeName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const specializations = [
    'Cardiologist',
    'Neurologist',
    'Dermatologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'Psychiatrist',
    'Oncologist',
    'Endocrinologist',
    'Gynecologist',
    'Gastroenterologist',
    'Nephrologist',
    'Pulmonologist',
    'Ophthalmologist',
    'ENT Specialist',
    'Urologist',
    'General Physician'
  ];

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
      const response = await axios.post('http://localhost:8080/api/auth/signupDoctor', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', 'doctor');
      localStorage.setItem('name', response.data.doctor.name);
      localStorage.setItem('status', response.data.doctor.status);
      
      navigate('/loginDoctor');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Responsive Header */}
      <header className="auth-header">
        <div className="logo" onClick={() => navigate('/')}>
          HealthSetu
        </div>
        <nav className="auth-nav">
          <button onClick={() => navigate('/loginDoctor')}>Login</button>
          <button onClick={() => navigate('/signupPatient')}>Signup as Patient</button>
        </nav>
      </header>

      {/* Signup Form */}
      <div className="auth-form-container">
        <h2>Doctor Registration</h2>
        
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
          
          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="collegeName">College Name</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
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
            onClick={() => navigate('/loginDoctor')}
          >
            Already Registered? Login Doctor
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorSignup;