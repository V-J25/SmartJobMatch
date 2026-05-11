import Navbar from '../components/Navbar.jsx'
import interviewData from '../data/interviewData'
import roadmapData from '../data/roadmapData'

function Roadmap() {
  return (
    <div>
      <Navbar />
      <main className='mx-auto max-w-6xl px-4 py-8'>
        <h1 className='text-3xl font-black'>Placement Preparation Roadmap</h1>
        <section className='mt-6 grid gap-4 md:grid-cols-2'>
          {roadmapData.map((step) => (
            <article key={step.id} className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='flex items-start justify-between gap-3'>
                <h2 className='text-lg font-bold'>{step.title}</h2>
                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold'>
                  {step.duration}
                </span>
              </div>
              <div className='mt-3 flex flex-wrap gap-2'>
                {step.topics.map((topic) => (
                  <span key={topic} className='rounded-md bg-slate-100 px-2 py-1 text-xs'>
                    {topic}
                  </span>
                ))}
              </div>
              <p className='mt-4 text-sm text-slate-600'>{step.project}</p>
            </article>
          ))}
        </section>
        <section className='mt-8'>
          <h2 className='text-2xl font-bold'>Interview Experiences</h2>
          <div className='mt-4 grid gap-4 md:grid-cols-3'>
            {interviewData.map((interview) => (
              <article key={interview.id} className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
                <h3 className='font-bold'>{interview.company}</h3>
                <p className='text-sm text-slate-600'>{interview.role}</p>
                <p className='mt-3 text-sm font-semibold'>Difficulty: {interview.difficulty}</p>
                <p className='mt-3 text-sm text-slate-600'>{interview.tips}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Roadmap
