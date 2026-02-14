import React, { useMemo, useState } from 'react'
import { useJobs } from '../context/JobsContext'
import JobCard from '../components/JobCard'
import JobFilters from '../components/JobFilters'
import Sidebar from '../components/Sidebar'
import { MdLocationOn } from 'react-icons/md'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

export default function HomePage() {
  const { jobs, loading } = useJobs()
  const [search, setSearch] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [location, setLocation] = useState('')
  const [salaryType, setSalaryType] = useState('Yearly')
  const [maxSalary, setMaxSalary] = useState('')
  const [datePosted, setDatePosted] = useState('')
  const [experience, setExperience] = useState('')

  const locations = useMemo(() => [...new Set(jobs.map((j) => j.jobLocation).filter(Boolean))].sort(), [jobs])

  const filteredJobs = useMemo(() => {
    let list = jobs
    if (search.trim()) {
      list = matchSorter(list, search.trim(), {
        keys: ['jobTitle', 'companyName', 'jobLocation', 'description'],
      })
    }
    if (locationInput.trim()) {
      list = list.filter(
        (j) =>
          j.jobLocation?.toLowerCase().includes(locationInput.toLowerCase()) ||
          j.companyName?.toLowerCase().includes(locationInput.toLowerCase())
      )
    }
    if (location) list = list.filter((j) => j.jobLocation === location)
    if (experience) list = list.filter((j) => j.experienceLevel === experience)
    if (salaryType) {
      list = list.filter((j) => j.salaryType === salaryType)
    }
    if (maxSalary) {
      const cap = Number(maxSalary)
      list = list.filter((j) => (Number(j.maxPrice) || 0) <= cap || (Number(j.minPrice) || 0) <= cap)
    }
    if (datePosted) {
      const now = new Date()
      list = list.filter((j) => {
        const d = new Date(j.postingDate)
        if (datePosted === '24h') return (now - d) / 3600000 <= 24
        if (datePosted === '7d') return (now - d) / 86400000 <= 7
        if (datePosted === '30d') return (now - d) / 86400000 <= 30
        return true
      })
    }
    list = [...list].sort(sortBy('-postingDate'))
    return list
  }, [jobs, search, locationInput, location, salaryType, maxSalary, datePosted, experience])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-500">Loading jobs...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Find your <span className="text-brand">new job</span> today
          </h1>
          <p className="text-slate-600">
            Thousands of jobs in the computer, engineering and technology sectors are waiting for you.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="search"
            placeholder="What position are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <div className="flex-1 sm:max-w-xs relative">
            <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" aria-hidden />
            <input
              type="text"
              placeholder="Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            />
          </div>
          <button
            type="button"
            className="px-6 py-3 bg-brand hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
          >
            Search
          </button>
        </div>

        {/* Job count */}
        <p className="text-sm text-slate-600 mb-4">{filteredJobs.length} Jobs</p>

        {/* Two column layout: filters + jobs, with right sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Filters */}
          <div className="lg:col-span-3">
            <JobFilters
              locations={locations}
              location={location}
              setLocation={setLocation}
              salaryType={salaryType}
              setSalaryType={setSalaryType}
              maxSalary={maxSalary}
              setMaxSalary={setMaxSalary}
              datePosted={datePosted}
              setDatePosted={setDatePosted}
              experience={experience}
              setExperience={setExperience}
              resultCount={filteredJobs.length}
            />
          </div>

          {/* Center: Job cards */}
          <div className="lg:col-span-5">
            <ul className="space-y-4">
              {filteredJobs.map((job) => (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
            {filteredJobs.length === 0 && (
              <p className="text-center text-slate-500 py-12">No jobs match your filters. Try adjusting your search.</p>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
