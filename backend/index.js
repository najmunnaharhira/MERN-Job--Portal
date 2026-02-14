import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_PATH = path.join(__dirname, 'data', 'jobs.json')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

function readJobs() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8')
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

function writeJobs(jobs) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(jobs, null, 0), 'utf8')
}

app.get('/api/jobs', (req, res) => {
  const jobs = readJobs()
  res.json(jobs)
})

app.get('/api/jobs/:id', (req, res) => {
  const jobs = readJobs()
  const id = Number(req.params.id)
  const job = jobs.find(j => j.id === id)
  if (!job) return res.status(404).json({ error: 'Job not found' })
  res.json(job)
})

app.post('/api/jobs', (req, res) => {
  const jobs = readJobs()
  const newJob = {
    ...req.body,
    id: Date.now(),
    minPrice: String(req.body.minPrice ?? ''),
    maxPrice: String(req.body.maxPrice ?? '')
  }
  jobs.unshift(newJob)
  writeJobs(jobs)
  res.status(201).json(newJob)
})

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`)
})
