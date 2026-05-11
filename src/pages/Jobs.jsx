import { useCallback, useContext, useMemo, useState } from 'react'
import Filters from '../components/Filters.jsx'
import JobCard from '../components/JobCard.jsx'
import Loader from '../components/Loader.jsx'
import Navbar from '../components/Navbar.jsx'
import Pagination from '../components/Pagination.jsx'
import { JobContext } from '../context/jobContextValue'
import useDebounce from '../hooks/useDebounce'
import useFetchJobs from '../hooks/useFetchJobs'
import usePagination from '../hooks/usePagination'
import { filterJobs, getUniqueValues } from '../utils/helpers'

const initialFilters = {
  search: '',
  location: '',
  type: '',
  skill: '',
  experience: '',
}

function Jobs() {
  const [filters, setFilters] = useState(initialFilters)
  const debouncedSearch = useDebounce(filters.search)
  const { jobs, loading, error } = useFetchJobs()
  const { saveJob, applyJob, savedJobs, appliedJobs } = useContext(JobContext)

  const activeFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  )
  const filterOptions = useMemo(
    () => ({
      locations: getUniqueValues(jobs, 'location'),
      types: getUniqueValues(jobs, 'type'),
      skills: getUniqueValues(jobs, 'skills'),
      experienceLevels: getUniqueValues(jobs, 'experience'),
    }),
    [jobs],
  )
  const filteredJobs = useMemo(
    () => filterJobs(jobs, activeFilters),
    [jobs, activeFilters],
  )
  const pagination = usePagination(filteredJobs, 4)
  const handleSaveJob = useCallback((job) => saveJob(job), [saveJob])
  const handleApplyJob = useCallback((job) => applyJob(job), [applyJob])

  return (
    <div>
      <Navbar />
      <main className='mx-auto max-w-6xl px-4 py-8'>
        <h1 className='text-3xl font-black'>Jobs and Internships</h1>
        <p className='mt-2 text-slate-600'>Filter jobs by skills, location, type, and level.</p>
        <div className='mt-6'>
          <Filters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
            options={filterOptions}
          />
        </div>
        {loading && <Loader message='Finding matching jobs...' />}
        {error && <p className='mt-6 rounded-md bg-red-50 p-4 text-red-700'>{error}</p>}
        {!loading && !error && (
          <>
            <p className='mt-5 text-sm font-medium text-slate-500'>
              Showing {filteredJobs.length} matching opportunities
            </p>
            <div className='mt-4 grid gap-4 md:grid-cols-2'>
              {pagination.currentData.map((job) => {
                const appliedJob = appliedJobs.find((item) => item.id === job.id)
                const isApplyDisabled = Boolean(
                  appliedJob && appliedJob.status !== 'Rejected',
                )

                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    handleSaveJob={handleSaveJob}
                    handleApplyJob={handleApplyJob}
                    isSaved={savedJobs.some((item) => item.id === job.id)}
                    isApplied={isApplyDisabled}
                    applicationStatus={appliedJob?.status}
                  />
                )
              })}
            </div>
            {!filteredJobs.length && (
              <div className='mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center'>
                No jobs found. Try changing the filters.
              </div>
            )}
            <Pagination {...pagination} onPageChange={pagination.goToPage} />
          </>
        )}
      </main>
    </div>
  )
}

export default Jobs
