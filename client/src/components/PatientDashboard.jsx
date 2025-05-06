import '../styles/Auth.css';

function PatientDashboard() {
  const patientName = localStorage.getItem('name')
  
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
              <h2 className="welcome-text">Welcome, {patientName}</h2>
              
              <div className="mt-8">
                <button className="primary-button flex items-center justify-center w-full sm:w-auto">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book New Appointment
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="stat-card">
                  <div className="stat-content">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                    <div className="mt-4 space-y-4">
                      <div className="text-center text-gray-500">
                        No upcoming appointments
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-content">
                    <h3 className="text-lg font-medium text-gray-900">Recent Medical Records</h3>
                    <div className="mt-4 space-y-4">
                      <div className="text-center text-gray-500">
                        No medical records available
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm w-full text-center">
                        Upload Medical Records
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="stat-card">
                  <div className="stat-content">
                    <h3 className="text-lg font-medium text-gray-900">Health Timeline</h3>
                    <div className="mt-4">
                      <div className="text-center text-gray-500">
                        Your health journey will be displayed here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard