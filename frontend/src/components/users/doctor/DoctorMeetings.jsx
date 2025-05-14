import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorMeetings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // Make sure token is stored
        const response = await axios.get('http://localhost:8080/api/auth/doctor-dashboard/doctor-meetings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center">Loading appointments...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Confirmed & Completed Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="border p-4 rounded shadow">
              <p><strong>Patient:</strong> {appt.patient?.name}</p>
              <p><strong>Email:</strong> {appt.patient?.email}</p>
              <p><strong>Status:</strong> <span className={`font-semibold ${appt.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{appt.status}</span></p>
              <p><strong>Scheduled At:</strong> {appt.scheduledAt ? new Date(appt.scheduledAt).toLocaleString() : 'Not scheduled'}</p>
              {appt.meetLink && (
                <p><strong>Meet Link:</strong> <a href={appt.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{appt.meetLink}</a></p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorMeetings;
