import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { createJob, Job } from '@/lib/api'

export default function AddJobPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Omit<Job, '_id'>>({
   company: '',
   role: '',
   status: 'Applied',
   date: new Date().toISOString().split('T')[0], // Ensure string format
   link: ''
 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createJob(formData)
      navigate('/jobs')
    } catch (error) {
      console.error('Error creating job:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        Back
      </Button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Application</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as Job['status']})}
              className="w-full p-2 border rounded"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
  type="date"
  value={typeof formData.date === 'string' ? formData.date : formData.date.toISOString().split('T')[0]}
  onChange={(e) => setFormData({...formData, date: e.target.value})}
  className="w-full p-2 border rounded"
  required
/>
          </div>

          <div>
            <label className="block font-medium mb-1">Job Posting URL (Optional)</label>
            <input
              type="url"
              value={formData.link || ''}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit">Save Application</Button>
          </div>
        </form>
      </div>
    </div>
  )
}