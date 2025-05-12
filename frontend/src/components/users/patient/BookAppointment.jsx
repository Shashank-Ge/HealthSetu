import React, { useState , useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BookAppointment.css';

const BookAppointment = () => {
  const { doctorId } = useParams(); // Fetch doctorId from URL params
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
  }, []);

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

      setMessage(`${response.data.message}`);
      setIsSuccess(true);
      setReason('');
    } catch (error) {
      console.error(error);
      setMessage(`${error.response?.data?.message || 'Something went wrong'}`);
      setIsSuccess(false);
    }
  };

  return (
    <div className={`appointment-container ${isPageVisible ? 'animate' : ''}`}>
      <div className="appointment-form-container">
        <h2>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reason for Appointment:</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Please describe your symptoms or reason for the appointment" required />
          </div>
          <button type="submit" className="submit-btn">Book Appointment</button>
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