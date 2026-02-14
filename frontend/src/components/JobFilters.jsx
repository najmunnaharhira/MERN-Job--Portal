import React from 'react'

const getLocations = (fromJobs) => {
  const extra = ['London', 'Seattle', 'Madrid', 'Boston']
  const combined = [...new Set([...(fromJobs || []).filter(Boolean), ...extra])].sort()
  return ['All', ...combined]
}
const SALARY_RANGES = [
  { value: '', label: 'Any' },
  { value: '30', label: '< 30000k' },
  { value: '50', label: '< 50000k' },
  { value: '80', label: '< 80000k' },
  { value: '100', label: '< 100000k' },
]
const DATE_OPTIONS = [
  { value: '', label: 'All time' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last Month' },
]
const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Any experience' },
  { value: 'Any experience', label: 'Any experience' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Work remotely', label: 'Work remotely' },
]

export default function JobFilters({
  locations = [],
  location,
  setLocation,
  salaryType,
  setSalaryType,
  maxSalary,
  setMaxSalary,
  datePosted,
  setDatePosted,
  experience,
  setExperience,
  resultCount,
}) {
  const locationList = getLocations(locations)

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-6">
      <h3 className="font-semibold text-slate-900">Filters</h3>

      {/* Location */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">Location</h4>
        <div className="space-y-1.5">
          {locationList.map((loc) => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="location"
                checked={location === (loc === 'All' ? '' : loc)}
                onChange={() => setLocation(loc === 'All' ? '' : loc)}
                className="accent-brand border-slate-300 focus:ring-brand"
              />
              <span className="text-sm text-slate-600">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">Salary</h4>
        <div className="flex gap-1 mb-3 p-1 bg-slate-100 rounded-lg">
          {['Hourly', 'Monthly', 'Yearly'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSalaryType(type)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                salaryType === type
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          {SALARY_RANGES.map(({ value, label }) => (
            <label key={value || 'any'} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="salary"
                checked={maxSalary === value}
                onChange={() => setMaxSalary(value)}
                className="accent-brand border-slate-300 focus:ring-brand"
              />
              <span className="text-sm text-slate-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date of posting */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">Date of posting</h4>
        <div className="space-y-1.5">
          {DATE_OPTIONS.map(({ value, label }) => (
            <label key={value || 'all'} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="datePosted"
                checked={datePosted === value}
                onChange={() => setDatePosted(value)}
                className="accent-brand border-slate-300 focus:ring-brand"
              />
              <span className="text-sm text-slate-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work experience */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">Work experience</h4>
        <div className="space-y-1.5">
          {EXPERIENCE_OPTIONS.map(({ value, label }) => (
            <label key={value || 'any'} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="experience"
                checked={experience === value}
                onChange={() => setExperience(value)}
                className="accent-brand border-slate-300 focus:ring-brand"
              />
              <span className="text-sm text-slate-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500 pt-2 border-t border-slate-100">
        {resultCount} job{resultCount !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
