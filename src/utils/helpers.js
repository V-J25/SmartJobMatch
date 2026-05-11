export function getUniqueValues(items, key) {
  return [...new Set(items.flatMap((item) => item[key] ?? []))].sort()
}

export function filterJobs(jobs, filters) {
  const search = filters.search.trim().toLowerCase()

  return jobs.filter((job) => {
    const searchableText = [
      job.title,
      job.company,
      job.location,
      job.type,
      job.experience,
      ...job.skills,
    ]
      .join(' ')
      .toLowerCase()

    return (
      (!search || searchableText.includes(search)) &&
      (!filters.location || job.location === filters.location) &&
      (!filters.type || job.type === filters.type) &&
      (!filters.skill || job.skills.includes(filters.skill)) &&
      (!filters.experience || job.experience === filters.experience)
    )
  })
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
