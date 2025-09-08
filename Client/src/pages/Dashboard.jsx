
import React from 'react'
import StatsOverview from '@/Components/dashboard/StatsOverview.jsx'
import FloorOccupancy from '@/Components/dashboard/FloorOccupancy.jsx'
import MaintenanceAlerts from '@/Components/dashboard/MaintenanceAlerts.jsx'

export default function Dashboard(){
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg,#f3f4f6 0%,#e0e7ff 100%)',
      padding: '0',
    }}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0'}}>
        <header style={{marginBottom:32}}>
          <h1 style={{
            fontSize:'2.2rem',
            fontWeight:800,
            background:'linear-gradient(90deg,#6366f1 0%,#60a5fa 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            marginBottom:6,
            letterSpacing:'-1px',
          }}>Facility Dashboard</h1>
          <p style={{color:'#64748b',fontSize:'1.1rem',marginTop:2}}>Welcome to the Honor Haven Veterans Home management system</p>
        </header>

        <StatsOverview />

        <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:32,marginTop:36}}>
          <div>
            <FloorOccupancy />
          </div>
          <div>
            <MaintenanceAlerts />
          </div>
        </div>
      </div>
    </div>
  )
}