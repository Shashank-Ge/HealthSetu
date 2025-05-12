import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const { doctorId } = useParams(); // Fetch doctorId from URL params
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

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
      setReason('');
    } catch (error) {
      console.error(error);
      setMessage(`${error.response?.data?.message || 'Something went wrong'}`);
    }
  };

  return (
    <div>
      <h2>Book an Appointment with Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reason for Appointment:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter Reason"
            required
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;
