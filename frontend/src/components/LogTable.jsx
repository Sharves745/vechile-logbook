function LogTable({ logs = [], filterDriver }) {
  // Use passed logs or fallback to dummy data
  const dummyLogs = [
    {
      id: 1,
      date: '2024-01-15',
      driverName: 'John Doe',
      vehicleNumber: 'ABC-123',
      startKM: 1000,
      endKM: 1150,
      fuelUsed: 12.5,
      purpose: 'Client meeting'
    },
    {
      id: 2,
      date: '2024-01-16',
      driverName: 'Jane Smith',
      vehicleNumber: 'XYZ-456',
      startKM: 2000,
      endKM: 2200,
      fuelUsed: 18.0,
      purpose: 'Delivery'
    },
    {
      id: 3,
      date: '2024-01-17',
      driverName: 'Mike Johnson',
      vehicleNumber: 'DEF-789',
      startKM: 5000,
      endKM: 5080,
      fuelUsed: 8.2,
      purpose: 'Office visit'
    }
  ]

  const displayLogs = logs.length > 0 ? logs : dummyLogs
  const filteredLogs = filterDriver 
    ? displayLogs.filter(log => log.driverName === filterDriver)
    : displayLogs

  return (
    <div className="table-container">
      <h3>Recent Trip Logs</h3>
      <table className="log-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Driver</th>
            <th>Vehicle</th>
            <th>Start KM</th>
            <th>End KM</th>
            <th>Distance</th>
            <th>Fuel Used (L)</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map(log => (
            <tr key={log._id || log.id}>
              <td>{log.date ? new Date(log.date).toLocaleDateString() : log.date}</td>
              <td>{log.driverName}</td>
              <td>{log.vehicleNumber}</td>
              <td>{log.startKM}</td>
              <td>{log.endKM}</td>
              <td>{log.distance || (log.endKM - log.startKM)} km</td>
              <td>{log.fuelUsed}</td>
              <td>{log.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LogTable