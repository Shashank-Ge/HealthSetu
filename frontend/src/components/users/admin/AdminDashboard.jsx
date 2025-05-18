import React, { useState, useEffect } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import ToggleMode from '../../ToggleMode';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState({});
  const adminName = localStorage.getItem('name') || 'Admin';

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'admin') {
      navigate('/loginAdmin');
      return;
    }
    
    fetchDoctors();
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/auth/admin-dashboard/doctors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to fetch doctors. Please try again.');
      setLoading(false);
    }
  };

  const handleStatusChange = async (doctorId, newStatus) => {
    try {
      setActionLoading(prev => ({ ...prev, [doctorId]: true }));
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:8080/api/auth/admin-dashboard/doctor-status/${doctorId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update the local state to reflect the change
      setDoctors(doctors.map(doctor => 
        doctor._id === doctorId ? { ...doctor, status: newStatus } : doctor
      ));
    } catch (error) {
      console.error('Error updating doctor status:', error);
      setError('Failed to update doctor status. Please try again.');
    } finally {
      setActionLoading(prev => ({ ...prev, [doctorId]: false }));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/loginAdmin');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <Link to="/" className="logo-link">
          <div className="logo">HealthSetu</div>
        </Link>        
        <nav className="nav-menu">
          <button onClick={handleLogout}>Logout</button>
          <ToggleMode />
        </nav>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <section className="welcome-section">
          <h1>Welcome to Admin Dashboard, {adminName}!</h1>
          <p>Manage doctor approvals and system settings</p>
        </section>

        <section className="doctors-section">
          <h2>Doctor Approval Management</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <p>Loading doctors...</p>
          ) : (
            <div className="doctors-table-container">
              <table className="doctors-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>College</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <tr key={doctor._id} className={`status-${doctor.status}`}>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.collegeName}</td>
                        <td>{doctor.status}</td>
                        <td className="action-buttons">
                          {doctor.status === 'pending' && (
                            <>
                              <button 
                                className="approve-btn"
                                onClick={() => handleStatusChange(doctor._id, 'approved')}
                                disabled={actionLoading[doctor._id]}
                              >
                                {actionLoading[doctor._id] ? 'Processing...' : 'Approve'}
                              </button>
                              <button 
                                className="reject-btn"
                                onClick={() => handleStatusChange(doctor._id, 'rejected')}
                                disabled={actionLoading[doctor._id]}
                              >
                                {actionLoading[doctor._id] ? 'Processing...' : 'Reject'}
                              </button>
                            </>
                          )}
                          {doctor.status === 'approved' && (
                            <button 
                              className="suspend-btn"
                              onClick={() => handleStatusChange(doctor._id, 'blocked')}
                              disabled={actionLoading[doctor._id]}
                            >
                              {actionLoading[doctor._id] ? 'Processing...' : 'Block'}
                            </button>
                          )}
                          {(doctor.status === 'rejected' || doctor.status === 'blocked') && (
                            <button 
                              className="approve-btn"
                              onClick={() => handleStatusChange(doctor._id, 'approved')}
                              disabled={actionLoading[doctor._id]}
                            >
                              {actionLoading[doctor._id] ? 'Processing...' : 'Reactivate'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No doctors found in the system.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: admin@healthsetu.com</p>
            <p>Phone: +91 1234567890</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HealthSetu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;