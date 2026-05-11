import { useEffect, useState } from 'react'
import jobsData from '../data/jobs'

function useFetchJobs(delay = 250) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        setJobs(jobsData)
      } catch {
        setError('Unable to load jobs.')
      } finally {
        setLoading(false)
      }
    }, delay)

    return () => clearTimeout(timerId)
  }, [delay])

  return { jobs, loading, error }
}

export default useFetchJobs
