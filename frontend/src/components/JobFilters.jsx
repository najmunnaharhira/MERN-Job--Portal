import React from 'react'
import Select from 'react-select'

const employmentOptions = [
  { value: '', label: 'All types' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Temporary', label: 'Temporary' }
]

const experienceOptions = [
  { value: '', label: 'All experience' },
  { value: 'Any experience', label: 'Any experience' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Work remotely', label: 'Work remotely' }
]

const salaryTypeOptions = [
  { value: '', label: 'Any' },
  { value: 'Yearly', label: 'Yearly' },
  { value: 'Monthly', label: 'Monthly' }
]

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'salary-desc', label: 'Salary (high to low)' },
  { value: 'salary-asc', label: 'Salary (low to high)' }
]

export default function JobFilters({
  locations,
  search,
  setSearch,
  employmentType,
  setEmploymentType,
  experienceLevel,
  setExperienceLevel,
  salaryType,
  setSalaryType,
  location,
  setLocation,
  sort,
  setSort,
  resultCount
}) {
  const locationOptions = [{ value: '', label: 'All locations' }, ...locations.map(l => ({ value: l, label: l }))]

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search jobs, company, location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <Select
          placeholder="Employment type"
          options={employmentOptions}
          value={employmentOptions.find(o => o.value === employmentType) || employmentOptions[0]}
          onChange={(opt) => setEmploymentType(opt?.value ?? '')}
          isClearable={false}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Select
          placeholder="Experience"
          options={experienceOptions}
          value={experienceOptions.find(o => o.value === experienceLevel) || experienceOptions[0]}
          onChange={(opt) => setExperienceLevel(opt?.value ?? '')}
          isClearable={false}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Select
          placeholder="Salary type"
          options={salaryTypeOptions}
          value={salaryTypeOptions.find(o => o.value === salaryType) || salaryTypeOptions[0]}
          onChange={(opt) => setSalaryType(opt?.value ?? '')}
          isClearable={false}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Select
          placeholder="Location"
          options={locationOptions}
          value={locationOptions.find(o => o.value === location) || locationOptions[0]}
          onChange={(opt) => setLocation(opt?.value ?? '')}
          isClearable={false}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Select
          placeholder="Sort"
          options={sortOptions}
          value={sortOptions.find(o => o.value === sort) || sortOptions[0]}
          onChange={(opt) => setSort(opt?.value ?? 'newest')}
          isClearable={false}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
      <p className="text-sm text-slate-600">{resultCount} job{resultCount !== 1 ? 's' : ''} found</p>
    </div>
  )
}
