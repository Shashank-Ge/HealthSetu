import { useNavigate } from "react-router-dom"; 

function DoctorDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <p>Welcome, Dr</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default DoctorDashboard