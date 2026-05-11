import { useContext, useMemo } from 'react'
import DashboardCard from '../components/DashboardCard.jsx'
import Navbar from '../components/Navbar.jsx'
import { AuthContext } from '../context/authContextValue'
import { JobContext } from '../context/jobContextValue'
import jobs from '../data/jobs'
import getRecommendedJobs from '../utils/recommendationLogic'

function Dashboard() {
  const { user } = useContext(AuthContext)
  const { savedJobs, appliedJobs } = useContext(JobContext)
  const userSkills = useMemo(
    () => (user?.skills?.length ? user.skills : []),
    [user],
  )
  const recommendedJobs = useMemo(
    () => getRecommendedJobs(jobs, userSkills, 3),
    [userSkills],
  )
  const interviewCount = appliedJobs.filter((job) => job.status === 'Interview').length

  return (
    <div>
      <Navbar />
      <main className='mx-auto max-w-6xl px-4 py-8'>
        <h1 className='text-3xl font-black'>Hi {user?.name || 'Student'}, here is your dashboard</h1>
        <section className='mt-6 grid gap-4 md:grid-cols-4'>
          <DashboardCard title='Saved Jobs' value={savedJobs.length} description='Shortlisted opportunities' />
          <DashboardCard title='Applied Jobs' value={appliedJobs.length} description='Submitted applications' />
          <DashboardCard title='Interviews' value={interviewCount} description='Interview stage applications' />
          <DashboardCard title='Profile Skills' value={userSkills.length} description={userSkills.length ? userSkills.join(', ') : 'Add skills in Profile'} />
        </section>
        <section className='mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
          <h2 className='text-xl font-bold'>Recommended Jobs</h2>
          {!recommendedJobs.length && (
            <p className='mt-4 rounded-md bg-slate-50 p-4 text-sm text-slate-600'>
              Add skills in your profile to see recommendations.
            </p>
          )}
          <div className='mt-4 grid gap-3'>
            {recommendedJobs.map((job) => (
              <div key={job.id} className='flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-100 p-4'>
                <div>
                  <p className='font-semibold'>{job.title}</p>
                  <p className='text-sm text-slate-500'>{job.company} - {job.location}</p>
                </div>
                <span className='rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700'>
                  {job.matchScore}% match
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
