import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

export default function Login() {
  const { user, loading: authLoading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && user) navigate(from, { replace: true })
  }, [user, authLoading, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'Email and password are required.' })
      return
    }
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      await Swal.fire({ icon: 'success', title: 'Welcome back!', timer: 1500, showConfirmButton: false })
      navigate(from, { replace: true })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Login failed', text: err.message || 'Invalid email or password.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  if (user) return null

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Log in</h1>
        <p className="text-slate-600 text-sm mb-6">Enter your email and password to access your account.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-brand hover:bg-brand-hover text-white font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            {submitting ? 'Logging in...' : 'Log in'}
          </button>
          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-brand font-medium hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
