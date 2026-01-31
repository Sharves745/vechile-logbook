import { useState, useEffect } from 'react'
import api from '../services/api'

function LogForm() {
  const driverName = localStorage.getItem('username')
  const [vehicles, setVehicles] = useState([])
  const [formData, setFormData] = useState({
    driverName: driverName || '',
    vehicleNumber: '',
    startKM: '',
    endKM: '',
    fuelUsed: '',
    purpose: ''
  })

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles')
      const userVehicles = response.data.filter(vehicle => vehicle.driverName === driverName)
      setVehicles(userVehicles)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const distance = Number(formData.endKM) - Number(formData.startKM)
      const payload = {
        vehicleNumber: formData.vehicleNumber,
        driverName: localStorage.getItem('username'),
        startKM: Number(formData.startKM),
        endKM: Number(formData.endKM),
        distance: distance,
        fuelUsed: Number(formData.fuelUsed),
        purpose: formData.purpose,
        date: new Date().toISOString()
      }
      
      await api.post('/logs', payload)
      alert('Log added successfully')
      
      // Reset form but keep driver name
      setFormData({
        driverName: driverName || '',
        vehicleNumber: '',
        startKM: '',
        endKM: '',
        fuelUsed: '',
        purpose: ''
      })
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Add log failed')
    }
  }

  return (
    <div className="form-container">
      <h3>Add Trip Log</h3>
      <form onSubmit={handleSubmit} className="log-form">
        <div className="form-group">
          <label htmlFor="driverName">Driver Name:</label>
          <input
            type="text"
            id="driverName"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            readOnly
            className="readonly-field"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="vehicleNumber">Vehicle:</label>
          {vehicles.length > 0 ? (
            <select
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle._id} value={vehicle.vehicleNumber}>
                  {vehicle.vehicleNumber} - {vehicle.model}
                </option>
              ))}
            </select>
          ) : (
            <p style={{color: '#6c757d', fontStyle: 'italic', margin: '8px 0'}}>
              No vehicles assigned to you
            </p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="startKM">Start KM:</label>
          <input
            type="number"
            id="startKM"
            name="startKM"
            value={formData.startKM}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="endKM">End KM:</label>
          <input
            type="number"
            id="endKM"
            name="endKM"
            value={formData.endKM}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="fuelUsed">Fuel Used (L):</label>
          <input
            type="number"
            step="0.1"
            id="fuelUsed"
            name="fuelUsed"
            value={formData.fuelUsed}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="purpose">Purpose:</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">Add Log</button>
      </form>
    </div>
  )
}

export default LogForm