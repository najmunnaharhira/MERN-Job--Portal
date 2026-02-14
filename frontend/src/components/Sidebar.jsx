import React, { useState } from 'react'

// MERN stack: MongoDB (green), Express (blue), React (blue), Node (green)
const MERN_ICONS = [
  { letter: 'M', color: 'bg-green-600', title: 'MongoDB' },
  { letter: 'E', color: 'bg-slate-600', title: 'Express' },
  { letter: 'R', color: 'bg-sky-500', title: 'React' },
  { letter: 'N', color: 'bg-green-500', title: 'Node.js' },
]

export default function Sidebar() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      alert('Thanks for subscribing!')
      setEmail('')
    }
  }

  return (
    <aside className="space-y-6">
      {/* Email me for jobs */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-2">Email me for jobs</h3>
        <p className="text-sm text-slate-600 mb-4">
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea foes.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <input
            type="email"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Get noticed faster */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-2">Get noticed faster</h3>
        <p className="text-sm text-slate-600 mb-4">
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea foes.
        </p>
        <button
          type="button"
          className="w-full py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          Upload your resume
        </button>
      </div>

      {/* MERN Stack icons */}
      <div className="flex flex-col items-center gap-2 pt-4">
        <div className="flex gap-2">
          {MERN_ICONS.map(({ letter, color, title }) => (
            <div
              key={letter}
              title={title}
              className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm`}
            >
              {letter}
            </div>
          ))}
        </div>
        <span className="text-sm font-medium text-slate-600">M E R N</span>
      </div>
    </aside>
  )
}
