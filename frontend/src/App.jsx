import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import DoctorLogin from './components/users/doctor/DoctorLogin';
import PatientLogin from './components/users/patient/PatientLogin';
import DoctorSignup from './components/users/doctor/DoctorSignup';
import PatientSignup from './components/users/patient/PatientSignup';
import DoctorDashboard from './components/users/doctor/DoctorDashboard';
import PatientDashboard from './components/users/patient/PatientDashboard';
import AdminLogin from './components/users/admin/AdminLogin';
import AdminDashboard from './components/users/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Patient Routes */}
        <Route path="/loginPatient" element={<PatientLogin />} />
        <Route path="/signupPatient" element={<PatientSignup />} />
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Doctor Routes */}
        <Route path="/loginDoctor" element={<DoctorLogin />} />
        <Route path="/signupDoctor" element={<DoctorSignup />} />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes */}
        <Route path="/loginAdmin" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;