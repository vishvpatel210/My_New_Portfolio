import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ClientDashboard from './pages/client/Dashboard'
import NearbyWorkers from './pages/client/NearbyWorkers'
import WorkerDashboard from './pages/worker/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute allowedRole="client" />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/nearby" element={<NearbyWorkers />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="worker" />}>
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
