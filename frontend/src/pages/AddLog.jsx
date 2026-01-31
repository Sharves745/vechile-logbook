import LogForm from '../components/logform'

function AddLog() {
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add Trip Log</h1>
        <p>Record a new trip in the log book</p>
        <div className="driver-info">
          <strong>Driver:</strong> {username}
        </div>
      </div>
      
      <LogForm />
    </div>
  )
}

export default AddLog