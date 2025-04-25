import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { fetchJobs, Job } from '@/lib/api';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Student Job Tracker</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Track your job applications and interviews in one place
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/jobs')}>
            View Applications
          </Button>
          <Button variant="outline" onClick={() => navigate('/jobs/add')}>
            Add New Application
          </Button>
        </div>
      </section>

      <section className="grid gap-4 py-8">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded-lg">
            <h2 className="font-medium">{job.company}</h2>
            <p className="text-muted-foreground">{job.role}</p>
            <span className={`text-sm px-2 py-1 rounded-full ${
              job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
              job.status === 'Interview' ? 'bg-yellow-100 text-yellow-800' :
              job.status === 'Offer' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {job.status}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}