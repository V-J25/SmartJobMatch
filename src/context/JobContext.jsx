import { useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { AuthContext } from './authContextValue'
import { JobContext } from './jobContextValue'

function JobProvider({ children }) {
  const { user } = useContext(AuthContext)
  const userId = user?.id || 'guest'
  const [savedJobsByUser, setSavedJobsByUser] = useLocalStorage(
    'smart-job-saved-by-user',
    {},
  )
  const [appliedJobsByUser, setAppliedJobsByUser] = useLocalStorage(
    'smart-job-applied-by-user',
    {},
  )

  const savedJobs = useMemo(
    () => savedJobsByUser[userId] || [],
    [savedJobsByUser, userId],
  )
  const appliedJobs = useMemo(
    () => appliedJobsByUser[userId] || [],
    [appliedJobsByUser, userId],
  )

  const saveJob = useCallback(
    (job) => {
      setSavedJobsByUser((currentJobs) => {
        const userJobs = currentJobs[userId] || []
        const exists = userJobs.some((item) => item.id === job.id)
        return {
          ...currentJobs,
          [userId]: exists ? userJobs : [...userJobs, job],
        }
      })
    },
    [setSavedJobsByUser, userId],
  )

  const applyJob = useCallback(
    (job) => {
      setAppliedJobsByUser((currentJobs) => {
        const userJobs = currentJobs[userId] || []
        const existingJob = userJobs.find((item) => item.id === job.id)
        return {
          ...currentJobs,
          [userId]:
            existingJob?.status === 'Rejected'
              ? userJobs.map((item) =>
                  item.id === job.id ? { ...item, status: 'Applied' } : item,
                )
              : existingJob
                ? userJobs
                : [...userJobs, { ...job, status: 'Applied' }],
        }
      })
    },
    [setAppliedJobsByUser, userId],
  )

  const removeSavedJob = useCallback(
    (jobId) => {
      setSavedJobsByUser((currentJobs) => ({
        ...currentJobs,
        [userId]: (currentJobs[userId] || []).filter((job) => job.id !== jobId),
      }))
    },
    [setSavedJobsByUser, userId],
  )

  const updateApplicationStatus = useCallback(
    (jobId, status) => {
      setAppliedJobsByUser((currentJobs) => ({
        ...currentJobs,
        [userId]: (currentJobs[userId] || []).map((job) =>
          job.id === jobId ? { ...job, status } : job,
        ),
      }))
    },
    [setAppliedJobsByUser, userId],
  )

  const value = useMemo(
    () => ({
      savedJobs,
      appliedJobs,
      saveJob,
      applyJob,
      removeSavedJob,
      updateApplicationStatus,
    }),
    [
      savedJobs,
      appliedJobs,
      saveJob,
      applyJob,
      removeSavedJob,
      updateApplicationStatus,
    ],
  )

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}

export default JobProvider
