import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function StatsPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Application Statistics</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Status Distribution Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Status Distribution</h2>
          {/* Placeholder for status chart */}
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Status chart will appear here</p>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Application Timeline</h2>
          {/* Placeholder for timeline */}
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Timeline will appear here</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  )
}