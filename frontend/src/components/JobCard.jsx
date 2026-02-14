import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn, MdWork, MdAttachMoney } from 'react-icons/md'

const JobCard = ({ job }) => {
  const salaryLabel = job.salaryType === 'Monthly'
    ? `$${job.minPrice}k - $${job.maxPrice}k / month`
    : `$${job.minPrice}k - $${job.maxPrice}k / year`

  return (
    <Link
      to={`/job/${job.id}`}
      className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden text-slate-600 font-bold text-lg">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <span className={job.companyLogo ? 'hidden' : ''}>
            {job.companyName?.charAt(0) || '?'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{job.jobTitle}</h3>
          <p className="text-slate-600 text-sm">{job.companyName}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MdLocationOn className="flex-shrink-0" />
              {job.jobLocation}
            </span>
            <span className="flex items-center gap-1">
              <MdWork className="flex-shrink-0" />
              {job.employmentType}
            </span>
            <span className="flex items-center gap-1">
              <MdAttachMoney className="flex-shrink-0" />
              {salaryLabel}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Posted {job.postingDate}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
