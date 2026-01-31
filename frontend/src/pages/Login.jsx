import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    role: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.username.trim() || !formData.role) {
      alert('Please enter your name and select a role')
      return
    }

    // Save to localStorage
    localStorage.setItem('username', formData.username.trim())
    localStorage.setItem('role', formData.role)
    
    // Redirect to dashboard
    navigate('/')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Vehicle Log Book System</h1>
          <p>Please login to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Your Name:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Select Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Choose your role</option>
              <option value="Owner">Owner</option>
              <option value="Driver">Driver</option>
            </select>
          </div>
          
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login