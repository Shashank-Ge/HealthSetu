import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../api';
import ToggleMode from '../../ToggleMode';
import './DoctorProfile.css';
import Footer from '../../common/Footer';

function DoctorProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    collegeName: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'doctor') {
      navigate('/loginDoctor');
      return;
    }
    
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await API.get('/auth/doctor-profile');
      
      setProfile(response.data.doctor);
      setFormData({
        name: response.data.doctor.name,
        specialization: response.data.doctor.specialization,
        collegeName: response.data.doctor.collegeName
      });
      
      if (response.data.doctor.profileImage) {
        // Use timestamp instead of random string for cache busting
        const timestamp = new Date().getTime();
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
        // Remove '/api' from the end if it exists to construct the base URL
        const baseUrl = apiBaseUrl.endsWith('/api') ? apiBaseUrl.slice(0, -4) : apiBaseUrl;
        setImagePreview(`${baseUrl}/uploads/doctors/${response.data.doctor.profileImage}?t=${timestamp}`);
      } else {
        setImagePreview(null);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    
    try {
      const token = localStorage.getItem('token');
      
      // Create form data for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('specialization', formData.specialization);
      formDataToSend.append('collegeName', formData.collegeName);
      
      if (selectedImage) {
        formDataToSend.append('profileImage', selectedImage);
      }
      
      const response = await API.put(
        '/auth/doctor-profile',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setProfile(response.data.doctor);
      setUpdateSuccess(true);
      
      // Update localStorage with new name if changed
      if (response.data.doctor.name !== localStorage.getItem('name')) {
        localStorage.setItem('name', response.data.doctor.name);
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
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
              <span className="logo-tagline">Your Health, Our Priority</span>
            </div>
          </div>
          <div className="theme-toggle-wrapper">
            <ToggleMode />
          </div>
        </header>

    <div className="profile-container" style={{marginTop: "90px"}}>
      <div className="back-button-wrapper">
        <button 
          className="back-button"
          onClick={() => navigate('/doctor-dashboard')} style={{color:'#007bff'}}
        >
          Back to Dashboard
        </button>
      </div>
      <div className="profile-header">
        <h1>Doctor Profile</h1>
      </div>
      
      {loading ? (
        <div className="loading">Loading profile...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="profile-content">
          <div className="profile-image-section">
            <div className="profile-image-container">
            {imagePreview ? (
              <img 
                key={new Date().getTime()} 
                src={imagePreview} 
                alt="Profile" 
                className="profile-image"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="profile-image-placeholder">
                <span>{profile.name.charAt(0)}</span>
              </div>
            )}
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleImageChange}
              className="image-input"
            />
            <label htmlFor="profileImage" className="image-input-label">
              Change Profile Picture
            </label>
          </div>
          
          <div className="profile-details">
            {updateSuccess && (
              <div className="success-message">Profile updated successfully!</div>
            )}
            
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
                  value={profile.email}
                  disabled
                  className="disabled-input"
                />
                <small>Email cannot be changed</small>
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
              
              <div className="form-group">
                <label>Account Status</label>
                <div className={`status-badge status-${profile.status}`}>
                  {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                </div>
              </div>
              
              <button type="submit" className="update-button">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
      
    </div>
    <Footer />
    </div>
  );
}

export default DoctorProfile;