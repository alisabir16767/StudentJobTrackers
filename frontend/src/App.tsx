
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout'
import HomePage from '@/pages/home'
import JobsPage from '@/pages/jobs'
import JobDetailsPage from '@/pages/jobDetails'
import AddJobPage from '@/pages/add'
import StatsPage from '@/pages/stats'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="jobs">
            <Route index element={<JobsPage />} />
            <Route path=":id" element={<JobDetailsPage />} />  
            <Route path="add" element={<AddJobPage />} />
          </Route>
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
