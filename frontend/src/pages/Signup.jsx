import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

export default function Signup() {
  const { user, loading: authLoading, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && user) navigate(from, { replace: true })
  }, [user, authLoading, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      Swal.fire({ icon: 'warning', title: 'Required', text: 'Email and password are required.' })
      return
    }
    if (password.length < 6) {
      Swal.fire({ icon: 'warning', title: 'Weak password', text: 'Password must be at least 6 characters.' })
      return
    }
    if (password !== confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Passwords do not match', text: 'Please re-enter your password.' })
      return
    }
    setSubmitting(true)
    try {
      await signup((name || '').trim(), email.trim(), password)
      await Swal.fire({ icon: 'success', title: 'Account created!', text: 'You are now signed in.', timer: 2000, showConfirmButton: false })
      navigate(from, { replace: true })
    } catch (err) {
      const message = err.message || 'Could not create account. Try again.'
      Swal.fire({ icon: 'error', title: 'Sign up failed', text: message })
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
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign up</h1>
        <p className="text-slate-600 text-sm mb-6">Create an account to post jobs and manage your listings.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            />
          </div>
          <div>
            <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-700 mb-1">Confirm password</label>
            <input
              id="signup-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-brand hover:bg-brand-hover text-white font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            {submitting ? 'Creating account...' : 'Sign up'}
          </button>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-medium hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
