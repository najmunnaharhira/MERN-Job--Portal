import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import JobDetail from './pages/JobDetail'
import AddJob from './pages/AddJob'

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
