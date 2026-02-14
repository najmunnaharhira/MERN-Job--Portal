import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DEFAULT_SALARIES = [
  { id: 1, title: 'Backend Developer', salary: '$46,062 per year' },
  { id: 2, title: 'Front Desk Agent', salary: '$43,402 per year' },
  { id: 3, title: 'Software Engineer', salary: '$102,781 per year' },
  { id: 4, title: 'App Developer', salary: '$78,500 per year' },
  { id: 5, title: 'Web Developer', salary: '$72,340 per year' },
  { id: 6, title: 'Full Stack Developer', salary: '$95,200 per year' },
]

export default function SalaryEstimate() {
  const [salaries, setSalaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/salary.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const list = Array.isArray(data) && data.length ? data : DEFAULT_SALARIES
        setSalaries(list.map((item, i) => ({ ...item, id: item.id || i + 1 })))
      })
      .catch(() => setSalaries(DEFAULT_SALARIES))
      .finally(() => setLoading(false))
  }, [])

  const filtered = salaries.filter(
    (s) =>
      !search.trim() ||
      (s.title || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-brand">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Salary</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Estimate Salary</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          <input
            type="search"
            placeholder="Search job roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <button
            type="button"
            className="px-6 py-3 bg-brand hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="text-slate-500">Loading...</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm mt-1 font-medium">
                  Average Salary
                </p>
                <p className="text-slate-700">{item.salary}</p>
                <div className="flex gap-4 mt-4">
                  <Link
                    to={`/?search=${encodeURIComponent(item.title)}`}
                    className="text-sm text-brand hover:underline font-medium"
                  >
                    Job Openings
                  </Link>
                  <span className="text-sm text-brand hover:underline cursor-pointer font-medium">
                    Skills
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-slate-500">No salary data found.</p>
        )}
      </div>
    </div>
  )
}
