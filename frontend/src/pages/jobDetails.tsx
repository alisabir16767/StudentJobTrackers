import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { fetchJob, Job } from '@/lib/api';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error('Invalid job ID');
        }

        const data = await fetchJob(id);
        if (!data) {
          throw new Error('Job not found');
        }
        setJob(data);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to load job details';
        console.error('Error loading job:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-medium text-red-800">Error</h3>
          <p className="text-red-700">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/jobs')}
            className="mt-4"
          >
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800">Not Found</h3>
          <p className="text-yellow-700">The requested job could not be found</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/jobs')}
            className="mt-4"
          >
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        Back to Jobs
      </Button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{job.company}</h1>
            <h2 className="text-xl text-muted-foreground">{job.role}</h2>
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

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Application Date</h3>
            <p>{new Date(job.date).toLocaleDateString()}</p>
          </div>

          {job.link && (
            <div>
              <h3 className="font-medium">Job Posting</h3>
              <a 
                href={job.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Original Posting
              </a>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={() => navigate(`/jobs/${id}/edit`)}>
              Edit Application
            </Button>
            <Button variant="destructive">
              Delete Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}