function DoctorDashboard() {
  const doctorName = localStorage.getItem('name')
  
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <p>Welcome, Dr. {doctorName}</p>
    </div>
  )
}

export default DoctorDashboard