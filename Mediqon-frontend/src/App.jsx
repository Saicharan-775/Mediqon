import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './contexts/AuthContext';
import LandingPage from './pages/Landingpage'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/bookings" 
            element={
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            } 
          />
          
          <Route 
            path="/dashboard/patient" 
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/doctor" 
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } 
          />
          
          <Route path="/dashboard" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

