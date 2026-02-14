import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Start a search' },
  { to: '/my-jobs', label: 'My Jobs' },
  { to: '/salary', label: 'Salary estimate' },
  { to: '/add-job', label: 'Post A Job' },
]

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-semibold text-slate-900 text-lg">JobPortal</span>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6 flex-wrap justify-end">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  location.pathname === to ? 'text-brand' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2">
              {!loading && (
                user ? (
                  <>
                    <span className="text-sm text-slate-600 truncate max-w-[120px] sm:max-w-[180px]" title={user.email}>
                      {user.name || user.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`text-sm font-medium transition-colors ${
                        location.pathname === '/login' ? 'text-brand' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Sign up
                    </Link>
                  </>
                )
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
