import React from 'react'
import { Link } from 'react-router-dom'
import { MdWork } from 'react-icons/md'

const Header = () => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-indigo-300 transition-colors">
          <MdWork className="text-2xl text-indigo-400" />
          <span>Job Portal</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-300 transition-colors">Jobs</Link>
          <Link to="/add-job" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors font-medium">
            Post a Job
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
