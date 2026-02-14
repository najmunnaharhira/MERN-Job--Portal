import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-auto">
      {/* Tech Partner — dedicated section */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Technology Partner
          </p>
          <a
            href="https://chilekotha.top"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 group"
            aria-label="Chilekotha — visit chilekotha.top"
          >
            <img
              src="/chilekotha-logo.png"
              alt="Chilekotha"
              className="h-10 sm:h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
            <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
              chilekotha.top
            </span>
          </a>
        </div>
      </section>

      {/* Main footer */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-900 font-semibold hover:text-brand transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              JobPortal
            </Link>
            <nav className="flex items-center gap-6 text-sm text-slate-600">
              <Link to="/" className="hover:text-slate-900 transition-colors">
                Jobs
              </Link>
              <Link to="/add-job" className="hover:text-slate-900 transition-colors">
                Post a Job
              </Link>
              <Link to="/salary" className="hover:text-slate-900 transition-colors">
                Salary estimate
              </Link>
            </nav>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} JobPortal. Find and post opportunities.
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
