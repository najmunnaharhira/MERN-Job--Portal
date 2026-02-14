import React, { createContext, useContext, useState, useEffect } from 'react'
import localforage from 'localforage'

const JobsContext = createContext(null)
const JOBS_STORAGE_KEY = 'job-portal-custom-jobs'

async function fetchJobsFromApi() {
  const res = await fetch('/api/jobs')
  if (!res.ok) return null
  return res.json()
}

async function fetchJobsFromPublic() {
  const res = await fetch('/jobs.json')
  if (!res.ok) return []
  return res.json()
}

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [apiJobs, staticRes, customJobs] = await Promise.all([
          fetchJobsFromApi(),
          fetch('/jobs.json').then(r => r.ok ? r.json() : []),
          localforage.getItem(JOBS_STORAGE_KEY)
        ])
        if (cancelled) return
        const staticJobs = apiJobs ?? staticRes
        const merged = Array.isArray(customJobs) && customJobs.length
          ? [...customJobs, ...staticJobs]
          : staticJobs
        setJobs(Array.isArray(merged) ? merged : [])
      } catch (e) {
        if (!cancelled) setJobs([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const addJob = async (job) => {
    try {
      const body = {
        ...job,
        minPrice: String(job.minPrice ?? ''),
        maxPrice: String(job.maxPrice ?? '')
      }
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const newJob = await res.json()
        setJobs(prev => [newJob, ...prev])
        return newJob
      }
    } catch (_) { /* API not available */ }
    const customJobs = (await localforage.getItem(JOBS_STORAGE_KEY)) || []
    const newJob = {
      ...job,
      id: Date.now(),
      minPrice: String(job.minPrice ?? ''),
      maxPrice: String(job.maxPrice ?? '')
    }
    const updated = [newJob, ...customJobs]
    await localforage.setItem(JOBS_STORAGE_KEY, updated)
    setJobs(prev => [newJob, ...prev])
    return newJob
  }

  const getJobById = (id) => {
    const numId = Number(id)
    return jobs.find(j => j.id === numId)
  }

  const updateJob = async (id, job) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...job, minPrice: String(job.minPrice ?? ''), maxPrice: String(job.maxPrice ?? '') })
      })
      if (res.ok) {
        const updated = await res.json()
        setJobs(prev => prev.map(j => (j.id === Number(id) ? updated : j)))
        return updated
      }
    } catch (_) { /* API not available */ }
    const customJobs = (await localforage.getItem(JOBS_STORAGE_KEY)) || []
    const idx = customJobs.findIndex(j => j.id === Number(id))
    if (idx >= 0) {
      const updated = { ...customJobs[idx], ...job, id: Number(id), minPrice: String(job.minPrice ?? ''), maxPrice: String(job.maxPrice ?? '') }
      customJobs[idx] = updated
      await localforage.setItem(JOBS_STORAGE_KEY, customJobs)
      setJobs(prev => prev.map(j => (j.id === Number(id) ? updated : j)))
      return updated
    }
    return null
  }

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setJobs(prev => prev.filter(j => j.id !== Number(id)))
        return true
      }
    } catch (_) { /* API not available */ }
    const customJobs = (await localforage.getItem(JOBS_STORAGE_KEY)) || []
    const filtered = customJobs.filter(j => j.id !== Number(id))
    await localforage.setItem(JOBS_STORAGE_KEY, filtered)
    setJobs(prev => prev.filter(j => j.id !== Number(id)))
    return true
  }

  const value = { jobs, loading, addJob, getJobById, updateJob, deleteJob }
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
}

export function useJobs() {
  const ctx = useContext(JobsContext)
  if (!ctx) throw new Error('useJobs must be used within JobsProvider')
  return ctx
}
