import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_PATH = path.join(__dirname, 'data', 'jobs.json')
const USERS_PATH = path.join(__dirname, 'data', 'users.json')
const JWT_SECRET = process.env.JWT_SECRET || 'job-portal-secret-change-in-production'

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

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_PATH, 'utf8')
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

function writeUsers(users) {
  const dir = path.dirname(USERS_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), 'utf8')
}

// ----- Auth routes -----
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === (email || '').toLowerCase())) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = {
      id: Date.now(),
      name: (name || '').trim() || email.split('@')[0],
      email: email.toLowerCase().trim(),
      passwordHash: hashed,
    }
    users.push(user)
    writeUsers(users)
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const users = readUsers()
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    })
  } catch (e) {
    res.status(500).json({ error: 'Login failed' })
  }
})

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

app.put('/api/jobs/:id', (req, res) => {
  const jobs = readJobs()
  const id = Number(req.params.id)
  const idx = jobs.findIndex(j => j.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Job not found' })
  const updated = {
    ...jobs[idx],
    ...req.body,
    id,
    minPrice: String(req.body.minPrice ?? jobs[idx].minPrice ?? ''),
    maxPrice: String(req.body.maxPrice ?? jobs[idx].maxPrice ?? '')
  }
  jobs[idx] = updated
  writeJobs(jobs)
  res.json(updated)
})

app.delete('/api/jobs/:id', (req, res) => {
  const jobs = readJobs()
  const id = Number(req.params.id)
  const idx = jobs.findIndex(j => j.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Job not found' })
  jobs.splice(idx, 1)
  writeJobs(jobs)
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`)
})
