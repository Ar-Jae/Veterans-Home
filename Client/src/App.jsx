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

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/residents" element={<Residents />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/floorplan" element={<FloorPlan />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/meals" element={<Meals />} />
      </Routes>
    </Layout>
  )
}
