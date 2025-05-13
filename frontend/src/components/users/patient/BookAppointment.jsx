import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BookAppointment.css';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Show and auto-dismiss short messages
  const showMessage = (text, success = false, autoHide = true) => {
    setMessage(text);
    setIsSuccess(success);
    if (autoHide) {
      setTimeout(() => {
        setMessage('');
      }, 1000); // Show for 1 second
    }
  };

  // Load draft on mount
  useEffect(() => {
    setTimeout(() => {
      setIsPageVisible(true);
    }, 100);

    const savedDraft = localStorage.getItem(`draft-${doctorId}`);
    if (savedDraft) {
      setReason(savedDraft);
      showMessage('📝 Draft loaded.', false, true);
    }
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:8080/api/auth/patient-dashboard/bookAppointment', {
        doctorId,
        reason,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showMessage(response.data.message, true, false); // Keep success visible
      setReason('');
      localStorage.removeItem(`draft-${doctorId}`);
    } catch (error) {
      console.error(error);
      showMessage(error.response?.data?.message || 'Something went wrong', false, false); // Keep error visible
    }
  };

  const handleReasonChange = (e) => {
    const val = e.target.value;
    setReason(val);
    localStorage.setItem(`draft-${doctorId}`, val);
  };

  const handleDiscardDraft = () => {
    setReason('');
    localStorage.removeItem(`draft-${doctorId}`);
    showMessage('🗑️ Draft discarded.', false, true); // Auto hide in 1 sec
  };

  return (
    <div className={`appointment-container ${isPageVisible ? 'animate' : ''}`}>
      <div className="appointment-form-container">
        <h2>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reason for Appointment:</label>
            <textarea
              value={reason}
              onChange={handleReasonChange}
              placeholder="Please describe your symptoms or reason for the appointment"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Book Appointment</button>
            {reason && (
              <button type="button" className="discard-btn" onClick={handleDiscardDraft}>
                Discard Draft
              </button>
            )}
          </div>
        </form>

        {message && (
          <div className={`message ${isSuccess ? 'success-message' : 'error-message'}`}>
            {message}
          </div>
        )}

        <Link to="/patient-Dashboard" className="back-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default BookAppointment;
