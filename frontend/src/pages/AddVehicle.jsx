import VehicleForm from '../components/VehicleForm'

function AddVehicle() {
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add New Vehicle</h1>
        <p>Register a new vehicle in the system</p>
        <div className="owner-info">
          <strong>Owner:</strong> {username}
        </div>
      </div>
      
      <VehicleForm />
    </div>
  )
}

export default AddVehicle