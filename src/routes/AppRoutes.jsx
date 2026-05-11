import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Home from '../pages/Home.jsx'
import JobDetails from '../pages/JobDetails.jsx'
import Jobs from '../pages/Jobs.jsx'
import Login from '../pages/Login.jsx'
import Profile from '../pages/Profile.jsx'
import Roadmap from '../pages/Roadmap.jsx'
import SavedJobs from '../pages/SavedJobs.jsx'
import Signup from '../pages/Signup.jsx'
import Tracker from '../pages/Tracker.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/jobs' element={<Jobs />} />
      <Route path='/jobs/:id' element={<JobDetails />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path='/saved' element={<SavedJobs />} />
      <Route path='/tracker' element={<Tracker />} />
      <Route path='/roadmap' element={<Roadmap />} />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<Home />} />
    </Routes>
  )
}

export default AppRoutes
