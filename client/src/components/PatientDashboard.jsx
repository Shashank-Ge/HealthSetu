function PatientDashboard() {
  const patientName = localStorage.getItem('name')
  
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <p>Welcome, {patientName}</p>
    </div>
  )
}

export default PatientDashboard