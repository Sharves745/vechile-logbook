import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  // Check if user is logged in
  if (!username || !role) {
    return <Navigate to="/login" replace />
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="page">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <p>Your role: <strong>{role}</strong></p>
          <p>Required roles: <strong>{allowedRoles.join(', ')}</strong></p>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute