import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import JobDetail from './pages/JobDetail'
import AddJob from './pages/AddJob'
import SalaryEstimate from './pages/SalaryEstimate'
import MyJobs from './pages/MyJobs'

const LoginPage = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Log in</h1>
      <p className="text-slate-600">Login functionality coming soon.</p>
    </div>
  </div>
)
const SignupPage = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign up</h1>
      <p className="text-slate-600">Sign up functionality coming soon.</p>
    </div>
  </div>
)

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/add-job/:id" element={<AddJob />} />
          <Route path="/salary" element={<SalaryEstimate />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
