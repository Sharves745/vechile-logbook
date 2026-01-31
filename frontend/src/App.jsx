import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddVehicle from './pages/AddVehicle'
import AddLog from './pages/AddLog'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/" 
              element={
                <ProtectedRoute allowedRoles={['Owner', 'Driver']}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/add-vehicle" 
              element={
                <ProtectedRoute allowedRoles={['Owner']}>
                  <AddVehicle />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/add-log" 
              element={
                <ProtectedRoute allowedRoles={['Driver']}>
                  <AddLog />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App