import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PatientProfile.css';

function PatientProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'patient') {
      navigate('/loginPatient');
      return;
    }
    
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/auth/patient-profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setProfile(response.data.patient);
      setFormData({
        name: response.data.patient.name
      });
      
      if (response.data.patient.profileImage) {
        setImagePreview(`http://localhost:8080/uploads/patients/${response.data.patient.profileImage}`);
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
      
      if (selectedImage) {
        formDataToSend.append('profileImage', selectedImage);
      }
      
      const response = await axios.put(
        'http://localhost:8080/api/auth/patient-profile',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setProfile(response.data.patient);
      setUpdateSuccess(true);
      
      // Update localStorage with new name if changed
      if (response.data.patient.name !== localStorage.getItem('name')) {
        localStorage.setItem('name', response.data.patient.name);
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Patient Profile</h1>
        <button 
          className="back-button"
          onClick={() => navigate('/patient-dashboard')}
        >
          Back to Dashboard
        </button>
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
              
              <button type="submit" className="update-btn">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientProfile;