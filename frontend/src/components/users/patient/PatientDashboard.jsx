import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ToggleMode from '../../ToggleMode';
import './PatientDashboard.css';

function PatientDashboard() {
  const navigate = useNavigate();
  const { specialization: specializationParam } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(specializationParam || null);
  const [searchQuery, setSearchQuery] = useState('');
  const name = localStorage.getItem("name");

  const specializations = [
    'Cardiologist', 'Neurologist', 'Dermatologist', 'Pediatrician',
    'Orthopedic Surgeon', 'Psychiatrist', 'Oncologist', 'Endocrinologist',
    'Gynecologist', 'Gastroenterologist', 'Nephrologist', 'Pulmonologist',
    'Ophthalmologist', 'ENT Specialist', 'Urologist', 'General Physician'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    setSelectedSpecialization(specializationParam || null);
  }, [specializationParam]);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/auth/patient-dashboard/doctors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginPatient");
  };

  const handleSpecializationClick = (specialization) => {
    navigate(`/patient-dashboard/specialization/${encodeURIComponent(specialization)}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSpecializations = specializations.filter(spec =>
    spec.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDoctors = selectedSpecialization
    ? doctors.filter(doctor => doctor.specialization === selectedSpecialization)
    : [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Link to="/" className="logo-link">
          <div className="logo">HealthSetu</div>
        </Link>
        <nav className="nav-menu">
          <button onClick={() => navigate('/patient-dashboard/patient-meetings')}>My Meetings</button>
          <button onClick={() => navigate('/patient-dashboard/patient-profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
          <ToggleMode />
        </nav>
      </header>

      <main className="dashboard-content">
        <section className="welcome-section">
          <h1>Welcome to HealthSetu, {name}!</h1>
          <p>Your journey to better health starts here</p>
        </section>

        <section className="search-section">
          <input
            type="text"
            placeholder="Search specialization..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </section>

        {!selectedSpecialization ? (
          <section className="specializations-section">
            <h2>Medical Specializations</h2>
            <div className="specializations-grid">
              {filteredSpecializations.map((specialization) => (
                <div 
                  key={specialization} 
                  className="specialization-card"
                  onClick={() => handleSpecializationClick(specialization)}
                >
                  <div className="specialization-content">
                    <h3>{specialization}</h3>
                    <p className="doctor-count">
                      {doctors.filter(d => d.specialization === specialization).length} Doctors
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="doctors-section">
            <div className="section-header">
              <h2>{selectedSpecialization} Doctors</h2>
              <button 
                className="back-button"
                onClick={() => navigate('/patient-dashboard')}
              >
                Back to Specializations
              </button>
            </div>
            <div className="doctors-grid">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div key={doctor._id} className="doctor-card">
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialization}</p>
                    <button
                      onClick={() => navigate(`/patient-dashboard/bookAppointment/${doctor._id}`)}
                    >
                      Book Appointment
                    </button>
                  </div>
                ))
              ) : (
                <p>No doctors available for this specialization.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PatientDashboard;