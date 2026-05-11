import { useContext, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { JobContext } from '../context/jobContextValue'

const statuses = ['Applied', 'Interview', 'Offer', 'Rejected']

function Tracker() {
  const { appliedJobs, updateApplicationStatus } = useContext(JobContext)
  const [statusFilter, setStatusFilter] = useState('All')
  const visibleJobs =
    statusFilter === 'All'
      ? appliedJobs
      : appliedJobs.filter((job) => job.status === statusFilter)

  return (
    <div>
      <Navbar />
      <main className='mx-auto max-w-6xl px-4 py-8'>
        <h1 className='text-3xl font-black'>Placement Tracker</h1>
        <div className='mt-5 flex flex-wrap gap-2'>
          {['All', ...statuses].map((status) => (
            <button
              type='button'
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-md px-3 py-2 text-sm font-semibold ${
                statusFilter === status
                  ? 'bg-slate-950 text-white'
                  : 'border border-slate-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className='mt-6 grid gap-4'>
          {!visibleJobs.length && (
            <div className='rounded-lg border border-slate-200 bg-white p-8 text-center'>
              Apply to jobs first, then manage their status here.
            </div>
          )}
          {visibleJobs.map((job) => (
            <article key={job.id} className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <h2 className='font-bold'>{job.title}</h2>
                  <p className='text-sm text-slate-600'>{job.company}</p>
                </div>
                <select
                  value={job.status}
                  onChange={(event) => updateApplicationStatus(job.id, event.target.value)}
                  className='rounded-md border border-slate-300 px-3 py-2 text-sm'
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Tracker
