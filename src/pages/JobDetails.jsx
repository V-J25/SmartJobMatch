import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import jobs from '../data/jobs'
import { formatDate } from '../utils/helpers'

function JobDetails() {
  const { id } = useParams()
  const job = jobs.find((item) => item.id === Number(id))

  if (!job) {
    return (
      <div>
        <Navbar />
        <main className='mx-auto max-w-3xl px-4 py-12 text-center'>
          <h1 className='text-3xl font-black'>Job not found</h1>
          <Link to='/jobs' className='mt-6 inline-block rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white'>
            Back to Jobs
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className='mx-auto max-w-4xl px-4 py-8'>
        <article className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
          <h1 className='text-3xl font-black'>{job.title}</h1>
          <p className='mt-2 text-lg font-semibold text-slate-700'>{job.company}</p>
          <div className='mt-4 grid gap-2 text-slate-600 md:grid-cols-2'>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            <p>Type: {job.type}</p>
            <p>Experience: {job.experience}</p>
            <p>Posted: {formatDate(job.postedDate)}</p>
          </div>
          <p className='mt-5 text-slate-700'>{job.description}</p>
          <div className='mt-5 flex flex-wrap gap-2'>
            {job.skills.map((skill) => (
              <span key={skill} className='rounded-md bg-slate-100 px-3 py-1 text-sm'>
                {skill}
              </span>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}

export default JobDetails
