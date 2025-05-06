import { useNavigate } from "react-router-dom";
function PatientDashboard() {
const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <p> Welcome</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default PatientDashboard