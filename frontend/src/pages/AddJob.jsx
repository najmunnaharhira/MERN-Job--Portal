import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { useJobs } from '../context/JobsContext'

const employmentOptions = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Temporary', label: 'Temporary' }
]

const experienceOptions = [
  { value: 'Any experience', label: 'Any experience' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Work remotely', label: 'Work remotely' }
]

const salaryTypeOptions = [
  { value: 'Yearly', label: 'Yearly' },
  { value: 'Monthly', label: 'Monthly' }
]

const defaultValues = {
  companyName: '',
  jobTitle: '',
  minPrice: '',
  maxPrice: '',
  salaryType: 'Yearly',
  jobLocation: '',
  postingDate: new Date().toISOString().slice(0, 10),
  experienceLevel: 'Any experience',
  employmentType: 'Full-time',
  description: ''
}

export default function AddJob() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addJob, updateJob, getJobById } = useJobs()
  const isEdit = Boolean(id)
  const job = isEdit ? getJobById(id) : null

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({ defaultValues })

  useEffect(() => {
    if (job) {
      reset({
        companyName: job.companyName ?? '',
        jobTitle: job.jobTitle ?? '',
        minPrice: job.minPrice ?? '',
        maxPrice: job.maxPrice ?? '',
        salaryType: job.salaryType ?? 'Yearly',
        jobLocation: job.jobLocation ?? '',
        postingDate: job.postingDate ?? defaultValues.postingDate,
        experienceLevel: job.experienceLevel ?? 'Any experience',
        employmentType: job.employmentType ?? 'Full-time',
        description: job.description ?? ''
      })
    }
  }, [job, reset])

  const employmentType = watch('employmentType')
  const experienceLevel = watch('experienceLevel')
  const salaryType = watch('salaryType')

  const onSubmit = async (data) => {
    try {
      if (isEdit && job) {
        await updateJob(Number(id), data)
        await Swal.fire({ icon: 'success', title: 'Job updated', text: 'Your job listing has been updated.' })
      } else {
        const newJob = await addJob(data)
        await Swal.fire({ icon: 'success', title: 'Job posted', text: 'Your job listing has been added.' })
        navigate(`/job/${newJob.id}`)
        return
      }
      navigate(`/job/${id}`)
    } catch (e) {
      await Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to save job. Please try again.' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{isEdit ? 'Edit job' : 'Post a job'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company name *</label>
          <input
            {...register('companyName', { required: 'Required' })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            placeholder="e.g. Acme Inc."
          />
          {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job title *</label>
          <input
            {...register('jobTitle', { required: 'Required' })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            placeholder="e.g. Software Engineer"
          />
          {errors.jobTitle && <p className="text-red-600 text-sm mt-1">{errors.jobTitle.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Min salary (k) *</label>
            <input
              type="number"
              {...register('minPrice', { required: 'Required' })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
              placeholder="20"
            />
            {errors.minPrice && <p className="text-red-600 text-sm mt-1">{errors.minPrice.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Max salary (k) *</label>
            <input
              type="number"
              {...register('maxPrice', { required: 'Required' })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
              placeholder="50"
            />
            {errors.maxPrice && <p className="text-red-600 text-sm mt-1">{errors.maxPrice.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Salary type</label>
          <Select
            options={salaryTypeOptions}
            value={salaryTypeOptions.find(o => o.value === salaryType)}
            onChange={(opt) => setValue('salaryType', opt?.value ?? 'Yearly')}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
          <input
            {...register('jobLocation', { required: 'Required' })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
            placeholder="e.g. San Francisco"
          />
          {errors.jobLocation && <p className="text-red-600 text-sm mt-1">{errors.jobLocation.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Posting date</label>
          <input
            type="date"
            {...register('postingDate')}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Employment type</label>
          <Select
            options={employmentOptions}
            value={employmentOptions.find(o => o.value === employmentType)}
            onChange={(opt) => setValue('employmentType', opt?.value ?? 'Full-time')}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Experience level</label>
          <Select
            options={experienceOptions}
            value={experienceOptions.find(o => o.value === experienceLevel)}
            onChange={(opt) => setValue('experienceLevel', opt?.value ?? 'Any experience')}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
          <textarea
            {...register('description', { required: 'Required' })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none resize-y"
            placeholder="Describe the role and requirements..."
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand text-white rounded-lg font-medium hover:bg-brand-hover transition-colors"
          >
            {isEdit ? 'Update job' : 'Post job'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
