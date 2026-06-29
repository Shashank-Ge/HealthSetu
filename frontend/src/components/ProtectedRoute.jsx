import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== requiredRole) {
    return <Navigate to="/loginPatient" replace />;
  }

  return children;
}

export default ProtectedRoute;