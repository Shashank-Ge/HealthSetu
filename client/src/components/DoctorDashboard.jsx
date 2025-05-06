import '../styles/Dashboard.css';

function DoctorDashboard() {
  const doctorName = localStorage.getItem('name')
  
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-wrapper">
            <div className="nav-brand">
              <h1 className="nav-brand-text">HealthSetu</h1>
            </div>
            <div className="nav-actions">
              <button className="nav-button">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-main">
        <div className="dashboard-content">
          <div className="content-card">
            <div className="content-wrapper">
              <h2 className="welcome-text">Welcome, Dr. {doctorName}</h2>
              {/* Apply stat-card, stat-content, etc. classes to the statistics grid */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard