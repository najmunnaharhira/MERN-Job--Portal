import React, { useMemo, useState } from 'react'
import { useJobs } from '../context/JobsContext'
import JobCard from '../components/JobCard'
import JobFilters from '../components/JobFilters'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

export default function HomePage() {
  const { jobs, loading } = useJobs()
  const [search, setSearch] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [location, setLocation] = useState('')
  const [sort, setSort] = useState('newest')

  const locations = useMemo(() => [...new Set(jobs.map(j => j.jobLocation).filter(Boolean))].sort(), [jobs])

  const filteredJobs = useMemo(() => {
    let list = jobs
    if (search.trim()) {
      list = matchSorter(list, search.trim(), {
        keys: ['jobTitle', 'companyName', 'jobLocation', 'description']
      })
    }
    if (employmentType) list = list.filter(j => j.employmentType === employmentType)
    if (experienceLevel) list = list.filter(j => j.experienceLevel === experienceLevel)
    if (salaryType) list = list.filter(j => j.salaryType === salaryType)
    if (location) list = list.filter(j => j.jobLocation === location)
    const maxSalary = (j) => Number(j.maxPrice) || 0
    if (sort === 'newest') list = [...list].sort(sortBy('-postingDate'))
    else if (sort === 'salary-desc') list = [...list].sort((a, b) => maxSalary(b) - maxSalary(a))
    else if (sort === 'salary-asc') list = [...list].sort((a, b) => maxSalary(a) - maxSalary(b))
    return list
  }, [jobs, search, employmentType, experienceLevel, salaryType, location, sort])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-500">Loading jobs...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Find your next job</h1>
        <p className="text-slate-600">Browse and filter openings below.</p>
      </div>
      <div className="mb-6">
        <JobFilters
          locations={locations}
          search={search}
          setSearch={setSearch}
          employmentType={employmentType}
          setEmploymentType={setEmploymentType}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          salaryType={salaryType}
          setSalaryType={setSalaryType}
          location={location}
          setLocation={setLocation}
          sort={sort}
          setSort={setSort}
          resultCount={filteredJobs.length}
        />
      </div>
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
  )
}
