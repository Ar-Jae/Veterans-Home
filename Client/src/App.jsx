import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Residents from './pages/Residents.jsx'
import Rooms from './pages/Rooms.jsx'
import FloorPlan from './pages/FloorPlan.jsx'
import Activities from './pages/Activities.jsx'
import Maintenance from './pages/Maintenance.jsx'
import Meals from './pages/Meals.jsx'
import AddResident from './pages/AddResident.jsx'
import Finance from './pages/Finances.jsx'
import Incidents from './pages/Incidents.jsx'
import Payments from './pages/Payments.jsx'
import Reports from './pages/Reports.jsx'
import Staff from './pages/Staff.jsx'
import { createPageUrl } from '../utils/index.js'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={createPageUrl('Dashboard')} replace />} />
  <Route path={createPageUrl('Dashboard')} element={<Dashboard />} />
  <Route path={createPageUrl('Residents')} element={<Residents />} />
  <Route path={createPageUrl('Rooms')} element={<Rooms />} />
  <Route path={createPageUrl('Activities')} element={<Activities />} />
  <Route path={createPageUrl('Maintenance')} element={<Maintenance />} />
  <Route path={createPageUrl('FloorPlan')} element={<FloorPlan />} />
  <Route path={createPageUrl('Meals')} element={<Meals />} />
  <Route path={createPageUrl('AddResident')} element={<AddResident />} />
  <Route path={createPageUrl('Finances')} element={<Finance />} />
  <Route path={createPageUrl('Incidents')} element={<Incidents />} />
  <Route path={createPageUrl('Payments')} element={<Payments />} />
  <Route path={createPageUrl('Reports')} element={<Reports />} />
  <Route path={createPageUrl('Staff')} element={<Staff />} />
      </Routes>
    </Layout>
  )
}
