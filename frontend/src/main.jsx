import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { JobsProvider } from './context/JobsContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <JobsProvider>
          <App />
        </JobsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
