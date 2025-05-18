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
import BookAppointment from './components/users/patient/BookAppointment';
import PatientProfile from './components/users/patient/PatientProfile';
import DoctorProfile from './components/users/doctor/DoctorProfile';
import DoctorMeetings from './components/users/doctor/DoctorMeetings';
import PatientMeetings from './components/users/patient/PatientMeetings';
import NotFound404 from './components/NotFound404';
import { ThemeProvider } from './components/ThemeContext';

 
function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
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
        
        <Route 
          path="/patient-dashboard/patient-profile" 
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientProfile />
            </ProtectedRoute>
          }
        />
        
        {/* Correct the dynamic doctorId route */}
        <Route path="/patient-dashboard/bookAppointment/:doctorId"
        element={
           <ProtectedRoute requiredRole="patient">
             <BookAppointment />
           </ProtectedRoute>
        }
        />

        <Route
          path="/patient-dashboard/specialization/:specialization"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patient-dashboard/patient-meetings"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientMeetings />
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
        
        <Route
          path="/doctor-dashboard/doctor-profile"
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        <Route
        path="/doctor-dashboard/doctor-Meetings"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DoctorMeetings/>
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
        
        <Route path='*' element={<NotFound404/>} />
      </Routes>
    </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;