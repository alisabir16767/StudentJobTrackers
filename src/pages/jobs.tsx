import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { fetchJobs, Job } from '@/lib/api'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs()
        setJobs(data)
      } catch (error) {
        console.error('Error loading jobs:', error)
      } finally {
        setLoading(false)
      }
    }
    loadJobs()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Job Applications</h1>
        <Button onClick={() => navigate('/jobs/add')}>
          Add New Application
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No applications yet. Add your first job application!
          </p>
        ) : (
          jobs.map((job) => (
            <div 
              key={job._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium">{job.company}</h2>
                  <p className="text-muted-foreground">{job.role}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Applied: {new Date(job.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                  job.status === 'Interview' ? 'bg-yellow-100 text-yellow-800' :
                  job.status === 'Offer' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {job.status}
                </span>
              </div>
              {job.link && (
                <a 
                  href={job.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Job Posting
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}