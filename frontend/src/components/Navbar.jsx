import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    navigate('/login')
  }

  // Don't show navbar on login page
  if (!username || !role) {
    return null
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Vehicle Log Book</h2>
      </div>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        
        {role === 'Owner' && (
          <Link to="/add-vehicle" className="nav-link">Add Vehicle</Link>
        )}
        
        {role === 'Driver' && (
          <Link to="/add-log" className="nav-link">Add Log</Link>
        )}
      </div>
      
      <div className="nav-user">
        <span className="user-info">
          {username} ({role})
        </span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar