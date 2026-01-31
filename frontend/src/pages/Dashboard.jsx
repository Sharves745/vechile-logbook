import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogTable from '../components/LogTable'
import api from '../services/api'

function Dashboard() {
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')
  const [vehicles, setVehicles] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchVehicles()
    fetchLogs()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles')
      setVehicles(response.data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const fetchLogs = async () => {
    try {
      const response = await api.get('/logs')
      let filteredLogs = response.data
      
      if (role === 'Driver') {
        filteredLogs = response.data.filter(log => log.driverName === username)
      }
      
      setLogs(filteredLogs)
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  if (role === 'Driver') {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Driver Dashboard</h1>
          <p>Welcome back, {username}!</p>
        </div>
        
        <div className="driver-actions">
          <Link to="/add-log" className="action-btn">
            Add Trip Log
          </Link>
        </div>
        
        <div className="driver-logs">
          <h3>My Trip Logs</h3>
          <LogTable logs={logs} />
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Vehicle Log Book Dashboard</h1>
        <p>Welcome to the Vehicle Log Book Management System</p>
      </div>
      
      <div className="vehicles-section">
        <div className="section-header">
          <h3>Vehicles ({vehicles.length})</h3>
          <Link to="/add-vehicle" className="action-btn">
            Add Vehicle
          </Link>
        </div>
        
        {vehicles.length > 0 ? (
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Model</th>
                <th>Type</th>
                <th>Driver</th>
                <th>Owner</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle._id}>
                  <td>{vehicle.vehicleNumber}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.driverName}</td>
                  <td>{vehicle.ownerName || 'N/A'}</td>
                  <td>{new Date(vehicle.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No vehicles added yet.</p>
        )}
      </div>
      
      <LogTable logs={logs} />
    </div>
  )
}

export default Dashboard