import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useJobs } from '../context/JobsContext'
import { MdLocationOn, MdWork, MdAttachMoney, MdCalendarToday, MdArrowBack } from 'react-icons/md'

export default function JobDetail() {
  const { id } = useParams()
  const { getJobById, loading } = useJobs()
  const job = getJobById(id)

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-slate-600 mb-4">Job not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Back to jobs</Link>
      </div>
    )
  }

  const salaryLabel = job.salaryType === 'Monthly'
    ? `$${job.minPrice}k - $${job.maxPrice}k / month`
    : `$${job.minPrice}k - $${job.maxPrice}k / year`

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6">
        <MdArrowBack /> Back to jobs
      </Link>
      <article className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden text-slate-600 font-bold text-xl">
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
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{job.jobTitle}</h1>
              <p className="text-slate-600 text-lg">{job.companyName}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-slate-600 mb-6">
            <span className="flex items-center gap-2">
              <MdLocationOn /> {job.jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <MdWork /> {job.employmentType}
            </span>
            <span className="flex items-center gap-2">
              <MdAttachMoney /> {salaryLabel}
            </span>
            <span className="flex items-center gap-2">
              <MdCalendarToday /> Posted {job.postingDate}
            </span>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
              {job.experienceLevel}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">
              {job.salaryType}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 mb-2">Description</h2>
            <p className="text-slate-600 whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
