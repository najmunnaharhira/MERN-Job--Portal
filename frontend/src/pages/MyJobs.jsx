import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useJobs } from '../context/JobsContext'
import Swal from 'sweetalert2'

export default function MyJobs() {
  const { jobs, loading, deleteJob } = useJobs()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredJobs = jobs.filter(
    (j) =>
      !search.trim() ||
      (j.jobTitle || '').toLowerCase().includes(search.toLowerCase()) ||
      (j.companyName || '').toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (job) => {
    const result = await Swal.fire({
      title: 'Delete job?',
      text: `Remove "${job.jobTitle}" at ${job.companyName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Delete',
    })
    if (result.isConfirmed) {
      try {
        await deleteJob(job.id)
        Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false })
      } catch (e) {
        Swal.fire({ icon: 'error', title: 'Failed to delete' })
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">ALL My Jobs</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="search"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <button className="px-6 py-2 bg-brand hover:bg-brand-hover text-white font-medium rounded-lg transition-colors">
            Search
          </button>
          <Link
            to="/add-job"
            className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors text-center"
          >
            POST A NEW JOB
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    COMPANY NAME
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    JOB TITLE
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    SALARY
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    EDIT
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">{job.companyName}</td>
                    <td className="py-3 px-4 text-slate-900">{job.jobTitle}</td>
                    <td className="py-3 px-4 text-slate-600">
                      ${job.minPrice}-{job.maxPrice}k {job.salaryType}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => navigate(`/add-job/${job.id}`)}
                        className="text-brand hover:underline text-sm font-medium"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(job)}
                        className="text-red-600 hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredJobs.length === 0 && (
          <p className="text-center text-slate-500 py-12">No jobs yet. Post a new job to get started.</p>
        )}
      </div>
    </div>
  )
}
