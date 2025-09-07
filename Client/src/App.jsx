import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Dashboard from './pages/Dashboard'
import Residents from './pages/Residents'
import Rooms from './pages/Rooms'
import FloorPlan from './pages/FloorPlan'
import Activities from './pages/Activities'
import Maintenance from './pages/Maintenance'
import Meals from './pages/Meals'
import AddResident from './pages/AddResident.jsx'
import { createPageUrl } from '../utils'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={createPageUrl('Dashboard')} replace />} />
        <Route path={createPageUrl('Dashboard')} element={<Dashboard />} />
        <Route path={createPageUrl('Residents')} element={<Residents />} />
        <Route path={createPageUrl('Rooms')} element={<Rooms />} />
        <Route path={createPageUrl('FloorPlan')} element={<FloorPlan />} />
        <Route path={createPageUrl('Activities')} element={<Activities />} />
        <Route path={createPageUrl('Maintenance')} element={<Maintenance />} />
        <Route path={createPageUrl('Meals')} element={<Meals />} />
        <Route path={createPageUrl('AddResident')} element={<AddResident />} />
      </Routes>
    </Layout>
  )
}
