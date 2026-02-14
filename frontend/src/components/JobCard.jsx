import React from 'react'
import { Link } from 'react-router-dom'

const COMPANY_COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-teal-500',
]
const getCompanyColor = (companyName) => {
  const hash = (companyName || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return COMPANY_COLORS[hash % COMPANY_COLORS.length]
}

const JobCard = ({ job }) => {
  const salaryLabel =
    job.salaryType === 'Monthly'
      ? `$${job.minPrice}-${job.maxPrice}k`
      : job.salaryType === 'Hourly'
      ? `$${job.minPrice}-${job.maxPrice}/hr`
      : `$${job.minPrice}-${job.maxPrice}k`

  const typeSalary = `${job.employmentType || 'Full-time'} ${salaryLabel}`

  return (
    <Link
      to={`/job/${job.id}`}
      className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-brand/40 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${getCompanyColor(
              job.companyName
            )} ${job.companyLogo ? 'hidden' : ''}`}
          >
            {job.companyName?.charAt(0) || '?'}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{job.jobTitle}</h3>
          <p className="text-slate-600 text-sm">
            {job.companyName} {job.jobLocation}
          </p>
          <p className="text-sm text-slate-500 mt-1">{typeSalary}</p>
          <p className="text-xs text-slate-400 mt-1">{job.postingDate}</p>
          <p className="text-sm text-slate-600 mt-2 line-clamp-2">{job.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
